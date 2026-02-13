<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");


$serverName = ".\SQLEXPRESS"; 
$database = "LibraryDB"; 
$uid = "new";
$pass = "1234";

$connectionInfo = [
    "Database" => $database,
    "Uid" => $uid,
    "PWD" => $pass,
    "CharacterSet" => "UTF-8"
];

sqlsrv_configure("WarningsReturnAsErrors", 0);
$conn = sqlsrv_connect($serverName, $connectionInfo);

if (!$conn) {
    die(json_encode(["status" => "error", "message" => "Connection failed"]));
}
?>