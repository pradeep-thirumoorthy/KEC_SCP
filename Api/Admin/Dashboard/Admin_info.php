<?php

include './../../main.php';

$conn = mysqli_connect($host, $user, $password, $database);
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

// Endpoint to handle admin and subject data retrieval
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = isset($_POST['email']) ? $_POST['email'] : '';

    if ($email === '') {
        echo json_encode(['error' => 'Email not provided']);
        exit;
    }

    // Query to fetch admin data based on the provided email
    $adminQuery = "SELECT * FROM admin_info WHERE Email = '$email'";
    $adminResult = mysqli_query($conn, $adminQuery);
    $adminData = mysqli_fetch_assoc($adminResult);

    if ($adminData) {
        $response = [
            'adminInfo' => $adminData,
        ];

        echo json_encode($response);
    } else {
        echo json_encode(['error' => 'No matching data found']);
    }
}

mysqli_close($conn);
?>
