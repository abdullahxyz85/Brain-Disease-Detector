import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { getStreamingChatCompletion, SYSTEM_PROMPT } from '../../services/groqService';

// Enhanced text formatting function to handle dense AI responses
const formatMessageText = (text) => {
  if (!text) return '';
  
  let formatted = text
    // Normalize line breaks
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    
    // Enhanced header detection - ensure proper spacing 
    .replace(/(\*\*[^*]+\*\*)/g, '\n$1\n')  // **Header** with single line breaks
    .replace(/(#{1,6}\s[^\n]+)/g, '\n$1\n')  // # Header with single line breaks
    
    // Force line breaks before bullet points and numbered lists
    .replace(/([^.\n])\s*([•·*-]\s)/g, '$1\n$2')
    .replace(/([^.\n])\s*(\d+\.\s)/g, '$1\n$2')
    
    // Ensure each bullet/number starts on new line (fix run-together lists)
    .replace(/([•·*-]\s[^•·*\n-]+?)([•·*-]\s)/g, '$1\n$2')
    .replace(/(\d+\.\s[^0-9\n]+?)(\d+\.\s)/g, '$1\n$2')
    
    // Clean up multiple spaces and normalize
    .replace(/[ \t]+/g, ' ')
    .replace(/\n\n\n+/g, '\n\n')
    .replace(/^\n+/, '')
    .replace(/\n+$/, '');

  return formatted;
};

// Advanced message component with better parsing
const FormattedMessage = ({ text, isUser }) => {
  if (isUser) {
    return <span style={{ whiteSpace: 'pre-wrap' }}>{text}</span>;
  }

  // Process AI messages line by line for better bullet/number separation
  const formattedText = formatMessageText(text);
  const lines = formattedText.split('\n').map(line => line.trim()).filter(line => line);
  
  const elements = [];
  let currentSection = [];
  
  lines.forEach((line, index) => {
    // Enhanced header detection - multiple patterns
    const isHeader = (
      line.match(/^\*\*[^*]+\*\*$/) ||                 // **Header** (exact match)
      line.match(/^\*\*[^*]+\*\*/) ||                  // **Header** (partial match)
      line.match(/^#{1,6}\s+\S/) ||                    // # Header (with space and content)
      line.match(/^[A-Z][A-Z\s]{3,}:?\s*$/) ||        // ALL CAPS HEADER (at least 4 chars)
      (line.match(/^[A-Z][A-Za-z\s]+:?\s*$/) && line.length > 3 && line.length < 50) || // Title Case (reasonable length)
      line.match(/^\*\*[^*]+\*\*\s*$/)                 // **Header** with optional trailing spaces
    );
    
    // Debug logging - check what headers we're detecting
    if (line.includes('**')) {
      console.log('Line with **:', JSON.stringify(line), 'isHeader:', isHeader);
    }
    
    if (isHeader) {
      // Flush current section
      if (currentSection.length > 0) {
        elements.push({ type: 'section', content: currentSection.join(' '), key: elements.length });
        currentSection = [];
      }
      
      // Clean and add header - more robust cleaning
      let headerText = line
        .replace(/^\*\*/, '')            // Remove leading **
        .replace(/\*\*$/, '')            // Remove trailing **
        .replace(/^#{1,6}\s*/g, '')      // Remove # markers
        .replace(/:$/, '')               // Remove trailing colon
        .trim();
        
      // Skip empty headers
      if (headerText.length > 0) {
        elements.push({ 
          type: 'header', 
          content: headerText, 
          key: elements.length 
        });
      }
    }
    // Check if it's a bullet point
    else if (line.match(/^[•·*-]\s/)) {
      // Flush current section first
      if (currentSection.length > 0) {
        elements.push({ type: 'section', content: currentSection.join(' '), key: elements.length });
        currentSection = [];
      }
      
      const bulletText = line.replace(/^[•·*-]\s/, '');
      elements.push({ 
        type: 'bullet', 
        content: bulletText, 
        key: elements.length 
      });
    }
    // Check if it's a numbered list
    else if (line.match(/^\d+\.\s/)) {
      // Flush current section first
      if (currentSection.length > 0) {
        elements.push({ type: 'section', content: currentSection.join(' '), key: elements.length });
        currentSection = [];
      }
      
      const match = line.match(/^(\d+\.)\s(.*)$/);
      if (match) {
        elements.push({ 
          type: 'numbered', 
          number: match[1],
          content: match[2], 
          key: elements.length 
        });
      }
    }
    // Regular text - add to current section
    else {
      // Check if this line contains ** markdown but wasn't detected as header
      if (line.includes('**')) {
        // Try to extract content between ** - improved regex to handle multiple ** patterns
        const headerMatches = line.match(/\*\*([^*]+)\*\*/g);
        if (headerMatches) {
          // Flush current section first
          if (currentSection.length > 0) {
            elements.push({ type: 'section', content: currentSection.join(' '), key: elements.length });
            currentSection = [];
          }
          
          // Process each header match
          headerMatches.forEach((match, matchIndex) => {
            const headerContent = match.replace(/\*\*/g, '').trim();
            if (headerContent.length > 0) {
              elements.push({ 
                type: 'header', 
                content: headerContent, 
                key: elements.length + matchIndex 
              });
            }
          });
          
          // Process rest of line if any
          const restOfLine = line.replace(/\*\*[^*]+\*\*/g, '').trim();
          if (restOfLine.length > 0) {
            currentSection.push(restOfLine);
          }
          return; // Skip adding to current section
        }
      }
      
      // Regular text content
      currentSection.push(line);
    }
  });
  
  // Flush any remaining section
  if (currentSection.length > 0) {
    elements.push({ type: 'section', content: currentSection.join(' '), key: elements.length });
  }
  
  return (
    <div>
      {elements.map((element) => {
        switch (element.type) {
          case 'header':
            return (
              <div key={element.key} style={{ 
                fontWeight: '700', 
                color: '#ffffff', 
                fontSize: '18px',
                marginBottom: '16px',
                marginTop: '24px',
                borderLeft: '4px solid #667eea',
                paddingLeft: '16px',
                background: 'linear-gradient(90deg, rgba(102, 126, 234, 0.15) 0%, rgba(102, 126, 234, 0.06) 70%, transparent 100%)',
                borderRadius: '0 8px 8px 0',
                padding: '14px 18px',
                letterSpacing: '0.5px',
                lineHeight: '1.3',
                textTransform: 'none',
                position: 'relative',
                boxShadow: '0 3px 15px rgba(102, 126, 234, 0.2)',
                border: '1px solid rgba(102, 126, 234, 0.25)',
                display: 'flex',
                alignItems: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                <span style={{
                  marginRight: '10px',
                  color: '#667eea',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}>
                  ▶
                </span>
                {element.content}
              </div>
            );
            
          case 'bullet':
            return (
              <div key={element.key} style={{ 
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'flex-start',
                lineHeight: '1.6',
                paddingLeft: '8px'
              }}>
                <span style={{ 
                  color: '#667eea', 
                  marginRight: '12px', 
                  fontWeight: 'bold',
                  minWidth: '16px',
                  marginTop: '2px',
                  fontSize: '14px'
                }}>
                  •
                </span>
                <span style={{ 
                  flex: 1,
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontSize: '15px'
                }}>
                  {element.content}
                </span>
              </div>
            );
            
          case 'numbered':
            return (
              <div key={element.key} style={{ 
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'flex-start',
                lineHeight: '1.6',
                paddingLeft: '8px'
              }}>
                <span style={{ 
                  color: '#667eea', 
                  marginRight: '12px', 
                  fontWeight: 'bold',
                  minWidth: '24px',
                  marginTop: '2px',
                  fontSize: '15px'
                }}>
                  {element.number}
                </span>
                <span style={{ 
                  flex: 1,
                  color: 'rgba(255, 255, 255, 0.95)',
                  fontSize: '15px'
                }}>
                  {element.content}
                </span>
              </div>
            );
            
          case 'section':
            return (
              <div key={element.key} style={{ 
                marginBottom: '16px',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.95)',
                fontSize: '15px',
                paddingLeft: '4px'
              }}>
                {element.content}
              </div>
            );
            
          default:
            return null;
        }
      })}
    </div>
  );
};

const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f1419 100%);
  display: flex;
  z-index: 9999;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  overflow: hidden;
`;

const SidebarOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.show ? 'block' : 'none'};
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const Sidebar = styled.div`
  width: ${props => props.isOpen ? '320px' : '0'};
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: ${props => props.isOpen ? '280px' : '0'};
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1000;
    height: 100vh;
  }

  @media (min-width: 769px) {
    position: relative;
  }
`;

const SidebarHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const NewChatButton = styled(motion.button)`
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }
`;

const RecentSection = styled.div`
  padding: 20px;
  flex: 1;

  h3 {
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 15px;
  }
`;

const MainChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const ChatHeader = styled.div`
  padding: 10px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 8px 15px;
  }
`;

const MenuButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  font-size: 16px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
    transform: scale(1.05);
  }

  @media (min-width: 769px) {
    display: flex;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const CloseButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const WelcomeSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const LogoContainer = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  font-size: 36px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const WelcomeTitle = styled.h1`
  color: white;
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const WelcomeSubtitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.1rem;
  margin-bottom: 30px;
  line-height: 1.5;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 20px;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  ${props => props.isUser ? 'flex-direction: row-reverse;' : ''}
`;

const MessageAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  flex-shrink: 0;

  ${props => props.isUser ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  ` : `
    background: rgba(255, 255, 255, 0.1);
    color: white;
  `}
`;

const MessageContent = styled.div`
  max-width: 70%;
  background: ${props => props.isUser ? 
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 
    'rgba(255, 255, 255, 0.1)'
  };
  color: white;
  padding: 16px 20px;
  border-radius: 18px;
  font-size: 15px;
  line-height: 1.6;
  word-wrap: break-word;
  border: 1px solid rgba(255, 255, 255, 0.1);

  ${props => props.isUser ? `
    border-bottom-right-radius: 6px;
    white-space: pre-wrap;
  ` : `
    border-bottom-left-radius: 6px;
    
    /* Better formatting for AI responses */
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
    
    /* Reset default margins */
    > div:first-child {
      margin-top: 0;
    }
    
    > div:last-child {
      margin-bottom: 0;
    }
  `}

  @media (max-width: 768px) {
    max-width: 85%;
    font-size: 14px;
    padding: 14px 16px;
  }
`;

const InputContainer = styled.div`
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f1419 100%);
  position: sticky;
  bottom: 0;
  z-index: 10;
  
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const InputWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  display: flex;
  align-items: flex-end;
  gap: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  padding: 8px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);

  &:focus-within {
    border-color: rgba(103, 126, 234, 0.6);
    box-shadow: 0 8px 32px rgba(103, 126, 234, 0.2);
  }
