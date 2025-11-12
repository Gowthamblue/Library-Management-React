import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerMember } from "../services/loginService";

function Register() {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const msg = await registerMember(user);
      setMessage(msg);
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setMessage("Registration failed!");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <div className="card shadow p-4">
        <h3 className="text-center mb-3">Member Registration</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              name="username"
              className="form-control"
              value={user.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-success w-100" type="submit">
            Register
          </button>
        </form>

        {message && <div className="alert alert-info mt-3">{message}</div>}

        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login here
            </Link>
          </small>
        </div>
      </div>

            {/* 🔙 Back to Home Button */}
      <div className="mt-3">
        <Link
          to="/"
          className="btn btn-outline-secondary"
          style={{
            borderRadius: "30px",
            padding: "8px 20px",
            fontWeight: "500",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#f1f1f1")}
          onMouseLeave={(e) => (e.target.style.background = "transparent")}
        >
          ⬅️ Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Register;
