import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { login, getUserByid, forgotPassword } from "../api/user.js";
import axios from "axios";

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
  
  // Lấy thông tin người dùng từ localStorage khi component mount
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);
  
  const syncCartToServer = async (userId, cartData) => {
    if (cartData && cartData.length > 0) { // Kiểm tra xem dữ liệu có trống không
      try {
        // Thêm userId và chuẩn bị dữ liệu cho cartItem
        const cartDataWithDetails = cartData.map((item) => ({
          cart_id: userId, // userId hoặc cart_id (tùy vào cách bạn tổ chức)
          product_variant_id: item.id_productVariant,
          quantity: item.quantity,
          price: item.price,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }));

        console.log("Cart data before sync:", cartDataWithDetails);

        // Kiểm tra xem token có hợp lệ không
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error("Vui lòng đăng nhập để đồng bộ giỏ hàng.");
          return;
        }

        // Gửi yêu cầu đồng bộ giỏ hàng lên server
        const response = await axios.post(
          '/cart/sync', // URL endpoint của server
          { cart: cartDataWithDetails }, // Gửi dữ liệu giỏ hàng đã được chuẩn bị
          {
            headers: {
              Authorization: `Bearer ${token}` // Token xác thực
            }
          }
        );

        // Kiểm tra phản hồi từ server
        console.log("Sync response:", response);

        // if (response.status === 200) {
        //   toast.success("Giỏ hàng đã được đồng bộ thành công!");
        // } else {
        //   toast.error("Đã có lỗi xảy ra khi đồng bộ giỏ hàng!");
        // }
      } catch (error) {
        // Xử lý lỗi từ server hoặc kết nối mạng
        console.error("Error syncing cart to server:", error.response ? error.response.data : error);
        if (error.response && error.response.data) {
          toast.error(`Lỗi: ${error.response.data.message || "Không xác định"}`);
        } else {
          toast.error("Có lỗi xảy ra khi kết nối với server!");
        }
      }
    } else {
      console.error("Error syncing cart to server: Cart data is empty!");
      // toast.error("Dữ liệu giỏ hàng trống!");
    }
  };





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
        // send cart data to server
        const cartData = localStorage.getItem('cart')
        if (cartData) {
          const parsedCart = JSON.parse(cartData);

          // Gửi giỏ hàng lên server
          await syncCartToServer(userId, parsedCart); // Gọi API đồng bộ giỏ hàng
        }

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
      toast.error("Tài khoản hoặc mật khẩu không chính xác, vui lòng thử lại!");
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