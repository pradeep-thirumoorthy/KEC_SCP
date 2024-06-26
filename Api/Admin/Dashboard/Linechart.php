<?php


include './../../main.php';
$conn = mysqli_connect($host, $user, $password, $database);
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

// Endpoint to handle fetching data for a specific Forward_To value
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $email = $_GET['email'];

    $query = "SELECT info1, COUNT(*) as count FROM complaints WHERE Forward_To = ? AND (Status= 'Arrived' OR Status='Resolved' OR Status='Accepted') GROUP BY info1";
    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "s", $email);

    // Execute the query
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($result) {
        $data = mysqli_fetch_all($result, MYSQLI_ASSOC);
        echo json_encode(['success' => true, 'data' => $data]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Server error']);
    }

    // Close the statement
    mysqli_stmt_close($stmt);
}

// Close the database connection
mysqli_close($conn);
?>
