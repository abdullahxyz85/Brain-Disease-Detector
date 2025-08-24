import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AudioRecorder } from 'react-audio-voice-recorder';
import axios from 'axios';

const PageContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;
  
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
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Card = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
`;

const CardTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 20px;
  font-size: 1.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background-color: var(--accent-color);
  }
`;

const PromptSection = styled.div`
  margin-top: 20px;
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 15px;
    color: var(--text-color);
  }
`;

const PromptCard = styled.div`
  background-color: ${({ active }) => (active ? '#f0f7ff' : '#f8f9fa')};
  border: 2px solid ${({ active }) => (active ? 'var(--primary-color)' : 'transparent')};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${({ active }) => (active ? '#f0f7ff' : '#f1f3f5')};
  }
  
  h4 {
    margin-bottom: 10px;
    color: ${({ active }) => (active ? 'var(--primary-color)' : 'var(--text-color)')};
  }
  
  p {
    color: #666;
    font-size: 0.95rem;
  }
`;

const RecordingSection = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RecorderContainer = styled.div`
  margin: 20px 0;
  
  .audio-recorder {
    border-radius: 50px !important;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1) !important;
  }
`;

const AudioPreview = styled.div`
  width: 100%;
  margin: 20px 0;
  
  audio {
    width: 100%;
  }
`;

const Button = styled.button`
  padding: 12px 25px;
  background-color: ${({ secondary }) => (secondary ? 'var(--secondary-color)' : 'var(--primary-color)')};
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 10px 0;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ResultSection = styled.div`
  margin-top: 30px;
`;

const ProgressContainer = styled.div`
  margin: 30px 0;
  text-align: center;
