<?php

include './../../main.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $email = isset($_GET['email']) ? $_GET['email'] : ''; // Retrieve email from GET request

    // Use prepared statements to prevent SQL injection
    $query = "SELECT Name, Roll_No, Department, Class,Batch,Gender FROM student_info WHERE Email = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, 's', $email);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (!$result) {
        die("Database query failed: " . mysqli_error($conn)); // Handle query failure
    }

    $data = array(); // Initialize an array to store fetched data

    while ($row = mysqli_fetch_assoc($result)) {
        $data[] = $row; // Store each row in the array
    }

    // Convert data to JSON format and send it to the frontend
    echo json_encode($data);

    // Close the prepared statement and the database connection
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}
?>
