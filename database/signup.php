<?php

include 'connection.php';


if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['email']) && isset($_POST['password']) && isset($_POST['isLoggedIn'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $isLoggedIn = $_POST['isLoggedIn'];

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO users (email, password, isLoggedIn) VALUES (?, ?, ?)");
    $stmt->bind_param("ssi", $email, $hashedPassword, $isLoggedIn); // Binding parameters (email, hashed password, isLoggedIn)

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "User registered successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(["success" => false, "message" => "Email, password, and isLoggedIn are required."]);
}
?>