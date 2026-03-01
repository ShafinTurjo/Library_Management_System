<?php
$serverName = "localhost\\SQLEXPRESS";
$connectionOptions = [
    "Database" => "LibraryDB",
    "Uid" => "new",
    "PWD" => "1234"
];

$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn === false) {
    http_response_code(500);
    die(json_encode([
        "status" => "error",
        "message" => "DB connection failed",
        "details" => sqlsrv_errors()
    ]));
}