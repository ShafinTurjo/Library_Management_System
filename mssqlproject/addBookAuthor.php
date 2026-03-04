<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") { http_response_code(200); exit(); }
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode(["status"=>"error","message"=>"Only POST allowed"]);
  exit();
}

require_once "db.php";

$raw = file_get_contents("php://input");
$input = json_decode($raw, true);

$BookID = (int)($input["BookID"] ?? 0);
$AuthorID = (int)($input["AuthorID"] ?? 0);

if ($BookID <= 0 || $AuthorID <= 0) {
  http_response_code(400);
  echo json_encode(["status"=>"error","message"=>"BookID and AuthorID required"]);
  exit();
}

$sql = "INSERT INTO dbo.BookAuthor (BookID, AuthorID) VALUES (?, ?)";
$stmt = sqlsrv_query($conn, $sql, [$BookID, $AuthorID]);

if ($stmt === false) {
  http_response_code(500);
  echo json_encode(["status"=>"error","message"=>"Insert failed","errors"=>sqlsrv_errors()]);
  exit();
}

echo json_encode(["status"=>"success","message"=>"Linked"]);