<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Replace with your React app's URL
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'sgp';
// Disable caching for the login response
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Expires: 0");
header("Access-Control-Allow-Origin: http://localhost:3000"); // Replace with your React app's URL
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Replace these credentials with your actual database credentials


// Connect to the database




// Disable caching for the login response

// Replace these credentials with your actual database credentials


// Connect to the database
$conn = mysqli_connect($host, $user, $password, $database);
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

// Endpoint to check if the email is present in HOD or Year_Incharge
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
