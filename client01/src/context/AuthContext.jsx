import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sync token changes to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(null);
      setHasOnboarded(false);
    }
  }, [token]);

  // Check onboarding status
  const checkOnboardingStatus = async () => {
    if (!token) return false;
    try {
      const response = await api.get('/onboarding');
      // Backend wraps the real payload as { success, message, data: {...} }
      const onboardingData = response.data?.data;
      if (onboardingData && Object.keys(onboardingData).length > 0) {
        setHasOnboarded(true);
        return true;
      }
      setHasOnboarded(false);
      return false;
    } catch (error) {
      setHasOnboarded(false);
      return false;
    }
  };

  // Check authentication status on startup
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken) {
        setToken(storedToken);
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            // Ignored, will fetch again
          }
        }
        
        // Check if onboarding is complete
        await checkOnboardingStatus();
      }
      setIsLoading(false);
    };

    initializeAuth();

    // Listen to unauthorized event from axios interceptor
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('auth-unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('auth-unauthorized', handleUnauthorized);
    };
  }, [token]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      // Backend wraps the real payload as { success, message, data: { token, user } }
      const { token: jwtToken, user: userData } = response.data?.data || {};

      if (!jwtToken) {
        throw new Error('Login failed: no token received from server.');
      }

      setUser(userData || { email });
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        localStorage.setItem('user', JSON.stringify({ email }));
      }
      
      setToken(jwtToken);
      
      // Check onboarding
      // Set temporary token in localStorage before running status check because the status check uses local token
      localStorage.setItem('token', jwtToken);
      const onboarded = await checkOnboardingStatus();
      
      return { success: true, onboarded };
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || error.response?.data?.detail || error.message || 'Invalid email or password';
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (fullName, email, password) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/register', { fullName, email, password });
      // Backend wraps the real payload as { success, message, data: { token, user } }
      const { token: jwtToken, user: userData } = response.data?.data || {};

      if (!jwtToken) {
        throw new Error('Registration failed: no token received from server.');
      }

      setUser(userData || { fullName, email });
      if (userData) {
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        localStorage.setItem('user', JSON.stringify({ fullName, email }));
      }
      setToken(jwtToken);
      setHasOnboarded(false);
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      const message = error.response?.data?.message || error.response?.data?.detail || error.message || 'Registration failed';
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setHasOnboarded(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        hasOnboarded,
        isLoading,
        login,
        register,
        logout,
        checkOnboardingStatus,
        setHasOnboarded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};