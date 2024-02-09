<?php

include './../../main.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $selectedComplaintIds = $_POST['selectedComplaintIds'];

    if (!empty($selectedComplaintIds)) {
        if (!is_array($selectedComplaintIds)) {
            $selectedComplaintIds = [$selectedComplaintIds];
        }

        $placeholders = implode(',', array_fill(0, count($selectedComplaintIds), '?'));
        $query = "DELETE FROM complaints WHERE Complaint_Id IN ($placeholders)";
        $stmt = mysqli_prepare($conn, $query);

        // Bind parameters
        $types = str_repeat('s', count($selectedComplaintIds));
        mysqli_stmt_bind_param($stmt, $types, ...$selectedComplaintIds);

        // Execute the DELETE query
        if (mysqli_stmt_execute($stmt)) {
            echo json_encode(['success' => true, 'message' => 'Rows deleted successfully.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error deleting rows: ' . mysqli_error($conn)]);
        }

        // Close the statement
        mysqli_stmt_close($stmt);
    } else {
        echo json_encode(['success' => false, 'message' => 'No Complaint_Id values provided for deletion.']);
    }
}

// Close the database connection
mysqli_close($conn);
?>
