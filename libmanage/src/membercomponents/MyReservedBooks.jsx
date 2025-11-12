import { useEffect, useState } from "react";
import API from "../services/apiConfig";

function MyReservedBooks() {
  const [books, setBooks] = useState([]);
  const memberId = localStorage.getItem("memberId");

useEffect(() => {
  const fetchReservedBooks = async () => {
    try {
      const res = await API.post(
        "/members/reserved",
        { memberId: parseInt(memberId) }
      );
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch your reserved books!");
    }
  };

  fetchReservedBooks();
}, [memberId]);


  return (
    <div className="container mt-4">
      <h2>📖 My Reserved Books</h2>
      {books.length === 0 ? (
        <p className="mt-3 text-muted">You haven’t reserved any books yet!</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Author</th>
              <th>Category</th>
              <th>Published</th>
              <th>Copies Available Now</th>
              <th>Rack No</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default MyReservedBooks;
