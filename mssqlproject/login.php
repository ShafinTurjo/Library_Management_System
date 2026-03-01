<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") exit;

include "index.php"; 

$data = json_decode(file_get_contents("php://input"), true);
$userId = trim($data["userId"] ?? "");
$password = trim($data["password"] ?? "");

if ($userId === "" || $password === "") {
    echo json_encode(["status" => "error", "message" => "ID and Password required"]);
    exit;
}


$sql = "SELECT userId, password, role, name FROM users WHERE userId = ?";
$stmt = sqlsrv_query($conn, $sql, array($userId));

if ($stmt === false) {
    echo json_encode(["status" => "error", "message" => "Database query error"]);
    exit;
}

$user = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);


if ($user && $user['password'] === $password) {
    echo json_encode([
        "status" => "success",
        "message" => "Login successful",
        "role" => $user['role'],
        "name" => $user['name']
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid Credentials"]);
}

sqlsrv_close($conn);
