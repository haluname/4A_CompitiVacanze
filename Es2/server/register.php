<?php

$data = json_decode(file_get_contents("php://input"), true);

$username = $data["username"];
$password = $data["password"];

$servername = "localhost";
$dbname = "chat_db";
$dbusername = "root";
$dbpassword = "";

// Connessione al database
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Verifica se l'username esiste già
$sql = "SELECT id FROM utenti WHERE username = '$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode(["success" => false, "message" => "Username already exists"]);
} else {
    // Inserimento del nuovo utente
    $sql = "INSERT INTO utenti (username, password) VALUES ('$username', '$password')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true, "message" => "Registration successful"]);
    } else {
        echo json_encode(["success" => false, "message" => "Registration failed"]);
    }
}

$conn->close();

?>
