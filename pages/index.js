
import { useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState("");

  const generate = async () => {
    setError("");
    setImageUrl("");
    try {
      const res = await fetch("/api/generate-image");
      const data = await res.json();
      if (res.ok) {
        setImageUrl(data.imageUrl);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to reach the server.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial", textAlign: "center" }}>
      <h1>Test DALL·E Access</h1>
      <p>This uses the prompt: <em>"A cute cartoon cat sitting on a cloud"</em></p>
      <button onClick={generate} style={{ padding: "1rem 2rem", fontSize: "1rem" }}>Generate Image</button>
      {error && <p style={{ color: "red", marginTop: "1rem" }}>⚠️ {error}</p>}
      {imageUrl && <img src={imageUrl} alt="Result" style={{ marginTop: "1rem", maxWidth: "100%" }} />}
    </div>
  );
}
