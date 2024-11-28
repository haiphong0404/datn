import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login, getUserByid, forgotPassword } from "../api/user.js";

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

  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // Lấy thông tin người dùng từ localStorage
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  const handleLogin = async (data) => {
    try {
      const res = await login(data);
      const currentUser = res.user;

      if (!currentUser || !currentUser.id || !currentUser.role) {
        throw new Error("Không tìm thấy thông tin người dùng.");
      }

      const userId = currentUser.id;
      const userData = await getUserByid(userId);

      if (userData?.data?.role) {
        const role = userData.data.role;

        setUserInfo(userData.data);
        localStorage.setItem("userInfo", JSON.stringify(userData.data));

        if (role === "admin") {
          window.location.href = "http://127.0.0.1:8000/admin";
        } else {
          navigate("/");
        }
        toast.success("Đăng nhập thành công!");
      } else {
        throw new Error("Không tìm thấy thông tin vai trò người dùng.");
      }
    } catch (err) {
      console.error("Lỗi:", err);
      toast.error("Đăng nhập thất bại!");
    }
  };

  const handleForgotPasswordSubmit = (data) => {
    if (data.email) {
      forgotPassword(data.email)
        .then(() => toast.success("Email đặt lại mật khẩu đã được gửi, vui lòng kiểm tra hộp thư đến của bạn!"))
        .catch((err) => toast.error("Gửi email thất bại: " + err.message));
    } else {
      toast.error("Vui lòng nhập địa chỉ email.");
    }
  };

  const handleLogout = () => {
    setUserInfo(null);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    navigate("/login");
    toast.info("Đã đăng xuất.");
  };

  return {
    register,
    handleSubmit,
    errors,
    handleLogin,
    handleForgotPasswordSubmit,
    handleLogout,
    userInfo,
  };
};
