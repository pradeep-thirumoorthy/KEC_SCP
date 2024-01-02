<?php
header("Access-Control-Allow-Origin: http://192.168.77.250:3000"); // Replace with your React app's URL
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Disable caching for the login response
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Expires: 0");

// Replace these credentials with your actual database credentials
$host = '192.168.77.250';
$user = 'root';
$password = '';
$database = 'sgp';

// Connect to the database
$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

// Endpoint to handle updating events_response
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $formdata = isset($data['formdata']) ? json_encode($data['formdata']) : '';
    $eventid = isset($data['eventId']) ? $data['eventId'] : '';
    $email = isset($data['email']) ? $data['email'] : '';

    if ($eventid === '' || $formdata === '' || $email === '') {
        echo json_encode(['success' => false, 'message' => 'Please provide eventid, formdata, and email']);
        exit;
    }

    $checkquery = "SELECT COUNT(*) as count, IntervalTime FROM events WHERE event_id = ? AND Status = 'open'";
    $stmt = mysqli_prepare($conn, $checkquery);
    mysqli_stmt_bind_param($stmt, "i", $eventid); // Assuming $eventid is the event ID you want to check
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $count, $intervalTime);
    mysqli_stmt_fetch($stmt);
    mysqli_stmt_close($stmt);

    if ($count > 0) {
        // Check if the current date is within the specified interval
        if ($intervalTime >= date('Y-m-d')) {
            // Your code to create an event goes here
            // ...

            // Check the current response count for the event
            $responseCountQuery = "SELECT COUNT(*) AS response_count FROM events_response WHERE Event_id = '$eventid'";
            $responseCountResult = mysqli_query($conn, $responseCountQuery);

            if (!$responseCountResult) {
                die('Query failed: ' . mysqli_error($conn));
                echo json_encode(['success' => false, 'message' => 'Server error']);
                exit;
            }

            $responseCountRow = mysqli_fetch_assoc($responseCountResult);
            $currentResponseCount = $responseCountRow['response_count'];

            // Check the limit for the event from the events table
            $limitQuery = "SELECT `limits` FROM events WHERE event_id = '$eventid'";
            $limitResult = mysqli_query($conn, $limitQuery);

            if ($limitResult) {
                $limitRow = mysqli_fetch_assoc($limitResult);

                if ($limitRow && isset($limitRow['limits'])) {
                    $eventLimit = $limitRow['limits'];

                    if ($currentResponseCount < $eventLimit) {
                        // Insert the new row into the events_response table
                        $insertQuery = "INSERT INTO events_response (Event_id, Response, Email, Timestop) VALUES ('$eventid', '$formdata', '$email', NOW())";
                        $insertResult = mysqli_query($conn, $insertQuery);

                        if ($insertResult) {
                            echo json_encode(['success' => true, 'message' => 'Event response inserted successfully']);
                        } else {
                            die('Query failed: ' . mysqli_error($conn));
                            echo json_encode(['success' => false, 'message' => 'Server error']);
                        }
                    } else {
                            $changeQuery = "UPDATE events SET Status = 'closed' WHERE event_id = '$eventid'";
                            $changeResult = mysqli_query($conn, $changeQuery);
                        
                            if ($changeResult) {
                                echo json_encode(['success' => false, 'message' => 'Response limit exceeded for the event']);
                            } else {
                                die('Query failed: ' . mysqli_error($conn));
                                echo json_encode(['success' => false, 'message' => 'Server error']);
                            }
                    }
                } else {
                    echo json_encode(['success' => false, 'message' => 'Event not found or limits not defined']);
                }
            } else {
                die('Query failed: ' . mysqli_error($conn));
                echo json_encode(['success' => false, 'message' => 'Server error']);
            }
        } else {
            // Update status as 'closed' because IntervalTime is not valid
            $changeQuery = "UPDATE events SET Status = 'closed' WHERE event_id = '$eventid'";
            $changeResult = mysqli_query($conn, $changeQuery);

            if ($changeResult) {
                echo json_encode(['success' => false, 'message' => 'IntervalTime is expired. Event is about to closed.']);
            } else {
                die('Query failed: ' . mysqli_error($conn));
                echo json_encode(['success' => false, 'message' => 'Server error']);
            }
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Event is not open']);
    }
}

mysqli_close($conn);
?>
