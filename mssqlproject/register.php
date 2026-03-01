<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") exit;

require_once "db.php"; 

$data = json_decode(file_get_contents("php://input"), true);
$userId = trim($data["userId"] ?? "");
$password = trim($data["password"] ?? "");
$name = trim($data["name"] ?? "");
$email = trim($data["email"] ?? ""); 
$role = $data["role"] ?? "user"; 


if ($userId === "" || $password === "" || $name === "" || $email === "") {
    echo json_encode(["status" => "error", "message" => "All fields including email are required"]);
    exit;
}


$sql = "INSERT INTO users (userId, password, name, role, email) VALUES (?, ?, ?, ?, ?)";
$params = array($userId, $password, $name, $role, $email);
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    echo json_encode([
        "status" => "error", 
        "message" => "Registration failed", 
        "details" => sqlsrv_errors() 
    ]);
} else {
    echo json_encode(["status" => "success", "message" => "Registration successful"]);
}

sqlsrv_close($conn);
?>