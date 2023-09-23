<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Replace with your React app's URL
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Replace these credentials with your actual database credentials
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'admin';

// Connect to the database
$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

// Endpoint to handle fetching data with optional date filter
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $option=$_GET['Filter'];
    if($option==="Yes"){
        $startDate = $_GET['start_date'];
        $endDate = $_GET['end_date'];
    }

    // Define the columns and their aliases to match the data structure
    $query = "SELECT
        Complaint_Id, Email, Name, Roll_No, Department, Class, CAST(contactno AS SIGNED) AS contactno,Type,Subject, Description,Date,Status,Forward_To,ForwardList, Logs FROM complaints";

    // Check if either start_date or end_date is provided
    if (!empty($startDate) || !empty($endDate)) {
        // Start date is empty, use only end_date
        if (empty($startDate)) {
            $query .= " WHERE date <= ?";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "s", $endDate);
        }
        // End date is empty, use only start_date
        elseif (empty($endDate)) {
            $query .= " WHERE date >= ?";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "s", $startDate);
        }
        // Both start_date and end_date are provided
        else {
            $query .= " WHERE date BETWEEN ? AND ?";
            $stmt = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt, "ss", $startDate, $endDate);
        }
    } else {
        $stmt = mysqli_prepare($conn, $query);
    }

    // Execute the query
    if (isset($stmt)) {
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
    } else {
        $result = mysqli_query($conn, $query);
    }

    if ($result) {
        $data = [];
        while ($row = mysqli_fetch_assoc($result)) {
            // Parse data types here as needed
            $row['contactno'] = (int)$row['contactno'];
            $data[] = $row;
        }
        echo json_encode(['success' => true, 'data' => $data]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Server error']);
    }

    // Close the statement if it was prepared
    if (isset($stmt)) {
        mysqli_stmt_close($stmt);
    }
}

// Close the database connection
mysqli_close($conn);
?>
