import React, { useRef, useState } from "react";

// If using Vite, add this to index.html: <script src="https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/ort.min.js"></script>

// Make sure these labels match the ONNX model output order
const LABELS = [
  "Mild Demented",
  "Moderate Demented",
  "Non Demented",
  "Very Mild Demented"
];
const MEAN = [0.485,0.456,0.406];
const STD  = [0.229,0.224,0.225];

export default function AlzheimerDetector() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [output, setOutput] = useState("");
  const fileInputRef = useRef();
  const previewRef = useRef();
  const canvasRef = useRef();

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setImageLoaded(false);
  }

  function handleImageLoad() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 224, 224);
    ctx.drawImage(previewRef.current, 0, 0, 224, 224);
    setImageLoaded(true);
  }

  function softmax(arr) {
    const max = Math.max(...arr);
    const exps = arr.map(v => Math.exp(v - max));
    const sum = exps.reduce((a, b) => a + b, 0);
    return exps.map(v => v / sum);
  }

  function preprocess() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const { data } = ctx.getImageData(0, 0, 224, 224);
    const chw = new Float32Array(1 * 3 * 224 * 224);
    let idx = 0;
    const stride = 224 * 224;
    for (let y = 0; y < 224; y++) {
      for (let x = 0; x < 224; x++) {
        const p = (y * 224 + x) * 4;
        const r = data[p] / 255, g = data[p + 1] / 255, b = data[p + 2] / 255;
        chw[0 * stride + idx] = (r - MEAN[0]) / STD[0];
        chw[1 * stride + idx] = (g - MEAN[1]) / STD[1];
        chw[2 * stride + idx] = (b - MEAN[2]) / STD[2];
        idx++;
      }
    }
    return chw;
  }

  async function handlePredict() {
    if (!imageLoaded) {
      setOutput("Please upload an image first.");
      return;
    }
    if (!window.ort) {
      setOutput("onnxruntime-web is not loaded.");
      return;
    }
    try {
      const tensor = new window.ort.Tensor("float32", preprocess(), [1, 3, 224, 224]);
      let session;
      try {
        session = await window.ort.InferenceSession.create("alzheimer.onnx", { executionProviders: ["webgpu"] });
      } catch {
        try {
          session = await window.ort.InferenceSession.create("alzheimer.onnx", { executionProviders: ["webgl"] });
        } catch {
          session = await window.ort.InferenceSession.create("alzheimer.onnx");
        }
      }
      const results = await session.run({ input: tensor });
      // Show available output keys for debugging
      if (!results || Object.keys(results).length === 0) {
        setOutput("No output from model. Check your ONNX file.");
        return;
      }
      // Try to find the output key dynamically
      const outputKey = Object.keys(results)[0];
      const logits = results[outputKey].data;
      const probs = softmax(Array.from(logits));
      const sorted = probs.map((p, i) => ({ label: LABELS[i], p })).sort((a, b) => b.p - a.p);
      setOutput(
        `<div><strong>Predictions:</strong></div>
         <ul>${sorted.map(s => `<li class="prob">${s.label}: ${(s.p * 100).toFixed(2)}%</li>`).join("")}</ul>`
      );
    } catch (err) {
      setOutput("Error: " + err.message);
    }
  }

  return (
    <div style={{
      fontFamily: "sans-serif",
      maxWidth: 800,
      margin: "40px auto",
      padding: "0 16px"
    }}>
      <h1>Alzheimer Detector – Educational Demo</h1>
      <p><strong>Note:</strong> Does not replace medical consultation.</p>

      <div style={{
        padding: 16,
        border: "1px solid #eee",
        borderRadius: 12,
        marginTop: 16
      }}>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button onClick={handlePredict}>Predict</button>
      </div>

      <div style={{
        display: "flex",
        gap: 16,
        marginTop: 16,
        padding: 16,
        border: "1px solid #eee",
        borderRadius: 12
      }}>
        <div>
          <h3>Image</h3>
          <img
            ref={previewRef}
            src={previewUrl}
            width={224}
            height={224}
            alt=""
            style={{ border: "1px solid #ddd", borderRadius: 8 }}
            onLoad={handleImageLoad}
          />
        </div>
        <div>
          <h3>Canvas (preprocessing)</h3>
          <canvas
            ref={canvasRef}
            width={224}
            height={224}
            style={{ border: "1px solid #ddd", borderRadius: 8 }}
          />
        </div>
      </div>

      <div style={{
        padding: 16,
        border: "1px solid #eee",
        borderRadius: 12,
        marginTop: 16
      }}>
        <div dangerouslySetInnerHTML={{ __html: output }} />
      </div>
    </div>
  );
}
