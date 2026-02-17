<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

include "index.php";

$data = json_decode(file_get_contents("php://input"), true);

$userId = trim($data["userId"] ?? "");
$password = $data["password"] ?? "";
$role = trim($data["role"] ?? "student");

if ($userId === "" || $password === "") {
    echo json_encode(["status" => "error", "message" => "User ID and Password required"]);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$checkSql = "SELECT userId FROM users WHERE userId = ?";
$checkStmt = sqlsrv_query($conn, $checkSql, [$userId]);

if (sqlsrv_has_rows($checkStmt)) {
    echo json_encode(["status" => "error", "message" => "User already exists"]);
    exit;
}

$insertSql = "INSERT INTO users (userId, password, role) VALUES (?, ?, ?)";
$params = [$userId, $hashedPassword, $role];

$stmt = sqlsrv_query($conn, $insertSql, $params);

if ($stmt) {
    echo json_encode(["status" => "success", "message" => "Registration successful"]);
} else {
    echo json_encode(["status" => "error", "message" => "Registration failed"]);
}

sqlsrv_close($conn);
?>
