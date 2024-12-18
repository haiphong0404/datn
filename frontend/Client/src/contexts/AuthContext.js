// contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Hàm kiểm tra trạng thái người dùng
  const checkUserStatus = async (userId) => {
    try {
      const response = await axios.get(`/users/${userId}`); // API lấy thông tin user
      const userData = response.data;

      if (userData.status === "inactive") {
        alert("Tài khoản của bạn hiện đang không hoạt động. Vui lòng liên hệ quản trị viên.");
        logout(); // Gọi hàm logout để xóa thông tin người dùng
      } else {
        setUser(userData); // Lưu thông tin user
      }
    } catch (error) {
      console.error("Lỗi khi kiểm tra trạng thái người dùng:", error);
    }
  };

  // Kiểm tra trạng thái đăng nhập khi component được mount
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if(!userInfo){
      return;
    }
     if (userInfo && location.pathname !== '/login') {
      setIsAuthenticated(true);
      setUser(userInfo); // Lưu thông tin người dùng
      // Kiểm tra trạng thái người dùng ngay khi đăng nhập
      checkUserStatus(userInfo.id);

      // Thiết lập setInterval để kiểm tra lại trạng thái mỗi 30 giây
      const intervalId = setInterval(() => {
        if (userInfo && userInfo.id) {
          checkUserStatus(userInfo.id);
        }
      }, 5 * 1000); // 30 giây

      // Dọn dẹp khi component unmount
      return () => clearInterval(intervalId);
    }
  }, [location.pathname]); // Giữ [] để chỉ chạy 1 lần khi component mount

  const login = (user) => {
    localStorage.setItem('userInfo', JSON.stringify(user));
    setIsAuthenticated(true);
    setUser(user); // Lưu thông tin người dùng
    navigate('/'); // Chuyển hướng sau khi đăng nhập
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login'); // Chuyển hướng sau khi đăng xuất
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook để sử dụng context
export const useAuth = () => {
  return useContext(AuthContext);
};
