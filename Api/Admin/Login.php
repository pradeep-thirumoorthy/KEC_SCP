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

    $query = "SELECT * FROM admin_login WHERE Email = '$email' AND Password = '$password'";
    $result = mysqli_query($conn, $query);

    if (!$result) {
        die('Query failed: ' . mysqli_error($conn));
        echo json_encode(['success' => false, 'message' => 'Server error']);
    } else {

        if (mysqli_num_rows($result) === 1) {
            echo json_encode(['success' => true, 'message' => 'Login successful']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
        }
    }
}

mysqli_close($conn);
?>
