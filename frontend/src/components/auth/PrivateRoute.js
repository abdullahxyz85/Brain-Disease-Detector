import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
`;

const Spinner = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 3px solid rgba(74, 111, 165, 0.2);
  border-top-color: var(--primary-color);
  margin-bottom: 20px;
`;

const LoadingText = styled(motion.p)`
  color: var(--primary-color);
  font-weight: 500;
`;

const spinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      repeat: Infinity,
      ease: "linear",
      duration: 1
    }
  }
};

const textVariants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "easeInOut"
    }
  }
};

const PrivateRoute = ({ children }) => {
  const { currentUser, isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // If not logged in, could potentially show a login prompt
    if (!isLoading && !currentUser) {
      console.log('User not authenticated, redirecting to login');
    }
  }, [isLoading, currentUser]);

  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner 
          animate="animate"
          variants={spinnerVariants}
        />
        <LoadingText
          animate="animate"
          variants={textVariants}
        >
          Verifying authentication...
        </LoadingText>
      </LoadingContainer>
    );
  }

  return currentUser ? children : (
    <Navigate 
      to="/login" 
      state={{ from: location, message: "Please log in to access this page" }} 
      replace 
    />
  );
};

export default PrivateRoute;
