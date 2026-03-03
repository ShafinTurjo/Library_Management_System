<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once "db.php";

$sql = "SELECT * FROM Author ORDER BY AuthorID DESC";
$stmt = sqlsrv_query($conn, $sql);

if ($stmt === false) {
    echo json_encode(["status"=>"error","errors"=>sqlsrv_errors()]);
    exit;
}

$data = [];

while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {

    if ($row["DateOfBirth"] instanceof DateTime) {
        $row["DateOfBirth"] = $row["DateOfBirth"]->format("Y-m-d");
    }

    $data[] = $row;
}

echo json_encode(["status"=>"success","data"=>$data]);