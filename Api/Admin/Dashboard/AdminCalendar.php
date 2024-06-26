<?php

include './../../main.php';

$user = 'root';
$password = '';
$database = 'sgp';
// Disable caching for the login response

// Replace these credentials with your actual database credentials


// Connect to the database
$conn = mysqli_connect($host, $user, $password, $database);
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

// Endpoint to handle fetching data with optional info1 filter
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $email=$_GET['email'];
    if (!empty($startDate) || !empty($endDate)) {
    
        if (empty($startDate)) {
            $query = "SELECT * FROM complaints WHERE info1 <= ? AND Forward_To = ? ";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "ss", $endDate, $email);
        }
        elseif (empty($endDate)) {
            $query = "SELECT * FROM complaints WHERE info1 >= ? AND Forward_To = ?  ";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "ss", $startDate, $email);
        }
        else {
            $query = "SELECT * FROM complaints WHERE info1 BETWEEN ? AND ? AND Forward_To = ? ";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "sss", $startDate, $endDate, $email);
        }
    }
    else{
        $query = "SELECT * FROM complaints WHERE Forward_TO = ?  ";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "s", $email);
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
