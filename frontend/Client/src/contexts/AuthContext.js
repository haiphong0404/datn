// contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập khi component được mount
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (user) => {
    localStorage.setItem('userInfo', JSON.stringify(user));
    setIsAuthenticated(true);
    navigate('/'); // Chuyển hướng sau khi đăng nhập
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setIsAuthenticated(false);
    navigate('/login'); // Chuyển hướng sau khi đăng xuất
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useAuth = () => {
  return useContext(AuthContext);
};
