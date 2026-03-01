<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") exit;

require_once "db.php"; 

$data = json_decode(file_get_contents("php://input"), true);
$userId = $data["userId"] ?? "";
$password = $data["password"] ?? "";

if ($userId && $password) {
    
    $sql = "SELECT userId, name, role, password FROM Users WHERE userId = ?";
    $stmt = sqlsrv_query($conn, $sql, array($userId));
    
    $user = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

    if ($user && $user['password'] === $password) {
        echo json_encode([
            "status" => "success",
            "name" => $user['name'],
            "role" => $user['role']
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid ID or Password"]);
    }
}
sqlsrv_close($conn);
?>