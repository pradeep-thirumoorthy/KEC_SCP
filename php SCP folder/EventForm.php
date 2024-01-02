<?php
header("Access-Control-Allow-Origin: http://192.168.77.250:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Expires: 0");

$host = '192.168.77.250';
$user = 'root';
$password = '';
$database = 'sgp';

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?$_POST['email']: '';
    $limit = $_POST['limit'] ?$_POST['limit']: 1;
    $formdata = $_POST['formdata'] ?$_POST['formdata']: '';
    $lastDate = $_POST['lastDate'] ?$_POST['lastDate']: '';
    $title = $_POST['title'] ?$_POST['title']: '';

    if ($email === '' || $formdata === '' || $title === '' || $lastDate === '') {
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
            $query = "INSERT INTO events (event_id, Email, Limits, Formdata, IntervalTime, Title, Date) VALUES (?, ?, ?, ?, ?, ?, NOW())";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "ssisss", $event_id, $email, $limit, $formdata, $lastDate, $title);

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
