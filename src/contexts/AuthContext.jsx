import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Check for existing token on app load
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const storedToken = localStorage.getItem('jwt_token');
        const storedUser = localStorage.getItem('user_data');
        
        if (storedToken && storedUser) {
          const userData = JSON.parse(storedUser);
          
          // Verify token is still valid
          const isValid = await validateToken(storedToken);
          
          if (isValid) {
            setToken(storedToken);
            setUser(userData);
            setIsLoggedIn(true);
            
            // Set default authorization header for all requests
            axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
          } else {
            // Token is invalid, clear storage
            clearAuthData();
          }
        }
      } catch (error) {
        console.error('Error checking auth state:', error);
        clearAuthData();
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await axios.post('https://localhost:7001/api/auth/validate-token', {
        token: token
      });
      return response.data.success;
    } catch {
      return false;
    }
  };

  const login = (authData) => {
    const { token, userType, userId, email, ...userData } = authData;
    
    const userInfo = {
      id: userId,
      email: email,
      userType: userType,
      ...userData
    };

    // Store in localStorage
    localStorage.setItem('jwt_token', token);
    localStorage.setItem('user_data', JSON.stringify(userInfo));
    
    // Update state
    setToken(token);
    setUser(userInfo);
    setIsLoggedIn(true);
    
    // Set default authorization header
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = async () => {
    try {
      // Call logout endpoint if needed
      if (token) {
        await axios.post('https://localhost:7001/api/auth/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthData();
    }
  };

  const clearAuthData = () => {
    // Clear localStorage
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_data');
    
    // Clear state
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    
    // Remove authorization header
    delete axios.defaults.headers.common['Authorization'];
  };

  const isCustomer = () => user?.userType === 'Customer';
  const isUser = () => user?.userType === 'User';

  const value = {
    isLoggedIn,
    loading,
    user,
    token,
    login,
    logout,
    isCustomer,
    isUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 