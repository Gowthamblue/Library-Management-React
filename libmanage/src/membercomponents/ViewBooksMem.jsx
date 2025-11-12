import { useEffect, useState, useCallback } from "react";
import { searchBooksForMember } from "../services/adminService";
import Popup from "../components/Popup";
import API from "../services/apiConfig";

function ViewBooksMem() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [popup, setPopup] = useState({ message: "", type: "" });

  const showPopup = (message, type = "success") => {
    setPopup({ message, type });
    setTimeout(() => setPopup({ message: "", type: "" }), 3000);
  };

  const memberId = localStorage.getItem("memberId");

  const fetchAllBooks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await API.post(
        "/members/books",
        { memberId }
      );
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
      showPopup("Failed to load books.", "error");
    } finally {
      setLoading(false);
    }
  }, [memberId]);

  useEffect(() => {
    fetchAllBooks();
  }, [fetchAllBooks]);



  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      fetchAllBooks();
      return;
    }

    try {
      const data = await searchBooksForMember(value);
      setBooks(data);
    } catch (err) {
      console.error("Error searching books:", err);
      showPopup("Search failed!", "error");
    }
  };

  const handleCheckout = async (bookId) => {
    const today = new Date().toISOString().split("T")[0];
    try {
      const res = await API.post(
        "/members/checkout",
        {
          memberId,
          bookId,
          date: today,
        }
      );
      showPopup(res.data, "success"); 
      fetchAllBooks();
    } catch (err) {
      console.error(err);
      showPopup("Checkout failed!", "error"); 
    }
  };

  return (
    <div className="container mt-4">
      {popup.message && <Popup message={popup.message} type={popup.type} />}

      <h3>📚 View Available Books</h3>

      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search by name, author, or category..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : books.length === 0 ? (
        <p>No books available</p>
      ) : (
        <table className="table table-striped table-hover shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>Book ID</th>
              <th>Name</th>
              <th>Author</th>
              <th>Category</th>
              <th>Published</th>
              <th>Copies</th>
              <th>Rack No</th>
              <th>Action</th>
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
                    {book.copies > 0 ? (
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => handleCheckout(book.book_id)}
                      >
                        Checkout
                      </button>
                    ) : book.reserved ? (
                      <button className="btn btn-secondary btn-sm" disabled>
                        Out of Stock
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleCheckout(book.book_id)}
                      >
                        Reserve
                      </button>
                    )}
                  </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ViewBooksMem;
