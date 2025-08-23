import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PageContainer = styled.div`
  max-width: 1000px;
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

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  border-bottom: 1px solid #eee;
`;

const Tab = styled.button`
  padding: 15px 25px;
  background: none;
  border: none;
  font-size: 1.1rem;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  color: ${({ active }) => (active ? 'var(--primary-color)' : 'var(--text-color)')};
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 3px;
    background-color: var(--primary-color);
    transform: scaleX(${({ active }) => (active ? '1' : '0')});
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: var(--primary-color);
    
    &::after {
      transform: scaleX(0.5);
    }
  }
`;

const ResourceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
`;

const ResourceCard = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
  }
`;

const CardImage = styled.div`
  height: 180px;
  background-image: url(${({ image }) => image});
  background-size: cover;
  background-position: center;
`;

const CardContent = styled.div`
  padding: 20px;
  
  h3 {
    font-size: 1.3rem;
    color: var(--text-color);
    margin-bottom: 10px;
  }
  
  p {
    color: #666;
    font-size: 0.95rem;
    margin-bottom: 15px;
  }
`;

const CardMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #999;
  
  span {
    display: flex;
    align-items: center;
    
    svg {
      margin-right: 5px;
    }
  }
`;

const CardLink = styled.a`
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  margin-top: 15px;
  
  svg {
    margin-left: 5px;
    transition: transform 0.3s ease;
  }
  
  &:hover {
    text-decoration: underline;
    
    svg {
      transform: translateX(3px);
    }
  }
`;

const ExerciseContainer = styled.div`
  margin-top: 40px;
`;

const ExerciseCard = styled(motion.div)`
  background-color: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
  
  h3 {
    font-size: 1.4rem;
    color: var(--primary-color);
    margin-bottom: 15px;
  }
  
  p {
    color: #666;
    margin-bottom: 20px;
    line-height: 1.6;
  }
`;

const LinksContainer = styled.div`
  margin-top: 40px;
`;

const LinksList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 20px;
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const LinkCard = styled(motion.a)`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  .icon {
    width: 50px;
    height: 50px;
    background-color: #f0f7ff;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 15px;
    color: var(--primary-color);
  }
  
  .content {
    h3 {
      font-size: 1.1rem;
      color: var(--text-color);
      margin-bottom: 5px;
    }
    
    p {
      font-size: 0.9rem;
      color: #888;
      margin: 0;
    }
  }
