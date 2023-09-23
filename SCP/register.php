<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Replace with your React app's URL
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Disable caching for the login response
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Expires: 0");

// Replace these credentials with your actual database credentials
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'admin';

// Connect to the database
$conn = mysqli_connect($host, $user, $password, $database);
date_default_timezone_set('Asia/Kolkata');
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

// Endpoint to handle complaint submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Extract data from the JSON request
    $name = isset($data['name']) ? $data['name'] : '';
    $rollno = isset($data['rollno']) ? $data['rollno'] : '';
    $email = isset($data['email']) ? $data['email'] : '';
    $contactno = isset($data['contactno']) ? $data['contactno'] : '';
    $complainttype = isset($data['complainttype']) ? $data['complainttype'] : '';
    $description = isset($data['description']) ? $data['description'] : '';
    $department = isset($data['department']) ? $data['department'] : '';
    $Class = isset($data['Class']) ? $data['Class'] : '';

    // Generate a unique 16-digit complaint ID
    do {
        $complaintid = bin2hex(random_bytes(8)); // Generates a random 16-character hexadecimal string
    
        $unique_query = "SELECT Complaint_Id FROM complaints WHERE Complaint_Id = '$complaintid'";
        $result = mysqli_query($conn, $unique_query);
        if (mysqli_num_rows($result) === 0) {
            break;
        }
    } while (mysqli_num_rows($result) > 0);

    if ($name === '' || $rollno === '' || $email === '' || $contactno === '' || $complainttype === '' || $description === '' || $department === '') {
        echo json_encode(['success' => false, 'message' => 'Please fill in all required fields']);
        exit;
    }

    $currentDate = date('Y-m-d');
    $currentTime = date('H:i:s');

    // Assuming $conn is your database connection
    $query = "INSERT INTO complaints (Complaint_Id, Type, Description, Roll_No, email, Department, Date, Status, Forward_To, `Forward List`, Logs, Name, contactno,Class)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)";

    // Prepare the statement
    $stmt = mysqli_prepare($conn, $query);
    $complaintid=strval($complaintid);
    if ($stmt) {
        $defaultStatus = 'Arrived';
        $defaultForwardTo = '';
        $defaultForwardList = '[]';
        $defaultLogs = '';

        // Bind parameters to the placeholders
        mysqli_stmt_bind_param($stmt, "ssssssssssssis", $complaintid, $complainttype, $description, $rollno, $email, $department, $currentDate, $defaultStatus, $defaultForwardTo, $defaultForwardList, $defaultLogs, $name, $contactno,$Class);

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
