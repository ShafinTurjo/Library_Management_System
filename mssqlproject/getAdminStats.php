<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once "db.php";


$sqlBooks = "SELECT COUNT(*) as total FROM Books";
$resBooks = sqlsrv_query($conn, $sqlBooks);
$totalBooks = sqlsrv_fetch_array($resBooks, SQLSRV_FETCH_ASSOC)['total'] ?? 0;


$sqlCards = "SELECT COUNT(*) as total FROM library_cards"; 
$resCards = sqlsrv_query($conn, $sqlCards);
$totalCards = sqlsrv_fetch_array($resCards, SQLSRV_FETCH_ASSOC)['total'] ?? 0;


$sqlIssued = "SELECT COUNT(*) as total FROM Transactions WHERE type='Issue'";
$resIssued = sqlsrv_query($conn, $sqlIssued);
$totalIssued = sqlsrv_fetch_array($resIssued, SQLSRV_FETCH_ASSOC)['total'] ?? 0;


$sqlPending = "SELECT COUNT(*) as total FROM Transactions WHERE type='Issue' AND status='Pending'";
$resPending = sqlsrv_query($conn, $sqlPending);
$totalPending = sqlsrv_fetch_array($resPending, SQLSRV_FETCH_ASSOC)['total'] ?? 0;


echo json_encode([
    "totalBooks" => (int)$totalBooks,
    "totalCards" => (int)$totalCards,
    "totalIssued" => (int)$totalIssued,
    "totalPending" => (int)$totalPending
]);
?>