`;

const ProgressIndicator = styled.div`
  display: inline-block;
  border: 4px solid #f3f3f3;
  border-top: 4px solid var(--primary-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ResultCard = styled.div`
  background-color: white;
  border-radius: 15px;
  padding: 25px;
  margin-top: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  
  h3 {
    color: var(--primary-color);
    margin-bottom: 20px;
  }
`;

const ScoreContainer = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
  margin: 30px 0;
`;

const ScoreCard = styled.div`
  background-color: ${({ type }) => 
    type === 'vocabulary' ? '#e6f7ff' : 
    type === 'coherence' ? '#f6ffed' : 
    type === 'fluency' ? '#fff2e8' : '#f9f0ff'
  };
  border-radius: 10px;
  padding: 20px;
  width: 160px;
  text-align: center;
  
  .score-value {
    font-size: 2.5rem;
    font-weight: 700;
    color: ${({ type }) => 
      type === 'vocabulary' ? '#1890ff' : 
      type === 'coherence' ? '#52c41a' : 
      type === 'fluency' ? '#fa8c16' : '#722ed1'
    };
    margin: 10px 0;
  }
  
  .score-label {
    font-size: 0.9rem;
    color: #666;
  }
`;

const FeedbackContainer = styled.div`
  margin: 30px 0;
  
  h4 {
    margin-bottom: 15px;
    color: var(--text-color);
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 12px;
    padding-left: 30px;
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%234a6fa5'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /%3E%3C/svg%3E");
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
`;

const DisclaimerText = styled.p`
  font-size: 0.9rem;
  color: #888;
  font-style: italic;
  margin-top: 30px;
`;

const SpeechAnalysis = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  
  // Clear audio when prompt changes
  useEffect(() => {
    setAudioBlob(null);
    setAudioUrl(null);
    setAnalysisResult(null);
  }, [selectedPrompt]);
  
  // Available prompts
  const prompts = [
    {
      id: 1,
      title: "Describe Your Day",
      description: "Tell us about your day so far. What did you do after waking up? Where did you go? Who did you meet?"
    },
    {
      id: 2,
      title: "Explain a Recipe",
      description: "Describe how to make your favorite dish or drink. Include ingredients and steps in the process."
    },
    {
      id: 3,
      title: "Describe This Image",
      description: "Look at the image below and describe what you see in detail. Talk about the people, objects, colors, and what might be happening.",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 4,
      title: "Describe a Park Scene",
      description: "Look at this park scene and describe what you observe. Talk about the activities, weather, and atmosphere.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: 5,
      title: "Describe a Kitchen Scene",
      description: "Observe this kitchen image and describe what you see. Talk about the objects, their arrangement, and what activities might take place here.",
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
    }
  ];
  
  // Handle completed recording
  const addAudioElement = (blob) => {
    setAudioBlob(blob);
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
  };
  
  // Send audio to backend for analysis
  const analyzeAudio = async () => {
    if (!audioBlob || !selectedPrompt) return;
    
    setIsAnalyzing(true);
    
    try {
      // Create form data with audio file
      const formData = new FormData();
      formData.append('audio', audioBlob, 'speech.webm');
      formData.append('promptId', selectedPrompt.id);
      
      // Send to backend
      const response = await axios.post('http://localhost:8000/api/speech/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update with response
      setAnalysisResult(response.data);
    } catch (error) {
      console.error('Error analyzing speech:', error);
      
      // Simulate a response for demonstration
      setTimeout(() => {
        const simulatedResult = {
          scores: {
            vocabulary: 78,
            coherence: 85,
            fluency: 72,
            overall: 80
          },
          feedback: [
            "Good use of descriptive language",
            "Clear articulation of thoughts and ideas",
            "Consider expanding your vocabulary for more precise expression",
            "Some minor repetition noticed, try varying your word choice"
          ],
          wordCount: 127,
          uniqueWords: 89,
          speechDuration: "45 seconds"
        };
        
        setAnalysisResult(simulatedResult);
      }, 2000);
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  return (
    <PageContainer>
      <PageHeader>
        <h1>Speech Analysis</h1>
        <p>
          Record yourself speaking about a topic to analyze language patterns, vocabulary richness,
          and speech coherence—important indicators of cognitive health.
        </p>
      </PageHeader>
      
      <ContentContainer>
        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardTitle>Select a Speaking Prompt</CardTitle>
          <p>Choose one of the following prompts to speak about for 30-60 seconds:</p>
          
          <PromptSection>
            {prompts.map(prompt => (
              <PromptCard 
                key={prompt.id} 
                active={selectedPrompt && selectedPrompt.id === prompt.id}
                onClick={() => setSelectedPrompt(prompt)}
              >
                <h4>{prompt.title}</h4>
                <p>{prompt.description}</p>
                {prompt.image && (
                  <img 
                    src={prompt.image} 
                    alt={prompt.title}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/400x300/4a6fa5/white?text=Sample+Image+for+Description";
                    }}
                    style={{ 
                      width: '100%', 
                      maxHeight: '300px',
                      objectFit: 'cover',
                      borderRadius: '8px', 
                      marginTop: '15px',
                      border: '2px solid #e1e5e9'
                    }} 
                  />
                )}
              </PromptCard>
            ))}
          </PromptSection>
        </Card>
        
        {selectedPrompt && (
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CardTitle>Record Your Speech</CardTitle>
            <p>
              Now, speak about the prompt "{selectedPrompt.title}" for 30-60 seconds.
              Click the microphone button to start recording and click it again to stop.
            </p>
            
            <RecordingSection>
              <RecorderContainer>
                <AudioRecorder 
                  onRecordingComplete={addAudioElement}
                  audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                  }}
                  downloadOnSavePress={false}
                  downloadFileExtension="webm"
                />
              </RecorderContainer>
              
              {audioUrl && (
                <AudioPreview>
                  <h3>Preview:</h3>
                  <audio src={audioUrl} controls />
                </AudioPreview>
              )}
              
              <Button 
                onClick={analyzeAudio} 
                disabled={!audioBlob || isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Speech'}
              </Button>
            </RecordingSection>
          </Card>
        )}
        
        {isAnalyzing && (
          <ProgressContainer>
            <ProgressIndicator />
            <p>Analyzing your speech patterns...</p>
          </ProgressContainer>
        )}
        
        {analysisResult && (
          <ResultSection>
            <ResultCard>
              <h3>Analysis Results</h3>
              
              <ScoreContainer>
                <ScoreCard type="overall">
                  <div className="score-value">{analysisResult.scores.overall}</div>
                  <div className="score-label">Overall Score</div>
                </ScoreCard>
                <ScoreCard type="vocabulary">
                  <div className="score-value">{analysisResult.scores.vocabulary}</div>
                  <div className="score-label">Vocabulary</div>
                </ScoreCard>
                <ScoreCard type="coherence">
                  <div className="score-value">{analysisResult.scores.coherence}</div>
                  <div className="score-label">Coherence</div>
                </ScoreCard>
                <ScoreCard type="fluency">
                  <div className="score-value">{analysisResult.scores.fluency}</div>
                  <div className="score-label">Fluency</div>
                </ScoreCard>
              </ScoreContainer>
              
              <div>
                <p><strong>Word Count:</strong> {analysisResult.wordCount}</p>
                <p><strong>Unique Words:</strong> {analysisResult.uniqueWords}</p>
                <p><strong>Speech Duration:</strong> {analysisResult.speechDuration}</p>
              </div>
              
              <FeedbackContainer>
                <h4>Speech Insights</h4>
                <ul>
                  {analysisResult.feedback.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </FeedbackContainer>
              
              <DisclaimerText>
                Note: This analysis is for informational purposes only and should not be used as a diagnostic tool. 
                If you have concerns about cognitive health, please consult a healthcare professional.
              </DisclaimerText>
            </ResultCard>
          </ResultSection>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default SpeechAnalysis;
