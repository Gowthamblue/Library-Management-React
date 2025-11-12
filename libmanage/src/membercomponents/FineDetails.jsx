import { useState, useEffect } from "react";
import API from "../services/apiConfig";

function FineDetails() {
  const [fine, setFine] = useState(null);
  const [loading, setLoading] = useState(true);
  const memberId = localStorage.getItem("memberId");

  useEffect(() => {
    const fetchFine = async () => {
      try {
        const res = await API.post(
          "/members/fine",
          { memberId: parseInt(memberId) }
        );
        setFine(res.data.fine);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch fine details.");
      } finally {
        setLoading(false);
      }
    };

    fetchFine();
  }, [memberId]);

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="p-4 text-center" style={{ width: "400px" }}>
        <h3>💰 Fine Details</h3>
        {loading ? (
          <p>Loading...</p>
        ) : fine > 0 ? (
          <>
            <h4 className="text-danger mt-3">You have a pending fine!</h4>
            <p className="fs-4 fw-bold text-danger">Rs. {fine}</p>
          </>
        ) : (
          <h4 className="text-success mt-3">No pending fines 🎉</h4>
        )}
      </div>
    </div>
  );
}

export default FineDetails;
