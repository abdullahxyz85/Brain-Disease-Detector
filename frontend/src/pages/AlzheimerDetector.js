import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 80vh;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  
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

const ContentSection = styled(motion.div)`
  background-color: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const FeatureCard = styled(motion.div)`
  background-color: #f8f9fa;
  border-radius: 15px;
  padding: 30px;
  text-align: center;
  
  h3 {
    color: var(--primary-color);
    margin-bottom: 15px;
    font-size: 1.3rem;
  }
  
  p {
    color: #666;
    line-height: 1.6;
  }
  
  svg {
    width: 60px;
    height: 60px;
    color: var(--primary-color);
    margin-bottom: 20px;
  }
`;

const ActionButton = styled(motion.button)`
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusMessage = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  font-weight: 600;
  
  &.info {
    background-color: #e3f2fd;
    color: #1976d2;
  }
  
  &.warning {
    background-color: #fff3e0;
    color: #f57c00;
  }
`;

const AlzheimerDetector = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [status, setStatus] = useState('');

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setStatus('This feature is currently under development. Advanced AI-powered Alzheimer detection will be available soon.');
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <PageContainer>
      <PageHeader>
        <h1>Alzheimer Detection System</h1>
        <p>
          Advanced AI-powered analysis for early detection of Alzheimer's disease through 
          cognitive assessments, speech patterns, and behavioral indicators.
        </p>
      </PageHeader>

      <ContentSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px', textAlign: 'center' }}>
          How It Works
        </h2>
        <p style={{ color: '#666', textAlign: 'center', marginBottom: '30px' }}>
          Our advanced detection system combines multiple assessment methods to provide 
          comprehensive cognitive health insights.
        </p>
        
        <FeatureGrid>
          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h3>Cognitive Assessment</h3>
            <p>
              Comprehensive cognitive tests that evaluate memory, attention, 
              language, and executive function capabilities.
            </p>
          </FeatureCard>

          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <h3>Speech Analysis</h3>
            <p>
              Advanced analysis of speech patterns, fluency, and linguistic 
              features that may indicate cognitive changes.
            </p>
          </FeatureCard>

          <FeatureCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h3>AI Analysis</h3>
            <p>
              Machine learning algorithms trained on extensive datasets to 
              identify subtle patterns associated with early cognitive decline.
            </p>
          </FeatureCard>
        </FeatureGrid>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <ActionButton
            onClick={handleStartAnalysis}
            disabled={isAnalyzing}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isAnalyzing ? 'Analyzing...' : 'Start Assessment'}
          </ActionButton>
          
          {status && (
            <StatusMessage className="info">
              {status}
            </StatusMessage>
          )}
        </div>
      </ContentSection>

      <ContentSection
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 style={{ color: 'var(--primary-color)', marginBottom: '20px' }}>
          Important Notice
        </h2>
        <div style={{ backgroundColor: '#fff3cd', padding: '20px', borderRadius: '10px', border: '1px solid #ffeaa7' }}>
          <p style={{ color: '#856404', margin: 0, fontWeight: '600' }}>
            <strong>Disclaimer:</strong> This tool is designed for educational and screening purposes only. 
            It is not a substitute for professional medical diagnosis. If you have concerns about 
            cognitive health, please consult with a qualified healthcare professional.
          </p>
        </div>
      </ContentSection>
    </PageContainer>
  );
};

export default AlzheimerDetector;
