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

    else if ($mode === 'Resolve') {
        $Faculty = isset($data['Faculty']) ? $data['Faculty'] : '';
    
        if ($Faculty === '') {
            echo json_encode(['success' => false, 'message' => 'Please enter Faculty']);
            exit;
        }
    
        // Retrieve Faculty_Name from the admin_info table
        $query_select_faculty_name = "SELECT Name FROM admin_info WHERE Email = ?";
        $stmt_select_faculty_name = mysqli_prepare($conn, $query_select_faculty_name);
        mysqli_stmt_bind_param($stmt_select_faculty_name, "s", $Faculty);
        mysqli_stmt_execute($stmt_select_faculty_name);
        mysqli_stmt_store_result($stmt_select_faculty_name);
    
        if (mysqli_stmt_num_rows($stmt_select_faculty_name) === 1) {
            mysqli_stmt_bind_result($stmt_select_faculty_name, $Faculty_Name);
            mysqli_stmt_fetch($stmt_select_faculty_name);
    
            // Update the info4 column in the database without selecting the existing value
            $updated_info4 = json_encode([$Faculty_Name, date('Y-m-d H:i:s')]);
    
            // Update the info4 column in the database
            $stmt_update_info4 = mysqli_prepare($conn, "UPDATE faculty_complaints SET info4 = ?, Status = 'Resolved' WHERE Complaint_Id = ?");
            mysqli_stmt_bind_param($stmt_update_info4, "ss", $updated_info4, $Complaint_Id);
            $result = mysqli_stmt_execute($stmt_update_info4);
    
            if ($result) {
                echo json_encode(['success' => true, 'message' => $Complaint_Id]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Server error']);
            }
    
            mysqli_stmt_close($stmt_update_info4);
        } else {
            echo json_encode(['success' => false, 'message' => 'Faculty not found']);
        }
    
        mysqli_stmt_close($stmt_select_faculty_name);
    }
    else if ($mode === 'Update') {
        $Message = isset($data['Message']) ? $data['Message'] : '';
    
        if ($Message === '') {
            echo json_encode(['success' => false, 'message' => 'Please enter Message']);
            exit;
        }
        $query_select_info2 = "SELECT info3 FROM faculty_complaints WHERE Complaint_Id = ?";
        $stmt_select_info2 = mysqli_prepare($conn, $query_select_info2);
        mysqli_stmt_bind_param($stmt_select_info2, "s", $Complaint_Id);
        mysqli_stmt_execute($stmt_select_info2);
        mysqli_stmt_store_result($stmt_select_info2);
    
        if (mysqli_stmt_num_rows($stmt_select_info2) === 1) {
            mysqli_stmt_bind_result($stmt_select_info2, $existing_info2);
            mysqli_stmt_fetch($stmt_select_info2);
    
            // Parse the existing info2 JSON string into an array
            $info2_array = json_decode($existing_info2, true);
            
            $info2_array[] = [date('Y-m-d H:i:s') => $Message];
            
            $updated_info2 = json_encode($info2_array);
    
            // Update the info2 column in the database
            $stmt_update_info2 = mysqli_prepare($conn, "UPDATE faculty_complaints SET info3 = ? WHERE Complaint_Id = ?");
            mysqli_stmt_bind_param($stmt_update_info2, "ss", $updated_info2, $Complaint_Id);
            $result = mysqli_stmt_execute($stmt_update_info2);
    
            if ($result) {
                echo json_encode(['success' => true, 'message' => $Complaint_Id]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Server error']);
            }
    
            mysqli_stmt_close($stmt_update_info2);
        } else {
            echo json_encode(['success' => false, 'message' => 'Complaint not found']);
        }
    
        mysqli_stmt_close($stmt_select_info2);
    }
    elseif ($mode === 'Reject') {
        if ($Faculty === '') {
            echo json_encode(['success' => false, 'message' => 'Please enter Faculty']);
            exit;
        }
        
        // Retrieve Faculty_Name from the admin_info table
        $query_select_faculty_name = "SELECT Name FROM admin_info WHERE Email = ?";
        $stmt_select_faculty_name = mysqli_prepare($conn, $query_select_faculty_name);
        mysqli_stmt_bind_param($stmt_select_faculty_name, "s", $Faculty);
        mysqli_stmt_execute($stmt_select_faculty_name);
        mysqli_stmt_store_result($stmt_select_faculty_name);
    
        if (mysqli_stmt_num_rows($stmt_select_faculty_name) === 1) {
            mysqli_stmt_bind_result($stmt_select_faculty_name, $Faculty_Name);
            mysqli_stmt_fetch($stmt_select_faculty_name);
    
            $status = json_encode([$Faculty_Name, date('Y-m-d H:i:s')]);
            $stmt_update_handler = mysqli_prepare($conn, "UPDATE faculty_complaints SET Handler=?, info4 = ?, Status='Rejected' WHERE Complaint_Id = ?");
            mysqli_stmt_bind_param($stmt_update_handler, "sss", $Faculty, $status, $Complaint_Id);
            $result = mysqli_stmt_execute($stmt_update_handler);
    
            if ($result) {
                echo json_encode(['success' => true, 'message' => $Complaint_Id]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Server error']);
            }
    
            mysqli_stmt_close($stmt_update_handler);
        } else {
            echo json_encode(['success' => false, 'message' => 'Faculty not found']);
        }
    
        mysqli_stmt_close($stmt_select_faculty_name);
    }
    
    elseif ($mode === 'Accept') {
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
