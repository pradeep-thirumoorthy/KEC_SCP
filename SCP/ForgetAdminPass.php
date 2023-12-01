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
$database = 'sgp';

// Connect to the database
$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

// Endpoint to handle login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = isset($data['email']) ? $data['email'] : '';
    $password = isset($data['password']) ? $data['password'] : '';

    if ($email === '' || $password === '') {
        echo json_encode(['success' => false, 'message' => 'Please enter both email and password']);
        exit;
    }

    // Assuming $conn is your database connection
    
    // Prepare the statement
    $stmt = mysqli_prepare($conn, "UPDATE admin_login SET Password = ? WHERE Email = ?");

    if ($stmt) {
        // Bind parameters to the placeholders
        mysqli_stmt_bind_param($stmt, "ss", $password, $email);
        
        // Execute the statement
        $result = mysqli_stmt_execute($stmt);

        if ($result) {
            echo json_encode(['success' => true, 'email' => $email]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Server error']);
        }
        
        // Close the statement
        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(['success' => false, 'message' => 'Server error']);
    }
}

mysqli_close($conn);
?>