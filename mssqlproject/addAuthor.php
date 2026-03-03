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

$name = trim($input["AuthorName"] ?? "");
$bio = $input["Bio"] ?? null;
$country = $input["Country"] ?? null;
$dob = $input["DateOfBirth"] ?? null;

if ($name == "") {
    echo json_encode(["status"=>"error","message"=>"Author name required"]);
    exit;
}

$sql = "INSERT INTO Author (AuthorName, Bio, Country, DateOfBirth)
        VALUES (?, ?, ?, ?)";

$params = [$name, $bio, $country, $dob];

$stmt = sqlsrv_query($conn, $sql, $params);

if ($stmt === false) {
    echo json_encode(["status"=>"error","errors"=>sqlsrv_errors()]);
    exit;
}

echo json_encode(["status"=>"success","message"=>"Author added"]);