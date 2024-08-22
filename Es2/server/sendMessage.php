<?php
$servername = "localhost";
$dbname = "chat_db";
$dbusername = "root";
$dbpassword = "";

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

$sender_id = $data['sender_id'];
$receiver_id = $data['receiver_id'];
$content = $data['content'];
$timestamp = date('Y-m-d H:i:s');

$sql = "INSERT INTO messaggi (sender_id, receiver_id, content, timestamp) 
        VALUES ($sender_id, $receiver_id, '$content', '$timestamp')";

$response = array();

if ($conn->query($sql) === TRUE) {
    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['error'] = $conn->error;
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($response);
?>
