import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Log in a user
  const login = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  // Log out a user
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
    return true;
  };

  // Sign up a new user
  const signup = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return true;
  };

  // Check if there's a user stored in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user data:", e);
        localStorage.removeItem('user'); // Remove invalid data
      }
    }
    setIsLoading(false);
  }, []);
  
  // Expose auth functions to window for testing in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      window.authTestHelpers = {
        login,
        logout,
        signup,
        updateUser,
        getCurrentUser: () => currentUser
      };
    }
    
    return () => {
      if (window.authTestHelpers) {
        delete window.authTestHelpers;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // Update user data
  const updateUser = (userData) => {
    const updatedUser = { ...currentUser, ...userData };
    setCurrentUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return true;
  };

  const value = {
    currentUser,
    isLoading,
    login,
    logout,
    signup,
    updateUser,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
