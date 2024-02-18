<?php



include './../../main.php';




if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    
    $email = $_GET['email'];
    // Define the types and their predefined colors
    $types = array(
        "Academic" => "Red",
        "Maintenance" => "Green",
        "Courses" => "Blue",
        "Lab" => "Orange",
        "Others" => "Grey"
    );

    $data = array();

    // Fetch the count of each type and create data entries
    foreach ($types as $type => $color) {
        $query = "SELECT COUNT(*) as count FROM complaints WHERE Type = ? AND Status != 'Rejected' AND Status != 'Resolved' AND Status != 'Accepted' AND Forward_To = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ss", $type, $email);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        if ($result) {
            $count = mysqli_fetch_assoc($result)['count'];
            $data[] = array("label" => $type, "value" => $count, "color" => $color, "url"=>$type,
        );
        }
    }

    // Encode the data as JSON and return it
    echo json_encode($data);
}

// Close the database connection
mysqli_close($conn);
?>
