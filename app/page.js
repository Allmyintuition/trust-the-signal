export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "black",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      padding: "40px"
    }}>
      <div>
        <h1 style={{ fontSize: "48px", marginBottom: "16px" }}>
          👁️ TRUST THE SIGNAL
        </h1>
        <p style={{ fontSize: "20px", color: "#7CFFB2" }}>
          System Online.
        </p>
        <p style={{ marginTop: "12px", color: "#aaa" }}>
          The signal platform is live.
        </p>
      </div>
    </main>
  );
}