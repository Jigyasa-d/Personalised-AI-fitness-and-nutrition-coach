import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import api from '../api/axios.js';

const AuthContext = createContext(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [hasOnboarded, setHasOnboarded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkOnboardingStatus = useCallback(async () => {
    try {
      const res = await api.get('/onboarding');
      const data = res?.data?.data;
      const onboarded =
        data && typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length > 0;
      setHasOnboarded(!!onboarded);
      return !!onboarded;
    } catch {
      setHasOnboarded(false);
      return false;
    }
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken) setToken(storedToken);
    if (storedUser) {
      try { setUser(JSON.parse(storedUser)); } catch { /* noop */ }
    }
    (async () => {
      if (storedToken) await checkOnboardingStatus();
      setIsLoading(false);
    })();
  }, [checkOnboardingStatus]);

  useEffect(() => {
    const onUnauth = () => {
      setUser(null);
      setToken(null);
      setHasOnboarded(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    };
    window.addEventListener('auth-unauthorized', onUnauth);
    return () => window.removeEventListener('auth-unauthorized', onUnauth);
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    const payload = res.data.data;
    localStorage.setItem('token', payload.token);
    localStorage.setItem('user', JSON.stringify(payload.user));
    setToken(payload.token);
    setUser(payload.user);
    await checkOnboardingStatus();
    return payload;
  };

  const register = async (fullName, email, password) => {
    const res = await api.post('/auth/register', { fullName, email, password });
    const payload = res.data.data;
    localStorage.setItem('token', payload.token);
    localStorage.setItem('user', JSON.stringify(payload.user));
    setToken(payload.token);
    setUser(payload.user);
    setHasOnboarded(false);
    return payload;
  };

  const logout = async () => {
    try { await api.post('/auth/logout'); } catch { /* ignore */ }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setHasOnboarded(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
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
}
