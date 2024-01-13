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
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");







// Disable caching for the login response

// Replace these credentials with your actual database credentials


// Connect to the database
$conn = mysqli_connect($host, $user, $password, $database);
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = isset($_POST['email']) ? $_POST['email'] : '';
    $limit = isset($_POST['limit']) ? intval($_POST['limit']) : 1;
    $formdata = isset($_POST['formdata']) ? $_POST['formdata'] : '';
    $lastDate = isset($_POST['lastDate']) ? $_POST['lastDate'] : '';
    $option = isset($_POST['option']) ? $_POST['option'] : '';
    $title = isset($_POST['title']) ? $_POST['title'] : '';

    if ($option === "create") {
        // Handle file upload
        if ($_FILES['file']['error'] === UPLOAD_ERR_OK) {
            $file_name = $_FILES['file']['name'];
            $temp_file = $_FILES['file']['tmp_name'];
            $uploads_dir = 'path/to/your/upload/directory/'; // Specify the directory where you want to store uploaded files

            // Remove any existing image file
            $existing_image_path = $uploads_dir . $file_name; // Assuming the file name is associated with the event ID
            if (file_exists($existing_image_path)) {
                unlink($existing_image_path); // Remove the existing image file
            }

            $event_id = bin2hex(random_bytes(16)); // Generate new event ID
            $new_file_name = $event_id . '.jpg'; // Set the new file name using the event ID and file extension

            $upload_file = $uploads_dir . $new_file_name; // Path for the new file

            // Move the uploaded file to the specified directory with the new file name
            if (move_uploaded_file($temp_file, $upload_file)) {
                // Your existing code to create an event in the database
                // ... (rest of your code)
                // Adjust the INSERT query to include the new file path in the database
                $query = "INSERT INTO events (event_id, Email, Limits, Formdata, IntervalTime, Title, Date, Filepath) VALUES (?, ?, ?, ?, ?, ?, NOW(), ?)";
                $stmt = mysqli_prepare($conn, $query);
                mysqli_stmt_bind_param($stmt, "ssissss", $event_id, $email, $limit, $formdata, $lastDate, $title, $upload_file);

                // Execute the statement and handle success/failure
                if (mysqli_stmt_execute($stmt)) {
                    echo json_encode(['success' => true, 'message' => 'Event data inserted successfully']);
                } else {
                    echo json_encode(['success' => false, 'message' => 'Server error: ' . mysqli_error($conn)]);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Error moving the uploaded file']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Error uploading the file']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Option is not set to "create"']);
    }
}

mysqli_close($conn);
?>
