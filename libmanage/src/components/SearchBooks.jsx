import { useState } from "react";
import { searchBooks } from "../services/adminService";

function SearchBook() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    try {
      const data = await searchBooks(keyword);
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>🔍 Search Books</h3>
      <div className="d-flex mb-3">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Enter book name, author, or category"
          className="form-control me-2"
        />
        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>

      {results.length > 0 ? (
        <ul className="list-group">
          {results.map((book) => (
            <li key={book.book_id} className="list-group-item">
              Book id: <strong>{book.book_id}</strong> — <strong>{book.book_name}</strong> — {book.author} ({book.category})
            </li>
          ))}
        </ul>
      ) : (
        <p>No books found </p>
      )}
    </div>
  );
}

export default SearchBook;
