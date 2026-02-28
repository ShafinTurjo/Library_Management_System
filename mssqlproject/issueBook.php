<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
header("Content-Type: application/json");


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;
}

include "index.php"; 


$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['userId'], $data['bookId'], $data['days'])) {
    $userId = $data['userId'];
    $bookId = $data['bookId'];
    $days = (int)$data['days'];

    
    $checkSql = "SELECT status FROM Books WHERE id = ?";
    $checkStmt = sqlsrv_query($conn, $checkSql, array($bookId));
    $row = sqlsrv_fetch_array($checkStmt, SQLSRV_FETCH_ASSOC);

    if ($row && $row['status'] === 'Available') {
        
        
        $dueDate = date('Y-m-d', strtotime("+$days days"));

        
        $sql1 = "INSERT INTO Transactions (userId, bookId, dueDate) VALUES (?, ?, ?)";
        $params1 = array($userId, $bookId, $dueDate);
        $stmt1 = sqlsrv_query($conn, $sql1, $params1);

        
        $sql2 = "UPDATE Books SET status = 'Issued' WHERE id = ?";
        $params2 = array($bookId);
        $stmt2 = sqlsrv_query($conn, $sql2, $params2);

        if ($stmt1 && $stmt2) {
            echo json_encode(["status" => "success", "message" => "Book issued successfully!"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Database transaction failed"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Book is not available for issue or not found!"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Required fields are missing!"]);
}
?>