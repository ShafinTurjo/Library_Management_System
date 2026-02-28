<?php
header("Access-Control-Allow-Origin: *");

$serverName = ".\\SQLEXPRESS";
$connectionOptions = [
    "Database" => "LibraryDB",
    "Uid" => "new",
    "PWD" => "1234"
];

$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn === false) {
    echo json_encode([
        "success" => false,
        "message" => "Real connection failed",
        "error" => sqlsrv_errors()
    ]);
} else {
    echo json_encode([
        "success" => true,
        "message" => "Connected successfully"
    ]);
}
?>