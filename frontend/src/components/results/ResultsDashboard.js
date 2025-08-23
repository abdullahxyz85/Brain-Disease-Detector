import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const DashboardContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const DashboardHeader = styled.div`
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

const ScoreOverview = styled(motion.div)`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  border-radius: 15px;
  padding: 30px;
  color: white;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }
`;

const ScoreInfo = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 10px;
  }
  
  p {
    opacity: 0.9;
    font-size: 1.1rem;
  }
`;

const ScoreCircle = styled.div`
  width: 150px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  
  &::after {
    content: "";
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  span {
    font-size: 3rem;
    font-weight: 700;
    position: relative;
    z-index: 1;
  }
`;

const SectionTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 20px;
  font-size: 1.8rem;
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

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
`;

const CategoryCard = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  
  h3 {
    color: var(--text-color);
    margin-bottom: 15px;
    font-size: 1.3rem;
  }
`;

const ProgressBar = styled.div`
  height: 10px;
  background-color: #f1f3f5;
  border-radius: 5px;
  margin: 15px 0;
  position: relative;
  overflow: hidden;
  
  .fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    background-color: ${({ color }) => color || 'var(--primary-color)'};
    border-radius: 5px;
    width: ${({ percentage }) => `${percentage}%`};
  }
`;

const ScoreValue = styled.div`
  display: flex;
  justify-content: space-between;
  
  span {
    font-weight: 600;
    color: ${({ color }) => color || 'var(--text-color)'};
  }
`;

const HistorySection = styled.div`
  margin-top: 50px;
`;

const HistoryCard = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 40px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
`;

const ActivityList = styled.div`
  margin-top: 20px;
`;

const ActivityItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #f1f3f5;
  
  &:last-child {
    border-bottom: none;
  }
  
  .activity-info {
    h4 {
      font-size: 1.1rem;
      margin-bottom: 5px;
      color: var(--text-color);
    }
    
    p {
      color: #888;
      font-size: 0.9rem;
    }
  }
  
  .activity-score {
    font-weight: 600;
    color: ${({ score }) => {
      if (score >= 80) return '#52c41a';
      if (score >= 60) return '#faad14';
      return '#f5222d';
    }};
  }
  
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 10px;
    
    .activity-score {
      align-self: flex-start;
    }
  }
`;

const RecommendationsSection = styled.div`
  margin-top: 50px;
`;

const RecommendationCard = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
`;

const RecommendationList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

const RecommendationItem = styled.li`
  background-color: #f8f9fa;
  border-left: 4px solid var(--primary-color);
  padding: 15px 20px;
  margin-bottom: 15px;
  border-radius: 0 10px 10px 0;
  
  h4 {
    margin-bottom: 10px;
    color: var(--primary-color);
  }
  
  p {
    color: #666;
    font-size: 0.95rem;
  }
  
  &:nth-child(2) {
    border-left-color: var(--secondary-color);
    
    h4 {
      color: var(--secondary-color);
    }
  }
  
  &:nth-child(3) {
    border-left-color: var(--accent-color);
    
    h4 {
      color: var(--accent-color);
    }
  }
`;

const DisclaimerSection = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 20px;
  margin-top: 50px;
  font-size: 0.9rem;
  color: #666;
  
  h3 {
    color: var(--text-color);
    margin-bottom: 10px;
    font-size: 1.2rem;
  }
`;

const ResultsDashboard = () => {
  // This would typically be fetched from a context or Redux store
  // but since the app is session-based, we'll use a static example
  const dashboardData = {
    overallScore: 78,
    categories: [
      { name: 'Memory', score: 85, color: '#1890ff' },
      { name: 'Reaction Time', score: 72, color: '#52c41a' },
      { name: 'Problem Solving', score: 68, color: '#fa8c16' },
      { name: 'Spatial Skills', score: 81, color: '#722ed1' },
      { name: 'Language', score: 83, color: '#eb2f96' }
    ],
    recentActivity: [
      { id: 1, name: 'Memory Game', date: 'Just now', score: 85 },
      { id: 2, name: 'Speech Analysis', date: '15 minutes ago', score: 83 },
      { id: 3, name: 'Reaction Time Game', date: '45 minutes ago', score: 72 },
      { id: 4, name: 'Cognitive Quiz', date: '1 hour ago', score: 76 }
    ],
    recommendations: [
      {
        title: 'Improve Working Memory',
        description: 'Try the Memory Sequence game at a higher difficulty level to challenge your recall abilities.'
      },
      {
        title: 'Practice Reaction Speed',
        description: 'Your reaction time is slightly below average. Regular practice with the Reaction Time game can help improve this.'
      },
      {
        title: 'Language Development',
        description: 'Continue using varied vocabulary in the Speech Analysis tasks to maintain strong language skills.'
      }
    ]
  };
  
  return (
    <DashboardContainer>
      <DashboardHeader>
        <h1>Your Cognitive Results</h1>
        <p>
          This dashboard shows your current cognitive performance across various tests.
          All results are based on your current session and will reset when you close the browser.
        </p>
      </DashboardHeader>
      
      <ScoreOverview
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ScoreInfo>
          <h2>Cognitive Health Score</h2>
          <p>Based on all your activities in this session</p>
        </ScoreInfo>
        
        <ScoreCircle>
          <span>{dashboardData.overallScore}</span>
        </ScoreCircle>
      </ScoreOverview>
      
      <SectionTitle>Performance by Category</SectionTitle>
      <CategoriesGrid>
        {dashboardData.categories.map((category, index) => (
          <CategoryCard
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3>{category.name}</h3>
            <ProgressBar percentage={category.score} color={category.color}>
              <div className="fill"></div>
            </ProgressBar>
            <ScoreValue color={category.color}>
              <span>Score</span>
              <span>{category.score}/100</span>
            </ScoreValue>
          </CategoryCard>
        ))}
      </CategoriesGrid>
      
      <HistorySection>
        <SectionTitle>Recent Activity</SectionTitle>
        <HistoryCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ActivityList>
            {dashboardData.recentActivity.map((activity) => (
              <ActivityItem key={activity.id} score={activity.score}>
                <div className="activity-info">
                  <h4>{activity.name}</h4>
                  <p>{activity.date}</p>
                </div>
                <div className="activity-score">{activity.score}/100</div>
              </ActivityItem>
            ))}
          </ActivityList>
        </HistoryCard>
      </HistorySection>
      
      <RecommendationsSection>
        <SectionTitle>Personalized Recommendations</SectionTitle>
        <RecommendationCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <RecommendationList>
            {dashboardData.recommendations.map((recommendation, index) => (
              <RecommendationItem key={index}>
                <h4>{recommendation.title}</h4>
                <p>{recommendation.description}</p>
              </RecommendationItem>
            ))}
          </RecommendationList>
        </RecommendationCard>
      </RecommendationsSection>
      
      <DisclaimerSection>
        <h3>Important Disclaimer</h3>
        <p>
          This cognitive assessment tool is designed for informational purposes only and should not be used to diagnose any medical condition. 
          The results shown here represent a point-in-time assessment and may be influenced by various factors including tiredness, 
          device performance, and testing environment.
        </p>
        <p>
          If you have concerns about cognitive health or notice significant changes in cognitive abilities over time, 
          please consult with a qualified healthcare provider or specialist.
        </p>
      </DisclaimerSection>
    </DashboardContainer>
  );
};

export default ResultsDashboard;
