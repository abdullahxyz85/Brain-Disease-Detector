import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ResponsiveAuthContainer,
  ResponsiveAuthCard,
  AuthHeader,
  ResponsiveAuthForm,
  FormGroup,
  InputLabel,
  InputField,
  SubmitButton,
  FormFooter,
  ErrorMessage,
  authCardVariants,
  buttonVariants
} from './AuthStyles';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
  };

  const validateForm = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Invalid email format');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real application, you'd make an API call here
      // await axios.post('http://localhost:8000/api/auth/forgot-password', { email });
      
      // For demonstration, we'll simulate a successful request after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Mark as submitted
      setIsSubmitted(true);
      
    } catch (error) {
      console.error('Error:', error);
      setError(
        error.response?.data?.message || 
        'Failed to process your request. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ResponsiveAuthContainer>
      <ResponsiveAuthCard
        initial="hidden"
        animate="visible"
        variants={authCardVariants}
      >
        <AuthHeader>
          <h1>Reset Your Password</h1>
          <p>Enter your email to receive a password reset link</p>
        </AuthHeader>
        
        <ResponsiveAuthForm onSubmit={handleSubmit}>
          {!isSubmitted ? (
            <>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              
              <FormGroup>
                <InputLabel htmlFor="email">Email</InputLabel>
                <InputField
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                />
              </FormGroup>
              
              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {isSubmitting ? 'Processing...' : 'Send Reset Link'}
              </SubmitButton>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="var(--primary-color)" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
              </svg>
              <h2 style={{ color: 'var(--primary-color)', margin: '20px 0' }}>Check Your Email</h2>
              <p style={{ margin: '10px 0 20px', color: '#666' }}>
                If an account exists with the email <strong>{email}</strong>, we've sent instructions to reset your password.
              </p>
              <p style={{ fontSize: '0.9rem', color: '#666' }}>
                Didn't receive the email? Check your spam folder or <button 
                  type="button" 
                  onClick={handleSubmit} 
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: 'var(--primary-color)', 
                    fontWeight: 'bold', 
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  try again
                </button>
              </p>
            </div>
          )}
          
          <FormFooter>
            <p>Remember your password? <Link to="/login">Back to Login</Link></p>
          </FormFooter>
        </ResponsiveAuthForm>
      </ResponsiveAuthCard>
    </ResponsiveAuthContainer>
  );
};

export default ForgotPassword;
