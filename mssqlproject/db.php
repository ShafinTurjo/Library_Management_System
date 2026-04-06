<?php
sqlsrv_configure("WarningsReturnAsErrors", 0);

$serverName = "DESKTOP-4A789EU\\SQLEXPRESS";

$connectionOptions = [
    "UID" => "new",
    "PWD" => "1234"
];

$conn = sqlsrv_connect($serverName, $connectionOptions);

if ($conn === false) {
    http_response_code(500);
    die(json_encode([
        "status" => "error",
        "details" => sqlsrv_errors()
    ]));
}