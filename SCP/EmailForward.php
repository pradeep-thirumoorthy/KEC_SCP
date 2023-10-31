<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';
header("Access-Control-Allow-Origin: http://192.168.157.250:3000"); // Replace with your React app's URL
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Disable caching for the login response
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Expires: 0");

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
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $to = isset($data['to']) ? $data['to'] : '';
    $subject = isset($data['subject']) ? $data['subject'] : '';
    
    // Check if the email exists in the admin_login table
    $checkEmailQuery = "SELECT * FROM admin_info WHERE email = '$to' UNION SELECT * FROM student_info WHERE email = '$to'";
    $result = mysqli_query($conn, $checkEmailQuery);
    $message = '<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Complaint Forward</title>
        <style>
            .container {
              background-color: #F7F7F7;
              border:2px solid black;
              padding-bottom: 20px;
              color:#F8F8F8;
              font-family: "Gill Sans", sans-serif;
              border-radius:10px;
            }
            .container hr{
              margin-left:30px;
              margin-right:30px;
            }
            .container .body{
              padding-left:40px;
              padding-right:40px;
            }
            .container .body p{
              color:#343a40;
            }
            .container  h1{
                text-align: center;
                color:#19AFFF;
            }
            .container .body h2{
                text-align: center;
                color:black;
            }
            .container .body table{
              color:black;
              border-collapse: collapse;
            }
            
    .container .table{
    margin: auto;
    width: 70%;
    padding: 10px;
    }
    .container .body table {
    border-collapse: collapse;
    width: 100%;
    }
          </style>
    </head>
    <body>
        <div class="container">
            <h1>Complaint Forwarding Notice</h1>
            <hr/>
            <div class="body">
                <p>Hello <span>[Recipient Faculty Member\'s Name]</span></p>
                
                <br/>
                <p>Dear [Recipient Faculty Member\'s Name],<br/>
                <br>
                I hope this message finds you well. I am forwarding a complaint that has been raised by a student. The details of the complaint are as follows:<br/>
                <br>
                <table>
                    <tr>
                        <td>Student Name</td>
                        <td>:</td>
                        <td>Pradeep T</td>
                    </tr>
                    <tr>
                        <td>RollNo</td>
                        <td>:</td>
                        <td>21CSR141</td>
                    </tr>
                    <tr>
                        <td>Title</td>
                        <td>:</td>
                        <td>Tutorial form is not yet posted</td>
                    </tr>
                    <tr>
                        <td>Complaint Type</td>
                        <td>:</td>
                        <td>Academics</td>
                    </tr>
                </table>
                <br>
                </p>
                <p>
                    As the faculty member responsible for handling such matters, I kindly request your attention to this complaint. Our priority is to ensure a swift and fair resolution to address the student\'s concerns.<br/>
                    <br>
                    Thank you for your dedication to our students and their academic experience.
                    <br><br>
                    Forwarded by:
                    <table>
                        <tr>
                            <td>Name</td>
                            <td>:</td>
                            <td>Your Name</td>
                        </tr>
                        <tr>
                            <td>Position</td>
                            <td>:</td>
                            <td>Your Position</td>
                        </tr>
                    </table>
                </p>
            </div>
        </div>
    </body>
    </html>';
    if (mysqli_num_rows($result) > 0) {
        
        try {
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'pradeept.21cse@kongu.edu';
            $mail->Password = 'kogjgbycwmfsagda';
            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $mail->setFrom('pradeept.21cse@kongu.edu', 'Student Complaint Portal');
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












