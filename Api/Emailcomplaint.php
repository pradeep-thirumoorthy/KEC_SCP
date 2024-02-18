<?php

include './main.php';

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

