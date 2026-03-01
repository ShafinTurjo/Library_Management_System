<?php

$serverName = ".\SQLEXPRESS"; 

$connectionOptions = [
    "Database" => "LibraryDB",
    "Uid" => "new",
    "PWD" => "1234",
    "CharacterSet" => "UTF-8",
    "TrustServerCertificate" => true,
    "Encrypt" => false
];


sqlsrv_configure("WarningsReturnAsErrors", 0);

$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn === false) {
    header('Content-Type: application/json');
    die(json_encode([
        "status" => "error",
        "message" => "Database connection failed",
        "details" => sqlsrv_errors()
    ]));
}
?>