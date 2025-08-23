import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HeroSection = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  text-align: center;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    padding: 60px 0;
  }
`;

const HeroContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 20px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: #555;
  max-width: 700px;
  margin: 0 auto 40px;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
    
    a {
      width: 80%;
    }
  }
`;

const PrimaryButton = styled(Link)`
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 12px 30px;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    text-decoration: none;
  }
`;

const SecondaryButton = styled(Link)`
  background: transparent;
  color: var(--primary-color);
  padding: 12px 30px;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  border: 2px solid var(--primary-color);
  transition: all 0.3s ease;
  
  &:hover {
    background-color: var(--primary-color);
    color: white;
    transform: translateY(-3px);
    text-decoration: none;
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
  background-color: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border-bottom: 4px solid transparent;
  
  &:hover {
    transform: translateY(-10px);
    border-bottom: 4px solid var(--accent-color);
  }
`;

const FeatureIcon = styled.div`
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  
  svg {
    width: 35px;
    height: 35px;
    color: white;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: var(--text-color);
`;

const FeatureDescription = styled.p`
  color: #666;
  line-height: 1.6;
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

const CTASection = styled.section`
  padding: 80px 0;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 20px;
`;

const CTASubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
`;

const CTAButton = styled(Link)`
  background-color: white;
  color: var(--primary-color);
  padding: 15px 40px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
    text-decoration: none;
  }
`;

const Home = () => {
  return (
    <>
      <HeroSection>
        <HeroContainer>
          <HeroTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Early Detection for Better Brain Health
          </HeroTitle>
          
          <HeroSubtitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our interactive platform helps detect early signs of cognitive decline through engaging games, quizzes, and speech analysis.
          </HeroSubtitle>
          
          <ButtonGroup
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <PrimaryButton to="/games">Try Cognitive Games</PrimaryButton>
            <SecondaryButton to="/resources">Learn More</SecondaryButton>
          </ButtonGroup>
        </HeroContainer>
      </HeroSection>
      
      <FeaturesSection>
        <FeaturesContainer>
          <SectionTitle>Our Features</SectionTitle>
          
          <FeatureGrid>
            <FeatureCard
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <FeatureIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
              </FeatureIcon>
              <FeatureTitle>Cognitive Games</FeatureTitle>
              <FeatureDescription>
                Engage in interactive games designed to test memory, reaction time, problem-solving, and spatial skills.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <FeatureIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </FeatureIcon>
              <FeatureTitle>Cognitive Quizzes</FeatureTitle>
              <FeatureDescription>
                Answer questions that evaluate temporal orientation, semantic memory, reasoning, and logic.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <FeatureIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </FeatureIcon>
              <FeatureTitle>Speech Analysis</FeatureTitle>
              <FeatureDescription>
                Record your voice describing an image or daily routine for AI-powered language pattern analysis.
              </FeatureDescription>
            </FeatureCard>
            
            <FeatureCard
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <FeatureIcon>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </FeatureIcon>
              <FeatureTitle>AI Feedback</FeatureTitle>
              <FeatureDescription>
                Receive personalized recommendations based on your performance across different cognitive assessments.
              </FeatureDescription>
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
      
      <CTASection>
        <FeaturesContainer>
          <CTATitle>Ready to Assess Your Cognitive Health?</CTATitle>
          <CTASubtitle>Start with our interactive games and get personalized insights about your brain health.</CTASubtitle>
          <CTAButton to="/games">Get Started Now</CTAButton>
        </FeaturesContainer>
      </CTASection>
    </>
  );
};

export default Home;
