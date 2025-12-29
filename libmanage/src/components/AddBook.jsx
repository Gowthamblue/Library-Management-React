import { useState } from "react";
import { addBook } from "../services/adminService";

function AddBook() {
  const [book, setBook] = useState({
    author: "",
    book_name: "",
    category: "",
    pub_date: "",
    copies: "",
    rack_no: "",
  });

  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addBook(book);

      const successMsg = `✅ "${book.book_name}" added successfully!`;
      setMessage(successMsg);
      setShowToast(true);

      setTimeout(() => setShowToast(false), 4000);

      setBook({
        author: "",
        book_name: "",
        category: "",
        pub_date: "",
        copies: "",
        rack_no: "",
      });
    } catch (err) {
      setMessage("❌ Error adding book.");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center" 
      style={{ height: "100%", width: "100%" }}
    >

      {/* ✅ Toast Notification */}
      {showToast && (
        <div
          className="alert alert-success shadow position-fixed top-0 start-50 translate-middle-x mt-3"
          style={{
            zIndex: 9999,
            width: "fit-content",
            fontWeight: 600,
            borderRadius: "8px",
            padding: "10px 20px"
          }}
        >
          {message}
        </div>
      )}

      <div 
        className="card shadow p-4" 
        style={{
          width: "100%",
          maxWidth: "520px",
          borderRadius: "12px"
        }}
      >
        <h3 className="text-center mb-3 fw-bold">Add Book</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Book Name</label>
            <input
              type="text"
              name="book_name"
              className="form-control"
              value={book.book_name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Author</label>
            <input
              type="text"
              name="author"
              className="form-control"
              value={book.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Category</label>
            <input
              type="text"
              name="category"
              className="form-control"
              value={book.category}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Publication Date</label>
            <input
              type="date"
              name="pub_date"
              className="form-control"
              value={book.pub_date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-2">
              <label className="form-label">Copies</label>
              <input
                type="number"
                name="copies"
                className="form-control"
                value={book.copies}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6 mb-2">
              <label className="form-label">Rack Number</label>
              <input
                type="number"
                name="rack_no"
                className="form-control"
                value={book.rack_no}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button className="btn btn-primary w-100 mt-2 fw-bold" type="submit">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;