import React, { useEffect, useState } from "react";
import "../Css/Book.css"; 

function LibraryCardList() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost/mssqlproject/libraryCard.php")
      .then((res) => res.json())
      .then((data) => {
        setCards(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading Library Cards...</div>;

  return (
    <div className="book-page"> 
      <div className="book-header">
        <h1>Member Library Cards</h1>
        <p>Manage and view issued library cards for members</p>
      </div>

      <div className="card-page-container">
        {cards.length > 0 ? (
          <table className="card-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Member Name</th>
                <th>Card Number</th>
                <th>Issue Date</th>
                <th>Expiry</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((c, index) => (
                <tr key={c.cardId || index}>
                  <td>{c.cardId}</td>
                  <td>{c.name}</td>
                  <td className="card-num-highlight" style={{fontWeight: 'bold', color: '#4f46e5'}}>
                    {c.cardNumber}
                  </td>
                  <td>{c.issueDate}</td>
                  <td>{c.expiryDate}</td>
                  <td>
                    <span className={`badge ${c.status === 'Active' ? 'active' : 'expired'}`}>
                      {c.status || 'Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-transaction">No library cards found.</div>
        )}
      </div>
    </div>
  );
}

export default LibraryCardList;