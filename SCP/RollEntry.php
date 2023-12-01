<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Replace with your React app's URL
header("Access-Control-Allow-Methods: POST");
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

// Endpoint to update the Roll in admin_info based on email
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $email = isset($data['email']) ? $data['email'] : '';
    $roll = isset($data['Roll']) ? $data['Roll'] : '';

    if ($email === '') {
        echo json_encode(['error' => 'Email not provided']);
        exit;
    }

    if ($roll === '') {
        echo json_encode(['error' => 'Roll not provided']);
        exit;
    }

    // Query to update the Roll in admin_info based on email
    $query = "UPDATE admin_info SET Roll = '$roll' WHERE Email = '$email'";
    $result = mysqli_query($conn, $query);

    if ($result) {
        echo json_encode(['response' => true]);
    } else {
        echo json_encode(['response' => false]);
    }
}

mysqli_close($conn);
?>
