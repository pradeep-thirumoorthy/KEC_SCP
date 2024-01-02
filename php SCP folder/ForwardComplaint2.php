<?php
header("Access-Control-Allow-Origin: http://192.168.77.250:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'sgp';
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Expires: 0");

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $Complaint_Id = isset($data['Complaint_Id']) ? $data['Complaint_Id'] : '';
    $mode = isset($data['mode']) ? $data['mode'] : '';
    $Faculty = isset($data['Faculty']) ? $data['Faculty'] : '';

    if ($Complaint_Id === '') {
        echo json_encode(['success' => false, 'message' => 'Please enter Complaint_Id']);
        exit;
    }

    if ($mode === 'Resolved') {
        $status = 'Resolved';
        $stmt_update_status = mysqli_prepare($conn, "UPDATE faculty_complaints SET Status=? WHERE Complaint_Id = ?");
        mysqli_stmt_bind_param($stmt_update_status, "ss", $status, $Complaint_Id);
        $result = mysqli_stmt_execute($stmt_update_status);

        if ($result) {
            echo json_encode(['success' => true, 'message' => $Complaint_Id]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Server error']);
        }

        mysqli_stmt_close($stmt_update_status);
    } elseif ($mode === 'Accept' || $mode === 'Reject') {
        if ($Faculty === '') {
            echo json_encode(['success' => false, 'message' => 'Please enter Faculty']);
            exit;
        }

        $status = ($mode === 'Accept') ? 'Accepted' : 'Rejected';
        $stmt_update_handler = mysqli_prepare($conn, "UPDATE faculty_complaints SET Handler=?, Status=? WHERE Complaint_Id = ?");
        mysqli_stmt_bind_param($stmt_update_handler, "sss", $Faculty, $status, $Complaint_Id);
        $result = mysqli_stmt_execute($stmt_update_handler);

        if ($result) {
            echo json_encode(['success' => true, 'message' => $Complaint_Id]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Server error']);
        }

        mysqli_stmt_close($stmt_update_handler);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid mode']);
    }
}

mysqli_close($conn);
?>
