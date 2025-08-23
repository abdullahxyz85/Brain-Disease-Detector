import styled from 'styled-components';
import { motion } from 'framer-motion';

// Common styled components for authentication pages
export const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 150px); // Accounting for navbar and footer
  padding: 40px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
  position: relative;
  overflow: hidden;
  
  &:before, &:after {
    content: '';
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    opacity: 0.1;
    z-index: 0;
  }
  
  &:before {
    background: linear-gradient(45deg, var(--primary-color) 0%, var(--secondary-color) 100%);
    top: -100px;
    right: -100px;
    animation: float 15s infinite alternate ease-in-out;
  }
  
  &:after {
    background: linear-gradient(45deg, var(--accent-color) 0%, var(--primary-color) 100%);
    bottom: -100px;
    left: -100px;
    animation: float 18s infinite alternate-reverse ease-in-out;
  }
  
  @keyframes float {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    50% {
      transform: translate(30px, 20px) rotate(10deg);
    }
    100% {
      transform: translate(-20px, 40px) rotate(-5deg);
    }
  }
`;

export const AuthCard = styled(motion.div)`
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 450px;
  overflow: hidden;
  position: relative;
  z-index: 2;
  
  &:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color), var(--accent-color), var(--primary-color));
    z-index: -1;
    border-radius: 22px;
    background-size: 400%;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover:before {
    opacity: 1;
    animation: gradientBorder 3s ease infinite;
  }
  
  @keyframes gradientBorder {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

export const AuthHeader = styled.div`
  text-align: center;
  padding: 30px 20px 20px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    border-radius: 3px;
    margin-bottom: 10px;
    opacity: 0.8;
  }
  
  h1 {
    font-size: 2rem;
    color: var(--primary-color);
    margin-bottom: 10px;
    background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
  }
  
  p {
    color: #666;
    font-size: 1rem;
    max-width: 300px;
    margin: 0 auto;
  }
  
  @media (max-width: 480px) {
    padding: 25px 15px 15px;
    
    h1 {
      font-size: 1.7rem;
    }
    
    p {
      font-size: 0.9rem;
    }
    
    &:after {
      width: 50px;
      height: 2px;
    }
  }
`;

export const AuthForm = styled.form`
  padding: 20px 30px 30px;
`;

export const FormGroup = styled.div`
  margin-bottom: 25px;
  position: relative;
`;

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  color: #333;
  transition: all 0.3s ease;
`;

export const InputField = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
  
  &:focus {
    border-color: var(--primary-color);
    background-color: white;
    box-shadow: 0 0 0 4px rgba(74, 111, 165, 0.15);
    outline: none;
    transform: translateY(-2px);
  }
  
  &:hover:not(:focus) {
    border-color: #bdbdbd;
    transform: translateY(-1px);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  }
  
  &::placeholder {
    color: #999;
    transition: opacity 0.3s ease;
  }
  
  &:focus::placeholder {
    opacity: 0.7;
  }
  
  @media (max-width: 480px) {
    padding: 10px 12px;
    font-size: 0.95rem;
  }
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 15px;
  top: 38px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #757575;
  
  &:hover {
    color: var(--primary-color);
  }
`;

export const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 14px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &:before {
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
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    
    &:before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    
    &:before {
      display: none;
    }
  }
  
  @media (max-width: 480px) {
    padding: 12px;
    font-size: 0.95rem;
  }
`;

export const FormFooter = styled.div`
  text-align: center;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  position: relative;
  
  &:before {
    content: '';
    position: absolute;
    top: -1px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background-color: var(--accent-color);
    border-radius: 3px;
  }
  
  p {
    color: #666;
    margin-bottom: 15px;
    font-size: 0.95rem;
  }
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    position: relative;
    padding: 0 2px;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: var(--primary-color);
      transition: width 0.3s ease;
    }
    
    &:hover {
      color: var(--secondary-color);
      
      &:after {
        width: 100%;
      }
    }
  }
  
  @media (max-width: 480px) {
    margin-top: 20px;
    padding-top: 15px;
    
    p {
      font-size: 0.9rem;
    }
  }
`;

export const ErrorMessage = styled.div`
  color: #e53935;
  font-size: 0.85rem;
  margin-top: 5px;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 5px;
  }
`;

export const SocialButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 25px;
`;

export const SocialButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.4s ease;
  background-color: ${props => props.bgcolor || 'white'};
  color: ${props => props.color || '#333'};
  border: 1px solid #e0e0e0;
  position: relative;
  overflow: hidden;
  
  svg {
    margin-right: 10px;
    font-size: 1.2rem;
    transition: transform 0.3s ease;
  }
  
  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.3);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.08);
    
    svg {
      transform: scale(1.15);
    }
    
    &:after {
      animation: ripple 1s ease-out;
    }
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 111, 165, 0.2);
  }
  
  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 0.5;
    }
    20% {
      transform: scale(25, 25);
      opacity: 0.3;
    }
    100% {
      opacity: 0;
      transform: scale(40, 40);
    }
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    font-size: 0.9rem;
    
    svg {
      font-size: 1rem;
    }
  }
`;

export const OrDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 25px 0;
  
  &:before, &:after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #eee;
  }
  
  span {
    padding: 0 15px;
    color: #757575;
    font-size: 0.9rem;
    text-transform: uppercase;
  }
`;

// Responsive adjustments
export const ResponsiveAuthContainer = styled(AuthContainer)`
  @media (max-width: 768px) {
    padding: 30px 20px;
    min-height: calc(100vh - 120px);
  }
  
  @media (max-width: 480px) {
    padding: 20px 15px;
    min-height: calc(100vh - 100px);
  }
`;

export const ResponsiveAuthCard = styled(AuthCard)`
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
  
  @media (max-width: 768px) {
    max-width: 400px;
  }
  
  @media (max-width: 480px) {
    border-radius: 15px;
    max-width: 100%;
  }
`;

export const ResponsiveAuthForm = styled(AuthForm)`
  @media (max-width: 768px) {
    padding: 20px 25px 25px;
  }
  
  @media (max-width: 480px) {
    padding: 15px 20px 20px;
  }
`;

// Animations
export const authCardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.7, 
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

export const inputVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" }
  }
};

export const buttonVariants = {
  hover: { 
    scale: 1.03,
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)"
  },
  tap: { scale: 0.97 },
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: "easeOut" } 
  }
};

// Staggered animation for form elements
export const formVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};
