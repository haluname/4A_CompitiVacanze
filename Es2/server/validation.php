<?php

$data = json_decode(file_get_contents("php://input"), true);

$username = $data["username"];
$password = $data["password"];

$servername = "localhost";
$dbname = "chat_db";
$dbusername = "root"; 
$dbpassword = "";

$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id FROM utenti WHERE username = '$username' AND password = '$password'";
$result = $conn->query($sql);


if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $id = $row["id"];
    echo json_encode(["success" => true, "message" => "Login successful", "id" => $id]);
} else {
    echo json_encode(["success" => false, "message" => "Invalid username or password"]);
}

$conn->close();


