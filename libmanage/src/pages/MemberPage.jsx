import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/NavBar";

function MemberPage() {
  const navigate = useNavigate();
  const memberName = localStorage.getItem("memberName");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ height: "100vh", overflow: "hidden", backgroundColor: "#eef3f5" }}>
      <Navbar role="member" name={memberName} color="#0a2b2cff" />

      <div className="d-flex" style={{ height: "calc(100vh - 56px)" }}>
        
        {/* Sidebar */}
        <div
          className="text-white p-3 d-flex flex-column justify-content-between"
          style={{
            backgroundColor: "#0a2b2cff",
            width: "240px",
            paddingTop: "30px"
          }}
        >
          <div className="mt-2">

            <ul className="nav flex-column gap-2">
              <li><Link className="nav-link text-white" to="checkout-book">👤 Member Details</Link></li>
              <li><Link className="nav-link text-white" to="view-books">📚 View All Books</Link></li>
              <li><Link className="nav-link text-white" to="return-book">🔄 Return Book</Link></li>
              <li><Link className="nav-link text-white" to="fine-details">💰 Check Fine Details</Link></li>
              <li><Link className="nav-link text-white" to="my-reserved-books">📅 My Reserved Books</Link></li>
            </ul>
          </div>

          <button 
            onClick={handleLogout}
            className="btn btn-danger w-100 mt-3 fw-semibold"
            style={{ borderRadius: "8px" }}
          >
            🚪 Logout
          </button>
        </div>

        {/* Main Content */}
        <div
          className="flex-grow-1 p-2 d-flex justify-content-center"
          style={{ overflowY: "auto" }}
        >
          <div
            className="w-100"
            style={{
              maxWidth: "1100px",
              background: "#ffffff",
              borderRadius: "12px",
              padding: "15px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.06)", 
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberPage;
