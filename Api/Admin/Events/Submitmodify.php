<?php

include './../../main.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $eventId = isset($data['EventId']) ? $data['EventId'] : '';
    $email = isset($data['email']) ? $data['email'] : '';
    $lastDate = isset($data['lastDate']) ? $data['lastDate'] : '';
    $limit = isset($data['limit']) ? $data['limit'] : '';
    $status = isset($data['status']) ? $data['status'] : '';
    $visibility = isset($data['visibility']) ? $data['visibility'] : '';
    
    $constraint = isset($data['constraint']) ? $data['constraint'] : '';

    if($visibility === 'Public' || $visibility === 'Private'){
        $constraint='';
    }
    if ($eventId === '' || $email === '' || $lastDate === '' || $limit === '' ) {
        echo json_encode(['success' => false, 'message' => 'Please provide eventId, email, lastDate, limit, and status']);
        exit;
    }

    // Check if the lastDate is greater than or equal to today's date
    if ($lastDate >= date('Y-m-d')) {
        // Update status, limit, and intervalTime in the events table
        $updateEventQuery = "UPDATE events SET IntervalTime = '$lastDate', Status = '$status', limits = '$limit' , visible='$visibility',constraints='$constraint' WHERE event_id = '$eventId' AND email = '$email'";
        $updateEventResult = mysqli_query($conn, $updateEventQuery);

        if ($updateEventResult) {
            echo json_encode(['success' => true, 'message' => 'Event updated successfully']);
        } else {
            die('Query failed: ' . mysqli_error($conn));
            echo json_encode(['success' => false, 'message' => 'Server error']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'lastDate is not greater than or equal to today']);
    }
}

mysqli_close($conn);
?>
