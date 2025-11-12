import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/NavBar";

function AdminPage() {
  const navigate = useNavigate();
  const adminName = localStorage.getItem("adminName");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      <Navbar role="admin" name={adminName} color={"#02142cff"} />

      <div className="d-flex" style={{ height: "calc(100vh - 56px)" }}>
        {/* Sidebar */}
        <div
          className="text-white p-3 d-flex flex-column justify-content-between"
          style={{
            width: "250px",
            backgroundColor: "#02142cff",
            borderRight: "1px solid #333",    
          }}
        >
          <div className="mt-3">

            <ul className="nav flex-column gap-2">
              <li><Link className="nav-link text-white" to="add-book">➕ Add Books</Link></li>
              <li><Link className="nav-link text-white" to="display-books">📚 Display Books</Link></li>
              <li><Link className="nav-link text-white" to="search-books">🔍 Search Books</Link></li>
              <li><Link className="nav-link text-white" to="member-details">👤 Member Details</Link></li>
              <li><Link className="nav-link text-white" to="book-status">✅ Check Book Status</Link></li>
            </ul>
          </div>

          {/* Logout Button */}
          <button onClick={handleLogout} className="btn btn-danger w-100 mt-3">
            🚪 Logout
          </button>
        </div>

        {/* Main Content */}
        <div
          className="flex-grow-1 p-3 d-flex justify-content-center align-items-start"
          style={{ overflowY: "auto", backgroundColor: "#f5f5f5" }}
        >
          <div
            className="w-100 shadow-lg rounded p-4"
            style={{
              maxWidth: "1100px",
              backgroundColor: "white",
              minHeight: "100%",
              borderRadius: "12px",
            }}

            >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
