<?php
header("Access-Control-Allow-Origin: http://192.168.157.250:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Expires: 0");

$host = 'localhost';
$user = 'root';
$password = '';
$database = 'admin';

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = isset($data['email']) ? $data['email'] : '';
    $limit = isset($data['limit']) ? intval($data['limit']) : 1;
    $formdata = isset($data['formdata']) ? $data['formdata'] : '';
    
    $lastDate = isset($data['lastDate']) ? $data['lastDate'] : '';
    $option = isset($data['option']) ? $data['option'] : '';
    
    $title = isset($data['title']) ? $data['title'] : '';
    if($option==="create")
    {
        if ($email === '' || $formdata === '' || $title === '' || $lastDate === '') {
            echo json_encode(['success' => false, 'message' => 'Please provide all required data']);
            exit;
        }
        if ($lastDate >= date('Y-m-d')) {
        do {
            $event_id = bin2hex(random_bytes(16));
            $query_check_id = "SELECT COUNT(*) FROM events WHERE event_id = ?";
            $stmt_check_id = mysqli_prepare($conn, $query_check_id);
            mysqli_stmt_bind_param($stmt_check_id, "s", $event_id);
            mysqli_stmt_execute($stmt_check_id);
            mysqli_stmt_bind_result($stmt_check_id, $count);
            mysqli_stmt_fetch($stmt_check_id);
            mysqli_stmt_close($stmt_check_id);
        } while ($count > 0);


        $query_check_duplicate = "SELECT COUNT(*) FROM events WHERE Title = ? AND Email = ?";
        $stmt_check_duplicate = mysqli_prepare($conn, $query_check_duplicate);
        mysqli_stmt_bind_param($stmt_check_duplicate, "ss", $title, $email);
        mysqli_stmt_execute($stmt_check_duplicate);
        mysqli_stmt_bind_result($stmt_check_duplicate, $duplicate_count);
        mysqli_stmt_fetch($stmt_check_duplicate);
        mysqli_stmt_close($stmt_check_duplicate);
        if ($duplicate_count > 0) {
            echo json_encode(['success' => false, 'message' => 'An event with the same title and email already exists']);
            exit;
        }


        
        $query = "INSERT INTO events (event_id, Email, Limits, Formdata, IntervalTime, Title, Date) VALUES (?, ?, ?, ?, ?, ?, NOW())";

        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ssisss", $event_id, $email, $limit, $formdata, $lastDate,$title);
        if (mysqli_stmt_execute($stmt)) {
            echo json_encode(['success' => true, 'message' => 'Event data inserted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Server error: ' . mysqli_error($conn)]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'lastDate is not greater than or equal to today']);
    }
    }
}


mysqli_close($conn);
?>
