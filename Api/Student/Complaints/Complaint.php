<?php

include './../../main.php';


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $email = $_GET['email'];

    // Define the predefined types and statuses
    $types = ['Academic', 'Courses', 'Lab', 'Others', 'Maintenance'];
    $statuses = ['Arrived', 'Rejected', 'Resolved', 'Accepted'];

    $data = array();

    foreach ($types as $type) {
        $typeData = array('Type' => $type);

        foreach ($statuses as $status) {
            $query = "SELECT COUNT(*) AS Count FROM complaints WHERE Email = ? AND Status = ? AND Type = ?";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "sss", $email, $status, $type);

            // Execute the query
            if (mysqli_stmt_execute($stmt)) {
                $result = mysqli_stmt_get_result($stmt);
                $row = mysqli_fetch_assoc($result);
                $count = $row['Count'];
            } else {
                $count = 0;
            }

            $typeData[$status] = $count;

            // Close the statement
            mysqli_stmt_close($stmt);
        }

        $data[] = $typeData;
    }

    $query = "SELECT COUNT(*) AS email_count FROM semester WHERE HOD = ? OR Year_Incharge = ?";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "ss", $email, $email);

    // Execute the query
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($result) {
        $row = mysqli_fetch_assoc($result);
        $emailCount = $row['email_count'];

        if ($emailCount > 0) {
            $facultyData = array('Type' => 'Faculty');

    foreach ($statuses as $status) {
        $query = "SELECT COUNT(*) AS Count FROM faculty_complaints WHERE Email = ? AND Status = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ss", $email, $status);

        // Execute the query
        if (mysqli_stmt_execute($stmt)) {
            $result = mysqli_stmt_get_result($stmt);
            $row = mysqli_fetch_assoc($result);
            $count = $row['Count'];
        } else {
            $count = 0;
        }

        $facultyData[$status] = $count;

        // Close the statement
        mysqli_stmt_close($stmt);
    }

    $data[] = $facultyData;

        }
    }
    
    echo json_encode(['success' => true, 'data' => array_values($data)]);
}
// Close the database connection
mysqli_close($conn);
?>
