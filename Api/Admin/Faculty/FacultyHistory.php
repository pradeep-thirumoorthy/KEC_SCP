<?php



include './../../main.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $startDate = $_GET['start_date'];
    $endDate = $_GET['end_date'];
    $Handler=$_GET['email'];
    if (!empty($startDate) || !empty($endDate)) {
    
        if (empty($startDate)) {
            $query = "SELECT * FROM faculty_complaints WHERE info1 <= ? AND Handler = ? AND (Status='Rejected' OR Status='Resolved')";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "ss", $endDate, $Handler);
        }
        elseif (empty($endDate)) {
            $query = "SELECT * FROM faculty_complaints WHERE info1 >= ? AND Handler = ?  AND (Status='Rejected' OR Status='Resolved')";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "ss", $startDate, $Handler);
        }
        else {
            $query = "SELECT * FROM faculty_complaints WHERE info1 BETWEEN ? AND ? AND Handler = ? AND (Status='Rejected' OR Status='Resolved')";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "sss", $startDate, $endDate, $Handler);
        }
    }
    else{
        $query = "SELECT * FROM faculty_complaints WHERE Handler = ?  AND (Status='Rejected' OR Status='Resolved')";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "s", $Handler);
    }


    // Execute the query
    if (isset($stmt)) {
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
    } else {
        $result = mysqli_query($conn, $query);
    }

    if ($result) {
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode(['success' => true, 'data' => $data]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Server error']);
    }

    // Close the statement if it was prepared
    if (isset($stmt)) {
        mysqli_stmt_close($stmt);
    }
}

// Close the database connection
mysqli_close($conn);
?>
