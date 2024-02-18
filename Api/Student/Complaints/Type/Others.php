<?php


include './../../../main.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Extract data from the JSON request
    $name = isset($data['name']) ? $data['name'] : '';
    $rollno = isset($data['rollno']) ? $data['rollno'] : '';
    $email = isset($data['email']) ? $data['email'] : '';
    $description = isset($data['description']) ? $data['description'] : '';
    $complainttype= "Others";
    $department = isset($data['department']) ? $data['department'] : '';
    $Class = isset($data['Class']) ? $data['Class'] : '';
    $Subject = isset($data['Subject']) ? $data['Subject'] : '';
    $Batch = isset($data['Batch']) ? $data['Batch'] : '';
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

    if ($name === '' || $rollno === '' || $email === '' ||  $description === '' || $department === '') {
      echo json_encode(['success' => false, 'message' => $name]);
      echo json_encode(['success' => false, 'message' => $rollno]);
      echo json_encode(['success' => false, 'message' => 'Please fill in all required fields']);
        
        exit;
    }

    $currentDate = date('Y-m-d');
    $currentTime = date('H:i:s');

    // Assuming $conn is your database connection
    $query = "INSERT INTO complaints (Complaint_Id, Type, Description, Roll_No, email, Department, Status,  Name, Class, Forward_To,info1,info2,CreateTime,Batch,Extra)
    VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    

    // Prepare the statement
    $stmt = mysqli_prepare($conn, $query);
    $complaintid=strval($complaintid);
    if ($stmt) {
        $Subjectquery = "SELECT Advisor1, Advisor2, Advisor3, HOD, Year_incharge FROM semester WHERE Batch = ? AND Class = ?";
        $Subjectstmt = mysqli_prepare($conn, $Subjectquery); // Use $Subjectquery here
        mysqli_stmt_bind_param($Subjectstmt, "ss", $Batch, $Class);
        mysqli_stmt_execute($Subjectstmt);
        mysqli_stmt_store_result($Subjectstmt);
        $Advisor1 = '';
        $Advisor2 = '';
        $Advisor3 = '';
        $HOD = '';
        $Year_incharge = '';

        if (mysqli_stmt_num_rows($Subjectstmt) === 1) {
            mysqli_stmt_bind_result($Subjectstmt, $Advisor1, $Advisor2, $Advisor3, $HOD, $Year_incharge);
            mysqli_stmt_fetch($Subjectstmt);
        }
        $defaultStatus = 'Arrived';


        $defaultForwardTo = $Subject;


        $query_select_faculty_name = "SELECT Name FROM admin_info WHERE Email = ?";
        $stmt_select_faculty_name = mysqli_prepare($conn, $query_select_faculty_name);
        mysqli_stmt_bind_param($stmt_select_faculty_name, "s", $defaultForwardTo);
        mysqli_stmt_execute($stmt_select_faculty_name);
        mysqli_stmt_store_result($stmt_select_faculty_name);

        if (mysqli_stmt_num_rows($stmt_select_faculty_name) === 1) {
            mysqli_stmt_bind_result($stmt_select_faculty_name, $Faculty_Name);
            mysqli_stmt_fetch($stmt_select_faculty_name);
        }else{
            $Faculty_Name = 'Default Faculty Name'; // Set a default value
        }
        $info2 = '[{"Forwarded":["' . $Faculty_Name . '","' . date('Y-m-d H:i:s') . '"]}]';

        // Bind parameters to the placeholders
        mysqli_stmt_bind_param($stmt, "sssssssssssssss", $complaintid, $complainttype, $description, $rollno, $email, $department, $defaultStatus, $name, $Class, $defaultForwardTo, $currentDate, $info2, $currentTime, $Batch,$Subjectname);

        // Execute the statement
        $result = mysqli_stmt_execute($stmt);

        if ($result) {
            $query_get_name = "SELECT Name FROM admin_info WHERE email = ?";
    $stmt_get_name = mysqli_prepare($conn, $query_get_name);
    mysqli_stmt_bind_param($stmt_get_name, "s", $defaultForwardTo);
    mysqli_stmt_execute($stmt_get_name);
    mysqli_stmt_store_result($stmt_get_name);

    $facultyName = ''; // Initialize a variable to store the faculty name

    if (mysqli_stmt_num_rows($stmt_get_name) === 1) {
        mysqli_stmt_bind_result($stmt_get_name, $facultyName);
        mysqli_stmt_fetch($stmt_get_name);
    } else {
        $facultyName = 'Default Faculty Name';
    }
            $emailParams1 = [
                'to' => $defaultForwardTo,
                'subject' => 'Student Complaint Notification',
                'message' => '<html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                        <style>
                          .container {
                            background-color: #F7F7F7;
                            border:2px solid black;
                            padding-bottom: 20px;
                            color:#F8F8F8;
                            font-family: "Gill Sans", sans-serif;
                            border-radius:10px;
                          }
                          .container hr{
                            margin-left:30px;
                            margin-right:30px;
                          }
                          .container .body{
                            padding-left:40px;
                            padding-right:40px;
                          }
                          .container .body p{
                            color:#343a40;
                          }
                          .container  h1{
                              text-align: center;
                              color:#19AFFF;
                          }
                          .container .body h2{
                              text-align: center;
                              color:black;
                          }
                          .container .body table{
                            color:black;
                            border-collapse: collapse;
                          }
                          
                .container .table{
                  margin: auto;
                  width: 70%;
                  padding: 10px;
                }
                .container .body table {
                  border-collapse: collapse;
                  width: 100%;
                }
                        </style>
                </head>
                <body>
                    <div class="container">
                      <h1>Student Complaint Notification</h1>
                      <hr/>
                      <div class="body">
                      
                      <br/>
                      <p>Dear '.$facultyName.',<br/>
                        <br>
                        I hope this message finds you well. We wanted to inform you that a complaint has been raised by a student. The details of the complaint are as follows:<br/>
                        <br>
                        <div class="table">
                          <table>
                            <tr>
                              <td>Student Name</td>
                              <td>:</td>
                              <td>'.$name.'</td>
                          </tr>
                          <tr>
                              <td>RollNo</td>
                              <td>:</td>
                              <td>'.$rollno.'</td>
                          </tr>
                          
                          <tr>
                              <td>Complaint Type</td>
                              <td>:</td>
                              <td>'.$complainttype.'</td>
                          </tr>
                          
                          </table>
                        </div>
                        <br>
                      </p>
                      <p>
                        As the faculty member responsible for handling such matters, we kindly request your attention to this complaint. Our priority is to ensure a swift and fair resolution to address the student\'s concerns.<br/>
                        <br>
                        Thank you for your dedication to our students and their academic experience.
                        <br><br>
                        Sincerely,
                        <br><br>
                          Student Grievence System,<br>
                          KEC.<br>
                        </p>
                      
                      </div>
                    </div>
                    </body>
                </html>'
            ];
            include './../../../Emailcomplaint.php';
            $emailSent1 = sendEmail($emailParams1['to'], $emailParams1['subject'], $emailParams1['message']);
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
