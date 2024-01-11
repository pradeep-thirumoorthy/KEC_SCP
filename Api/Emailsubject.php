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
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';


// Disable caching for the login response

// Replace these credentials with your actual database credentials


// Connect to the database




// Disable caching for the login response

// Replace these credentials with your actual database credentials


// Connect to the database
$conn = mysqli_connect($host, $user, $password, $database);
if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $to = isset($data['to']) ? $data['to'] : '';
    $subject = isset($data['subject']) ? $data['subject'] : '';
    $message = isset($data['message']) ? $data['message'] :'';
    // Check if the email exists in the admin_login table
    $checkEmailQuery = "SELECT * FROM student_login WHERE email = '$to'";
    $result = mysqli_query($conn, $checkEmailQuery);
    
    if (mysqli_num_rows($result) > 0) {
        // Email exists in the database, proceed with sending the email
        $randomSixDigitNumber = rand(100000, 999999);
        
        try {
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'pradeept.21cse@kongu.edu';
            $mail->Password = 'syjzftnfvrzkjydq';
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('pradeept.21cse@kongu.edu', 'Student Complaint Portal'); // Replace with your Gmail email address and sender name
            $mail->addAddress($to);
            $mail->Subject = $subject;
            $mail->isHTML(true);
            $mail->Body = $message;

            // Send the email
            $mail->send();

            $response = array("otp" => $randomSixDigitNumber, "message" => "");
        } catch (Exception $e) {
            $response = array("message" => "Failed to send the email: " . $e->getMessage());
        }
    } else {
        // Email does not exist in the database
        $response = array("message" => "*Email is invalid");
    }

    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    echo "Email failed";
}
?>












