<?php
header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__ . "/db.php";

echo json_encode([
    "success" => true,
    "message" => "Connected successfully"
]);

sqlsrv_close($conn);