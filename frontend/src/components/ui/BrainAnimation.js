import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const BrainAnimationContainer = styled.div`
  position: absolute;
  top: 0;
  right: 5%;
  width: 300px;
  height: 300px;
  opacity: 0.4;
  z-index: 1;
  
  @media (max-width: 992px) {
    width: 200px;
    height: 200px;
    right: 3%;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Pulse = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(74, 111, 165, 0.5) 0%, rgba(74, 111, 165, 0) 70%);
`;

const Brain = styled(motion.div)`
  position: absolute;
  top: 15%;
  left: 15%;
  width: 70%;
  height: 70%;
  
  svg {
    width: 100%;
    height: 100%;
    fill: var(--primary-color);
    opacity: 0.7;
  }
`;

const Connection = styled(motion.div)`
  position: absolute;
  width: 50px;
  height: 2px;
  background: var(--accent-color);
  opacity: 0.7;
  transform-origin: left;
`;

const Node = styled(motion.div)`
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--accent-color);
  border-radius: 50%;
  opacity: 0.7;
`;

const BrainAnimation = () => {
  const pulseVariants = {
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  const brainVariants = {
    animate: {
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  
  // Generate random connections
  const connections = Array.from({ length: 6 }, (_, i) => ({
    x1: Math.random() * 80 + 10,
    y1: Math.random() * 80 + 10,
    length: Math.random() * 30 + 40,
    angle: Math.random() * 360,
    delay: i * 0.5
  }));
  
  return (
    <BrainAnimationContainer>
      <Pulse 
        variants={pulseVariants}
        animate="animate"
      />
      <Brain
        variants={brainVariants}
        animate="animate"
      >
        <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
          <path d="M208 225.2c-12.2-12.2-32-12.2-44.2 0l-120 120c-12.2 12.2-12.2 32 0 44.2s32 12.2 44.2 0L208 269.6c12.2-12.2 12.2-32 0-44.4zm176-45.2c34.3 0 62-27.7 62-62s-27.7-62-62-62-62 27.7-62 62 27.7 62 62 62zM384 288c-16.5 0-31.1 8.1-40 20.6V236c0-6.6-5.4-12-12-12h-40v-8c0-26.5-21.5-48-48-48h-16c-26.5 0-48 21.5-48 48v8H76c-6.6 0-12 5.4-12 12v84c0 26.5 21.5 48 48 48h240c26.5 0 48-21.5 48-48v-8c0-26.5-21.5-48-48-48h-16zm56-96h-16c-26.5 0-48 21.5-48 48v8H236c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h144c26.5 0 48-21.5 48-48v-24c0-26.5-21.5-48-48-48z" />
        </svg>
      </Brain>
      
      {connections.map((conn, i) => (
        <React.Fragment key={i}>
          <Connection 
            style={{ 
              top: `${conn.y1}%`, 
              left: `${conn.x1}%`,
              width: conn.length,
              rotate: conn.angle,
              transformOrigin: 'left'
            }}
            animate={{
              opacity: [0.2, 0.7, 0.2],
              scaleX: [0.8, 1, 0.8]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: conn.delay
            }}
          />
          <Node 
            style={{ 
              top: `${conn.y1}%`, 
              left: `${conn.x1}%`,
              marginLeft: -5,
              marginTop: -5
            }}
            animate={{
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: conn.delay
            }}
          />
          <Node 
            style={{ 
              top: `${conn.y1 + Math.sin(conn.angle * Math.PI/180) * conn.length/2}%`, 
              left: `${conn.x1 + Math.cos(conn.angle * Math.PI/180) * conn.length/2}%`,
              marginLeft: -5,
              marginTop: -5
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: conn.delay + 0.5
            }}
          />
        </React.Fragment>
      ))}
    </BrainAnimationContainer>
  );
};

export default BrainAnimation;
