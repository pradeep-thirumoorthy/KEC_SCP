<?php

include './../../main.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?$_POST['email']: '';
    $limit = $_POST['limit'] ?$_POST['limit']: 1;
    $formdata = $_POST['formdata'] ?$_POST['formdata']: '';
    $lastDate = $_POST['lastDate'] ?$_POST['lastDate']: '';
    $constraint = $_POST['constraint'] ?$_POST['constraint']: '';
    $visibility = $_POST['visibility'] ?$_POST['visibility']: '';
    $title = isset($_POST['title']) ? $_POST['title'] : '';
    

    if ($email === '' || $formdata === '' || $title === '' || $lastDate === ''||$visibility === '' ||$constraint=== '') {
        echo json_encode(['success' => false, 'message' => 'Please provide all required data']);
        exit;
    }

    if ($lastDate < date('Y-m-d')) {
        echo json_encode(['success' => false, 'message' => 'lastDate should be greater than or equal to today']);
        exit;
    }

    // File upload
    if (isset($_FILES['pfile'])) {
        $event_id = bin2hex(random_bytes(16));
        $pfile_name = $event_id . '.png';
        $pfile_temp = $_FILES['pfile']['tmp_name'];
        $destination = 'C:\xampp\php\SCP\Upload\\' . $pfile_name;
        
        if (move_uploaded_file($pfile_temp, $destination)) {
            // Proceed with event insertion
            $query = "INSERT INTO events (event_id, Email, Limits, Formdata, IntervalTime, Title, Date,visible,constraints) VALUES (?, ?, ?, ?, ?, ?, NOW(),?,?)";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "ssisssss", $event_id, $email, $limit, $formdata, $lastDate, $title, $visibility,$constraint);

            if (mysqli_stmt_execute($stmt)) {
                echo json_encode(['success' => true, 'message' => 'Event data inserted successfully']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Error inserting event data: ' . mysqli_error($conn)]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to move file to destination']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No file uploaded']);
        exit;
    }
}

mysqli_close($conn);
?>
