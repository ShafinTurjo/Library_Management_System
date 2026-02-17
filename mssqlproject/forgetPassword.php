<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");
if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") 
{
    exit;
}
include "index.php";
$data = json_decode(file_get_contents("php://input"), true);
$email = trim($data["email"] ?? "");

if ($email === "") {
    echo json_encode([
        "status" => "error",
        "message" => "Email is required"
    ]);
    exit;
}
$response = [
    "status" => "success",
    "message" => "If the email exists, a reset link has been sent"
];
$sql = "SELECT id FROM users WHERE email = ?";
$stmt = sqlsrv_query($conn, $sql, [$email]);

if ($stmt === false) {
    echo json_encode([
        "status" => "error",
        "message" => "Database error"
    ]);
    exit;
}

if (sqlsrv_has_rows($stmt)) 
{
    $token = bin2hex(random_bytes(32));
    $token_hash = hash("sha256", $token);
    $expire = date("Y-m-d H:i:s", strtotime("+1 hour"));
    $updateSql = "UPDATE users 
                  SET reset_token = ?, token_expire = ? 
                  WHERE email = ?";

    $updateStmt = sqlsrv_query($conn, $updateSql, [
        $token_hash,
        $expire,
        $email
    ]);
    if ($updateStmt) 
    {
        $reset_link = "http://localhost/mssqlproject/resetpassword.php?token=" . $token;

        $subject = "Password Reset Request";
        $message = "Click the link below to reset your password:\n\n" . $reset_link;
        $headers = "From: no-reply@localhost";
        
        @mail($email, $subject, $message, $headers);
    }

    sqlsrv_free_stmt($updateStmt);
}

sqlsrv_free_stmt($stmt);
sqlsrv_close($conn);

echo json_encode($response);
?>
