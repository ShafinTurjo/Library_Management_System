<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once __DIR__ . "/db.php";

$raw = file_get_contents("php://input");
$data = json_decode($raw, true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid JSON body"
    ]);
    exit();
}

$name = trim($data["name"] ?? "");
$email = trim($data["email"] ?? "");
$userId = trim($data["userId"] ?? "");
$password = $data["password"] ?? "";
$role = trim($data["role"] ?? "Member");


if ($name === "" || $email === "" || $userId === "" || $password === "") {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "All fields are required"
    ]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid email format"
    ]);
    exit();
}

if (!isset($conn) || $conn === false) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database connection not available"
    ]);
    exit();
}

$checkSql = "SELECT userId FROM users WHERE userId = ? OR email = ?";
$checkStmt = sqlsrv_query($conn, $checkSql, [$userId, $email]);

if ($checkStmt === false) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Failed to check existing user",
        "details" => sqlsrv_errors()
    ]);
    exit();
}

if (sqlsrv_has_rows($checkStmt)) {
    http_response_code(409);
    echo json_encode([
        "status" => "error",
        "message" => "User ID or Email already exists"
    ]);
    exit();
}

// Password hash (recommended)
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

// Insert user
$insertSql = "INSERT INTO users (name, email, userId, password, role) VALUES (?, ?, ?, ?, ?)";
$insertStmt = sqlsrv_query($conn, $insertSql, [$name, $email, $userId, $hashedPassword, $role]);

if ($insertStmt === false) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Registration failed",
        "details" => sqlsrv_errors()
    ]);
    exit();
}

echo json_encode([
    "status" => "success",
    "message" => "Registration successful"
]);

sqlsrv_close($conn);
?>