<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Content-Type: application/json");

require_once "db.php";

$sql = "
SELECT 
Books.id,
Books.title,
Author.AuthorName
FROM BookAuthor
JOIN Books ON BookAuthor.BookID = Books.id
JOIN Author ON BookAuthor.AuthorID = Author.AuthorID
";

$stmt = sqlsrv_query($conn, $sql);

$data = [];

while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)){
    $data[] = $row;
}

echo json_encode([
    "status"=>"success",
    "data"=>$data
]);