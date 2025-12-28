import { useEffect, useState } from "react";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [requests, setRequests] = useState([]);
  const token = localStorage.getItem("token");

  const loadData = () => {
    fetch("http://localhost:5000/api/books", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(setBooks);

    fetch("http://localhost:5000/api/requests/my", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(setRequests);
  };

  useEffect(loadData, []);

  const requestBook = async (bookId) => {
    await fetch("http://localhost:5000/api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ bookId })
    });
    loadData();
  };

  const cancelRequest = async (id) => {
    await fetch(`http://localhost:5000/api/requests/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token }
    });
    loadData();
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>User Dashboard</h2>

      {/* AVAILABLE BOOKS MODULE */}
      <h3>Available Books</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map(b => (
            <tr key={b._id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>
                <button onClick={() => requestBook(b._id)}>
                  Request
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* REQUEST STATUS MODULE */}
      <h3 style={{ marginTop: 30 }}>My Book Requests</h3>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Book</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length === 0 && (
            <tr>
              <td colSpan="3">No requests yet</td>
            </tr>
          )}

          {requests.map(r => (
            <tr key={r._id}>
              <td>{r.bookId.title}</td>
              <td>
                {r.status === "issued"
                  ? `Issued on ${new Date(r.issueDate).toDateString()}`
                  : "Pending"}
              </td>
              <td>
                {r.status === "requested" && (
                  <button onClick={() => cancelRequest(r._id)}>
                    Cancel
                  </button>
                )}
                {r.status === "issued" && "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
