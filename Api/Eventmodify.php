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
header("Access-Control-Allow-Methods: GET"); // Change to GET
header("Access-Control-Allow-Headers: Content-Type");

// Disable caching for the response

// Replace these credentials with your actual database credentials


// Connect to the database




// Disable caching for the login response

// Replace these credentials with your actual database credentials


// Connect to the database
$conn = mysqli_connect($host, $user, $password, $database);
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

// Endpoint to handle retrieving events_response
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $eventid = isset($_GET['EventId']) ? $_GET['EventId'] : '';
    $email = isset($_GET['email']) ? $_GET['email'] : '';

    // Create a prepared statement to check the availability of the code
    $selectQuery = "SELECT * FROM events WHERE event_id = ? AND email = ?";
    $stmt = mysqli_prepare($conn, $selectQuery);

    // Bind parameters
    mysqli_stmt_bind_param($stmt, "ss", $eventid, $email);

    // Execute the prepared statement
    mysqli_stmt_execute($stmt);

    // Get the result
    $result = mysqli_stmt_get_result($stmt);

    // Check if there is a result
    if ($row = mysqli_fetch_assoc($result)) {
        // Return the data
        echo json_encode($row);
    } else {
        // EventId and email combination does not exist in the events table
        echo json_encode(['success' => false, 'message' => 'EventId and email not found in the events table']);
    }

    // Close the prepared statement
    mysqli_stmt_close($stmt);
}

mysqli_close($conn);
?>
