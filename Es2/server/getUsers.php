<?php
$servername = "localhost";
$dbname = "chat_db";
$dbusername = "root";
$dbpassword = "";

$idUser = $_GET["idUser"];

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, username FROM utenti WHERE id <> $idUser";
$result = $conn->query($sql);

$users = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = array('id' => $row['id'], 'name' => $row['username']);
    }
}

$conn->close();

echo json_encode($users);
