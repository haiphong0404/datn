import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { login, getUserByid, forgotPassword } from "../api/user.js"; // Import getUserByid


export const useLoginForm = (isDisplay) => {

  const schema = yup.object().shape({
    email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
    password: isDisplay
      ? yup.string().notRequired()
      : yup.string().min(6, "Mật khẩu phải ít nhất 6 ký tự").required("Mật khẩu là bắt buộc"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  

  // Lấy thông tin người dùng từ localStorage nếu có
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const handleLogin = async (data) => {
    // return
    try {
      const res = await login(data);
      const currentUser = res.user;

      if (!currentUser || !currentUser.id || !currentUser.role) {
        throw new Error("Không tìm thấy thông tin người dùng.");
      }

      const userId = currentUser.id;
      const userData = await getUserByid(userId);


      if (userData && userData.data && userData.data.role) {
        const role = userData.data.role;

        setUserInfo(userData.data);
        localStorage.setItem("userInfo", JSON.stringify(userData.data));


        if (role === "admin") {
          window.location.href = "http://127.0.0.1:8000/";
        } else {
          navigate("/my_account");
        }
      } else {
        throw new Error("Không tìm thấy thông tin vai trò người dùng.");
      }
    } catch (err) {
      console.error("Lỗi:", err);
      setError("Đăng nhập thất bại");
      setSuccess("");
    }
  };

  const handleForgotPasswordSubmit = (data) => {
    if (data.email) {
      forgotPassword(data.email);
    } else {
      setError("Vui lòng nhập địa chỉ email.");
    }
  }

  const handleLogout = () => {
    // Xóa thông tin người dùng và token khỏi state và localStorage
    setUserInfo(null);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
  
    // Chuyển hướng đến trang đăng nhập và bắt buộc tải lại trang
    
    navigate("/login");
  };
  


  const updateUserInfo = async (id, updatedInfo) => {
    try {
      const response = await getUserByid(id, updatedInfo);
      const newUserInfo = { ...userInfo, ...response.data };
      setUserInfo(newUserInfo);
      localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
      setSuccess("Cập nhật thông tin thành công!");
      setError("");
    } catch (error) {
      console.error("Lỗi cập nhật thông tin:", error);
      setError("Cập nhật thông tin không thành công");
      setSuccess("");
    }
  };

  return {
    register,
    handleSubmit,
    handleForgotPasswordSubmit,
    errors,
    error,
    success,
    handleLogin,
    userInfo,
    handleLogout,
    updateUserInfo,
  };
};
