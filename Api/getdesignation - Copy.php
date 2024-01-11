<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Replace with your React app's URL
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'sgp';
// Disable caching for the login response
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Expires: 0");
// Allow cross-origin requests from your React app
header("Access-Control-Allow-Origin: http://localhost:3000"); // Replace with your React app's URL
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Replace these credentials with your actual database credentials


// Connect to the database




// Disable caching for the login response

// Replace these credentials with your actual database credentials


// Connect to the database
$conn = mysqli_connect($host, $user, $password, $database);
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

// Endpoint to handle fetching subject details based on criteria
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['batch'], $_GET['class'], $_GET['department'], $_GET['level'])) {
        $batch = $_GET['batch'];
        $class = $_GET['class'];
        $department = $_GET['department'];
        $level = $_GET['level'];

        $upstreamData = [];
        $downstreamData = [];

        if ($level == 0) {
            $query = "SELECT Advisor1, Advisor2, Advisor3 FROM subject WHERE Batch = ? AND Class = ? AND Department = ?";
            $stmt = mysqli_prepare($conn, $query);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "sss", $batch, $class, $department);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);

                if ($result) {
                    while ($row = $result->fetch_assoc()) {
                        $upstreamData[] = $row; // Add fetched row to upstream data array
                    }
                } else {
                    $upstreamData = []; // No data found for upstream
                }
                mysqli_stmt_close($stmt);
            }
        } elseif ($level == 1) {
            $query = "SELECT Subject_1, Subject_2, Subject_3, Subject_4, Subject_5, Subject_6 FROM subject WHERE Batch = ? AND Class = ? AND Department = ?";
            $stmt = mysqli_prepare($conn, $query);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "sss", $batch, $class, $department);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);

                if ($result) {
                    while ($row = $result->fetch_assoc()) {
                        $downstreamData[] = $row; // Add fetched row to downstream data array
                    }
                } else {
                    $downstreamData = []; // No data found for downstream
                }
                mysqli_stmt_close($stmt);
            }

            $query = "SELECT Year_Incharge FROM subject WHERE Batch = ? AND Class = ? AND Department = ?";
            $stmt = mysqli_prepare($conn, $query);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "sss", $batch, $class, $department);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);

                if ($result) {
                    while ($row = $result->fetch_assoc()) {
                        $upstreamData[] = $row; // Add fetched row to upstream data array
                    }
                } else {
                    $upstreamData = []; // No data found for upstream
                }
                mysqli_stmt_close($stmt);
            }
        } elseif ($level == 2) {
            $query = "SELECT HOD FROM subject WHERE Batch = ? AND Class = ? AND Department = ?";
            $stmt = mysqli_prepare($conn, $query);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "sss", $batch, $class, $department);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);

                if ($result) {
                    while ($row = $result->fetch_assoc()) {
                        $upstreamData[] = $row; // Add fetched row to upstream data array
                    }
                } else {
                    $upstreamData = []; // No data found for upstream
                }
                mysqli_stmt_close($stmt);
            }
            $query = "SELECT Advisor1, Advisor2, Advisor3 FROM subject WHERE Batch = ? AND Class = ? AND Department = ?";
            $stmt = mysqli_prepare($conn, $query);

            if ($stmt) {
                mysqli_stmt_bind_param($stmt, "sss", $batch, $class, $department);
                mysqli_stmt_execute($stmt);
                $result = mysqli_stmt_get_result($stmt);

                if ($result) {
                    while ($row = $result->fetch_assoc()) {
                        $downstreamData[] = $row; // Add fetched row to upstream data array
                    }
                } else {
                    $downstreamData = []; // No data found for upstream
                }
                mysqli_stmt_close($stmt);
            }
        }

        $response = [
            'success' => true,
            'data' => [
                'Upstream' => $upstreamData,
                'Downstream' => $downstreamData
            ]
        ];
        echo json_encode($response);
    } else {
        echo json_encode(['success' => false, 'message' => 'Required parameters are missing.']);
    }

    mysqli_close($conn);
}
?>
