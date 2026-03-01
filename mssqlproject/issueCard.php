<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");
include "index.php"; 

$data = json_decode(file_get_contents("php://input"), true);

if($data) {
    $userId = $data['userId'];
    $cardNumber = $data['cardNumber'];
    $issueDate = $data['issueDate'];
    $expiryDate = $data['expiryDate'];

    $sql = "INSERT INTO LibraryCards (userId, cardNumber, issueDate, expiryDate, status) 
            VALUES (?, ?, ?, ?, 'Active')";
    $params = array($userId, $cardNumber, $issueDate, $expiryDate);
    
    $stmt = sqlsrv_query($conn, $sql, $params);

    if($stmt) {
        echo json_encode(["message" => "Card Issued Successfully"]);
    } else {
        echo json_encode(["error" => "Failed to Issue Card"]);
    }
}
?>