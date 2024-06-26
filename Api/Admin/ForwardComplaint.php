<?php


include './../main.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $info = isset($data['info']) ? $data['info'] : '';
    $Complaint_Id = isset($info['Complaint_Id']) ? $info['Complaint_Id'] : '';
    $mode = isset($data['mode']) ? $data['mode'] : '';
    $email = isset($info['email']) ? $info['email']:'';
    if ($Complaint_Id === '') {
        echo json_encode(['success' => false, 'message' => 'Please enter Complaint_Id']);
        exit;
    }
    
    include './../EmailFunctions.php';
    if ($mode === 'Forward') {
        $Faculty = isset($data['Faculty']) ? $data['Faculty'] : '';
        $upordown = isset($data['upordown']) ? $data['upordown'] : '';
        $Level = isset($info['Level']) ? $info['Level'] : -1;
        if($upordown==='UpStream'){
            $Level=$Level+1;
        }
        else{
            $Level=$Level-1;
        }
        if ($Faculty === '' || $upordown === '') {
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
    
            // Retrieve the existing info2 from the database based on Complaint_Id
            $query = "SELECT info2 FROM complaints WHERE Complaint_Id = ?";
            $stmt_select_info2 = mysqli_prepare($conn, $query);
            mysqli_stmt_bind_param($stmt_select_info2, "s", $Complaint_Id);
            mysqli_stmt_execute($stmt_select_info2);
            mysqli_stmt_store_result($stmt_select_info2);
    
            if (mysqli_stmt_num_rows($stmt_select_info2) === 1) {
                mysqli_stmt_bind_result($stmt_select_info2, $existing_info2);
                mysqli_stmt_fetch($stmt_select_info2);
    
                // Parse the existing info2 JSON string into an array
                $info2_array = json_decode($existing_info2, true);
                $value=($upordown==='UpStream')?'Upgraded':'Downgraded';
                // Add the new dictionary value to the array
                $info2_array[] = ['Forwarded' => [$Faculty_Name, date('Y-m-d H:i:s'),$value]]; // Assuming date('Y-m-d') gives the current date
    
                // Convert the modified array back to a JSON string
                $updated_info2 = json_encode($info2_array);
    
                // Update the info2 column in the database
                $stmt_update_info2 = mysqli_prepare($conn, "UPDATE complaints SET Forward_To = ?, info2 = ? ,Level=? WHERE Complaint_Id = ?");
                mysqli_stmt_bind_param($stmt_update_info2, "ssis", $Faculty, $updated_info2,$Level, $Complaint_Id);
                $result = mysqli_stmt_execute($stmt_update_info2);
    
                if ($result) {
                    ForwardEmail($conn, $Faculty, $info,$email);
                    StudentForward($conn,$Faculty,$info,$email);
                    echo json_encode(['success' => true, 'message' => $Complaint_Id]);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Server error']);
                }
    
                mysqli_stmt_close($stmt_update_info2);
            } else {
                echo json_encode(['success' => false, 'message' => 'Complaint not found']);
            }
    
            mysqli_stmt_close($stmt_select_info2);
        } else {
            echo json_encode(['success' => false, 'message' => 'Faculty not found']);
        }
    
        mysqli_stmt_close($stmt_select_faculty_name);
    }
    
else if ($mode === 'Accept') {
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

        // Retrieve the existing info2 from the database based on Complaint_Id
        $query_select_info2 = "SELECT info2 FROM complaints WHERE Complaint_Id = ?";
        $stmt_select_info2 = mysqli_prepare($conn, $query_select_info2);
        mysqli_stmt_bind_param($stmt_select_info2, "s", $Complaint_Id);
        mysqli_stmt_execute($stmt_select_info2);
        mysqli_stmt_store_result($stmt_select_info2);

        if (mysqli_stmt_num_rows($stmt_select_info2) === 1) {
            mysqli_stmt_bind_result($stmt_select_info2, $existing_info2);
            mysqli_stmt_fetch($stmt_select_info2);

            // Parse the existing info2 JSON string into an array
            $info2_array = json_decode($existing_info2, true);

            // Add the new dictionary value to the array
            $info2_array[] = ['Accepted' => [$Faculty_Name, date('Y-m-d H:i:s')]]; // Assuming date('Y-m-d') gives the current date

            // Convert the modified array back to a JSON string
            $updated_info2 = json_encode($info2_array);

            // Update the info2 column in the database
            $stmt_update_info2 = mysqli_prepare($conn, "UPDATE complaints SET info2 = ?,Status='Accepted' WHERE Complaint_Id = ?");
            mysqli_stmt_bind_param($stmt_update_info2, "ss", $updated_info2, $Complaint_Id);
            $result = mysqli_stmt_execute($stmt_update_info2);

            if ($result) {
                StudentAccept($conn,$Faculty,$info);
                echo json_encode(['success' => true, 'message' => $Complaint_Id]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Server error']);
            }

            mysqli_stmt_close($stmt_update_info2);
        } else {
            echo json_encode(['success' => false, 'message' => 'Complaint not found']);
        }

        mysqli_stmt_close($stmt_select_info2);
    } else {
        echo json_encode(['success' => false, 'message' => 'Faculty not found']);
    }

    mysqli_stmt_close($stmt_select_faculty_name);
}

