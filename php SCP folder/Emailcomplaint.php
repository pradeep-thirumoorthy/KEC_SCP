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
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

function sendEmail($to, $subject, $message) {
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

        return array("success" => true, "message" => "Email sent successfully");
    } catch (Exception $e) {
        echo 'Message could not be sent. Mailer Error: ', $mail->ErrorInfo;
        return array("success" => false, "message" => "Failed to send the email: " . $e->getMessage());
    }
}
?>

