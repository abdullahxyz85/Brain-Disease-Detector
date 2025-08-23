import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  ResponsiveAuthContainer,
  ResponsiveAuthCard,
  AuthHeader,
  ResponsiveAuthForm,
  FormGroup,
  InputLabel,
  InputField,
  PasswordToggle,
  SubmitButton,
  FormFooter,
  ErrorMessage,
  SocialButtonsContainer,
  SocialButton,
  OrDivider,
  authCardVariants,
  buttonVariants
} from './AuthStyles';

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signupError, setSignupError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    
    // Clear general signup error when user changes input
    if (signupError) {
      setSignupError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one letter and one number';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the Terms of Service';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real application, you'd make an API call here
      // const response = await axios.post('http://localhost:8000/api/auth/signup', formData);
      
      // For demonstration, we'll simulate a successful signup after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Create user data object
      const userData = {
        id: '123',
        name: formData.name,
        email: formData.email,
      };
      
      // Use the signup function from AuthContext
      const success = signup(userData);
      
      if (!success) {
        throw new Error('Signup failed');
      }
      
      // Redirect to home or dashboard
      navigate('/');
      
    } catch (error) {
      console.error('Signup error:', error);
      setSignupError(
        error.response?.data?.message || 
        'Signup failed. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSocialSignup = (provider) => {
    // In a real application, redirect to OAuth provider
    console.log(`Signup with ${provider}`);
    // Example: window.location.href = `http://localhost:8000/api/auth/${provider}`;
  };

  return (
    <ResponsiveAuthContainer>
      <ResponsiveAuthCard
        initial="hidden"
        animate="visible"
        variants={authCardVariants}
      >
        <AuthHeader>
          <h1>Create Account</h1>
          <p>Sign up to start your cognitive health journey</p>
        </AuthHeader>
        
        <ResponsiveAuthForm onSubmit={handleSubmit}>
          {signupError && (
            <ErrorMessage>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
              </svg>
              {signupError}
            </ErrorMessage>
          )}
          
          <FormGroup>
            <InputLabel htmlFor="name">Full Name</InputLabel>
            <InputField
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && <ErrorMessage id="name-error">{errors.name}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <InputLabel htmlFor="email">Email</InputLabel>
            <InputField
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && <ErrorMessage id="email-error">{errors.email}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <InputLabel htmlFor="password">Password</InputLabel>
            <InputField
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              autoComplete="new-password"
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            <PasswordToggle 
              type="button" 
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </PasswordToggle>
            {errors.password && <ErrorMessage id="password-error">{errors.password}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
            <InputField
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              autoComplete="new-password"
              aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
            />
            <PasswordToggle 
              type="button" 
              onClick={toggleConfirmPasswordVisibility}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </PasswordToggle>
            {errors.confirmPassword && <ErrorMessage id="confirm-password-error">{errors.confirmPassword}</ErrorMessage>}
          </FormGroup>
          
          <FormGroup>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                style={{ marginRight: '10px', marginTop: '4px' }}
              />
              <label htmlFor="agreeToTerms" style={{ fontSize: '0.9rem', color: '#555' }}>
                I agree to the <Link to="/terms" style={{ color: 'var(--primary-color)' }}>Terms of Service</Link> and <Link to="/privacy" style={{ color: 'var(--primary-color)' }}>Privacy Policy</Link>
              </label>
            </div>
            {errors.agreeToTerms && <ErrorMessage>{errors.agreeToTerms}</ErrorMessage>}
          </FormGroup>
          
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </SubmitButton>
          
          <OrDivider>
            <span>or</span>
          </OrDivider>
          
          <SocialButtonsContainer>
            <SocialButton
              type="button"
              onClick={() => handleSocialSignup('google')}
              bgcolor="#ffffff"
              color="#333"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
              </svg>
              Sign up with Google
            </SocialButton>
            
            <SocialButton
              type="button"
              onClick={() => handleSocialSignup('facebook')}
              bgcolor="#1877f2"
              color="#ffffff"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
              </svg>
              Sign up with Facebook
            </SocialButton>
          </SocialButtonsContainer>
          
          <FormFooter>
            <p>Already have an account? <Link to="/login">Log In</Link></p>
          </FormFooter>
        </ResponsiveAuthForm>
      </ResponsiveAuthCard>
    </ResponsiveAuthContainer>
  );
};

export default SignUp;
