<?php
header("Access-Control-Allow-Origin: http://192.168.157.250:3000"); // Replace with your React app's URL
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Replace these credentials with your actual database credentials
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'admin';

// Connect to the database
$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

// Endpoint to handle fetching complaints by both type and status
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $email = $_GET['email'];

    // Define the predefined types and statuses
    $types = ['Academic', 'Courses', 'Lab', 'Others', 'Maintenance'];
    $statuses = ['Arrived', 'Rejected', 'Resolved', 'Accepted'];

    $data = array();

    foreach ($types as $type) {
        $typeData = array('Type' => $type);

        foreach ($statuses as $status) {
            $query = "SELECT COUNT(*) AS Count FROM complaints WHERE Forward_To = ? AND Status = ? AND Type = ?";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "sss", $email, $status, $type);

            // Execute the query
            if (mysqli_stmt_execute($stmt)) {
                $result = mysqli_stmt_get_result($stmt);
                $row = mysqli_fetch_assoc($result);
                $count = $row['Count'];
            } else {
                $count = 0;
            }

            $typeData[$status] = $count;

            // Close the statement
            mysqli_stmt_close($stmt);
        }

        $data[] = $typeData;
    }

    $facultyData = array('Type' => 'Faculty');

    foreach ($statuses as $status) {
        $query = "SELECT COUNT(*) AS Count FROM faculty_complaints WHERE Forward_To = ? AND Status = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ss", $email, $status);

        // Execute the query
        if (mysqli_stmt_execute($stmt)) {
            $result = mysqli_stmt_get_result($stmt);
            $row = mysqli_fetch_assoc($result);
            $count = $row['Count'];
        } else {
            $count = 0;
        }

        $facultyData[$status] = $count;

        // Close the statement
        mysqli_stmt_close($stmt);
    }

    $data[] = $facultyData;

    echo json_encode(['success' => true, 'data' => array_values($data)]);
}
// Close the database connection
mysqli_close($conn);
?>
