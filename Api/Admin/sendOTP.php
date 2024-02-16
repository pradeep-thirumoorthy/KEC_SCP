<?php

include './../main.php';

include './../Emailcomplaint.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $to = isset($data['to']) ? $data['to'] : '';

    if ($to === '') {
        echo json_encode(['success' => false, 'message' => 'Please enter both email and password']);
        exit;
    }

    $query = "SELECT * FROM admin_login WHERE Email = '$to'";
    $result = mysqli_query($conn, $query);

    if (!$result) {
        die('Query failed: ' . mysqli_error($conn));
        echo json_encode(['success' => false, 'message' => 'Server error or Email doesn\'t Exists']);
    } 
    else {
        if (mysqli_num_rows($result) === 1) {
            // Generate a 6-digit OTP
            $otp = mt_rand(100000, 999999);

            $emailParamsStudent = [
                'to' => $to,
                'subject' => 'Admin Verification OTP',
                'message' => '<html lang="en">
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
                        .container .body h1{
                            text-align: center;
                            color:#343a40;
                        }
                        .container .body p{
                          color:#343a40;
                        }
                        .container  h1{
                            text-align: center;
                            color:#19AFFF;
                        }
                      </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Student Email Verification</h1>
                        <hr/>
                        <div class="body">
                            
                            <p>Your verification OTP for password Reset is given below</p>
                            <h1>'. $otp . '</h1>
                        </div>
                    </div>
                </body>
                </html>',
            ];

            // Send email to the student
            $emailSentStudent = sendEmail($emailParamsStudent['to'], $emailParamsStudent['subject'], $emailParamsStudent['message']);
            
            // Handle $emailSentStudent as needed (check for success, log errors, etc.)

            if ($emailSentStudent['success']) {
                // Send the OTP and success status in the JSON response
                echo json_encode(['success' => true, 'otp' => $otp, 'message' => 'OTP sent to email']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to send OTP to email']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid username or password']);
        }
    }
}

mysqli_close($conn);

?>
