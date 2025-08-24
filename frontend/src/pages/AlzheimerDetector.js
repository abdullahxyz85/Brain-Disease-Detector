import React, { useRef, useState } from "react";
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Make sure these labels match the ONNX model output order
const LABELS = [
  "Mild Demented",
  "Moderate Demented", 
  "Non Demented",
  "Very Mild Demented"
];
const MEAN = [0.485, 0.456, 0.406];
const STD = [0.229, 0.224, 0.225];

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Poppins', sans-serif;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
  
  h1 {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 15px;
  }
  
  p {
    color: #666;
    max-width: 700px;
    margin: 0 auto;
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const UploadSection = styled(motion.div)`
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  border: 2px dashed #e1e5e9;
  text-align: center;
`;

const FileInput = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  max-width: 300px;
`;

const PredictButton = styled(motion.button)`
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-left: 15px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const PreviewSection = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 30px;
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ImageContainer = styled.div`
  text-align: center;
  
  h3 {
    color: var(--primary-color);
    margin-bottom: 15px;
  }
  
  img, canvas {
    border: 2px solid #e1e5e9;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const ResultsSection = styled(motion.div)`
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  
  h3 {
    color: var(--primary-color);
    margin-bottom: 20px;
    text-align: center;
  }
`;

const ProbabilityList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    background-color: #f8f9fa;
    margin-bottom: 10px;
    padding: 15px 20px;
    border-radius: 10px;
    border-left: 4px solid var(--primary-color);
    display: flex;
    justify-content: space-between;
    font-weight: 500;
    
    &:first-child {
      background-color: #e8f5e8;
      border-left-color: #28a745;
      font-weight: 600;
    }
  }
`;

const DisclaimerSection = styled.div`
  background-color: #fff3cd;
  border: 1px solid #ffeaa7;
  border-radius: 15px;
  padding: 25px;
  margin-top: 30px;
  
  h4 {
    color: #856404;
    margin-bottom: 15px;
    font-size: 1.2rem;
  }
  
  p {
    color: #856404;
    margin: 0;
    line-height: 1.6;
    font-weight: 500;
  }
`;

const ErrorMessage = styled.div`
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  padding: 15px;
  border-radius: 10px;
  margin-top: 20px;
  text-align: center;
`;

export default function AlzheimerDetector() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [output, setOutput] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef();
  const previewRef = useRef();
  const canvasRef = useRef();

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Reset states
    setOutput("");
    setError("");
    
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
      setError("Please upload a brain MRI image first.");
      return;
    }
    
    if (!window.ort) {
      setError("ONNX Runtime is not loaded. Please refresh the page and try again.");
      return;
    }
    
    setIsAnalyzing(true);
    setError("");
    setOutput("");
    
    try {
      const tensor = new window.ort.Tensor("float32", preprocess(), [1, 3, 224, 224]);
      let session;
      
      try {
        session = await window.ort.InferenceSession.create("/alzheimer.onnx", { executionProviders: ["webgpu"] });
      } catch {
        try {
          session = await window.ort.InferenceSession.create("/alzheimer.onnx", { executionProviders: ["webgl"] });
        } catch {
          session = await window.ort.InferenceSession.create("/alzheimer.onnx");
        }
      }
      
      const results = await session.run({ input: tensor });
      
      if (!results || Object.keys(results).length === 0) {
        setError("No output from model. Please check the model file.");
        return;
      }
      
      // Try to find the output key dynamically
      const outputKey = Object.keys(results)[0];
      const logits = results[outputKey].data;
      const probs = softmax(Array.from(logits));
      const sorted = probs.map((p, i) => ({ label: LABELS[i], p })).sort((a, b) => b.p - a.p);
      
      setOutput(sorted);
      
    } catch (err) {
      console.error("Prediction error:", err);
      setError("Error analyzing image: " + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <PageContainer>
      <PageHeader>
        <h1>🧠 Alzheimer Detection System</h1>
        <p>
          Upload a brain MRI scan for AI-powered analysis. Our advanced machine learning model 
          can help identify potential signs of cognitive decline.
        </p>
      </PageHeader>

      <UploadSection
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>
          Upload Brain MRI Image
        </h3>
        <div>
          <FileInput
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <PredictButton 
            onClick={handlePredict}
            disabled={!imageLoaded || isAnalyzing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
          </PredictButton>
        </div>
      </UploadSection>

      {previewUrl && (
        <PreviewSection>
          <ImageContainer>
            <h3>Original Image</h3>
            <img
              ref={previewRef}
              src={previewUrl}
              width={224}
              height={224}
              alt="Brain MRI"
              onLoad={handleImageLoad}
            />
          </ImageContainer>
          <ImageContainer>
            <h3>Processed Image</h3>
            <canvas
              ref={canvasRef}
              width={224}
              height={224}
            />
          </ImageContainer>
        </PreviewSection>
      )}

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      {output && Array.isArray(output) && (
        <ResultsSection
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3>Analysis Results</h3>
          <ProbabilityList>
            {output.map((result, index) => (
              <li key={index}>
                <span>{result.label}</span>
                <span>{(result.p * 100).toFixed(2)}%</span>
              </li>
            ))}
          </ProbabilityList>
        </ResultsSection>
      )}

      <DisclaimerSection>
        <h4>⚠️ Important Medical Disclaimer</h4>
        <p>
          This tool is for educational and research purposes only. It should NOT be used for actual medical diagnosis. 
          The results are not a substitute for professional medical advice, diagnosis, or treatment. 
          Always consult with qualified healthcare professionals for any health concerns or before making medical decisions.
        </p>
      </DisclaimerSection>
    </PageContainer>
  );
}
