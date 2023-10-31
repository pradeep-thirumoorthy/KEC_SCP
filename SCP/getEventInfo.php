<?php
header("Access-Control-Allow-Origin: http://192.168.157.250:3000");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

$host = 'localhost';
$user = 'root';
$password = '';
$database = 'admin';

$conn = mysqli_connect($host, $user, $password, $database);

if (!$conn) {
    die('Connection failed: ' . mysqli_connect_error());
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $eventId = isset($_GET['eventId']) ? $_GET['eventId'] : '';
    $email = isset($_GET['email']) ? $_GET['email'] : 'pradeept.21cse@kongu.edu';

    if ($eventId === '' || $email === '') {
        echo json_encode(['success' => false, 'message' => 'Please provide eventId and email']);
        exit;
    }

    $checkStatusQuery = "SELECT Status, IntervalTime FROM events WHERE event_id = '$eventId'";
    $statusResult = mysqli_query($conn, $checkStatusQuery);

    if (!$statusResult) {
        die('Query failed: ' . mysqli_error($conn));
        echo json_encode(['success' => false, 'message' => 'Server error']);
    }

    $statusRow = mysqli_fetch_assoc($statusResult);
    $eventStatus = $statusRow['Status'];
    $intervalTime = $statusRow['IntervalTime'];

    if ($eventStatus === 'closed') {
        echo json_encode(['success' => false, 'message' => 'The event is already closed']);
        exit;
    }
    if (strtotime($intervalTime) < strtotime(date('Y-m-d'))) {
        $updateStatusQuery = "UPDATE events SET Status = 'closed' WHERE event_id = '$eventId'";
        $updateStatusResult = mysqli_query($conn, $updateStatusQuery);

        if (!$updateStatusResult) {
            die('Query failed: ' . mysqli_error($conn));
            echo json_encode(['success' => false, 'message' => 'Server error']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Event is closed because IntervalTime is expired.']);
            exit;
        }
    }

    $query = "SELECT COUNT(*) AS validEventCount FROM events WHERE event_id = '$eventId' AND Status = 'open'";
    $result = mysqli_query($conn, $query);

    if (!$result) {
        die('Query failed: ' . mysqli_error($conn));
        echo json_encode(['success' => false, 'message' => 'Server error']);
    } else {
        $row = mysqli_fetch_assoc($result);
        $isValidEvent = $row['validEventCount'] > 0;

        if ($isValidEvent) {
            $checkResponseQuery = "SELECT COUNT(*) AS responseCount FROM events_response WHERE Event_id = '$eventId' AND Email = '$email'";
            $responseResult = mysqli_query($conn, $checkResponseQuery);

            if (!$responseResult) {
                die('Query failed: ' . mysqli_error($conn));
                echo json_encode(['success' => false, 'message' => 'Server error']);
            }

            $responseRow = mysqli_fetch_assoc($responseResult);
            $responseCount = $responseRow['responseCount'];

            $limitQuery = "SELECT `limits` FROM events WHERE event_id = '$eventId'";
            $limitResult = mysqli_query($conn, $limitQuery);

            if ($limitResult) {
                $limitRow = mysqli_fetch_assoc($limitResult);

                if ($limitRow && isset($limitRow['limits'])) {
                    $eventLimit = $limitRow['limits'];

                    if ($responseCount < $eventLimit) {
                        if ($responseCount == 0) {
                            $eventQuery = "SELECT * FROM events WHERE event_id = '$eventId'";
                            $eventResult = mysqli_query($conn, $eventQuery);

                            if ($eventResult) {
                                $eventInfo = mysqli_fetch_assoc($eventResult);
                                echo json_encode(['success' => true, 'eventInfo' => $eventInfo]);
                            } else {
                                echo json_encode(['success' => false, 'message' => 'Server error']);
                            }
                        } else {
                            echo json_encode(['success' => false, 'message' => 'Email already responded to this event']);
                        }
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Response limit exceeded']);
                    }
                } else {
                    echo json_encode(['success' => false, 'message' => 'Invalid event']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Invalid eventId']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid eventId']);
        }
    }
}

mysqli_close($conn);
?>
