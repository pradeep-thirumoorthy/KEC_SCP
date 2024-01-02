<?php
header("Access-Control-Allow-Origin: http://192.168.77.250:3000"); // Replace with your React app's URL
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
$host = 'localhost';
$user = 'root';
$password = '';
$database = 'sgp';
// Disable caching for the login response
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Expires: 0");


// Disable caching for the login response

// Replace these credentials with your actual database credentials


// Connect to the database
$conn = mysqli_connect($host, $user, $password, $database);
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

// Endpoint to handle login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $email = isset($data['email']) ? $data['email'] : '';
    $password = isset($data['password']) ? $data['password'] : '';

    if ($email === '' || $password === '') {
        echo json_encode(['success' => false, 'message' => 'Please enter both email and password']);
        exit;
    }

    $query = "SELECT * FROM student_login WHERE Email = '$email' AND Password = '$password'";
    $result = mysqli_query($conn, $query);

    if (!$result) {
        die('Query failed: ' . mysqli_error($conn));
        echo json_encode(['success' => false, 'message' => 'Server error']);
    } else {
        if (mysqli_num_rows($result) === 1) {
            // Generate a JWT
            $secretKey = 'your_secret_key'; // Replace with a secure secret key
            $payload = [
                'email' => $email,
            ];
            $token = jwt_encode($payload, $secretKey);

            // Return the token in the response
            echo json_encode(['success' => true, 'token' => $token]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
        }
    }
}

mysqli_close($conn);

// JWT encode function
function jwt_encode($payload, $key) {
    $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
    $header = base64_encode($header);
    $payload = base64_encode(json_encode($payload));

    $signature = hash_hmac('sha256', "$header.$payload", $key, true);
    $signature = base64_encode($signature);

    return "$header.$payload.$signature";
}
?>
