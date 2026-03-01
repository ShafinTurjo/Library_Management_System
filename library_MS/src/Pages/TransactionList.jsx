import React, { useEffect, useState } from "react";
import "../Css/Book.css";

function TransactionList() {
  const [list, setList] = useState([]);

  useEffect(() => {
    
    fetch("http://localhost/mssqlproject/transactionList.php")
      .then((res) => res.json())
      .then((data) => setList(data))
      .catch((err) => console.error("Error fetching transactions:", err));
  }, []);

  return (
    <div className="book-page">
      <div className="book-header">
        <h1> Transaction History</h1>
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
  );
}

export default TransactionList;