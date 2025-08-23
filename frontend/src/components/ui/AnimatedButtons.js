import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ButtonWrapper = styled(motion.div)`
  position: relative;
  display: inline-block;
  overflow: hidden;
  border-radius: 50px;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color), var(--accent-color), var(--primary-color));
    background-size: 400%;
    z-index: -1;
    border-radius: 52px;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover::before {
    opacity: 1;
    animation: glowing 3s linear infinite;
  }
  
  @keyframes glowing {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const StyledPrimaryButton = styled(Link)`
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 14px 34px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.5px;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  box-shadow: 0 6px 15px rgba(74, 111, 165, 0.2);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.7s ease;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(74, 111, 165, 0.3);
    text-decoration: none;
    color: white;
    
    &::before {
      left: 100%;
    }
  }
`;

const StyledSecondaryButton = styled(Link)`
  background: rgba(255, 255, 255, 0.8);
  color: var(--primary-color);
  padding: 14px 34px;
  border-radius: 50px;
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: 0.5px;
  text-decoration: none;
  display: inline-block;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(5px);
  
  &:hover {
    background: transparent;
    border: 2px solid white;
    color: white;
    transform: translateY(-3px);
    text-decoration: none;
  }
`;

export const AnimatedPrimaryButton = ({ to, children }) => {
  return (
    <ButtonWrapper 
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <StyledPrimaryButton to={to}>
        {children}
      </StyledPrimaryButton>
    </ButtonWrapper>
  );
};

export const AnimatedSecondaryButton = ({ to, children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <StyledSecondaryButton to={to}>
        {children}
      </StyledSecondaryButton>
    </motion.div>
  );
};
