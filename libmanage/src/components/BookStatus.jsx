import React, { useState, useEffect } from "react";
import BookStatusModal from "./BookStatusModal";
import { booksapi, checkstatusapi } from "../services/adminService";
function BookStatus() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [borrowers, setBorrowers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await booksapi();
        setBooks(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load books!");
      }
    };

    fetchBooks();
  }, []);

  const checkStatus = async (books) => {
    try {
      const res = await checkstatusapi(books);
      setSelectedBook(books);
      setBorrowers(res.data);
      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch borrower details!");
    }
  };

  return (
    <div className="container mt-4">
      <h2>✅ Check Book Status</h2>
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Author</th>
            <th>Category</th>
            <th>Rack No</th>
            <th>Copies</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.book_id}>
              <td>{b.book_id}</td>
              <td>{b.book_name}</td>
              <td>{b.author}</td>
              <td>{b.category}</td>
              <td>{b.rack_no}</td>
              <td>{b.copies}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => checkStatus(b)}
                >
                  Check Borrowers
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show Modal */}
      {showModal && (
        <BookStatusModal
          book={selectedBook}
          borrowers={borrowers}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default BookStatus;