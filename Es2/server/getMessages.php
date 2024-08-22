<?php
$servername = "localhost";
$dbname = "chat_db";
$dbusername = "root";
$dbpassword = "";

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$myUserId = $_GET['userId'];
$otherUserId = $_GET['otherUserId'];

$sql = "SELECT sender_id, content, timestamp 
        FROM messaggi 
        WHERE (sender_id = '$myUserId' AND receiver_id = '$otherUserId') 
        OR (sender_id = '$otherUserId' AND receiver_id = '$myUserId') 
        ORDER BY timestamp ASC";

$result = $conn->query($sql);

$messages = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $messages[] = array(
            'sender_id' => $row['sender_id'], 
            'content' => $row['content'], 
            'timestamp' => $row['timestamp']
        );
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($messages);
?>
