<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


require_once __DIR__ . "/db.php";


$raw = file_get_contents("php://input");
$data = json_decode($raw, true);


if (!is_array($data)) {
    if (!empty($_POST)) {
        $data = $_POST;
    } else {
        http_response_code(400);
        echo json_encode([
            "status" => "error",
            "message" => "Invalid request body",
            "debug" => [
                "request_method" => $_SERVER["REQUEST_METHOD"] ?? null,
                "content_type" => $_SERVER["CONTENT_TYPE"] ?? null,
                "content_length" => $_SERVER["CONTENT_LENGTH"] ?? null,
                "raw_len" => strlen($raw),
                "raw_preview" => substr($raw, 0, 250)
            ]
        ]);
        exit();
    }
}

$userId = trim($data["userId"] ?? "");
$password = $data["password"] ?? "";


if ($userId === "" || $password === "") {
    http_response_code(400);
    echo json_encode([
        "status" => "error",
        "message" => "ID and Password required",
        "debug" => [
            "received_userId" => $userId,
            "received_password_len" => strlen((string)$password)
        ]
    ]);
    exit();
}


$sql = "SELECT id, name, email, userId, password, role FROM users WHERE userId = ?";
$stmt = sqlsrv_query($conn, $sql, [$userId]);

if ($stmt === false) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Query failed",
        "details" => sqlsrv_errors()
    ]);
    exit();
}

$row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

if (!$row) {
    http_response_code(401);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid credentials"
    ]);
    exit();
}


if (!password_verify($password, $row["password"])) {
    http_response_code(401);
    echo json_encode([
        "status" => "error",
        "message" => "Invalid credentials"
    ]);
    exit();
}

echo json_encode([
    "status" => "success",
    "message" => "Login successful",
    "user" => [
        "id" => $row["id"],
        "name" => $row["name"],
        "email" => $row["email"],
        "userId" => $row["userId"],
        "role" => $row["role"]
    ]
]);

sqlsrv_close($conn);
