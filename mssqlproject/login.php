<?php

include 'index.php'; 


$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && $data) {
    $uId = $data['userId'];
    $pass = $data['password'];

    
    $sql = "SELECT userId, role FROM users WHERE userId = ? AND password = ?";
    $params = array($uId, $pass);
    $stmt = sqlsrv_query($conn, $sql, $params);

    
    if ($stmt === false) {
        echo json_encode(["status" => "error", "message" => "Database Query Error"]);
        exit;
    }

    $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

    if ($row) {
        echo json_encode([
            "status" => "success",
            "role" => $row['role'], 
            "message" => "Login Successful"
        ]);
    } else {
        echo json_encode([
            "status" => "error", 
            "message" => "Invalid ID or Password"
        ]);
    }
    
    sqlsrv_free_stmt($stmt);
}
sqlsrv_close($conn);
?>