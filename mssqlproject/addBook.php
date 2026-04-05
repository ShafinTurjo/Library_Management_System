<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
  http_response_code(200);
  exit();
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo json_encode([
    "status" => "error",
    "message" => "Only POST allowed"
  ]);
  exit();
}

require_once __DIR__ . "/db.php";

$raw = file_get_contents("php://input");
$input = json_decode($raw, true);

if (!is_array($input)) {
  http_response_code(400);
  echo json_encode([
    "status" => "error",
    "message" => "Invalid JSON body",
    "raw_preview" => substr($raw, 0, 200)
  ]);
  exit();
}

$title = trim($input["title"] ?? "");
$authorText = trim($input["author"] ?? "");
$category = trim($input["category"] ?? "");
$status = trim($input["status"] ?? "Available");

if ($title === "" || $authorText === "" || $category === "" || $status === "") {
  http_response_code(400);
  echo json_encode([
    "status" => "error",
    "message" => "title, author, category, status required"
  ]);
  exit();
}

$sql = "INSERT INTO dbo.Books (title, author, category, [status])
        OUTPUT INSERTED.id AS bookId
        VALUES (?, ?, ?, ?)";

$params = [$title, $authorText, $category, $status];

$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
  http_response_code(500);
  echo json_encode([
    "status" => "error",
    "message" => "Insert failed",
    "errors" => sqlsrv_errors(),
    "debug" => [
      "title" => $title,
      "author" => $authorText,
      "category" => $category,
      "status" => $status
    ]
  ]);
  exit();
}

$row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
$bookId = (int)($row["bookId"] ?? 0);

echo json_encode([
  "status" => "success",
  "bookId" => $bookId
]);

sqlsrv_close($conn);
?>