import React, { useEffect, useState } from "react";
import "../Css/Book.css";

function LibraryCardList() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("http://localhost/mssqlproject/libraryCard.php")
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="book-page">
      <div className="book-header">
        <h1> Member Library Cards</h1>
        <p>Manage and view issued library cards for members</p>
      </div>

      <div className="card-page-container">
        {cards.length > 0 ? (
          <table className="card-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Member</th>
                <th>Card Number</th>
                <th>Issue Date</th>
                <th>Expiry</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((c) => (
                <tr key={c.cardId}>
                  <td>{c.cardId}</td>
                  <td>{c.name}</td>
                  <td className="card-num-highlight">{c.cardNumber}</td>
                  <td>{c.issueDate}</td>
                  <td>{c.expiryDate}</td>
                  <td>
                    <span className={c.status === 'Active' ? 'card-status-active' : 'card-status-expired'}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-transaction">
            No library cards issued yet.
          </div>
        )}
      </div>
    </div>
  );
}

export default LibraryCardList;