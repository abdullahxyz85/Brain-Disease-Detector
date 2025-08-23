import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import styled from 'styled-components';

const StatusContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: ${props => props.isAuthenticated ? 'var(--primary-color)' : '#888'};
  color: white;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-size: 14px;
  z-index: 1000;
  display: flex;
  align-items: center;
  opacity: 0.9;
  transition: all 0.3s ease;
  
  &:hover {
    opacity: 1;
    transform: translateY(-3px);
  }
  
  svg {
    margin-right: 8px;
  }
`;

const AuthStatusIndicator = () => {
  const { isAuthenticated, currentUser } = useAuth();
  
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <StatusContainer isAuthenticated={isAuthenticated}>
      {isAuthenticated ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
          </svg>
          Logged in as: {currentUser?.name || currentUser?.email}
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708z"/>
            <path d="M4.646 4.646a.5.5 0 0 0 0 .708l6 6a.5.5 0 0 0 .708-.708l-6-6a.5.5 0 0 0-.708 0z"/>
          </svg>
          Not logged in
        </>
      )}
    </StatusContainer>
  );
};

export default AuthStatusIndicator;
