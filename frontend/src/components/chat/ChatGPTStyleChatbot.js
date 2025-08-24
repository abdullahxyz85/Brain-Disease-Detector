import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { getStreamingChatCompletion, SYSTEM_PROMPT } from '../../services/groqService';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-width: 100%;
  background: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`;

const MessageWrapper = styled.div`
  width: 100%;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const MessageContent = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    padding: 1rem 0.75rem;
    gap: 0.75rem;
  }
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
  
  ${props => props.isUser ? `
    background: #10a37f;
    color: white;
  ` : `
    background: #19c37d;
    color: white;
  `}
`;

const MessageText = styled.div`
  flex: 1;
  color: #374151;
  line-height: 1.75;
  font-size: 16px;
  white-space: pre-wrap;
  word-wrap: break-word;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 1.6;
  }
`;

const InputContainer = styled.div`
  border-top: 1px solid #e5e7eb;
  background: #ffffff;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.75rem;
  }
`;

const InputWrapper = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  position: relative;
`;

const MessageInput = styled.textarea`
  width: 100%;
  min-height: 24px;
  max-height: 200px;
  padding: 12px 48px 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  resize: none;
  outline: none;
  background: #ffffff;
  color: #374151;
  line-height: 1.5;
  
  &::placeholder {
    color: #9ca3af;
  }
  
  &:focus {
    border-color: #10a37f;
    box-shadow: 0 0 0 3px rgba(16, 163, 127, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 16px; /* Prevent zoom on iOS */
    padding: 12px 44px 12px 12px;
  }
`;

const SendButton = styled(motion.button)`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: ${props => props.disabled ? '#f3f4f6' : '#10a37f'};
  color: ${props => props.disabled ? '#9ca3af' : 'white'};
  border: none;
  border-radius: 4px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: #0d9488;
  }

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
    font-size: 12px;
  }
`;

const TypingIndicator = styled(motion.div)`
  width: 100%;
  border-bottom: 1px solid #f0f0f0;
`;

const TypingContent = styled.div`
  max-width: 48rem;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    padding: 1rem 0.75rem;
    gap: 0.75rem;
  }
`;

const TypingDots = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #9ca3af;
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

const ErrorMessage = styled.div`
  max-width: 48rem;
  margin: 1rem auto;
  padding: 12px 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  color: #dc2626;
  font-size: 14px;
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  text-align: center;
  color: #6b7280;

  h2 {
    font-size: 2rem;
    font-weight: 600;
    color: #374151;
    margin-bottom: 0.5rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  p {
    font-size: 1rem;
    margin-bottom: 2rem;
    max-width: 24rem;

    @media (max-width: 768px) {
      font-size: 0.9rem;
      margin-bottom: 1.5rem;
    }
  }
`;

const SuggestionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.75rem;
  max-width: 48rem;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
`;

const SuggestionCard = styled(motion.button)`
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  color: #374151;
  
  &:hover {
    border-color: #d1d5db;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 13px;
  }
`;

const SUGGESTED_PROMPTS = [
  "How can I improve my memory and cognitive function?",
  "What are the early warning signs of dementia?",
  "Explain brain-healthy foods and nutrition tips",
  "What cognitive exercises are most effective?"
];

const ChatGPTStyleChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [streamingMessage, setStreamingMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  useEffect(() => {
    // Auto-resize textarea
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = inputRef.current.scrollHeight + 'px';
    }
  }, [inputText]);

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
    setError('');
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
      setError('Sorry, I encountered an error. Please try again.');
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

  const handleSuggestionClick = (prompt) => {
    handleSendMessage(prompt);
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.length === 0 ? (
          <EmptyState>
            <h2>How can I help you today?</h2>
            <p>Ask me anything about brain health, cognitive wellness, or our platform features.</p>
            <SuggestionGrid>
              {SUGGESTED_PROMPTS.map((prompt, index) => (
                <SuggestionCard
                  key={index}
                  onClick={() => handleSuggestionClick(prompt)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {prompt}
                </SuggestionCard>
              ))}
            </SuggestionGrid>
          </EmptyState>
        ) : (
          <>
            {messages.map((message) => (
              <MessageWrapper key={message.id}>
                <MessageContent>
                  <Avatar isUser={message.isUser}>
                    {message.isUser ? 'U' : 'AI'}
                  </Avatar>
                  <MessageText>{message.text}</MessageText>
                </MessageContent>
              </MessageWrapper>
            ))}

            {streamingMessage && (
              <MessageWrapper>
                <MessageContent>
                  <Avatar isUser={false}>AI</Avatar>
                  <MessageText>{streamingMessage}</MessageText>
                </MessageContent>
              </MessageWrapper>
            )}

            {isLoading && !streamingMessage && (
              <TypingIndicator
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <TypingContent>
                  <Avatar isUser={false}>AI</Avatar>
                  <TypingDots>
                    <span></span>
                    <span></span>
                    <span></span>
                  </TypingDots>
                </TypingContent>
              </TypingIndicator>
            )}
          </>
        )}

        {error && <ErrorMessage>{error}</ErrorMessage>}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <InputContainer>
        <InputWrapper>
          <MessageInput
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Message ChatGPT..."
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
    </ChatContainer>
  );
};

export default ChatGPTStyleChatbot;
