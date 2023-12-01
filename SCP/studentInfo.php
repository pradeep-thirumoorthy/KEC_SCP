<?php
header("Access-Control-Allow-Origin: *"); // Replace with your React app's URL
header("Access-Control-Allow-Methods: POST");
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

        // Now, use the retrieved data to fetch records from the 'subject' table
        $subjectQuery = "SELECT * FROM subject WHERE Batch = '$batch' AND Class = '$class'";
        $subjectResult = mysqli_query($conn, $subjectQuery);

        if ($subjectResult) {
            $subjectData = [];
            while ($subjectRow = mysqli_fetch_assoc($subjectResult)) {
                $subjectData = $subjectRow;
            }

            // Combine student_info and subject data into a single array
            $responseData = [
                'student_info' => $studentInfoRow,
                'subject_info' => $subjectData
            ];

            echo json_encode($responseData);
        } else {
            echo json_encode(['error' => 'Error querying subject table']);
        }
    } else {
        echo json_encode(['error' => 'Error querying student_info table']);
    }
}

mysqli_close($conn);
?>
