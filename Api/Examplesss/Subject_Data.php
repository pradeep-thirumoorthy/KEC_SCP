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


// Replace these credentials with your actual database credentials


// Connect to the database




// Disable caching for the login response

// Replace these credentials with your actual database credentials


// Connect to the database
$conn = mysqli_connect($host, $user, $password, $database);
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

// Endpoint to handle admin and subject data retrieval
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = isset($_POST['email']) ? $_POST['email'] : '';

    if ($email === '') {
        echo json_encode(['error' => 'Email not provided']);
        exit;
    }

    // Query to fetch admin data based on the provided email
    $adminQuery = "SELECT * FROM admin_info WHERE Email = '$email'";
    $adminResult = mysqli_query($conn, $adminQuery);
    $adminData = mysqli_fetch_assoc($adminResult);

    // Query to fetch subject data based on the provided email
    $subjectQuery = "SELECT Class, Batch";
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
    
    // Create an array to store the matching data
    // ...

// Create an array to store the matching data
$matchingData = array(); // Initialize the array to store matching data

while ($row = mysqli_fetch_assoc($subjectResult)) {
    $rolls = array(); // Initialize an array to store Roll values for this row

    foreach (['Subject_1', 'Subject_2', 'Subject_3', 'Subject_4', 'Subject_5', 'Subject_6'] as $column) {
        if ($row[$column] !== NULL) {
            $jsonData = json_decode($row[$column], true); // Decoding the JSON
            $keys = array_keys($jsonData); // Getting the keys
            $rolls = array_merge($rolls, $keys);
        }
    }

    // Check if Year_Incharge matches and include it in the array
    if ($row['Year_Incharge'] !== NULL && $row['Year_Incharge'] === 'Year Incharge') {
        $rolls[] = 'Year Incharge';
    }
    
    // Check if HOD matches and include it in the array
    if ($row['HOD'] !== NULL && $row['HOD'] === 'HOD') {
        $rolls[] = 'HOD';
    }

    // Check if Advisor1 matches and include it in the array
    if ($row['Advisor1'] !== NULL && $row['Advisor1'] === 'Advisor1') {
        $rolls[] = 'Advisor1';
    }

    // Check if Advisor2 matches and include it in the array
    if ($row['Advisor2'] !== NULL && $row['Advisor2'] === 'Advisor2') {
        $rolls[] = 'Advisor2';
    }

    // Check if Advisor3 matches and include it in the array
    if ($row['Advisor3'] !== NULL && $row['Advisor3'] === 'Advisor3') {
        $rolls[] = 'Advisor3';
    }

    // Add the row data to matchingData if there are rolls
    if (!empty($rolls)) {
        $matchingData[] = [
            'Class' => $row['Class'],
            'Batch' => $row['Batch'],
            'Roll' => $rolls,
        ];
    }
}

// Now you can use the $matchingData array as needed for further processing


// ...


    if ($adminData) {
        // Combine admin and subject data into a single response
        $response = [
            'adminInfo' => $adminData,
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
