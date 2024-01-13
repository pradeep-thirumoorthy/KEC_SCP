<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'sgp';
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Expires: 0");

$user = 'root';
$password = '';
$database = 'sgp';

$conn = mysqli_connect($host, $user, $password, $database);
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $email = $_GET['email'];

    $query = "SELECT info1, COUNT(info1) AS date_count FROM complaints WHERE Forward_To = ? GROUP BY info1";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "s", $email);

    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($result) {
        $data = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $data[$row['info1']] = $row['date_count'];
        }
        echo json_encode(['success' => true, 'data' => $data]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Server error']);
    }

    mysqli_stmt_close($stmt);
    mysqli_close($conn);
}
?>
