import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ParticlesBackground from '../components/ui/ParticlesBackground';
import BrainAnimation from '../components/ui/BrainAnimation';
import FloatingElements from '../components/ui/FloatingElements';
import GradientBackground from '../components/ui/GradientBackground';
import FullScreenChatbot from '../components/chat/FullScreenChatbot';
import { AnimatedPrimaryButton, AnimatedSecondaryButton } from '../components/ui/AnimatedButtons';

const HeroSection = styled.section`
  padding: 100px 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    padding: 80px 0;
    min-height: 60vh;
  }
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
  backdrop-filter: blur(3px);
  border-radius: 20px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05);
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  margin-bottom: 20px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 900;
  letter-spacing: -0.5px;
  line-height: 1.2;
  text-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  color: #555;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  font-weight: 300;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 30px;
  }
`;

const StatisticsSection = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const StatisticsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const StatisticsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-top: 60px;
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
`;

// This was a duplicate declaration of HeroSubtitle that was causing compile errors
// Removed duplicate declaration

const RoadmapSection = styled.section`
  padding: 80px 0;
  background: white;
  color: #333;
`;

const RoadmapContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const RoadmapGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 60px;
`;

const RoadmapCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 40px 30px;
  border: 2px solid #f0f0f0;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-10px);
    background: #f8f9fa;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    border-color: #e0e0e0;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #00f2fe, #4facfe);
  }
`;

const RoadmapIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 25px;
  position: relative;
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
  
  svg {
    width: 40px;
    height: 40px;
    color: white;
    transition: all 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.1);
  }
`;

const RoadmapTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: #333;
  font-weight: 700;
`;

const RoadmapDescription = styled.p`
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #666;
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 40px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 18px;
    
    a, button {
      width: 80%;
    }
  }
`;

const AIButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 34px;
  border-radius: 50px;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(102, 126, 234, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
  }
`;

const FeaturesSection = styled.section`
  padding: 80px 0;
  background-color: white;
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 60px;
  color: var(--primary-color);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: var(--accent-color);
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 35px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.06);
  transition: all 0.5s ease;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color), var(--accent-color));
    opacity: 0;
    z-index: -1;
    transition: opacity 0.5s ease;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0%;
    height: 4px;
    background: linear-gradient(90deg, var(--primary-color), var(--accent-color));
    transition: width 0.5s ease;
  }

  &:hover {
    transform: translateY(-15px) scale(1.03);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);

    &::after {
      width: 100%;
    }

    svg {
      transform: scale(1.2) rotate(5deg);
    }
  }

  .feature-btn {
    margin-top: 32px;
    align-self: center;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .feature-btn .animated-primary-btn {
    background: linear-gradient(90deg, #2563eb 0%, #38bdf8 100%);
    color: #fff;
    font-weight: 700;
    font-size: 1.18rem;
    border-radius: 999px;
    padding: 18px 0;
    width: 90%;
    max-width: 270px;
    box-shadow: 0 8px 18px rgba(37,99,235,0.10);
    margin: 0 auto;
    text-align: center;
    letter-spacing: 0.5px;
    border: none;
    transition: background 0.2s, box-shadow 0.2s, transform 0.1s;
    display: block;
  }
  .feature-btn .animated-primary-btn:hover {
    background: linear-gradient(90deg, #1e40af 0%, #0ea5e9 100%);
    box-shadow: 0 12px 24px rgba(37,99,235,0.16);
    color: #fff;
    transform: translateY(-2px) scale(1.03);
  }
`;

const FeatureIcon = styled(motion.div)`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  position: relative;
  box-shadow: 0 10px 20px rgba(74, 111, 165, 0.2);
  
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color), var(--accent-color), var(--primary-color));
    border-radius: 22px;
    background-size: 400%;
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: -1;
  }
  
  &:hover::before {
    opacity: 1;
    animation: gradientBorder 3s linear infinite;
  }
  
  @keyframes gradientBorder {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  svg {
    width: 40px;
    height: 40px;
    color: white;
    transition: all 0.5s ease;
  }
`;

const FeatureTitle = styled(motion.h3)`
  font-size: 1.6rem;
  margin-bottom: 18px;
  color: var(--primary-color);
  font-weight: 700;
  transition: color 0.3s ease;
`;

const FeatureDescription = styled(motion.p)`
  color: #555;
  line-height: 1.7;
  font-size: 1.05rem;
`;

const HowItWorksSection = styled.section`
  padding: 80px 0;
  background-color: #f8f9fa;
`;

const StepContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Step = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 22%;
  position: relative;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 40px;
    right: -15%;
    width: 30%;
    height: 2px;
    background-color: #ddd;
  }
  
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 40px;
    
    &:not(:last-child)::after {
      display: none;
    }
  }
`;

const StepNumber = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const StepTitle = styled.h3`
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 10px;
`;

const StepDescription = styled.p`
  text-align: center;
  color: #666;
  font-size: 0.9rem;
`;

const BenefitsSection = styled.section`
  padding: 80px 0;
  background-color: white;
`;

const BenefitContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 50px;
  
  @media (max-width: 992px) {
    flex-direction: column;
  }
`;

const BenefitImage = styled.div`
  width: 45%;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
  
  @media (max-width: 992px) {
    width: 100%;
    margin-bottom: 40px;
  }
`;

const BenefitContent = styled.div`
  width: 50%;
  padding-left: 50px;
  
  @media (max-width: 992px) {
    width: 100%;
    padding-left: 0;
  }
`;

const BenefitList = styled.ul`
  list-style: none;
  padding: 0;
`;

const BenefitItem = styled(motion.li)`
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  
  svg {
    min-width: 24px;
    height: 24px;
    color: var(--accent-color);
    margin-right: 15px;
    margin-top: 3px;
  }
`;

const BenefitText = styled.div`
  h4 {
    font-size: 1.2rem;
    margin-bottom: 5px;
  }
  
  p {
    color: #666;
    line-height: 1.6;
  }
`;

