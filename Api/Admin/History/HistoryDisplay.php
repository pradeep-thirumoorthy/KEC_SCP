<?php


include './../../main.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $startDate = $_GET['start_date'];
    $endDate = $_GET['end_date'];
    $Forward_To=$_GET['email'];
    if (!empty($startDate) || !empty($endDate)) {
    
        if (empty($startDate)) {
            $query = "SELECT Complaint_Id, Roll_No, Type, info1, Status FROM complaints WHERE info1 <= ? AND Forward_To = ? AND (Status='Rejected' OR Status='Resolved')";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "ss", $endDate, $Forward_To);
        }
        elseif (empty($endDate)) {
            $query = "SELECT Complaint_Id, Roll_No, Type, info1, Status FROM complaints WHERE info1 >= ? AND Forward_To = ?  AND (Status='Rejected' OR Status='Resolved')";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "ss", $startDate, $Forward_To);
        }
        else {
            $query = "SELECT Complaint_Id, Roll_No, Type, info1, Status FROM complaints WHERE info1 BETWEEN ? AND ? AND Forward_To = ? AND (Status='Rejected' OR Status='Resolved')";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "sss", $startDate, $endDate, $Forward_To);
        }
    }
    else{
        $query = "SELECT Complaint_Id, Roll_No, Type, info1, Status FROM complaints WHERE Forward_To = ?  AND (Status='Rejected' OR Status='Resolved')";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "s", $Forward_To);
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
