<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once "db.php"; // your database connection file

$response = [
    "totalBooks" => 0,
    "issuedToday" => 0,
    "overdue" => 0,
    "activeMembers" => 0
];

try {
    // Total Books
    $sql1 = "SELECT COUNT(*) AS totalBooks FROM Books";
    $stmt1 = sqlsrv_query($conn, $sql1);
    if ($stmt1 && ($row1 = sqlsrv_fetch_array($stmt1, SQLSRV_FETCH_ASSOC))) {
        $response["totalBooks"] = (int)$row1["totalBooks"];
    }

    // Issued Today
    $sql2 = "SELECT COUNT(*) AS issuedToday 
             FROM BookIssue 
             WHERE CAST(IssueDate AS DATE) = CAST(GETDATE() AS DATE)";
    $stmt2 = sqlsrv_query($conn, $sql2);
    if ($stmt2 && ($row2 = sqlsrv_fetch_array($stmt2, SQLSRV_FETCH_ASSOC))) {
        $response["issuedToday"] = (int)$row2["issuedToday"];
    }

    // Overdue
    $sql3 = "SELECT COUNT(*) AS overdue
             FROM BookIssue
             WHERE DueDate < CAST(GETDATE() AS DATE)
             AND ReturnDate IS NULL";
    $stmt3 = sqlsrv_query($conn, $sql3);
    if ($stmt3 && ($row3 = sqlsrv_fetch_array($stmt3, SQLSRV_FETCH_ASSOC))) {
        $response["overdue"] = (int)$row3["overdue"];
    }

    // Active Members
    $sql4 = "SELECT COUNT(*) AS activeMembers
             FROM Members
             WHERE Status = 'Active'";
    $stmt4 = sqlsrv_query($conn, $sql4);
    if ($stmt4 && ($row4 = sqlsrv_fetch_array($stmt4, SQLSRV_FETCH_ASSOC))) {
        $response["activeMembers"] = (int)$row4["activeMembers"];
    }

    echo json_encode([
        "status" => "success",
        "data" => $response
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>