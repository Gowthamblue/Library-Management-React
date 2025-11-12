function BookStatusModal({ book, borrowers, onClose }) {
  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
      <div
        className="bg-white rounded p-4 shadow"
        style={{ width: "70%", maxHeight: "80vh", overflowY: "auto" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>📖 Book Status</h4>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <h5 className="mb-3">
          <strong>{book.book_name}</strong> by {book.author}
        </h5>

        {borrowers && borrowers.length > 0 ? (
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Member ID</th>
                <th>Member Name</th>
                <th>Borrowed Date</th>
                <th>Return Deadline date</th>
              </tr>
            </thead>
            <tbody>
              {borrowers.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.name}</td>
                  <td>{m.issue_date}</td>
                  <td>{m.return_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-info text-center">
            No members have borrowed this book.
          </div>
        )}

        <div className="text-end">
          <button className="btn btn-secondary mt-2" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookStatusModal;
