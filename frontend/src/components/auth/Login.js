import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [redirectMessage, setRedirectMessage] = useState('');
  
  // Handle redirect message from PrivateRoute
  useEffect(() => {
    if (location.state?.message) {
      setRedirectMessage(location.state.message);
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
    
    // Clear general login error when user changes input
    if (loginError) {
      setLoginError('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setRedirectMessage('');
    
    try {
      // In a real application, you'd make an API call here
      // const response = await axios.post('http://localhost:8000/api/auth/login', formData);
      
      // For demonstration, we'll simulate a successful login after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Create a user object
      const userData = {
        id: '123',
        name: 'Demo User',
        email: formData.email,
      };
      
      // Use the login function from AuthContext
      const success = login(userData);
      
      if (!success) {
        throw new Error('Login failed');
      }
      
      // Redirect to the page the user was trying to access, or to home
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
      
    } catch (error) {
      console.error('Login error:', error);
      setLoginError(
        error.response?.data?.message || 
        'Login failed. Please check your credentials and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSocialLogin = (provider) => {
    // In a real application, redirect to OAuth provider
    console.log(`Login with ${provider}`);
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
          <h1>Welcome Back</h1>
          <p>Log in to continue your brain health journey</p>
        </AuthHeader>
        
        <ResponsiveAuthForm onSubmit={handleSubmit}>
          {loginError && (
            <ErrorMessage>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
              </svg>
              {loginError}
            </ErrorMessage>
          )}
          
          {redirectMessage && (
            <motion.div 
              style={{
                padding: "10px 15px",
                background: "rgba(74, 111, 165, 0.1)",
                borderLeft: "4px solid var(--primary-color)",
                marginBottom: "20px",
                borderRadius: "4px",
                color: "var(--primary-color)",
                fontSize: "0.9rem",
                display: "flex",
                alignItems: "center"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" style={{ marginRight: "10px" }}>
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
              </svg>
              {redirectMessage}
            </motion.div>
          )}
          
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
              placeholder="Enter your password"
              autoComplete="current-password"
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
          
          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <Link to="/forgot-password" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '600' }}>
              Forgot password?
            </Link>
          </div>
          
          <SubmitButton
            type="submit"
            disabled={isSubmitting}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </SubmitButton>
          
          <OrDivider>
            <span>or</span>
          </OrDivider>
          
          <SocialButtonsContainer>
            <SocialButton
              type="button"
              onClick={() => handleSocialLogin('google')}
              bgcolor="#ffffff"
              color="#333"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
              </svg>
              Continue with Google
            </SocialButton>
            
            <SocialButton
              type="button"
              onClick={() => handleSocialLogin('facebook')}
              bgcolor="#1877f2"
              color="#ffffff"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
              </svg>
              Continue with Facebook
            </SocialButton>
          </SocialButtonsContainer>
          
          <FormFooter>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          </FormFooter>
        </ResponsiveAuthForm>
      </ResponsiveAuthCard>
    </ResponsiveAuthContainer>
  );
};

export default Login;
