<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once "db.php";

$input = json_decode(file_get_contents("php://input"), true);

$id = (int)($input["AuthorID"] ?? 0);

if ($id <= 0) {
    echo json_encode(["status"=>"error","message"=>"Invalid ID"]);
    exit;
}

$sql = "DELETE FROM Author WHERE AuthorID=?";
$stmt = sqlsrv_query($conn, $sql, [$id]);

if ($stmt === false) {
    echo json_encode(["status"=>"error","errors"=>sqlsrv_errors()]);
    exit;
}

echo json_encode(["status"=>"success","message"=>"Author deleted"]);