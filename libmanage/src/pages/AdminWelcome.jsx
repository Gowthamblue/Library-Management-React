
function AdminWelcome() {
  const adminName = localStorage.getItem("adminName") || "Admin";

  return (
    <div className="text-center">
      <h2 className="fw-bold mb-3">👋 Welcome, {adminName}!</h2>

      <p className="text-muted mb-4">
        Manage your library efficiently using the tools on the left sidebar.
      </p>

      <div className="row g-3 mt-4 justify-content-center">

        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <h5 className="card-title">➕ Add Books</h5>
              <p className="card-text">Insert new books into the library system.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <h5 className="card-title">📚 Display Books</h5>
              <p className="card-text">View and manage all available books.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <h5 className="card-title">🔍 Search Books</h5>
              <p className="card-text">Quickly find any book in the system.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <h5 className="card-title">👤 Member Details</h5>
              <p className="card-text">View and manage member information.</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0 h-100">
            <div className="card-body text-center">
              <h5 className="card-title">✅ Book Status</h5>
              <p className="card-text">Check issued, returned, and available books.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminWelcome;
