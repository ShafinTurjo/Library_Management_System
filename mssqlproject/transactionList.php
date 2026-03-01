<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include "index.php"; 

$sql = "SELECT t.transactionId, u.name as userName, b.title as bookTitle, 
               t.issueDate, t.dueDate, t.returnDate, t.fine 
        FROM Transactions t
        JOIN Users u ON t.userId = u.userId
        JOIN Books b ON t.bookId = b.id";

$stmt = sqlsrv_query($conn, $sql);
$transactions = [];

while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    
    $row['issueDate'] = $row['issueDate']->format('Y-m-d');
    $row['dueDate'] = $row['dueDate']->format('Y-m-d');
    if ($row['returnDate']) {
        $row['returnDate'] = $row['returnDate']->format('Y-m-d');
    }
    $transactions[] = $row;
}

echo json_encode($transactions);
?>