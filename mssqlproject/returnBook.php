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

if (isset($data['transactionId'])) {
    $transactionId = (int)$data['transactionId'];

    
    $sql = "SELECT bookId, dueDate FROM Transactions WHERE transactionId = ? AND returnDate IS NULL";
    $stmt = sqlsrv_query($conn, $sql, array($transactionId));
    $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

    if ($row) {
        $bookId = $row['bookId'];
        $dueDate = $row['dueDate']; 
        
        $today = new DateTime();
        $due = new DateTime($dueDate->format('Y-m-d'));
        
        $fine = 0;
        
        if ($today > $due) {
            $interval = $today->diff($due);
            $daysLate = $interval->days;
            $fine = $daysLate * 10; 
        }

        $returnDate = $today->format('Y-m-d');

        
        $updateTrans = "UPDATE Transactions SET returnDate = ?, fine = ? WHERE transactionId = ?";
        sqlsrv_query($conn, $updateTrans, array($returnDate, (float)$fine, $transactionId));

        
        $updateBook = "UPDATE Books SET status = 'Available' WHERE id = ?";
        sqlsrv_query($conn, $updateBook, array($bookId));

        echo json_encode(["status" => "success", "fine" => $fine]);
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid Transaction ID or book already returned."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Transaction ID is required."]);
}
?>