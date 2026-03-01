<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);


if (isset($data['title'], $data['author'], $data['category'], $data['status'])) {
    $title = $data['title'];
    $author = $data['author'];
    $category = $data['category'];
    $status = $data['status']; 

    
    $sql = "INSERT INTO Books (title, author, category, status) VALUES (?, ?, ?, ?)";
    $params = array($title, $author, $category, $status);
    $stmt = sqlsrv_query($conn, $sql, $params);

    if ($stmt) {
        echo json_encode(["status" => "success", "message" => "Book added"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database error"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "All fields required"]);
}
?>