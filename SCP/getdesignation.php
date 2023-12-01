<?php
// Allow cross-origin requests from your React app
header("Access-Control-Allow-Origin: http://localhost:3000"); // Replace with your React app's URL
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

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

// Endpoint to handle fetching names based on designation
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['designation'])) {
        $designation = $_GET['designation'];

        // Query the database to fetch names based on the designation
        $query = "SELECT Name,Email FROM admin_info WHERE Designation = ?";
        $stmt = mysqli_prepare($conn, $query);

        if (!$stmt) {
            echo json_encode(['success' => false, 'message' => 'Database error: ' . mysqli_error($conn)]);
        } else {
            mysqli_stmt_bind_param($stmt, "s", $designation);
            mysqli_stmt_execute($stmt);
            $result = mysqli_stmt_get_result($stmt);

            if ($result) {
                $data = array();
                while ($row = $result->fetch_assoc()) {
                    $data[] = ['name' => $row['Name'], 'email' => $row['Email']];
                }
                echo json_encode(['success' => true, 'data' => $data]);
            } else {
                echo json_encode(['success' => false, 'message' => 'No data found for this designation.']);
            }

            // Close the statement
            mysqli_stmt_close($stmt);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Designation parameter is missing.']);
    }

    // Close the database connection
    mysqli_close($conn);
}
?>
