<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
require_once "db.php"; 


$sql = "SELECT lc.cardId, lc.cardNumber, lc.issueDate, lc.expiryDate, lc.status, u.name 
        FROM LibraryCards lc 
        JOIN users u ON lc.userId = u.userId"; 

$stmt = sqlsrv_query($conn, $sql);
$cards = [];

if ($stmt === false) {
    
    echo json_encode([]);
    exit;
}

while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    
    if ($row['issueDate'] instanceof DateTime) {
        $row['issueDate'] = $row['issueDate']->format('Y-m-d');
    }
    if ($row['expiryDate'] instanceof DateTime) {
        $row['expiryDate'] = $row['expiryDate']->format('Y-m-d');
    }
    $cards[] = $row;
}

echo json_encode($cards);
sqlsrv_close($conn);
?>