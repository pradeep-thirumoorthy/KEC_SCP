<?php
include './main.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $email = $_GET['email'];

    // Query to check if the email exists in HOD or Year_Incharge columns
    $query = "SELECT COUNT(*) AS email_count FROM subject WHERE HOD = ? OR Year_Incharge = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "ss", $email, $email);

    // Execute the query
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($result) {
        $row = mysqli_fetch_assoc($result);
        $emailCount = $row['email_count'];

        if ($emailCount > 0) {
            echo json_encode(['present' => true]);
        } else {
            echo json_encode(['present' => false]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Server error']);
    }

    // Close the statement
    mysqli_stmt_close($stmt);
}

// Close the database connection
mysqli_close($conn);
?>
