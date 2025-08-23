import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  pointer-events: none;
`;

const Element = styled(motion.div)`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.color};
  border-radius: ${props => props.type === 'circle' ? '50%' : props.type === 'triangle' ? '0' : '4px'};
  opacity: ${props => props.opacity};
  z-index: 1;
  pointer-events: none;
  
  ${props => props.type === 'triangle' && `
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  `}
`;

const FloatingElements = () => {
  // Generate random elements
  const elements = [];
  const types = ['circle', 'square', 'triangle'];
  const colors = [
    'rgba(74, 111, 165, 0.3)',  // primary color
    'rgba(32, 173, 253, 0.3)',  // secondary color
    'rgba(249, 151, 119, 0.3)',  // accent color
  ];
  
  for (let i = 0; i < 15; i++) {
    elements.push({
      id: i,
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 30 + 10,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1
    });
  }

  return (
    <Container>
      {elements.map(element => (
        <Element
          key={element.id}
          type={element.type}
          color={element.color}
          size={element.size}
          opacity={element.opacity}
          style={{ left: `${element.x}%`, top: `${element.y}%` }}
          animate={{
            y: [0, -50, 0],
            x: [0, Math.random() > 0.5 ? 20 : -20, 0],
            rotate: [0, element.type !== 'circle' ? 360 : 0, 0],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </Container>
  );
};

export default FloatingElements;
