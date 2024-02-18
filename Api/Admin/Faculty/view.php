<?php


include './../../main.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $email = $_GET['email'];
    $startDate = $_GET['start_date'];
    $endDate = $_GET['end_date'];
    $designationQuery = "SELECT COUNT(*) as count FROM admin_info WHERE Email = ? AND Designation = 'Professor,Head'";
    $designationStmt = mysqli_prepare($conn, $designationQuery);
    mysqli_stmt_bind_param($designationStmt, "s", $email);
    mysqli_stmt_execute($designationStmt);
    $designationResult = mysqli_stmt_get_result($designationStmt);

    if ($designationResult) {
        $designationData = mysqli_fetch_assoc($designationResult);
        $isHOD = ($designationData['count'] > 0);
    }

    // Close the designation statement
    mysqli_stmt_close($designationStmt);

    if ($isHOD === true) {
        $subjectQuery = "SELECT Department FROM semester WHERE HOD = ?";
        $subjectStmt = mysqli_prepare($conn, $subjectQuery);
        mysqli_stmt_bind_param($subjectStmt, "s", $email);
        mysqli_stmt_execute($subjectStmt);
        $subjectResult = mysqli_stmt_get_result($subjectStmt);

        if ($subjectResult) {
            $subjectData = mysqli_fetch_assoc($subjectResult);

            $query = "SELECT * FROM faculty_complaints WHERE Department = ? ";
            $paramTypes = "s";
            $paramArray = array($subjectData['Department']);
            $paramCount = 1; // Initial number of parameters

            if (!empty($startDate) && !empty($endDate)) {
                $query .= " AND info1 BETWEEN ? AND ?";
                $paramTypes .= "ss";
                $paramArray[] = $startDate;
                $paramArray[] = $endDate;
                $paramCount += 2; // Increase parameter count for the additional date parameters
            }

            $stmt = mysqli_prepare($conn, $query);
            if ($stmt) {
                $bindParams = array_merge([$stmt, $paramTypes], $paramArray);
                call_user_func_array('mysqli_stmt_bind_param', refValues($bindParams));

                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);

                if ($result) {
                    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
                    echo json_encode(['success' => true, 'data' => $data]);
                } else {
                    echo json_encode(['success' => false, 'message' => 'No data found']);
                }

                // Close statement for faculty_complaints
                mysqli_stmt_close($stmt);
            } else {
                echo json_encode(['success' => false, 'message' => 'Query preparation failed']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'No matching data in the subject table']);
        }

        // Close the subject statement and connection
        mysqli_stmt_close($subjectStmt);
    } else {
        $subjectQuery = "SELECT Batch, Department FROM semester WHERE Year_Incharge = ?";
        $subjectStmt = mysqli_prepare($conn, $subjectQuery);
        mysqli_stmt_bind_param($subjectStmt, "s", $email);
        mysqli_stmt_execute($subjectStmt);
        $subjectResult = mysqli_stmt_get_result($subjectStmt);

        if ($subjectResult) {
            $subjectData = mysqli_fetch_assoc($subjectResult);

            $query = "SELECT * FROM faculty_complaints WHERE Batch = ? AND Department = ? AND Status='Arrived'";
            $paramTypes = "ss";
            $paramArray = array($subjectData['Batch'], $subjectData['Department']);

            if (!empty($startDate) && !empty($endDate)) {
                $query .= " AND info1 BETWEEN ? AND ?";
                $paramTypes .= "ss";
                $paramArray[] = $startDate;
                $paramArray[] = $endDate;
            }

            $stmt = mysqli_prepare($conn, $query);
            if ($stmt) {
                $bindParams[] = &$stmt;
                $bindParams[] = &$paramTypes;
                foreach ($paramArray as $key => $value) {
                    $bindParams[$key + 2] = &$paramArray[$key];
                }
                call_user_func_array('mysqli_stmt_bind_param', $bindParams);

                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);

                if ($result) {
                    $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
                    echo json_encode(['success' => true, 'data' => $data]);
                } else {
                    echo json_encode(['success' => false, 'message' => 'No data found']);
                }

                // Close statement for faculty_complaints
                mysqli_stmt_close($stmt);
            } else {
                echo json_encode(['success' => false, 'message' => 'Query preparation failed']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'No matching data in the subject table']);
        }

        // Close the subject statement and connection
        mysqli_stmt_close($subjectStmt);
    }
    mysqli_close($conn);
}

// Function to create references to array elements for binding parameters
function refValues($arr) {
    $refs = array();
    foreach ($arr as $key => $value) {
        $refs[$key] = &$arr[$key];
    }
    return $refs;
}
?>
