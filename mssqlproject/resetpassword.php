<?php
include "index.php";

if (!isset($_GET['token'])) {
    die("No token provided!");
}

$token = $_GET['token'];
$token_hash = hash("sha256", $token);

// Check token + expiry
$sql = "SELECT id FROM users WHERE reset_token = ? AND token_expire > GETDATE()";
$stmt = sqlsrv_query($conn, $sql, [$token_hash]);

if ($stmt === false) {
    die("Query failed");
}

if (!sqlsrv_has_rows($stmt)) {
    die("Invalid or expired token!");
}

// If form submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $newPassword = $_POST['password'];

    if (strlen($newPassword) < 6) {
        echo "Password must be at least 6 characters!";
        exit;
    }

    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    $updateSql = "UPDATE users 
                  SET password = ?, reset_token = NULL, token_expire = NULL 
                  WHERE reset_token = ?";

    $updateStmt = sqlsrv_query($conn, $updateSql, [$hashedPassword, $token_hash]);

    if ($updateStmt) {
        echo "Password reset successful!";
        exit;
    } else {
        echo "Failed to reset password!";
        exit;
    }
}
?>

<form method="POST">
    <input type="password" name="password" placeholder="New Password" required>
    <button type="submit">Reset Password</button>
</form>
