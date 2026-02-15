<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}


$serverName = ".\SQLEXPRESS"; 
$database = "LibraryDB"; 
$uid = "new";
$pass = "1234";

$connectionInfo = array(
    "Database" => $database,
    "Uid" => $uid,
    "PWD" => $pass,
    "CharacterSet" => "UTF-8"
);


$conn = sqlsrv_connect($serverName, $connectionInfo);


if (!$conn) {
    echo json_encode(["status" => "error", "message" => "Connection failed"]);
    exit();
}
?>