import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Text, Image } from "react-konva";

function App() {
  const [headline, setHeadline] = useState("Your Ad Headline");
  const [cta, setCta] = useState("Shop Now");
  const [image, setImage] = useState(null);
  const [size, setSize] = useState({ width: 1080, height: 1080 });
  const [warnings, setWarnings] = useState([]);

  const stageRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const img = new window.Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => setImage(img);
  };

  const downloadImage = () => {
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const link = document.createElement("a");
    link.download = "retail-media-ad.png";
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const checkGuidelines = () => {
    let issues = [];
    if (headline.length > 40) issues.push("Headline too long (max 40 characters)");
    if (!cta.trim()) issues.push("CTA is missing");
    if (!image) issues.push("Product image not uploaded");
    setWarnings(issues);
  };

  useEffect(() => {
    checkGuidelines();
  }, [headline, cta, image]);

  return (
    <div style={styles.app}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>🛍 Retail Creative Builder</h2>

        <div style={styles.card}>
          <label style={styles.label}>Upload Product Image</label>
          <input type="file" onChange={handleImageUpload} />
        </div>

        <div style={styles.card}>
          <label style={styles.label}>Headline</label>
          <input
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>CTA</label>
          <input
            value={cta}
            onChange={(e) => setCta(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.card}>
          <p style={styles.label}>Ad Format</p>
          <div style={styles.buttonRow}>
            <button style={styles.formatBtn} onClick={() => setSize({ width: 1080, height: 1080 })}>Instagram</button>
            <button style={styles.formatBtn} onClick={() => setSize({ width: 1200, height: 628 })}>Facebook</button>
            <button style={styles.formatBtn} onClick={() => setSize({ width: 300, height: 250 })}>Retail</button>
          </div>
        </div>

        <button style={styles.downloadBtn} onClick={downloadImage}>
          ⬇ Download Creative
        </button>

        <div style={styles.card}>
          <h4>Guideline Check</h4>
          {warnings.length === 0 ? (
            <p style={{ color: "#22c55e" }}>✔ All guidelines met</p>
          ) : (
            warnings.map((w, i) => (
              <p key={i} style={{ color: "#ef4444" }}>⚠ {w}</p>
            ))
          )}
        </div>
      </div>

      {/* CANVAS */}
      <div style={styles.canvasArea}>
        <Stage
          ref={stageRef}
          width={size.width}
          height={size.height}
          scaleX={0.5}
          scaleY={0.5}
          style={styles.stage}
        >
          <Layer>
            <Rect width={size.width} height={size.height} fill="#ffffff" />
            <Text text={headline} x={50} y={40} fontSize={38} fontStyle="bold" draggable />
            {image && (
              <Image image={image} x={200} y={180} width={320} height={320} draggable />
            )}
            <Rect
              x={50}
              y={size.height - 120}
              width={240}
              height={60}
              fill="#2563eb"
              cornerRadius={8}
              draggable
            />
            <Text
              text={cta}
              x={100}
              y={size.height - 102}
              fill="white"
              fontSize={22}
              draggable
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
}

const styles = {
  app: {
    display: "flex",
    height: "100vh",
    fontFamily: "Segoe UI, sans-serif",
    background: "#f1f5f9",
  },
  sidebar: {
    width: "300px",
    padding: "20px",
    background: "linear-gradient(180deg, #1e3a8a, #2563eb)",
    color: "white",
    overflowY: "auto",
  },
  logo: {
    textAlign: "center",
    marginBottom: "20px",
  },
  card: {
    background: "white",
    color: "#111",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "6px",
    display: "block",
  },
  input: {
    width: "100%",
    padding: "8px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
  },
  buttonRow: {
    display: "flex",
    gap: "6px",
  },
  formatBtn: {
    flex: 1,
    padding: "6px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#e5e7eb",
  },
  downloadBtn: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    background: "#22c55e",
    color: "white",
    fontWeight: "bold",
    marginBottom: "15px",
  },
  canvasArea: {
    flex: 1,
    padding: "20px",
    overflow: "auto",
  },
  stage: {
    border: "1px solid #94a3b8",
    background: "white",
  },
};

export default App;
