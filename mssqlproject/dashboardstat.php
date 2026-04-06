<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

require_once "db.php";

if (!$conn) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Database connection failed"
    ]);
    exit();
}

$response = [
    "totalBooks" => 0,
    "issuedToday" => 0,
    "overdue" => 0,
    "activeMembers" => 0
];

function runCountQuery($conn, $sql, $fieldName) {
    $stmt = sqlsrv_query($conn, $sql);

    if ($stmt === false) {
        return [
            "success" => false,
            "error" => sqlsrv_errors()
        ];
    }

    $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

    return [
        "success" => true,
        "value" => isset($row[$fieldName]) ? (int)$row[$fieldName] : 0
    ];
}

try {
    $q1 = runCountQuery($conn, "SELECT COUNT(*) AS totalBooks FROM Books", "totalBooks");
    $q2 = runCountQuery($conn, "SELECT COUNT(*) AS issuedToday FROM BookIssue WHERE CAST(IssueDate AS DATE) = CAST(GETDATE() AS DATE)", "issuedToday");
    $q3 = runCountQuery($conn, "SELECT COUNT(*) AS overdue FROM BookIssue WHERE DueDate < CAST(GETDATE() AS DATE) AND ReturnDate IS NULL", "overdue");
    $q4 = runCountQuery($conn, "SELECT COUNT(*) AS activeMembers FROM Members WHERE Status = 'Active'", "activeMembers");

    if (!$q1["success"] || !$q2["success"] || !$q3["success"] || !$q4["success"]) {
        http_response_code(500);
        echo json_encode([
            "status" => "error",
            "message" => "One or more queries failed",
            "details" => [
                "books" => $q1,
                "issuedToday" => $q2,
                "overdue" => $q3,
                "activeMembers" => $q4
            ]
        ]);
        exit();
    }

    $response["totalBooks"] = $q1["value"];
    $response["issuedToday"] = $q2["value"];
    $response["overdue"] = $q3["value"];
    $response["activeMembers"] = $q4["value"];

    echo json_encode([
        "status" => "success",
        "totalBooks" => $response["totalBooks"],
        "issuedToday" => $response["issuedToday"],
        "overdue" => $response["overdue"],
        "activeMembers" => $response["activeMembers"]
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}
?>