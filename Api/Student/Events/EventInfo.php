<?php

include './../../main.php';


if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $eventId = isset($_GET['eventId']) ? $_GET['eventId'] : '';
    $email = isset($_GET['email']) ? $_GET['email'] : '';

    if ($eventId === '' || $email === '') {
        echo json_encode(['success' => false, 'message' => 'Please provide eventId and email']);
        exit;
    }

    $fetchStudentInfoQuery = "SELECT Department, Batch, Class FROM student_info WHERE Email = '$email'";
    $studentInfoData = mysqli_query($conn, $fetchStudentInfoQuery);

    if (!$studentInfoData) {
        die('Query failed: ' . mysqli_error($conn));
        echo json_encode(['success' => false, 'message' => 'Server error']);
    } else {
        $studentInfoRow = mysqli_fetch_assoc($studentInfoData);
        $department = $studentInfoRow['Department'];
        $batch = $studentInfoRow['Batch'];
        $class = $studentInfoRow['Class'];
        
        $checkConstraintsQuery = "SELECT constraints,visible FROM events WHERE event_id = '$eventId' ";

        $constraintsResult = mysqli_query($conn, $checkConstraintsQuery);
        
        if (!$constraintsResult) {
            die('Query failed: ' . mysqli_error($conn));
            echo json_encode(['success' => false, 'message' => 'Server error']);
        } else {
            $constraintsRow = mysqli_fetch_assoc($constraintsResult);
            
            if ($constraintsRow) {
                $constraint = json_decode($constraintsRow['constraints'], true);
                $visible = $constraintsRow['visible'];
                $hasConstraints = false;
                    if (($visible !== 'constraint'||($constraint[0] === 'Not Applied') ||
                    ($constraint[0] === $department && $constraint[1] === 'Not Applied') ||
                    ($constraint[0] === $department && $constraint[1] === $batch && $constraint[2] === 'Not Applied') ||
                    ($constraint[0] === $department && $constraint[1] === $batch && $constraint[2] ===  $class)
                    )) {
                        $hasConstraints = true;
                    }
                if ($hasConstraints) {
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

                                if ($responseCount == 0) {
                                    $studentQuery = "SELECT Name, Roll_No FROM student_info WHERE Email='$email'";
                                    $studentResult = mysqli_query($conn, $studentQuery);

                                    if ($studentResult) {
                                        $studentInfo = mysqli_fetch_assoc($studentResult);

                                        $eventQuery = "SELECT * FROM events WHERE event_id = '$eventId'";
                                        $eventResult = mysqli_query($conn, $eventQuery);

                                        if ($eventResult) {
                                            $eventInfo = mysqli_fetch_assoc($eventResult);
                                            echo json_encode(['success' => true, 'eventInfo' => $eventInfo, 'studentInfo' => $studentInfo]);
                                        } else {
                                            echo json_encode(['success' => false, 'message' => 'Server error']);
                                        }
                                    } else {
                                        echo json_encode(['success' => false, 'message' => 'Error fetching student information']);
                                    }
                                } else {
                                    echo json_encode(['success' => false, 'message' => 'Email already responded to this event']);
                                }
                            } else {
                                echo json_encode(['success' => false, 'message' => 'Invalid event']);
                            }
                        } else {
                            echo json_encode(['success' => false, 'message' => 'Invalid event']);
                        }
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Invalid event']);
                    }
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Constraints not matching exceptional condition']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'No constraints found for the given event']);
        }

        }
    }
}
mysqli_close($conn);
?>
