import { useEffect, useState } from "react";
import { getAllBooks, searchBooks, updateBook } from "../services/adminService";

function ViewBooks() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    fetchAllBooks();
  },[]);

  const fetchAllBooks = async () => {
    setLoading(true);
    try {
      const data = await getAllBooks();
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
    setLoading(false);
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      fetchAllBooks();
      return;
    }

    try {
      const data = await searchBooks(value);
      setBooks(data);
    } catch (err) {
      console.error("Error searching books:", err);
    }
  };

  const handleEditClick = (book) => {
    setEditBook({ ...book }); 
    setShowModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await updateBook(editBook);
      alert("✅ Book updated successfully!");
      setShowModal(false);
      fetchAllBooks();
    } catch (err) {
      console.error("Error updating book:", err);
      alert("❌ Failed to update book");
    }
  };

  return (
    <div className="container mt-4">
      <h3>📚 View Books</h3>

      {/* 🔍 Search bar */}
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search by name, author, or category..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {/* 📦 Book List */}
      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p>No books found</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Name</th>
              <th>Author</th>
              <th>Category</th>
              <th>Published</th>
              <th>Copies</th>
              <th>Rack No</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.book_id}>
                <td>{book.book_id}</td>
                <td>{book.book_name}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.pub_date}</td>
                <td>{book.copies}</td>
                <td>{book.rack_no}</td>
                <td>
                  <button
                    className="btn btn-primary rounded"
                    onClick={() => handleEditClick(book)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* ✏️ Edit Book Modal */}
      {showModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5>Edit Book</h5>
                <button
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {editBook && (
                  <>
                    <div className="mb-3">
                      <label>Book Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editBook.book_name}
                        onChange={(e) =>
                          setEditBook({
                            ...editBook,
                            book_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label>Author</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editBook.author}
                        onChange={(e) =>
                          setEditBook({
                            ...editBook,
                            author: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label>Category</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editBook.category}
                        onChange={(e) =>
                          setEditBook({
                            ...editBook,
                            category: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label>Copies</label>
                      <input
                        type="number"
                        className="form-control"
                        value={editBook.copies}
                        onChange={(e) =>
                          setEditBook({
                            ...editBook,
                            copies: e.target.value,
                          })
                        }
                      />
                    </div>
                  </>
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleSaveEdit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewBooks;