`;

const MessageInput = styled.textarea`
  flex: 1;
  background: transparent;
  border: none;
  color: white;
  padding: 16px 20px;
  font-size: 15px;
  font-family: inherit;
  resize: none;
  outline: none;
  min-height: 22px;
  max-height: 150px;
  line-height: 1.5;
  width: 100%;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  @media (max-width: 768px) {
    font-size: 16px; /* Prevent zoom on iOS */
    padding: 14px 18px;
  }
`;

const SendButton = styled(motion.button)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
  margin: 4px;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: rgba(255, 255, 255, 0.2);
  }

  &:not(:disabled):hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
`;

const TypingIndicator = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const TypingDots = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 18px;
  border-bottom-left-radius: 6px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.7);
    animation: typing 1.4s infinite ease-in-out;

    &:nth-child(1) { animation-delay: -0.32s; }
    &:nth-child(2) { animation-delay: -0.16s; }
  }

  @keyframes typing {
    0%, 80%, 100% { 
      transform: scale(0.8); 
      opacity: 0.5; 
    }
    40% { 
      transform: scale(1); 
      opacity: 1; 
    }
  }
`;

const FullScreenChatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessage, setStreamingMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(typeof window !== 'undefined' ? window.innerWidth > 768 : true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth > 768) {
          setSidebarOpen(true);
        } else {
          setSidebarOpen(false);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [inputText]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
  };

  const handleSendMessage = async (messageText = inputText) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: messageText.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);
    setStreamingMessage('');

    try {
      const conversationHistory = [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map(msg => ({
          role: msg.isUser ? "user" : "assistant",
          content: msg.text
        })),
        { role: "user", content: messageText.trim() }
      ];

      let fullResponse = '';
      await getStreamingChatCompletion(
        conversationHistory,
        (chunk) => {
          fullResponse += chunk;
          setStreamingMessage(fullResponse);
        },
        "openai/gpt-oss-20b"
      );

      const botMessage = {
        id: Date.now() + 1,
        text: fullResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setStreamingMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startNewChat = () => {
    setMessages([]);
    setStreamingMessage('');
    closeSidebar(); // Close sidebar on mobile after starting new chat
  };

  return (
    <FullScreenContainer>
      <SidebarOverlay 
        show={sidebarOpen && typeof window !== 'undefined' && window.innerWidth <= 768} 
        onClick={closeSidebar} 
      />
      
      <Sidebar isOpen={sidebarOpen}>
        <SidebarHeader>
          <NewChatButton
            onClick={startNewChat}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>+</span>
            New chat
          </NewChatButton>
        </SidebarHeader>
        
        <RecentSection>
          <h3>Recent</h3>
          {/* Recent chats would go here */}
        </RecentSection>
      </Sidebar>

      <MainChatArea>
        <ChatHeader>
          <MenuButton 
            onClick={toggleSidebar}
            sidebarOpen={sidebarOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {sidebarOpen ? '◀' : '▶'}
          </MenuButton>
          <CloseButton
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </CloseButton>
        </ChatHeader>

        {messages.length === 0 ? (
          <WelcomeSection>
            <LogoContainer>🧠</LogoContainer>
            <WelcomeTitle>Welcome to BrainHealth AI</WelcomeTitle>
            <WelcomeSubtitle>
              Your intelligent assistant for brain health assessment and cognitive wellness guidance.
              <br />Start a conversation below to get personalized insights and recommendations.
            </WelcomeSubtitle>
          </WelcomeSection>
        ) : (
          <MessagesContainer>
            {messages.map((message) => (
              <MessageWrapper key={message.id} isUser={message.isUser}>
                <MessageAvatar isUser={message.isUser}>
                  {message.isUser ? 'U' : '🧠'}
                </MessageAvatar>
                <MessageContent isUser={message.isUser}>
                  <FormattedMessage text={message.text} isUser={message.isUser} />
                </MessageContent>
              </MessageWrapper>
            ))}

            {streamingMessage && (
              <MessageWrapper isUser={false}>
                <MessageAvatar isUser={false}>🧠</MessageAvatar>
                <MessageContent isUser={false}>
                  <FormattedMessage text={streamingMessage} isUser={false} />
                </MessageContent>
              </MessageWrapper>
            )}

            {isLoading && !streamingMessage && (
              <TypingIndicator
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <MessageAvatar isUser={false}>🧠</MessageAvatar>
                <TypingDots>
                  <span></span>
                  <span></span>
                  <span></span>
                </TypingDots>
              </TypingIndicator>
            )}

            <div ref={messagesEndRef} />
          </MessagesContainer>
        )}

        <InputContainer>
          <InputWrapper>
            <MessageInput
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message BrainHealth AI..."
              disabled={isLoading}
              rows={1}
            />
            <SendButton
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ↑
            </SendButton>
          </InputWrapper>
        </InputContainer>
      </MainChatArea>
    </FullScreenContainer>
  );
};

export default FullScreenChatbot;
