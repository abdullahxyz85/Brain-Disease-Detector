import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const gradientMove = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const GradientContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
`;

const GradientLayer = styled(motion.div)`
  position: absolute;
  top: ${props => props.top || '0'};
  left: ${props => props.left || '0'};
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '100%'};
  border-radius: ${props => props.borderRadius || '0'};
  background: ${props => props.gradient};
  background-size: ${props => props.size || '400% 400%'};
  animation: ${gradientMove} ${props => props.duration || '15s'} ease infinite;
  opacity: ${props => props.opacity || '0.5'};
  filter: blur(${props => props.blur || '80px'});
  transform: rotate(${props => props.rotate || '0deg'});
`;

const GradientBackground = () => {
  return (
    <GradientContainer>
      <GradientLayer
        gradient="linear-gradient(45deg, rgba(74, 111, 165, 0.2), rgba(32, 173, 253, 0.1), rgba(74, 111, 165, 0.2))"
        duration="25s"
        opacity="0.6"
        blur="100px"
      />
      
      <GradientLayer
        top="-30%"
        left="-20%"
        width="70%"
        height="70%"
        gradient="radial-gradient(circle, rgba(249, 151, 119, 0.2) 0%, rgba(249, 151, 119, 0) 70%)"
        duration="18s"
        opacity="0.4"
        blur="80px"
        animate={{
          scale: [1, 1.1, 1],
          transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      <GradientLayer
        top="40%"
        left="60%"
        width="80%"
        height="80%"
        gradient="radial-gradient(circle, rgba(32, 173, 253, 0.15) 0%, rgba(32, 173, 253, 0) 70%)"
        duration="22s"
        opacity="0.3"
        blur="90px"
        animate={{
          scale: [1, 1.15, 1],
          transition: { duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }
        }}
      />
    </GradientContainer>
  );
};

export default GradientBackground;
