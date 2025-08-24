import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullScreenChatbot from '../components/chat/FullScreenChatbot';

const ChatbotPage = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  // Prevent scrolling when chatbot is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return <FullScreenChatbot onClose={handleClose} />;
};

export default ChatbotPage;
