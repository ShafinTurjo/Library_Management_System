<?php
header("Access-Control-Allow-Origin: *");


sqlsrv_configure("WarningsReturnAsErrors", 0);

$serverName = ".\SQLEXPRESS";
$connectionOptions = [
    "Database" => "LibraryDB",
    "Uid" => "new",
    "PWD" => "1234",
    "TrustServerCertificate" => true,
    "CharacterSet" => "UTF-8"
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