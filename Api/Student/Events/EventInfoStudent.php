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
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");







// Disable caching for the login response

// Replace these credentials with your actual database credentials


// Connect to the database
$conn = mysqli_connect($host, $user, $password, $database);
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

// ... (previous code remains the same)

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $email = isset($_GET['email']) ? $_GET['email'] : '';

    if ($email === '') {
        echo json_encode(['success' => false, 'message' => 'Please provide email']);
        exit;
    }

    $email = mysqli_real_escape_string($conn, $email); // Sanitize input

    $publicEventQuery = "SELECT Limits,Title,event_id,IntervalTime,Status,Date FROM events WHERE Email = '$email' AND visible='Public'";
    $publicEventResult = mysqli_query($conn, $publicEventQuery);

    $conditionalEventQuery = "SELECT Limits,Title,event_id,IntervalTime,Status,Date FROM events WHERE Email = '$email' AND visible='constraint'";
    $conditionalEventResult = mysqli_query($conn, $conditionalEventQuery);

    if ($publicEventResult && $conditionalEventResult) {
        $publicEventData = array();
        $conditionalEventData = array();

        while ($row = mysqli_fetch_assoc($publicEventResult)) {
            $publicEventData[] = $row;
        }

        while ($row = mysqli_fetch_assoc($conditionalEventResult)) {
            $conditionalEventData[] = $row;
        }

        $combinedData = [
            'PublicEvents' => $publicEventData,
            'ConditionalEvents' => $conditionalEventData
        ];

        echo json_encode(['success' => true, 'data' => $combinedData]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Server error: ' . mysqli_error($conn)]);
    }
}

mysqli_close($conn);

?>
