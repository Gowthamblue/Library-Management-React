import { useEffect, useState, useCallback } from "react";
import API from "../services/apiConfig";

function MyCheckedoutBooks() {
  const [books, setBooks] = useState([]);
  const [showBoxForBook, setShowBoxForBook] = useState(null);
  const [returnDate, setReturnDate] = useState("");
  const memberId = localStorage.getItem("memberId");

  

   const fetchMyBooks = useCallback(async () => {
    try {
      const res = await API.post(
        "/members/viewCheckOuts",
        { memberId: parseInt(memberId) }
      );
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load your books.");
    }
  }, [memberId]);

  useEffect(() => {
    fetchMyBooks();
  }, [fetchMyBooks]);


  const handleReturnClick = (bookId) => {
    if (showBoxForBook === bookId) {
      setShowBoxForBook(null);
    } else {
      setShowBoxForBook(bookId);
      setReturnDate("");
    }
  };

  const handleConfirmReturn = async (bookId) => {
    if (!returnDate) {
      alert("Please select a return date!");
      return;
    }

    try {
      const res = await API.post(
        "/members/returnbook",
        {
          memberId: parseInt(memberId),
          bookId: bookId,
          date: returnDate,
        }
      );
      alert(res.data);
      setShowBoxForBook(null);
      fetchMyBooks();
    } catch (err) {
      console.error(err);
      alert("Return failed!");
    }
  };


  return (
    <div className="container mt-4">
      <h2>📚 My Checked-Out Books</h2>
      {books.length === 0 ? (
        <p>No books checked out yet.</p>
      ) : (
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>Book ID</th>
              <th>Name</th>
              <th>Author</th>
              <th>Category</th>
              <th>Borrowed Date</th>
              <th>DeadLine For Returning</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <>
                <tr key={book.book_id}>
                  <td>{book.book_id}</td>
                  <td>{book.book_name}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.issue_date}</td>
                  <td>{book.return_date}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleReturnClick(book.book_id)}
                    >
                      Return
                    </button>
                  </td>
                </tr>

                {showBoxForBook === book.book_id && (
                  <tr>
                    <td colSpan="8">
                      <div className="p-3 border rounded bg-light d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-2">
                          <label className="fw-bold me-2">
                            Select Return Date:
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            style={{ width: "200px" }}
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                          />
                        </div>
                        <div>
                          <button
                            className="btn btn-success btn-sm me-2"
                            onClick={() => handleConfirmReturn(book.book_id)}
                          >
                            Confirm
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setShowBoxForBook(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyCheckedoutBooks;
