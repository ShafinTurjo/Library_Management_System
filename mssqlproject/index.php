<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");


$serverName = ".\SQLEXPRESS";
$connectionOptions = [
    "Database" => "LibraryDB",
    "Uid" => "new",
    "PWD" => "1234",
    "TrustServerCertificate" => true
];

$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn === false) {
    die(json_encode([
        "success" => false,
        "message" => "Database connection failed",
        "error" => sqlsrv_errors()
    ]));
}
?>