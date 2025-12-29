function Popup({ message, type }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "12px 20px",
        backgroundColor: type === "success" ? "#28a745" : "#dc3545",
        color: "white",
        borderRadius: "8px",
        boxShadow: "0px 2px 10px rgba(0,0,0,0.2)",
        zIndex: 9999,
        animation: "fadeInOut 3s ease",
      }}
    >
      {message}
    </div>
  );
}

export default Popup;