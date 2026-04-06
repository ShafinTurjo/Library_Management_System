import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Css/TransactionList.css";

function TransactionList() {
  const [list, setList] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch("http://localhost/mssqlproject/transactionList.php")
      .then((res) => res.json())
      .then((data) => setList(data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  return (
    <div className="transaction-page">
      <nav className="adNav">
        <button
          className={`adNavItem ${
            location.pathname === "/admin-dashboard" ? "active" : ""
          }`}
          onClick={() => navigate("/admin-dashboard")}
        >
          Dashboard
        </button>

        <button
          className={`adNavItem ${location.pathname === "/books" ? "active" : ""}`}
          onClick={() => navigate("/books")}
        >
          Books
        </button>

        <button
          className={`adNavItem ${location.pathname === "/authors" ? "active" : ""}`}
          onClick={() => navigate("/authors")}
        >
          Authors
        </button>

        <button
          className={`adNavItem ${
            location.pathname === "/transactions" ? "active" : ""
          }`}
          onClick={() => navigate("/transactions")}
        >
          Transactions
        </button>

        <button
          className={`adNavItem ${
            location.pathname === "/library-cards" ? "active" : ""
          }`}
          onClick={() => navigate("/library-cards")}
        >
          Library Cards
        </button>
      </nav>

      <div className="transaction-content">
        <div className="book-header">
          <h1>Transaction History</h1>
        </div>

        <div className="transaction-container">
          {list.length > 0 ? (
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User</th>
                  <th>Book</th>
                  <th>Issue Date</th>
                  <th>Due Date</th>
                  <th>Return Date</th>
                  <th>Fine (TK)</th>
                </tr>
              </thead>
              <tbody>
                {list.map((t) => (
                  <tr key={t.transactionId}>
                    <td>{t.transactionId}</td>
                    <td>{t.userName}</td>
                    <td>{t.bookTitle}</td>
                    <td>{t.issueDate}</td>
                    <td>{t.dueDate}</td>
                    <td className={t.returnDate ? "" : "status-pending"}>
                      {t.returnDate ? t.returnDate : "Pending"}
                    </td>
                    <td className={t.fine > 0 ? "fine-amount" : "no-fine"}>
                      {t.fine}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-transaction">
              No transactions found in the records.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionList;