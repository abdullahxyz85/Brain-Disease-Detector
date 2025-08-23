import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 500px;
  margin: 60px auto;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.10);
  padding: 40px 28px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.1rem;
  color: var(--primary-color);
  margin-bottom: 18px;
`;

const Subtitle = styled.p`
  color: #555;
  margin-bottom: 28px;
`;

const UploadLabel = styled.label`
  display: inline-block;
  background: linear-gradient(90deg, #2563eb 0%, #38bdf8 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 999px;
  padding: 14px 36px;
  margin-bottom: 18px;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(37,99,235,0.10);
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: linear-gradient(90deg, #1e40af 0%, #0ea5e9 100%);
    box-shadow: 0 10px 24px rgba(37,99,235,0.16);
  }
`;

const FileInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 260px;
  margin: 18px 0 24px 0;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
`;

const AnalyzeButton = styled.button`
  background: linear-gradient(90deg, #2563eb 0%, #38bdf8 100%);
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  border-radius: 999px;
  padding: 14px 36px;
  border: none;
  margin-top: 10px;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(37,99,235,0.10);
  transition: background 0.2s, box-shadow 0.2s;
  &:hover {
    background: linear-gradient(90deg, #1e40af 0%, #0ea5e9 100%);
    box-shadow: 0 10px 24px rgba(37,99,235,0.16);
  }
`;

const ResultBox = styled.div`
  margin-top: 30px;
  background: #f1f5fa;
  border-radius: 12px;
  padding: 22px 16px;
  color: #2563eb;
  font-size: 1.1rem;
  font-weight: 600;
`;

const MRIDetector = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = e => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
      setResult('');
    }
  };

  const handleAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setResult('');
    // Simulate API call
    setTimeout(() => {
      setResult('AI interpretation: No clear signs of Alzheimer’s or dementia detected. (Demo result)');
      setLoading(false);
    }, 2200);
  };

  return (
    <Container>
      <Title>MRI Disease Detector</Title>
      <Subtitle>
        Upload an MRI (RMN) brain scan image. Our AI will analyze it for signs of Alzheimer’s or dementia.
      </Subtitle>
      <UploadLabel>
        Upload MRI Image
        <FileInput type="file" accept="image/*" onChange={handleFileChange} />
      </UploadLabel>
      {preview && <ImagePreview src={preview} alt="MRI Preview" />}
      <div>
        <AnalyzeButton onClick={handleAnalyze} disabled={!file || loading}>
          {loading ? 'Analyzing...' : 'Analyze MRI'}
        </AnalyzeButton>
      </div>
      {result && <ResultBox>{result}</ResultBox>}
    </Container>
  );
};

export default MRIDetector;
