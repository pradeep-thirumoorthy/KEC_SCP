<?php

include './../../main.php';


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $email = isset($_GET['email']) ? $_GET['email'] : '';

    if ($email === '') {
        echo json_encode(['error' => 'Email not provided']);
        exit;
    }
    
    $studentInfoQuery = "SELECT * FROM student_info WHERE Email = '$email'";
    $studentInfoResult = mysqli_query($conn, $studentInfoQuery);

    if ($studentInfoResult && mysqli_num_rows($studentInfoResult) > 0) {
        $studentInfoRow = mysqli_fetch_assoc($studentInfoResult);
        $batch = $studentInfoRow['Batch'];
        $class = $studentInfoRow['Class'];
        $Department = $studentInfoRow['Department'];

        // Now, use the retrieved data to fetch records from the 'subject' table
        $subjectQuery = "SELECT * FROM subject WHERE Batch = '$batch' AND Class = '$class' AND Department = '$Department'";
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
