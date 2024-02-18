<?php

include './../../main.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $email = isset($_GET['email']) ? $_GET['email'] : '';
    $Type = isset($_GET['Type']) ? $_GET['Type'] : '';

    if ($email === '') {
        echo json_encode(['error' => 'Email not provided']);
        exit;
    }
    $electiveData=[];
    // Query to fetch all columns from the 'student_info' table based on the provided email
    $studentInfoQuery = "SELECT * FROM student_info WHERE Email = '$email'";
    $studentInfoResult = mysqli_query($conn, $studentInfoQuery);

    if ($studentInfoResult && mysqli_num_rows($studentInfoResult) > 0) {
        $studentInfoRow = mysqli_fetch_assoc($studentInfoResult);

        // Extract 'Batch' and 'Class' from 'student_info' if available
        $batch = isset($studentInfoRow['Batch']) ? $studentInfoRow['Batch'] : '';
        $class = isset($studentInfoRow['Class']) ? $studentInfoRow['Class'] : '';
        $department = isset($studentInfoRow['Department']) ? $studentInfoRow['Department'] : '';

        // Fetch both elective and regular courses when the Type is 'Courses'
        if ($Type === 'Courses') {
            // Fetch elective courses from the 'semestersubject' table
            $electives = rtrim($studentInfoRow['Electives'], ','); // Remove trailing comma
            $electiveValues = explode(',', $electives);
            $electivePlaceholders = str_repeat('?,', count($electiveValues) - 1) . '?';

            $electiveQuery = "SELECT course_code, course_name, advisor_email 
                              FROM semestersubject 
                              WHERE semester_id IN (
                                  SELECT semester_id 
                                  FROM Semester 
                                  WHERE batch = ? AND class = ? AND department = ?
                              ) 
                              AND FIND_IN_SET(course_code, ?)";
            $electiveStmt = mysqli_prepare($conn, $electiveQuery);

            if ($electiveStmt) {
                mysqli_stmt_bind_param($electiveStmt, 'ssss', $batch, $class, $department, $electives);
                mysqli_stmt_execute($electiveStmt);
                $electiveResult = mysqli_stmt_get_result($electiveStmt);

                if ($electiveResult) {
                    $electiveData = [];
                    while ($electiveRow = mysqli_fetch_assoc($electiveResult)) {
                        $electiveData[] = array(
                            'name' => $electiveRow['course_code'] . "-" . $electiveRow['course_name'],
                            'email' => $electiveRow['advisor_email']
                        );
                    }
                } else {
                    echo json_encode(['error' => 'Error querying semestersubject table for courses: ' . mysqli_error($conn)]);
                }

                mysqli_stmt_close($electiveStmt);
            } else {
                echo json_encode(['error' => 'Error preparing elective statement: ' . mysqli_error($conn)]);
            }
        }
            // Fetch regular courses based on batch, class, and department
            $subjectQuery = "SELECT course_code, course_name, advisor_email 
                             FROM semestersubject 
                             WHERE semester_id IN (
                                  SELECT semester_id 
                                  FROM Semester 
                                  WHERE batch = ? AND class = ? AND department = ?
                              ) 
                             AND Type = ?";
            $subjectStmt = mysqli_prepare($conn, $subjectQuery);

            if ($subjectStmt) {
                mysqli_stmt_bind_param($subjectStmt, "ssss", $batch, $class, $department, $Type);
                mysqli_stmt_execute($subjectStmt);
                $subjectResult = mysqli_stmt_get_result($subjectStmt);

                if ($subjectResult) {
                    $subjectData = [];
                    while ($subjectRow = mysqli_fetch_assoc($subjectResult)) {
                        $subjectData[] = array(
                            'name' => $subjectRow['course_code'] . "-" . $subjectRow['course_name'],
                            'email' => $subjectRow['advisor_email']
                        );
                    }

                    // Combine student_info and subject data into a single array
                    $responseData = [
                        'student_info' => $studentInfoRow,
                        'subject_info' => $subjectData,
                        'electives'=> $electiveData,
                    ];

                    echo json_encode($responseData);
                } else {
                    echo json_encode(['error' => 'Error querying semestersubject table for courses: ' . mysqli_error($conn)]);
                }

                mysqli_stmt_close($subjectStmt);
            } else {
                echo json_encode(['error' => 'Error preparing semestersubject statement: ' . mysqli_error($conn)]);
            }
        }
    } else {
        echo json_encode(['error' => 'Error querying student_info table: ' . mysqli_error($conn)]);
    }

mysqli_close($conn);

?>
