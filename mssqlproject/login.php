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

if ($userId === "" || $password === "") {
    echo json_encode(["status" => "error", "message" => "User ID and Password required"]);
    exit;
}


$sql = "SELECT userId, password, role FROM users WHERE userId = ?";
$params = array($userId);
$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    echo json_encode(["status" => "error", "message" => "Query failed"]);
    exit;
}

$user = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

if ($user) {
    
    if ($password === $user['password']) {
        echo json_encode([
            "status" => "success",
            "role" => trim($user['role']),
            "message" => "Login Successful"
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Incorrect Password"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "User not found"]);
}

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);
?>