const Home = () => {
  const [showChatbot, setShowChatbot] = useState(false);

  const openChatbot = () => {
    setShowChatbot(true);
  };

  const closeChatbot = () => {
    setShowChatbot(false);
  };

  return (
    <>
      {showChatbot && <FullScreenChatbot onClose={closeChatbot} />}
      
      <HeroSection>
        <ParticlesBackground />
        <GradientBackground />
        <FloatingElements />
        <BrainAnimation />
        
        <HeroContainer>
          <HeroTitle
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100
            }}
          >
            Synapse Safari
          </HeroTitle>
          
          <HeroSubtitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7,
              delay: 0.3,
              type: "spring",
              stiffness: 80
            }}
          >
            Embark on an exciting journey through your mind with our interactive cognitive assessment platform. Discover insights about your brain health through engaging games, quizzes, and speech analysis.
          </HeroSubtitle>
          
          <ButtonGroup
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7,
              delay: 0.6,
              type: "spring",
              stiffness: 70
            }}
          >
            <AIButton
              onClick={openChatbot}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Talk to AI Assistant
            </AIButton>
            <AnimatedPrimaryButton to="/games">Try Cognitive Games</AnimatedPrimaryButton>
            <AnimatedSecondaryButton to="/resources">Learn More</AnimatedSecondaryButton>
          </ButtonGroup>
        </HeroContainer>
      </HeroSection>
      
      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle>Our Features</SectionTitle>
          
          <FeatureGrid>
            <FeatureCard
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 50
              }}
            >
              <FeatureIcon
                whileHover={{ rotate: 5 }}
                animate={{ 
                  boxShadow: ["0 10px 20px rgba(74, 111, 165, 0.2)", "0 10px 20px rgba(74, 111, 165, 0.4)", "0 10px 20px rgba(74, 111, 165, 0.2)"]
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </FeatureIcon>
              <FeatureTitle
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Cognitive Games
              </FeatureTitle>
              <FeatureDescription
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Engage in interactive games designed to test memory, reaction time, problem-solving, and spatial skills. These fun activities help measure cognitive abilities.
              </FeatureDescription>
              <div className="feature-btn">
                <AnimatedPrimaryButton to="/games" className="animated-primary-btn">Explore Games</AnimatedPrimaryButton>
              </div>
            </FeatureCard>
            
            <FeatureCard
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 50,
                delay: 0.2
              }}
            >
              <FeatureIcon
                whileHover={{ rotate: 5 }}
                animate={{ 
                  boxShadow: ["0 10px 20px rgba(74, 111, 165, 0.2)", "0 10px 20px rgba(74, 111, 165, 0.4)", "0 10px 20px rgba(74, 111, 165, 0.2)"]
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </FeatureIcon>
              <FeatureTitle
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                Cognitive Quizzes
              </FeatureTitle>
              <FeatureDescription
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Answer questions that evaluate temporal orientation, semantic memory, reasoning, and logic. Our specialized quizzes provide insight into your cognitive functions.
              </FeatureDescription>
              <div className="feature-btn">
                <AnimatedPrimaryButton to="/quiz" className="animated-primary-btn">Take a Quiz</AnimatedPrimaryButton>
              </div>
            </FeatureCard>
            
            <FeatureCard
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 50,
                delay: 0.4
              }}
            >
              <FeatureIcon
                whileHover={{ rotate: 5 }}
                animate={{ 
                  boxShadow: ["0 10px 20px rgba(74, 111, 165, 0.2)", "0 10px 20px rgba(74, 111, 165, 0.4)", "0 10px 20px rgba(74, 111, 165, 0.2)"]
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </FeatureIcon>
              <FeatureTitle
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                Speech Analysis
              </FeatureTitle>
              <FeatureDescription
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                Record your voice describing an image or daily routine for AI-powered language pattern analysis. Changes in speech can be early indicators of cognitive changes.
              </FeatureDescription>
              <div className="feature-btn">
                <AnimatedPrimaryButton to="/speech" className="animated-primary-btn">Try Speech Analysis</AnimatedPrimaryButton>
              </div>
            </FeatureCard>
            
            <FeatureCard
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 50,
                delay: 0.6
              }}
            >
              <FeatureIcon
                whileHover={{ rotate: 5 }}
                animate={{ 
                  boxShadow: ["0 10px 20px rgba(74, 111, 165, 0.2)", "0 10px 20px rgba(74, 111, 165, 0.4)", "0 10px 20px rgba(74, 111, 165, 0.2)"]
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 1.5
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </FeatureIcon>
              <FeatureTitle
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                AI Feedback
              </FeatureTitle>
              <FeatureDescription
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                Receive personalized recommendations based on your performance across different cognitive assessments. Get actionable insights to improve your brain health.
              </FeatureDescription>
              <div className="feature-btn">
                <AnimatedPrimaryButton to="/results" className="animated-primary-btn">View Results</AnimatedPrimaryButton>
              </div>
            </FeatureCard>
            
            <FeatureCard
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 50,
                delay: 2
              }}
            >
              <FeatureIcon
                whileHover={{ rotate: 5 }}
                animate={{ 
                  boxShadow: ["0 10px 20px rgba(37, 99, 235, 0.15)", "0 10px 20px rgba(56, 189, 248, 0.18)", "0 10px 20px rgba(37, 99, 235, 0.15)"]
                }}
                transition={{
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 2.5
                  }
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 15c1.333-2 6.667-2 8 0M9 10h.01M15 10h.01" />
                </svg>
              </FeatureIcon>
              <FeatureTitle
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 2.1 }}
              >
                MRI Disease Detector
              </FeatureTitle>
              <FeatureDescription
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 2.2 }}
              >
                Upload a brain MRI (RMN) scan and let our AI analyze it for signs of Alzheimer’s or dementia. Fast, private, and easy to use.
              </FeatureDescription>
              <div className="feature-btn">
                <AnimatedPrimaryButton to="/alzheimer-detector" className="animated-primary-btn">Analyze MRI</AnimatedPrimaryButton>
              </div>
            </FeatureCard>
          </FeatureGrid>
        </FeaturesContainer>
      </FeaturesSection>
      
      <HowItWorksSection>
        <FeaturesContainer>
          <SectionTitle>How It Works</SectionTitle>
          
          <StepContainer>
            <Step
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <StepNumber>1</StepNumber>
              <StepTitle>Select an Activity</StepTitle>
              <StepDescription>Choose from various cognitive games, quizzes, or speech recording activities.</StepDescription>
            </Step>
            
            <Step
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <StepNumber>2</StepNumber>
              <StepTitle>Complete Tasks</StepTitle>
              <StepDescription>Engage with interactive challenges designed to measure cognitive abilities.</StepDescription>
            </Step>
            
            <Step
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <StepNumber>3</StepNumber>
              <StepTitle>AI Analysis</StepTitle>
              <StepDescription>Our system evaluates your performance using advanced algorithms.</StepDescription>
            </Step>
            
            <Step
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <StepNumber>4</StepNumber>
              <StepTitle>Get Results</StepTitle>
              <StepDescription>Receive personalized feedback and recommendations for brain health.</StepDescription>
            </Step>
          </StepContainer>
        </FeaturesContainer>
      </HowItWorksSection>
      
      <BenefitsSection>
        <FeaturesContainer>
          <SectionTitle>Why Use Our Platform?</SectionTitle>
          
          <BenefitContainer>
            <BenefitImage>
              <img src="https://images.unsplash.com/photo-1559757175-5700dde675bc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Brain health benefits" />
            </BenefitImage>
            
            <BenefitContent>
              <BenefitList>
                <BenefitItem
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <BenefitText>
                    <h4>Early Detection</h4>
                    <p>Identify potential cognitive issues before they become serious problems.</p>
                  </BenefitText>
                </BenefitItem>
                
                <BenefitItem
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <BenefitText>
                    <h4>Non-Invasive Testing</h4>
                    <p>No medical procedures needed—just interactive games and activities.</p>
                  </BenefitText>
                </BenefitItem>
                
                <BenefitItem
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <BenefitText>
                    <h4>Privacy Focused</h4>
                    <p>All tests are session-based with no personal data stored after you close the browser.</p>
                  </BenefitText>
                </BenefitItem>
                
                <BenefitItem
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <BenefitText>
                    <h4>Scientific Approach</h4>
                    <p>Based on established cognitive assessment techniques used by healthcare professionals.</p>
                  </BenefitText>
                </BenefitItem>
              </BenefitList>
            </BenefitContent>
          </BenefitContainer>
        </FeaturesContainer>
      </BenefitsSection>
      
      <StatisticsSection>
        <StatisticsContainer>
          <SectionTitle style={{ color: 'white' }}>Brain Health by the Numbers</SectionTitle>
          <StatisticsGrid>
            <StatItem
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <StatNumber>55M+</StatNumber>
              <StatLabel>People worldwide living with dementia</StatLabel>
            </StatItem>
            <StatItem
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <StatNumber>6.7M</StatNumber>
              <StatLabel>Americans living with Alzheimer's</StatLabel>
            </StatItem>
            <StatItem
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <StatNumber>90%</StatNumber>
              <StatLabel>Success rate with early intervention</StatLabel>
            </StatItem>
            <StatItem
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <StatNumber>12</StatNumber>
              <StatLabel>Comprehensive cognitive assessments</StatLabel>
            </StatItem>
          </StatisticsGrid>
        </StatisticsContainer>
      </StatisticsSection>

      <RoadmapSection>
        <RoadmapContainer>
          <SectionTitle style={{ color: '#333' }}>Future Roadmap</SectionTitle>
          <RoadmapGrid>
            <RoadmapCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <RoadmapIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </RoadmapIcon>
              <RoadmapTitle>Enhanced AI Diagnostics</RoadmapTitle>
              <RoadmapDescription>
                Advanced machine learning models for more accurate early detection of cognitive decline with improved pattern recognition and predictive analytics.
              </RoadmapDescription>
            </RoadmapCard>

            <RoadmapCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <RoadmapIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </RoadmapIcon>
              <RoadmapTitle>Mobile Application</RoadmapTitle>
              <RoadmapDescription>
                Native mobile apps for iOS and Android with offline capabilities, push notifications for regular assessments, and seamless data synchronization.
              </RoadmapDescription>
            </RoadmapCard>

            <RoadmapCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <RoadmapIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </RoadmapIcon>
              <RoadmapTitle>Healthcare Integration</RoadmapTitle>
              <RoadmapDescription>
                Direct integration with electronic health records (EHR) systems, allowing healthcare providers to access patient cognitive assessment data seamlessly.
              </RoadmapDescription>
            </RoadmapCard>

            <RoadmapCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <RoadmapIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </RoadmapIcon>
              <RoadmapTitle>Real-time Monitoring</RoadmapTitle>
              <RoadmapDescription>
                Continuous cognitive monitoring using wearable devices and IoT sensors to track daily cognitive patterns and provide early warning systems.
              </RoadmapDescription>
            </RoadmapCard>

            <RoadmapCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <RoadmapIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </RoadmapIcon>
              <RoadmapTitle>Global Research Network</RoadmapTitle>
              <RoadmapDescription>
                Establish partnerships with research institutions worldwide to create a comprehensive cognitive health database and accelerate breakthrough discoveries.
              </RoadmapDescription>
            </RoadmapCard>

            <RoadmapCard
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <RoadmapIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </RoadmapIcon>
              <RoadmapTitle>Personalized Interventions</RoadmapTitle>
              <RoadmapDescription>
                AI-driven personalized cognitive training programs and lifestyle recommendations based on individual genetic profiles and cognitive patterns.
              </RoadmapDescription>
            </RoadmapCard>
          </RoadmapGrid>
        </RoadmapContainer>
      </RoadmapSection>
    </>
  );
};

export default Home;
