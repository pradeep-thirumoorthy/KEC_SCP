<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

include 'Emailcomplaint.php';
function ForwardEmail($conn, $Faculty, $info,$fromemail) {
    $query_get_name = "SELECT Name FROM admin_info WHERE email = ?";
                    $stmt_get_name = mysqli_prepare($conn, $query_get_name);
                    mysqli_stmt_bind_param($stmt_get_name, "s", $Faculty);
                    mysqli_stmt_execute($stmt_get_name);
                    mysqli_stmt_store_result($stmt_get_name);

                    $facultyName = ''; // Initialize a variable to store the faculty name

                    if (mysqli_stmt_num_rows($stmt_get_name) === 1) {
                        mysqli_stmt_bind_result($stmt_get_name, $facultyName);
                        mysqli_stmt_fetch($stmt_get_name);
                    } else {
                        $facultyName = 'Default Faculty Name';
                    }
                    $query_get_name = "SELECT Name FROM admin_info WHERE email = ?";
                    $stmt_get_name = mysqli_prepare($conn, $query_get_name);
                    mysqli_stmt_bind_param($stmt_get_name, "s", $fromemail);
                    mysqli_stmt_execute($stmt_get_name);
                    mysqli_stmt_store_result($stmt_get_name);

                    $fromfacultyName = ''; // Initialize a variable to store the faculty name

                    if (mysqli_stmt_num_rows($stmt_get_name) === 1) {
                        mysqli_stmt_bind_result($stmt_get_name, $fromfacultyName);
                        mysqli_stmt_fetch($stmt_get_name);
                    } else {
                        $fromfacultyName = 'Default Faculty Name';
                    }
                    $studentname = isset($info['Name']) ? $info['Name'] : '';
                    $studentrollno = isset($info['Roll_No']) ? $info['Roll_No'] : '';
                    $studenttitle = isset($info['Title']) ? $info['Title'] : '';
                    $complainttype = isset($info['Type']) ? $info['Type'] : '';
                    $studentemail = isset($info['email']) ? $info['email'] : '';
                    $emailParams1 = [
                        'to' => $Faculty,
                        'subject' => 'Forward Complaint Notification',
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
                                    
                                    <br/>
                                    <p>Dear '.$facultyName.',<br/>
                                    <br>
                                    I hope this message finds you well. I am forwarding a complaint that has been raised by a student. The details of the complaint are as follows:<br/>
                                    <br>
                                    <table>
                                        <tr>
                                            <td>Student Name</td>
                                            <td>:</td>
                                            <td>'.$studentname.'</td>
                                        </tr>
                                        <tr>
                                      <td>RollNo</td>
                                      <td>:</td>
                                      <td>'.$studentrollno.'</td>
                                  </tr>
                                  <tr>
                                      <td>Title</td>
                                      <td>:</td>
                                      <td>'.$studenttitle.'</td>
                                  </tr>
                                  <tr>
                                      <td>Complaint Type</td>
                                      <td>:</td>
                                      <td>'.$complainttype.'</td>
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
                                                <td>'.$fromfacultyName.'</td>
                                            </tr>
                                            <tr>
                                                <td>Position</td>
                                                <td>:</td>
                                                <td>'.$Faculty.'</td>
                                            </tr>
                                        </table>
                                    </p>
                                </div>
                            </div>
                        </body>
                        </html>
                        '
                    ];
                    $emailSent1 = sendEmail($emailParams1['to'], $emailParams1['subject'], $emailParams1['message']);
}
function StudentForward($conn, $Faculty, $info, $fromemail) {
    $query_get_name = "SELECT Name FROM admin_info WHERE email = ?";
                    $stmt_get_name = mysqli_prepare($conn, $query_get_name);
                    mysqli_stmt_bind_param($stmt_get_name, "s", $Faculty);
                    mysqli_stmt_execute($stmt_get_name);
                    mysqli_stmt_store_result($stmt_get_name);

                    $facultyName = ''; // Initialize a variable to store the faculty name

                    if (mysqli_stmt_num_rows($stmt_get_name) === 1) {
                        mysqli_stmt_bind_result($stmt_get_name, $facultyName);
                        mysqli_stmt_fetch($stmt_get_name);
                    } else {
                        $facultyName = 'Default Faculty Name';
                    }
                    $query_get_name = "SELECT Name FROM admin_info WHERE email = ?";
                    $stmt_get_name = mysqli_prepare($conn, $query_get_name);
                    mysqli_stmt_bind_param($stmt_get_name, "s", $fromemail);
                    mysqli_stmt_execute($stmt_get_name);
                    mysqli_stmt_store_result($stmt_get_name);

                    $fromfacultyName = ''; // Initialize a variable to store the faculty name

                    if (mysqli_stmt_num_rows($stmt_get_name) === 1) {
                        mysqli_stmt_bind_result($stmt_get_name, $fromfacultyName);
                        mysqli_stmt_fetch($stmt_get_name);
                    } else {
                        $fromfacultyName = 'Default Faculty Name';
                    }
                    
                    $studentname = isset($info['Name']) ? $info['Name'] : '';
                    $studentrollno = isset($info['Roll_No']) ? $info['Roll_No'] : '';
                    $studenttitle = isset($info['Title']) ? $info['Title'] : '';
                    $complainttype = isset($info['Type']) ? $info['Type'] : '';
                    $studentemail = isset($info['email']) ? $info['email'] : '';
                    $emailParams1 = [
                        'to' => $studentemail,
                        'subject' => 'Forward Complaint Notification',
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
                                    
                                    <br/>
                                    <p>Dear '.$studentname.',<br/>
                                    <br>
                                    After a thorough review, your complaint has been forwarded to the appropriate faculty member who specializes in [relevant field or subject]. They are better equipped to understand the specifics of your situation and provide the most effective resolution.

                                    The faculty member who will be handling your complaint is <h6>'.$fromfacultyName.'</h6>, and they can be reached at <h6>'.$facultyName.'</h6> You can expect to hear from them soon regarding your complaint.

                                    Please feel free to reach out oue website if you have any additional information or questions regarding your complaint. We want to ensure that your concerns are addressed to your satisfaction, and your input is valuable to us.

                                    <br>
                                    <h4>Complaint Info:</h4><br/>
                                    <table>
                                        <tr>
                                            <td>Student Name</td>
                                            <td>:</td>
                                            <td>'.$studentname.'</td>
                                        </tr>
                                        <tr>
                                      <td>RollNo</td>
                                      <td>:</td>
                                      <td>'.$studentrollno.'</td>
                                  </tr>
                                  <tr>
                                      <td>Title</td>
                                      <td>:</td>
                                      <td>'.$studenttitle.'</td>
                                  </tr>
                                  <tr>
                                      <td>Complaint Type</td>
                                      <td>:</td>
                                      <td>'.$complainttype.'</td>
                                  </tr>
                                    </table>
                                    <br>
                                    </p>
                                    <p>
                                    <br>
                                        Thank you for bringing this matter to our attention, and we appreciate your patience as we work to resolve it.
                                        <br>
                                    </p>
                                </div>
                            </div>
                        </body>
                        </html>
                        '
                    ];
                    $emailSent1 = sendEmail($emailParams1['to'], $emailParams1['subject'], $emailParams1['message']);
}
function StudentAccept($conn, $Faculty, $info) {
    $query_get_name = "SELECT Name FROM admin_info WHERE email = ?";
                    $stmt_get_name = mysqli_prepare($conn, $query_get_name);
                    mysqli_stmt_bind_param($stmt_get_name, "s", $Faculty);
                    mysqli_stmt_execute($stmt_get_name);
                    mysqli_stmt_store_result($stmt_get_name);

                    $facultyName = '';

                    if (mysqli_stmt_num_rows($stmt_get_name) === 1) {
                        mysqli_stmt_bind_result($stmt_get_name, $facultyName);
                        mysqli_stmt_fetch($stmt_get_name);
                    } else {
                        $facultyName = 'Default Faculty Name';
                    }
                    
                    $studentname = isset($info['Name']) ? $info['Name'] : '';
                    $studentrollno = isset($info['Roll_No']) ? $info['Roll_No'] : '';
                    $studenttitle = isset($info['Title']) ? $info['Title'] : '';
                    $complainttype = isset($info['Type']) ? $info['Type'] : '';
                    $studentemail = isset($info['email']) ? $info['email'] : '';
                    $emailParams1 = [
                        'to' => $studentemail,
                        'subject' => 'Accept Complaint Notification',
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
                                    
                                    <br/>
                                    <p>Dear '.$studentname.',<br/>
                                    <br>
                                    We are pleased to inform you that your complaint has been accepted by '.$facultyName.'. They are now responsible for addressing your concerns and providing a resolution.<br/><br/>
                '.$facultyName.'</h6>. You can expect to hear from them soon regarding your complaint.<br/><br/>
                Please feel free to reach out on our website if you have any additional information or questions regarding your complaint. We want to ensure that your concerns are addressed to your satisfaction, and your input is valuable to us.<br/><br/>
                <br>
                                    <table>
                                        <tr>
                                            <td>Student Name</td>
                                            <td>:</td>
                                            <td>'.$studentname.'</td>
                                        </tr>
                                        <tr>
                                      <td>RollNo</td>
                                      <td>:</td>
                                      <td>'.$studentrollno.'</td>
                                  </tr>
                                  <tr>
                                      <td>Title</td>
                                      <td>:</td>
                                      <td>'.$studenttitle.'</td>
                                  </tr>
                                  <tr>
                                      <td>Complaint Type</td>
                                      <td>:</td>
                                      <td>'.$complainttype.'</td>
                                  </tr>
                                    </table>
                                    <br>
                                    </p>
                                    <p>
                                        <br>
                                        Thank you for bringing this matter to our attention, and we appreciate your patience as we work to resolve it.
                                        <br><br>
                                    </p>
                                </div>
                            </div>
                        </body>
                        </html>
                        '
                    ];
                    $emailSent1 = sendEmail($emailParams1['to'], $emailParams1['subject'], $emailParams1['message']);
}
function StudentReject($conn, $Faculty, $info) {
    $query_get_name = "SELECT Name FROM admin_info WHERE email = ?";
                    $stmt_get_name = mysqli_prepare($conn, $query_get_name);
                    mysqli_stmt_bind_param($stmt_get_name, "s", $Faculty);
                    mysqli_stmt_execute($stmt_get_name);
                    mysqli_stmt_store_result($stmt_get_name);

                    $facultyName = ''; // Initialize a variable to store the faculty name

                    if (mysqli_stmt_num_rows($stmt_get_name) === 1) {
                        mysqli_stmt_bind_result($stmt_get_name, $facultyName);
                        mysqli_stmt_fetch($stmt_get_name);
                    } else {
                        $facultyName = 'Default Faculty Name';
                    }
                    
                    $studentname = isset($info['Name']) ? $info['Name'] : '';
                    $studentrollno = isset($info['Roll_No']) ? $info['Roll_No'] : '';
                    $studenttitle = isset($info['Title']) ? $info['Title'] : '';
                    $complainttype = isset($info['Type']) ? $info['Type'] : '';
                    $studentemail = isset($info['email']) ? $info['email'] : '';
                    $emailParams1 = [
                        'to' => $Faculty,
                        'subject' => 'Forward Complaint Notification',
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
                                    
                                    <br/>
                                    <p>Dear '.$studentname.',<br/>
                                    <br>
                                    We want to acknowledge receipt of your recent complaint regarding [Nature of Complaint], which you submitted on [Date of Complaint]. After a thorough review and careful consideration of the matter, we regret to inform you that your complaint has been evaluated and subsequently rejected.

                                    <br/>We understand that this decision may be disappointing to you, and we want to assure you that we take all complaints seriously and investigate them diligently.<br>
                                    <table>
                                        <tr>
                                            <td>Student Name</td>
                                            <td>:</td>
                                            <td>'.$studentname.'</td>
                                        </tr>
                                        <tr>
                                      <td>RollNo</td>
                                      <td>:</td>
                                      <td>'.$studentrollno.'</td>
                                  </tr>
                                  <tr>
                                      <td>Title</td>
                                      <td>:</td>
                                      <td>'.$studenttitle.'</td>
                                  </tr>
                                  <tr>
                                      <td>Complaint Type</td>
                                      <td>:</td>
                                      <td>'.$complainttype.'</td>
                                  </tr>
                                    </table>
                                    <br>
                                    </p>
                                    <p>
                                    <br>
                                        Thank you for bringing this matter to our attention, and we appreciate your patience as we work to resolve it.
                                        <br><br>
                                    </p>
                                </div>
                            </div>
                        </body>
                        </html>
                        '
                    ];
                    $emailSent1 = sendEmail($emailParams1['to'], $emailParams1['subject'], $emailParams1['message']);
}
function StudentComplete($conn, $Faculty, $info) {
    $query_get_name = "SELECT Name FROM admin_info WHERE email = ?";
                    $stmt_get_name = mysqli_prepare($conn, $query_get_name);
                    mysqli_stmt_bind_param($stmt_get_name, "s", $Faculty);
                    mysqli_stmt_execute($stmt_get_name);
                    mysqli_stmt_store_result($stmt_get_name);

                    $facultyName = ''; // Initialize a variable to store the faculty name

                    if (mysqli_stmt_num_rows($stmt_get_name) === 1) {
                        mysqli_stmt_bind_result($stmt_get_name, $facultyName);
                        mysqli_stmt_fetch($stmt_get_name);
                    } else {
                        $facultyName = 'Default Faculty Name';
                    }
                    
                    $studentname = isset($info['Name']) ? $info['Name'] : '';
                    $studentrollno = isset($info['Roll_No']) ? $info['Roll_No'] : '';
                    $studenttitle = isset($info['Title']) ? $info['Title'] : '';
                    $complainttype = isset($info['Type']) ? $info['Type'] : '';
                    $studentemail = isset($info['email']) ? $info['email'] : '';
                    $emailParams1 = [
                        'to' => $Faculty,
                        'subject' => 'Forward Complaint Notification',
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
                                    
                                    <br/>
                                    <p>Dear '.$facultyName.',<br/>
                                    <br>
                                    I hope this message finds you well. I am forwarding a complaint that has been raised by a student. The details of the complaint are as follows:<br/>
                                    <br>
                                    <table>
                                        <tr>
                                            <td>Student Name</td>
                                            <td>:</td>
                                            <td>'.$studentname.'</td>
                                        </tr>
                                        <tr>
                                      <td>RollNo</td>
                                      <td>:</td>
                                      <td>'.$studentrollno.'</td>
                                  </tr>
                                  <tr>
                                      <td>Title</td>
                                      <td>:</td>
                                      <td>'.$studenttitle.'</td>
                                  </tr>
                                  <tr>
                                      <td>Complaint Type</td>
                                      <td>:</td>
                                      <td>'.$complainttype.'</td>
                                  </tr>
                                    </table>
                                    <br>
                                    </p>
                                    <p>
                                        As the faculty member responsible for handling such matters, I kindly request your attention to this complaint. Our priority is to ensure a swift and fair resolution to address the student\'s concerns.<br/>
                                        <br>
                                        Thank you for bringing this matter to our attention, and we appreciate your patience as we work to resolve it.
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
                        </html>
                        '
                    ];
                    $emailSent1 = sendEmail($emailParams1['to'], $emailParams1['subject'], $emailParams1['message']);
}
?>

