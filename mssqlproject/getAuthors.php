<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") { http_response_code(200); exit(); }

require_once "db.php";

$sql = "SELECT AuthorID, AuthorName, Country, Bio FROM dbo.Author ORDER BY AuthorID DESC";
$stmt = sqlsrv_query($conn, $sql);

if ($stmt === false) {
  http_response_code(500);
  echo json_encode(["status"=>"error","errors"=>sqlsrv_errors()]);
  exit();
}

$data = [];
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
  $data[] = $row;
}

echo json_encode(["status"=>"success","data"=>$data]);