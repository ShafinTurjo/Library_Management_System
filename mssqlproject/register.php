<?php
// ১. এই হেডারগুলো সবার আগে থাকতে হবে (React কানেকশনের জন্য)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") exit;

include "index.php"; 

$data = json_decode(file_get_contents("php://input"), true);

// ২. ডাটা রিসিভ করা (সিনট্যাক্স ঠিক করা হয়েছে)
$name = trim($data["name"] ?? "");
$email = trim($data["email"] ?? "");
$userId = trim($data["userId"] ?? "");
$password = $data["password"] ?? ""; 
$role = trim($data["role"] ?? "Member");

// ৩. সব ফিল্ড চেক করা
if ($name === "" || $email === "" || $userId === "" || $password === "") {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit;
}

// ৪. ডুপ্লিকেট ইউজার চেক
$checkSql = "SELECT userId FROM users WHERE userId = ? OR email = ?";
$checkStmt = sqlsrv_query($conn, $checkSql, array($userId, $email));

if (sqlsrv_has_rows($checkStmt)) {
    echo json_encode(["status" => "error", "message" => "User ID or Email already exists"]);
    exit;
}

// ৫. নতুন টেবিল স্ট্রাকচার অনুযায়ী ডাটা ইনসার্ট
$insertSql = "INSERT INTO users (name, email, userId, password, role) VALUES (?, ?, ?, ?, ?)";
$params = array($name, $email, $userId, $password, $role);
$stmt = sqlsrv_query($conn, $insertSql, $params);

if ($stmt) {
    echo json_encode(["status" => "success", "message" => "Registration successful"]);
} else {
    echo json_encode(["status" => "error", "message" => "Registration failed", "details" => sqlsrv_errors()]);
}

sqlsrv_close($conn);
?>