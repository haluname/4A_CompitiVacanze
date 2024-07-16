<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "impiccato";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT parola FROM parole ORDER BY RAND() LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo $row['parola'];
} else {
    echo "No word found";
}

$conn->close();
?>
