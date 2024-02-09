<?php

include './../main.php';

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