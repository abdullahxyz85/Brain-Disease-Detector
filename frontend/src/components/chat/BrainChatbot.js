import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { getGroqChatCompletion, getStreamingChatCompletion, SYSTEM_PROMPT, AVAILABLE_MODELS } from '../../services/groqService';

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 800px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
`;

const ChatHeader = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BotAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

const HeaderInfo = styled.div`
  flex: 1;
  margin-left: 15px;
  color: white;

  h3 {
    margin: 0;
    font-size: 1.2em;
    font-weight: 600;
  }

  p {
    margin: 5px 0 0 0;
    opacity: 0.8;
    font-size: 0.9em;
  }
`;

const ModelSelector = styled.select`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  color: white;
  padding: 8px 12px;
  font-size: 0.9em;
  outline: none;
  cursor: pointer;

  option {
    background: #764ba2;
    color: white;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
  }
`;

const Message = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  ${props => props.isUser ? 'flex-direction: row-reverse;' : ''}
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 15px 20px;
  border-radius: 20px;
  font-size: 0.95em;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;

  ${props => props.isUser ? `
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    color: white;
    border-bottom-right-radius: 5px;
  ` : `
    background: rgba(255, 255, 255, 0.95);
    color: #333;
    border-bottom-left-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  `}
`;

const MessageAvatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  flex-shrink: 0;

  ${props => props.isUser ? `
    background: linear-gradient(135deg, #ff9a56 0%, #ffad56 100%);
  ` : `
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  `}
`;

const InputContainer = styled.div`
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 25px;
  padding: 5px;
`;

const MessageInput = styled.textarea`
  flex: 1;
  border: none;
  outline: none;
  padding: 15px 20px;
  font-size: 1em;
  border-radius: 20px;
  background: transparent;
  resize: none;
  min-height: 20px;
  max-height: 100px;
  font-family: inherit;

  &::placeholder {
    color: #666;
  }
`;

const SendButton = styled(motion.button)`
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 18px;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TypingIndicator = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 47px;
`;

const TypingDots = styled.div`
  display: flex;
  gap: 4px;

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
    0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
    40% { transform: scale(1); opacity: 1; }
  }
`;

const ErrorMessage = styled.div`
  background: rgba(255, 59, 48, 0.1);
  border: 1px solid rgba(255, 59, 48, 0.3);
  color: #ff3b30;
  padding: 12px 16px;
  border-radius: 10px;
  margin: 10px 0;
  font-size: 0.9em;
`;

const SuggestedQuestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 15px;
`;

const SuggestionChip = styled(motion.button)`
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.85em;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: translateY(-2px);
  }
`;

const SUGGESTED_QUESTIONS = [
  "How can I improve my memory?",
  "What are early signs of cognitive decline?",
  "Best brain exercises for seniors?",
  "How does stress affect brain health?",
  "What foods are good for brain health?",
  "How to interpret my cognitive test results?"
];

const BrainChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm BrainBot, your AI assistant for brain health and cognitive wellness. I'm here to help you understand brain health, navigate our platform, and provide support on your cognitive wellness journey. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedModel, setSelectedModel] = useState('llama3-8b-8192');
  const [streamingMessage, setStreamingMessage] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

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
        selectedModel
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
      setError('Sorry, I encountered an error. Please check your API key and try again.');
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

  const handleSuggestionClick = (question) => {
    setInputText(question);
    handleSendMessage(question);
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <BotAvatar>🧠</BotAvatar>
        <HeaderInfo>
          <h3>BrainBot</h3>
          <p>Your AI Brain Health Assistant</p>
        </HeaderInfo>
        <ModelSelector
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          {AVAILABLE_MODELS.map(model => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </ModelSelector>
      </ChatHeader>

      <MessagesContainer>
        <AnimatePresence>
          {messages.map((message) => (
            <Message
              key={message.id}
              isUser={message.isUser}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MessageAvatar isUser={message.isUser}>
                {message.isUser ? '👤' : '🧠'}
              </MessageAvatar>
              <MessageBubble isUser={message.isUser}>
                {message.text}
              </MessageBubble>
            </Message>
          ))}
        </AnimatePresence>

        {streamingMessage && (
          <Message isUser={false}>
            <MessageAvatar isUser={false}>🧠</MessageAvatar>
            <MessageBubble isUser={false}>
              {streamingMessage}
            </MessageBubble>
          </Message>
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

        {error && <ErrorMessage>{error}</ErrorMessage>}

        {messages.length === 1 && (
          <SuggestedQuestions>
            {SUGGESTED_QUESTIONS.map((question, index) => (
              <SuggestionChip
                key={index}
                onClick={() => handleSuggestionClick(question)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {question}
              </SuggestionChip>
            ))}
          </SuggestedQuestions>
        )}

        <div ref={messagesEndRef} />
      </MessagesContainer>

      <InputContainer>
        <InputWrapper>
          <MessageInput
            ref={inputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about brain health, cognitive exercises, or anything related to our platform..."
            disabled={isLoading}
            rows={1}
          />
          <SendButton
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ➤
          </SendButton>
        </InputWrapper>
      </InputContainer>
    </ChatContainer>
  );
};

export default BrainChatbot;
