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
header("Access-Control-Allow-Origin: *"); // Replace with your React app's URL
header("Access-Control-Allow-Methods: POST");
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

// Endpoint to handle admin info retrieval
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = isset($_POST['email']) ? $_POST['email'] : '';

    if ($email === '') {
        echo json_encode(['error' => 'Email not provided']);
        exit;
    }

    // Query to fetch all columns from the 'student_info' table based on the provided email
    $studentInfoQuery = "SELECT * FROM student_info WHERE Email = '$email'";
    $studentInfoResult = mysqli_query($conn, $studentInfoQuery);

    if ($studentInfoResult && mysqli_num_rows($studentInfoResult) > 0) {
        $studentInfoRow = mysqli_fetch_assoc($studentInfoResult);
        $batch = $studentInfoRow['Batch'];
        $class = $studentInfoRow['Class'];

            $responseData = [
                'student_info' => $studentInfoRow,
            ];

            echo json_encode($responseData);
        } else {
            echo json_encode(['error' => 'Error querying subject table']);
        }
    } else {
        echo json_encode(['error' => 'Error querying student_info table']);
    }

mysqli_close($conn);
?>