`;

const Resources = () => {
  const [activeTab, setActiveTab] = React.useState('articles');
  
  const articles = [
    {
      id: 1,
      title: "Understanding Early Signs of Alzheimer's",
      description: "Learn about the subtle early warning signs of Alzheimer's disease and when to consult a doctor.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "August 15, 2025",
      readTime: "6 min read"
    },
    {
      id: 2,
      title: "How Sleep Affects Cognitive Health",
      description: "Discover the crucial relationship between quality sleep and brain health, memory, and cognitive function.",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "August 10, 2025",
      readTime: "8 min read"
    },
    {
      id: 3,
      title: "Nutrition for Brain Health",
      description: "Explore foods and dietary patterns that support brain function and may help prevent cognitive decline.",
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "August 5, 2025",
      readTime: "7 min read"
    },
    {
      id: 4,
      title: "The Science of Cognitive Reserve",
      description: "Understanding how education, activities and lifestyle can provide resilience against cognitive decline.",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "July 28, 2025",
      readTime: "10 min read"
    },
    {
      id: 5,
      title: "Physical Exercise and Brain Function",
      description: "How regular physical activity promotes brain health and may delay the onset of dementia.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "July 20, 2025",
      readTime: "5 min read"
    },
    {
      id: 6,
      title: "Social Connection and Cognitive Health",
      description: "The importance of maintaining social relationships for preserving cognitive function as we age.",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      date: "July 15, 2025",
      readTime: "6 min read"
    }
  ];
  
  const exercises = [
    {
      id: 1,
      title: "Word Association Exercise",
      description: "This exercise helps strengthen your semantic memory and language connections. Start with a word (e.g., 'apple') and create a chain where each new word relates to the previous one (apple → fruit → banana → tropical → beach...). Try to create a chain of at least 20 words without repeating any. Do this exercise daily, using different starting words.",
      difficulty: "Easy"
    },
    {
      id: 2,
      title: "Visualization Memory Practice",
      description: "Look at an image with several objects for 30 seconds. Then close your eyes and try to recall as many details as possible. Start with simpler images and gradually increase complexity. This exercise strengthens your visual memory and attention to detail. Try doing this with a new image every day.",
      difficulty: "Medium"
    },
    {
      id: 3,
      title: "Backward Counting with Intervals",
      description: "Count backward from 100, but instead of counting by 1, count by a different interval each time (e.g., by 3s, by 7s). This challenges your working memory and mathematical processing. For example: 100, 97, 94, 91... when counting by 3s. Try different intervals as you improve.",
      difficulty: "Hard"
    }
  ];
  
  const links = [
    {
      id: 1,
      title: "Alzheimer's Association",
      description: "Resources and support for those affected by Alzheimer's",
      url: "https://www.alz.org/",
      icon: "🧠"
    },
    {
      id: 2,
      title: "National Institute on Aging",
      description: "Research and information on aging and cognitive health",
      url: "https://www.nia.nih.gov/",
      icon: "🔬"
    },
    {
      id: 3,
      title: "Dementia Society",
      description: "Support and resources for dementia patients and caregivers",
      url: "https://www.dementiasociety.org/",
      icon: "💭"
    },
    {
      id: 4,
      title: "Brain & Life Magazine",
      description: "Articles on brain health and neurological conditions",
      url: "https://www.brainandlife.org/",
      icon: "📚"
    },
    {
      id: 5,
      title: "Cognitive Neuroscience Society",
      description: "Latest research in brain function and cognition",
      url: "https://www.cogneurosociety.org/",
      icon: "🧪"
    },
    {
      id: 6,
      title: "BrainHQ",
      description: "Science-backed brain training exercises",
      url: "https://www.brainhq.com/",
      icon: "🎮"
    }
  ];
  
  return (
    <PageContainer>
      <PageHeader>
        <h1>Resources & Education</h1>
        <p>
          Explore articles, daily exercises, and trusted resources to help you maintain and improve your cognitive health.
        </p>
      </PageHeader>
      
      <TabContainer>
        <Tab 
          active={activeTab === 'articles'} 
          onClick={() => setActiveTab('articles')}
        >
          Articles
        </Tab>
        <Tab 
          active={activeTab === 'exercises'} 
          onClick={() => setActiveTab('exercises')}
        >
          Daily Exercises
        </Tab>
        <Tab 
          active={activeTab === 'links'} 
          onClick={() => setActiveTab('links')}
        >
          Helpful Links
        </Tab>
      </TabContainer>
      
      {activeTab === 'articles' && (
        <ResourceGrid>
          {articles.map((article, index) => (
            <ResourceCard
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardImage image={article.image} />
              <CardContent>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <CardMeta>
                  <span>{article.date}</span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                      <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                    </svg>
                    {article.readTime}
                  </span>
                </CardMeta>
                <CardLink href="#">
                  Read Article
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
                  </svg>
                </CardLink>
              </CardContent>
            </ResourceCard>
          ))}
        </ResourceGrid>
      )}
      
      {activeTab === 'exercises' && (
        <ExerciseContainer>
          {exercises.map((exercise, index) => (
            <ExerciseCard
              key={exercise.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3>{exercise.title} <span style={{ fontSize: '0.9rem', color: 'var(--accent-color)', fontWeight: '500' }}>
                {exercise.difficulty}
              </span></h3>
              <p>{exercise.description}</p>
            </ExerciseCard>
          ))}
        </ExerciseContainer>
      )}
      
      {activeTab === 'links' && (
        <LinksContainer>
          <LinksList>
            {links.map((link, index) => (
              <LinkCard 
                href={link.url} 
                target="_blank" 
                rel="noopener noreferrer"
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="icon">{link.icon}</div>
                <div className="content">
                  <h3>{link.title}</h3>
                  <p>{link.description}</p>
                </div>
              </LinkCard>
            ))}
          </LinksList>
        </LinksContainer>
      )}
    </PageContainer>
  );
};

export default Resources;
