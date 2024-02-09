<?php

include './../../main.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $email = isset($_GET['email']) ? $_GET['email'] : '';
    $Type = isset($_GET['Type']) ? $_GET['Type'] : '';

    if ($email === '') {
        echo json_encode(['error' => 'Email not provided']);
        exit;
    }
    // Query to fetch all columns from the 'student_info' table based on the provided email
    $studentInfoQuery = "SELECT * FROM student_info WHERE Email = '$email'";
    $studentInfoResult = mysqli_query($conn, $studentInfoQuery);

    if ($studentInfoResult && mysqli_num_rows($studentInfoResult) > 0) {
        $studentInfoRow = mysqli_fetch_assoc($studentInfoResult);

        // Extract 'Batch' and 'Class' from 'student_info' if available
        $batch = isset($studentInfoRow['Batch']) ? $studentInfoRow['Batch'] : '';
        $class = isset($studentInfoRow['Class']) ? $studentInfoRow['Class'] : '';

        // Now, use the retrieved data to fetch records from the 'semestersubject' table
        $subjectQuery = "SELECT course_code, advisor_email FROM semestersubject 
                         WHERE semester_id IN (SELECT semester_id FROM Semester WHERE batch = ? AND class = ?) AND Type = ?";
        $subjectStmt = mysqli_prepare($conn, $subjectQuery);

        if ($subjectStmt) {
            mysqli_stmt_bind_param($subjectStmt, "sss", $batch, $class, $Type);
            mysqli_stmt_execute($subjectStmt);
            $subjectResult = mysqli_stmt_get_result($subjectStmt);

            if ($subjectResult) {
                $subjectData = [];
                while ($subjectRow = mysqli_fetch_assoc($subjectResult)) {
                    $subjectData[] = array(
                        'name' => $subjectRow['course_code'],
                        'email' => $subjectRow['advisor_email']
                    );
                }

                // Combine student_info and subject data into a single array
                $responseData = [
                    'student_info' => $studentInfoRow,
                    'subject_info' => $subjectData
                ];

                echo json_encode($responseData);
            } else {
                echo json_encode(['error' => 'Error querying semestersubject table: ' . mysqli_error($conn)]);
            }

            mysqli_stmt_close($subjectStmt);
        } else {
            echo json_encode(['error' => 'Error preparing semestersubject statement: ' . mysqli_error($conn)]);
        }
    } else {
        echo json_encode(['error' => 'Error querying student_info table: ' . mysqli_error($conn)]);
    }
}

mysqli_close($conn);

?>
