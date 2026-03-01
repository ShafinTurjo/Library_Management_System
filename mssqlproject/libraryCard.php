<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include "index.php"; 

$sql = "SELECT lc.*, u.name FROM LibraryCards lc 
        JOIN Users u ON lc.userId = u.userId";

$stmt = sqlsrv_query($conn, $sql);
$cards = [];

while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $row['issueDate'] = $row['issueDate']->format('Y-m-d');
    $row['expiryDate'] = $row['expiryDate']->format('Y-m-d');
    $cards[] = $row;
}

echo json_encode($cards);
?>