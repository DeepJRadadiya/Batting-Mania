<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = ""; 
$database = "example_db"; 
$table = "example_table";

// Create connection
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if database exists
$sql = "SHOW DATABASES LIKE '$database';";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    // if Database does not exist, create it
    $sql = "CREATE DATABASE $database";
    if ($conn->query($sql) === TRUE) {
        echo "Database '$database' created successfully.<br>";
    } else {
        die("Error creating database: " . $conn->error);
    }
} else {
    echo "Database '$database' already exists.<br>";
}


$conn->select_db($database);

// Check if table exists
$sql = "SHOW TABLES LIKE '$table';";
$result = $conn->query($sql);

if ($result->num_rows == 0) {
    // Table does not exist, create it
    $sql = "CREATE TABLE $table (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";

    if ($conn->query($sql) === TRUE) {
        echo "Table '$table' created successfully.<br>";
    } else {
        die("Error creating table: " . $conn->error);
    }
} else {
    echo "Table '$table' already exists.<br>";
}

// Close the connection
$conn->close();
?>
