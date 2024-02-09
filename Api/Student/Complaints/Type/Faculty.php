<?php


include './../../../main.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Extract data from the JSON request
    $name = isset($data['name']) ? $data['name'] : '';
    $rollno = isset($data['rollno']) ? $data['rollno'] : '';
    $email = isset($data['email']) ? $data['email'] : '';
    $description = isset($data['description']) ? $data['description'] : '';
    $department = isset($data['department']) ? $data['department'] : '';
    $Class = isset($data['Class']) ? $data['Class'] : '';
    $Subject = isset($data['Subject']) ? $data['Subject'] : '';
    $Batch = isset($data['Batch']) ? $data['Batch'] : '';
    $Type = isset($data['Type']) ? $data['Type'] : '';
    $Subjectname = isset($data['Subjectname']) ? $data['Subjectname'] : '';
    // Generate a unique 16-digit complaint ID
    do {
        $complaintid = bin2hex(random_bytes(8)); // Generates a random 16-character hexadecimal string
    
        $unique_query = "SELECT Complaint_Id FROM complaints WHERE Complaint_Id = '$complaintid'";
        $result = mysqli_query($conn, $unique_query);
        if (mysqli_num_rows($result) === 0) {
            break;
        }
    } while (mysqli_num_rows($result) > 0);

    if ($name === '' || $rollno === '' || $email === '' ||  $description === '' || $department === '' || $Type === '') {
      echo json_encode(['success' => false, 'message' => $name]);
      echo json_encode(['success' => false, 'message' => $rollno]);
      echo json_encode(['success' => false, 'message' => 'Please fill in all required fields']);
        
        exit;
    }

    $currentDate = date('Y-m-d');
    $currentTime = date('H:i:s');

    // Assuming $conn is your database connection
    $query = "INSERT INTO faculty_complaints (Complaint_Id, Description, Type, Roll_No, email, Department, Status,  Name, Class, info1, CreateTime, Batch, FacultyEmail,Subjectname,FacultyName)
    VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    

    // Prepare the statement
    $stmt = mysqli_prepare($conn, $query);
    $complaintid=strval($complaintid);
    if ($stmt) {
        $query_get_sub_fac_name = "SELECT Name FROM admin_info WHERE Email = ?";
        $stmt_get_sub_fac_name = mysqli_prepare($conn, $query_get_sub_fac_name);
        mysqli_stmt_bind_param($stmt_get_sub_fac_name, "s", $Subject);
        mysqli_stmt_execute($stmt_get_sub_fac_name);
        mysqli_stmt_store_result($stmt_get_sub_fac_name);

        $Sub_Fac_Name = ''; // Initialize a variable to store the Sub_Fac_Name

        if (mysqli_stmt_num_rows($stmt_get_sub_fac_name) === 1) {
            mysqli_stmt_bind_result($stmt_get_sub_fac_name, $Sub_Fac_Name);
            mysqli_stmt_fetch($stmt_get_sub_fac_name);
        } else {
            $Sub_Fac_Name = 'Default Sub_Faculty Name'; // Set a default value
        }

        $defaultStatus = 'Arrived';

        // Bind parameters to the placeholders
        mysqli_stmt_bind_param($stmt, "sssssssssssssss", $complaintid, $description, $Type, $rollno, $email, $department, $defaultStatus, $name, $Class, $currentDate, $currentTime, $Batch,$Subject,$Subjectname,$Sub_Fac_Name);

        // Execute the statement
        $result = mysqli_stmt_execute($stmt);

        if ($result) {
          echo json_encode(['success' => true, 'complaint_id' => $complaintid]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Server error']);
        }

        // Close the statement
        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(['success' => false, 'message' => 'Server error']);
    }
}
?>
