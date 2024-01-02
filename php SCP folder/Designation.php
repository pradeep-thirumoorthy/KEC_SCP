<?php
header("Access-Control-Allow-Origin: http://192.168.77.250:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$host = '192.168.77.250';
$user = 'root';
$password = '';
$database = 'sgp';

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = isset($_POST['email']) ? $_POST['email'] : '';

    if ($email === '') {
        echo json_encode(['error' => 'Email not provided']);
        exit;
    }
    $subjectQuery = "SELECT Class, Batch, Department";
    for ($i = 1; $i <= 6; $i++) {
        for ($i = 1; $i <= 6; $i++) {
            $subjectQuery .= ", CASE 
                WHEN JSON_UNQUOTE(JSON_SEARCH(Subject_$i, 'one', '$email')) IS NOT NULL 
                THEN Subject_$i
                ELSE NULL
            END AS Subject_$i";
        }
        
    }
    
    
$subjectQuery .= ", CASE 
        WHEN HOD = '$email' THEN 'HOD'
        ELSE NULL
    END AS HOD";
$subjectQuery .= ", CASE 
        WHEN Year_Incharge = '$email' THEN 'Year Incharge'
        ELSE NULL
    END AS Year_Incharge";
$subjectQuery .= ", CASE 
        WHEN Advisor1 = '$email' THEN 'Advisor1'
        ELSE NULL
    END AS Advisor1";
$subjectQuery .= ", CASE 
        WHEN Advisor2 = '$email' THEN 'Advisor2'
        ELSE NULL
    END AS Advisor2";
$subjectQuery .= ", CASE 
        WHEN Advisor3 = '$email' THEN 'Advisor3'
        ELSE NULL
    END AS Advisor3";
$subjectQuery .= " FROM subject";

    $subjectResult = mysqli_query($conn, $subjectQuery);
$matchingData = array();
while ($row = mysqli_fetch_assoc($subjectResult)) {
    $rolls = array();

    foreach (['Subject_1', 'Subject_2', 'Subject_3', 'Subject_4', 'Subject_5', 'Subject_6'] as $column) {
        if ($row[$column] !== NULL) {
            $jsonData = json_decode($row[$column], true);
            $keys = array_keys($jsonData);
            $rolls = array_merge($rolls, $keys);
        }
    }
    if ($row['Year_Incharge'] !== NULL && $row['Year_Incharge'] === 'Year Incharge') {
        $rolls[] = 'Year Incharge';
    }
    if ($row['HOD'] !== NULL && $row['HOD'] === 'HOD') {
        $rolls[] = 'HOD';
    }

    if ($row['Advisor1'] !== NULL && $row['Advisor1'] === 'Advisor1') {
        $rolls[] = 'Advisor1';
    }

    if ($row['Advisor2'] !== NULL && $row['Advisor2'] === 'Advisor2') {
        $rolls[] = 'Advisor2';
    }

    if ($row['Advisor3'] !== NULL && $row['Advisor3'] === 'Advisor3') {
        $rolls[] = 'Advisor3';
    }
    
    if (!empty($rolls)) {
        $matchingData[] = [
            'Class' => $row['Class'],
            'Batch' => $row['Batch'],
            'Department' => $row['Department'],
            'Roll' => $rolls,
        ];
    }
}

    if ($matchingData) {
        
        $response = [
            'subjectData' => $matchingData,
            'result'=>$subjectResult,
        ];

        echo json_encode($response);
    } else {
        echo json_encode(['error' => 'No matching data found']);
    }
}

mysqli_close($conn);
?>
