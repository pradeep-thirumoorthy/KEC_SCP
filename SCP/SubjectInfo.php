<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Replace with your React app's URL
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Replace these credentials with your actual database credentials
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'sgp';

// Connect to the database
$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

// Endpoint to handle fetching data with optional info1 filter
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $startDate = $_GET['start_date'];
    $endDate = $_GET['end_date'];
    $email = $_GET['email'];
    
    // Retrieve the Roll based on the provided email
    $queryGetRoll = "SELECT Roll FROM admin_info WHERE Email = ?";
    $stmtGetRoll = mysqli_prepare($conn, $queryGetRoll);
    mysqli_stmt_bind_param($stmtGetRoll, "s", $email);
    mysqli_stmt_execute($stmtGetRoll);
    $resultGetRoll = mysqli_stmt_get_result($stmtGetRoll);
    
    // Check if the Roll exists
    if ($row = mysqli_fetch_assoc($resultGetRoll)) {
        $roll = $row['Roll'];
    } else {
        // Handle the case where the email doesn't exist
        echo json_encode(['success' => false, 'message' => 'Email not found']);
        mysqli_close($conn);
        exit;
    }

    if (!empty($startDate) || !empty($endDate)) {
        if (empty($startDate)) {
            $query = "SELECT * FROM complaints WHERE info1 <= ? AND Batch = ? AND (Status = 'Arrived' OR Status = 'Accepted') AND Type='Courses'";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "ss", $endDate, $roll);
        } elseif (empty($endDate)) {
            $query = "SELECT * FROM complaints WHERE info1 >= ? AND Batch = ? AND (Status = 'Arrived' OR Status = 'Accepted') AND Type='Courses' ";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "ss", $startDate, $roll);
        } else {
            $query = "SELECT * FROM complaints WHERE info1 BETWEEN ? AND ? AND Batch = ? AND (Status = 'Arrived' OR Status = 'Accepted') AND Type='Courses'";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "sss", $startDate, $endDate, $roll);
        }
    } else {
        $query = "SELECT * FROM complaints WHERE Batch = ? AND (Status = 'Arrived' OR Status = 'Accepted') AND Type='Courses'";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "s", $roll);
    }

    // Execute the query
    if (isset($stmt)) {
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
    } else {
        $result = mysqli_query($conn, $query);
    }

    if ($result) {
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode(['success' => true, 'data' => $data]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Server error']);
    }

    // Close the statement if it was prepared
    if (isset($stmt)) {
        mysqli_stmt_close($stmt);
    }
}

// Close the database connection
mysqli_close($conn);
?>
