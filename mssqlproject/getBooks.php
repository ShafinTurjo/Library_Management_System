<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once "db.php";

$sql = "SELECT * FROM Books";
$stmt = sqlsrv_query($conn, $sql);

$books = array();
while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    $books[] = $row;
}

echo json_encode($books);
sqlsrv_close($conn);
?>