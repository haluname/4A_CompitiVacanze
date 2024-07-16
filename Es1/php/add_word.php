<?php
$server = "localhost";
$username = "root";
$password = "";
$db = "impiccato";

$conn = new mysqli($server, $username, $password, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['file']) && $_FILES['file']['error'] == UPLOAD_ERR_OK) {
        $file = file($_FILES['file']['tmp_name'], FILE_IGNORE_NEW_LINES);
        $stmt = $conn->prepare("INSERT INTO parole (parola) VALUES (?)");
        foreach ($file as $line) {
            $stmt->bind_param("s", $line);
            $stmt->execute();
        }
        $stmt->close();
    } elseif (isset($_POST['word'])) {
        $word = $_POST['word'];
        $stmt = $conn->prepare("INSERT INTO parole (parola) VALUES (?)");
        $stmt->bind_param("s", $word);
        $stmt->execute();
        $stmt->close();
    }
}

$conn->close();
header('Location: ../index.html');

?>
