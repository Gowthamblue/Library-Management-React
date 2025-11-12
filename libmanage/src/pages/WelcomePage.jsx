import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function WelcomePage() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-center"
      style={{
        background: "linear-gradient(135deg, #c9d6ff 0%, #e2e2e2 100%)",
      }}
    >
      <h1 className="display-4 fw-bold mb-4">📚 Library Management System</h1>
      <p className="lead mb-5">Welcome! Please sign in or register to continue.</p>

      <div className="d-flex gap-4">
        <Link to="/login" className="btn btn-primary btn-lg">
          Sign In
        </Link>
        <Link to="/register" className="btn btn-outline-dark btn-lg">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default WelcomePage;
