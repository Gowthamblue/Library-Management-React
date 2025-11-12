import { useEffect, useState } from "react";
import MemberBooksModal from "./MemberBooksModal";
import { allMemberFetchapi, fetchMembersBookapi } from "../services/adminService";
function MemberDetails() {
  const [members, setMembers] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchMembers = async () => {
    try {
      const res = await allMemberFetchapi();
      setMembers(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load members");
    }
  };

  const fetchMemberBooks = async (memberId) => {
    try {
      const res = await fetchMembersBookapi(memberId);
      setSelectedBooks(res.data);
      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert("Failed to load member's books");
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <div className="container mt-4">
      <h3>👥 Members List</h3>
      <table className="table table-bordered table-striped mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Book Limit</th>
            <th>Fine</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.name}</td>
              <td>{m.booklimit}</td>
              <td>₹{m.fine}</td>
              <td>
                <button
                  className="btn btn-info btn-sm"
                  onClick={() => fetchMemberBooks(m.id)}
                >
                  View Books
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <MemberBooksModal
          books={selectedBooks}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default MemberDetails;
