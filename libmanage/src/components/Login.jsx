import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/loginService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "ADMIN") {
      navigate("/admin");
    } else if (role === "MEMBER") {
      navigate("/member");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginUser({ username, password });
      if (data.role === "ADMIN") {
        navigate("/admin");
      } else if (data.role === "MEMBER") {
        navigate("/member");
      } else {
        setError("Invalid user role or credentials!");
      }
    } catch (err) {
      setError("Login failed! Check credentials.");
    }
  };

  return (
    <div
      className="container mt-5 d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="card shadow p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-3">Library Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <small>
            Don’t have an account?{" "}
            <Link to="/register" className="text-decoration-none">
              Register here
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

export default Login;
