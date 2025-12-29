import React, { useEffect, useState } from "react";
import API from "../services/apiConfig";
function MemberDetails() {
  const [member, setMember] = useState(null);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const memberId = localStorage.getItem("memberId");

  useEffect(() => {
    async function fetchMemberDetails() {
      try {
        const res = await API.get(`/members/${memberId}`);
        setMember(res.data);
      } catch (err) {
        console.error("Error fetching member details:", err);
      }
    }

    fetchMemberDetails();
  }, [memberId]);

  useEffect(() => {
    async function fetchBorrowedBooks() {
      try {
        const res = await API.post(
          "/members/viewCheckOuts",
          { memberId: memberId }
        );
        setBorrowedBooks(res.data);
      } catch (err) {
        console.error("Error fetching borrowed books:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchBorrowedBooks();
  }, [memberId]);

  if (loading) return <div className="text-center mt-5">Loading member details...</div>;
  if (!member) return <div className="text-center mt-5 text-danger">No user found</div>;

  return (
    <div className="container mt-4">
      <h3 className="text-primary mb-3">👤 Member Details</h3>
      <div className="card p-3 shadow-sm">
        <p><strong>Member ID:</strong> {member.id}</p>
        <p><strong>Name:</strong> {member.name}</p>
        <p><strong>Books Can Still Borrow:</strong> {member.booklimit}</p>
        {member.fine > 0 && (
          <p className="text-danger"><strong>Fine Amount:</strong> ₹{member.fine}</p>
        )}
      </div>

      {/* Borrowed Books Section */}
      <div className="mt-4">
        <h5>📚 Books Borrowed</h5>
        {borrowedBooks.length > 0 ? (
          <table className="table table-striped mt-3">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Author</th>
                <th>Category</th>
                <th>Issued Date</th>
                <th>DeadLine for Returning</th>
              </tr>
            </thead>
            <tbody>
              {borrowedBooks.map((book) => (
                <tr key={book.book_id}>
                  <td>{book.book_id}</td>
                  <td>{book.book_name}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.issue_date}</td>
                  <td>{book.return_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-muted mt-3">No books currently borrowed.</p>
        )}
      </div>
    </div>
  );
}

export default MemberDetails;