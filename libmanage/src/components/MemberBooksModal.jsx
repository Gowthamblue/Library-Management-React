function MemberBooksModal({ books, onClose }) {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
      <div className="bg-white rounded p-4 shadow" style={{ width: "70%", maxHeight: "80vh", overflowY: "auto" }}>
        <h4>📚 Books Borrowed</h4>
        <button className="btn-close float-end" onClick={onClose}></button>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Author</th>
              <th>Category</th>
              <th>Borrowed Date</th>
              <th>DeadLine for Returning</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((b) => (
                <tr key={b.book_id}>
                  <td>{b.book_id}</td>
                  <td>{b.book_name}</td>
                  <td>{b.author}</td>
                  <td>{b.category}</td>
                  <td>{b.issue_date}</td>
                  <td>{b.return_date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No books checked out by this member.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="text-end">
          <button className="btn btn-secondary mt-2" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default MemberBooksModal;