else if ($mode === 'Reject') {
    $Faculty = isset($data['Faculty']) ? $data['Faculty'] : '';
    $statement = isset($data['statement']) ? $data['statement'] : '';
    if ($Faculty === '' && $statement == '') {
        echo json_encode(['success' => false, 'message' => 'Please enter the Responsible Reason']);
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

        // Retrieve the existing info2 from the database based on Complaint_Id
        $query_select_info2 = "SELECT info2 FROM complaints WHERE Complaint_Id = ?";
        $stmt_select_info2 = mysqli_prepare($conn, $query_select_info2);
        mysqli_stmt_bind_param($stmt_select_info2, "s", $Complaint_Id);
        mysqli_stmt_execute($stmt_select_info2);
        mysqli_stmt_store_result($stmt_select_info2);

        if (mysqli_stmt_num_rows($stmt_select_info2) === 1) {
            mysqli_stmt_bind_result($stmt_select_info2, $existing_info2);
            mysqli_stmt_fetch($stmt_select_info2);

            // Parse the existing info2 JSON string into an array
            $info2_array = json_decode($existing_info2, true);

            // Add the new dictionary value to the array
            $info2_array[] = ['Rejected' => [$Faculty_Name, date('Y-m-d H:i:s')]]; // Assuming date('Y-m-d') gives the current date

            // Convert the modified array back to a JSON string
            $updated_info2 = json_encode($info2_array);

            // Update the info2 column in the database
            $stmt_update_info2 = mysqli_prepare($conn, "UPDATE complaints SET info2 = ?, Status='Rejected' WHERE Complaint_Id = ?");
            mysqli_stmt_bind_param($stmt_update_info2, "ss", $updated_info2, $Complaint_Id);
            $result = mysqli_stmt_execute($stmt_update_info2);

            if ($result) {
                // Update the info4 column with Faculty Name and timestamp
                $stmt_update_info4 = mysqli_prepare($conn, "UPDATE complaints SET info4 = ?, Status='Rejected' WHERE Complaint_Id = ?");
                $info4 = json_encode([$Faculty_Name, date('Y-m-d H:i:s'),$statement]);
                mysqli_stmt_bind_param($stmt_update_info4, "ss", $info4, $Complaint_Id);
                $result_info4 = mysqli_stmt_execute($stmt_update_info4);

                if ($result_info4) {
                    StudentReject($conn,$Faculty,$info);
                    echo json_encode(['success' => true, 'message' => $Complaint_Id]);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Failed to update info4']);
                }

                mysqli_stmt_close($stmt_update_info4);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to update info2']);
            }

            mysqli_stmt_close($stmt_update_info2);
        } else {
            echo json_encode(['success' => false, 'message' => 'Complaint not found']);
        }

        mysqli_stmt_close($stmt_select_info2);
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

    // Retrieve the existing info2 from the database based on Complaint_Id
    $query_select_info2 = "SELECT info3 FROM complaints WHERE Complaint_Id = ?";
    $stmt_select_info2 = mysqli_prepare($conn, $query_select_info2);
    mysqli_stmt_bind_param($stmt_select_info2, "s", $Complaint_Id);
    mysqli_stmt_execute($stmt_select_info2);
    mysqli_stmt_store_result($stmt_select_info2);

    if (mysqli_stmt_num_rows($stmt_select_info2) === 1) {
        mysqli_stmt_bind_result($stmt_select_info2, $existing_info2);
        mysqli_stmt_fetch($stmt_select_info2);

        // Parse the existing info2 JSON string into an array
        $info2_array = json_decode($existing_info2, true);

        // Add the new dictionary value to the array
        $info2_array[] = [date('Y-m-d H:i:s') => $Message]; // Assuming date('Y-m-d H:i:s') gives the current date

        // Convert the modified array back to a JSON string
        $updated_info2 = json_encode($info2_array);

        // Update the info2 column in the database
        $stmt_update_info2 = mysqli_prepare($conn, "UPDATE complaints SET info3 = ?, Status = 'Accepted' WHERE Complaint_Id = ?");
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
        $stmt_update_info4 = mysqli_prepare($conn, "UPDATE complaints SET info4 = ?, Status = 'Resolved' WHERE Complaint_Id = ?");
        mysqli_stmt_bind_param($stmt_update_info4, "ss", $updated_info4, $Complaint_Id);
        $result = mysqli_stmt_execute($stmt_update_info4);

        if ($result) {
            StudentComplete($conn, $Faculty, $info);
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



   
else {
        echo json_encode(['success' => false, 'message' => 'Invalid mode']);
}
}

mysqli_close($conn);
?>
