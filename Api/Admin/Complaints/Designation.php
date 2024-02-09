<?php


include './../../main.php';


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['batch'], $_GET['class'], $_GET['department'], $_GET['level'])) {
        $batch = $_GET['batch'];
        $class = $_GET['class'];
        $department = $_GET['department'];
        $level = $_GET['level'];

        $upstreamData = [];
        $downstreamData = [];

        if ($level == 0) {
            $query = "SELECT Advisor1, Advisor2, Advisor3 FROM semester WHERE Batch = ? AND Class = ? AND Department = ?";
            $stmt = mysqli_prepare($conn, $query);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "sss", $batch, $class, $department);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);

                if ($result) {
                    while ($row = $result->fetch_assoc()) {
                        $upstreamData[] = $row; // Add fetched row to upstream data array
                    }
                } else {
                    $upstreamData = []; // No data found for upstream
                }
                mysqli_stmt_close($stmt);
            }
        } 
        elseif ($level == 1) {
            // Determine semester_id based on batch, class, and department
            $semesterQuery = "SELECT semester_id
                              FROM Semester
                              WHERE batch = ? AND class = ? AND department = ?";
                              
            $semesterStmt = mysqli_prepare($conn, $semesterQuery);
        
            if ($semesterStmt) {
                mysqli_stmt_bind_param($semesterStmt, "sss", $batch, $class, $department);
                mysqli_stmt_execute($semesterStmt);
                $semesterResult = mysqli_stmt_get_result($semesterStmt);
        
                if ($semesterResult && $semesterRow = $semesterResult->fetch_assoc()) {
                    $semester_id = $semesterRow['semester_id'];
        
                    // Subquery to fetch course_name
                    $downstreamQuery = "SELECT
                       s.course_code,
                       s.advisor_email
                   FROM semestersubject s
                   WHERE s.semester_id = ?";

        
                    $downstreamStmt = mysqli_prepare($conn, $downstreamQuery);
        
                    if ($downstreamStmt) {
                        mysqli_stmt_bind_param($downstreamStmt, "s", $semester_id);
                        mysqli_stmt_execute($downstreamStmt);
                        
                        $downstreamResult = mysqli_stmt_get_result($downstreamStmt);
        
                        if ($downstreamResult) {
                            $downstreamData = [];
                            while ($row = $downstreamResult->fetch_assoc()) {

                                $downstreamData[] = array(
                                    'name' => $row['course_code'],
                                    'email' => $row['advisor_email']
                                );
                            }
                        } else {
                            $downstreamData = []; // No data found for downstream
                            echo "Error executing downstream query: " . mysqli_error($conn) . "\n";
                        }
        
                        mysqli_stmt_close($downstreamStmt);
                    } else {
                        echo "Error preparing downstream statement: " . mysqli_error($conn) . "\n";
                    }
        
                    // Fetch upstream data
                    $upstreamQuery = "SELECT year_incharge
                                      FROM Semester
                                      WHERE semester_id = ?";
                                      
                    $upstreamStmt = mysqli_prepare($conn, $upstreamQuery);
        
                    if ($upstreamStmt) {
                        mysqli_stmt_bind_param($upstreamStmt, "s", $semester_id);
                        mysqli_stmt_execute($upstreamStmt);
                        $upstreamResult = mysqli_stmt_get_result($upstreamStmt);
        
                        if ($upstreamResult && $upstreamRow = $upstreamResult->fetch_assoc()) {
                            $upstreamData['Year_Incharge'] = $upstreamRow['year_incharge'];
                        } else {
                            $upstreamData = []; // No data found for upstream
                        }
        
                        mysqli_stmt_close($upstreamStmt);
                    } else {
                        echo "Error preparing upstream statement: " . mysqli_error($conn) . "\n";
                    }
                } else {
                    $downstreamData = []; // No data found for downstream
                    $upstreamData = []; // No data found for upstream
                    echo "No Semester ID found for given parameters\n";
                }
        
                mysqli_stmt_close($semesterStmt);
            }
        }
        
        
        
        elseif ($level == 2) {
            $query = "SELECT HOD FROM semester WHERE Batch = ? AND Class = ? AND Department = ?";
            $stmt = mysqli_prepare($conn, $query);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "sss", $batch, $class, $department);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);

                if ($result) {
                    while ($row = $result->fetch_assoc()) {
                        $upstreamData[] = $row; // Add fetched row to upstream data array
                    }
                } else {
                    $upstreamData = []; // No data found for upstream
                }
                mysqli_stmt_close($stmt);
            }
            $query = "SELECT Advisor1, Advisor2, Advisor3 FROM semester WHERE Batch = ? AND Class = ? AND Department = ?";
            $stmt = mysqli_prepare($conn, $query);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "sss", $batch, $class, $department);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);

                if ($result) {
                    while ($row = $result->fetch_assoc()) {
                        $downstreamData[] = $row; // Add fetched row to upstream data array
                    }
                } else {
                    $downstreamData = []; // No data found for upstream
                }
                mysqli_stmt_close($stmt);
            }
        }
        elseif ($level == 3) {
            $query = "SELECT Year_Incharge FROM semester WHERE Batch = ? AND Class = ? AND Department = ?";
            $stmt = mysqli_prepare($conn, $query);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "sss", $batch, $class, $department);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);

                if ($result) {
                    while ($row = $result->fetch_assoc()) {
                        $downstreamData[] = $row;
                    }
                } else {
                    $downstreamData = [];
                }
                mysqli_stmt_close($stmt);
            }
        }
        $response = [
            'success' => true,
            'data' => [
                'Upstream' => $upstreamData,
                'Downstream' => $downstreamData
            ]
        ];
        echo json_encode($response);
    } else {
        echo json_encode(['success' => false, 'message' => 'Required parameters are missing.']);
    }

    mysqli_close($conn);
}
?>
