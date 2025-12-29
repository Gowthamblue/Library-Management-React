import { useState, useEffect } from "react";
import API from "../services/apiConfig";

function FineDetails() {
  const [fine, setFine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [paying, setPaying] = useState(false);

  const memberId = localStorage.getItem("memberId");

  useEffect(() => {
    const fetchFine = async () => {
      try {
        const res = await API.post("/members/fine", {
          memberId: parseInt(memberId),
        });
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

  // Pay Fine Handler
  const handlePayFine = async () => {
    setPaying(true);

    try {
      await API.post("/members/fine/pay", {
        memberId: parseInt(memberId),
      });

      alert("Fine paid successfully! 🎉");
      setFine(0);
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    } finally {
      setPaying(false);
    }
  };

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

            <button
              className="btn btn-primary mt-3"
              onClick={() => setShowModal(true)}
            >
              Pay Fine
            </button>
          </>
        ) : (
          <h4 className="text-success mt-3">No pending fines 🎉</h4>
        )}
      </div>

      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="bg-white p-4 rounded shadow" style={{ width: "360px" }}>
            <h4 className="mb-3">Confirm Payment</h4>
            <p>Your fine is about to be paid. Do you want to proceed?</p>

            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="btn btn-success"
                onClick={handlePayFine}
                disabled={paying}
              >
                {paying ? "Processing..." : "Proceed"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FineDetails;
