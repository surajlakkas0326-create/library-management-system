import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [editId, setEditId] = useState(null);

  const [requests, setRequests] = useState([]);

  const token = localStorage.getItem("token");

  /* ---------------- BOOK CRUD ---------------- */

  const loadBooks = () => {
    fetch("http://localhost:5000/api/books", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(setBooks);
  };

  const saveBook = async () => {
    const url = editId
      ? `http://localhost:5000/api/books/${editId}`
      : "http://localhost:5000/api/books";

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ title, author })
    });

    setTitle("");
    setAuthor("");
    setEditId(null);
    loadBooks();
  };

  const deleteBook = async (id) => {
    await fetch(`http://localhost:5000/api/books/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token }
    });
    loadBooks();
  };

  const editBook = (book) => {
    setEditId(book._id);
    setTitle(book.title);
    setAuthor(book.author);
  };

  /* ---------------- BOOK REQUESTS ---------------- */

  const loadRequests = () => {
    fetch("http://localhost:5000/api/requests", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(res => res.json())
      .then(setRequests);
  };

  const issueBook = async (requestId) => {
    await fetch(`http://localhost:5000/api/requests/${requestId}/issue`, {
      method: "PUT",
      headers: { Authorization: "Bearer " + token }
    });
    loadRequests();
  };

  useEffect(() => {
    loadBooks();
    loadRequests();
  }, []);

  /* ---------------- UI ---------------- */

  return (
    <div style={{ padding: 40 }}>
      <h2>Admin Dashboard</h2>

      {/* ADD / EDIT BOOK */}
      <h3>{editId ? "Edit Book" : "Add Book"}</h3>
      <input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        placeholder="Author"
        value={author}
        onChange={e => setAuthor(e.target.value)}
      />
      <button onClick={saveBook}>
        {editId ? "Update" : "Add"}
      </button>

      {/* BOOK LIST */}
      <h3>All Books</h3>
      <ul>
        {books.map(b => (
          <li key={b._id}>
            {b.title} - {b.author}
            <button onClick={() => editBook(b)}>Edit</button>
            <button onClick={() => deleteBook(b._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <hr />

      {/* BOOK REQUESTS */}
      <h3>Book Requests</h3>
      <ul>
        {requests.map(r => (
          <li key={r._id}>
            <b>{r.bookId.title}</b> requested by <i>{r.userId.email}</i>

            {r.status === "requested" && (
              <button onClick={() => issueBook(r._id)}>
                Issue
              </button>
            )}

            {r.status === "issued" && (
              <span>
                {" "}
                (Issued on {new Date(r.issueDate).toDateString()})
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
