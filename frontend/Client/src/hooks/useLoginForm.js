import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { login, getUserByid, forgotPassword } from "../api/user.js"; // Import getUserByid
import axios from "axios";
import { toast } from "react-toastify";


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
  const syncCartToServer = async (userId, cartData) => {
    if (cartData && cartData.length > 0) {
      try {
        // Chuẩn bị dữ liệu giỏ hàng
        const cartDataWithDetails = cartData.map((item) => ({
          product_variant_id: item.id_productVariant, // Đảm bảo key này tồn tại
          quantity: item.quantity,
          price: item.price,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }));
  
        console.log("Cart data before sync:", cartDataWithDetails);
  
        // Gửi yêu cầu đồng bộ giỏ hàng lên server
        const response = await axios.post(
          "http://127.0.0.1:8000/api/cart/sync",
          { cart: cartDataWithDetails },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Token xác thực
            },
          }
        );
  
        if (response.status === 200) {
          // Đồng bộ giỏ hàng thành công
          toast.success("Giỏ hàng đã được đồng bộ thành công!");
        }
      } catch (error) {
        console.error(
          "Error syncing cart to server:",
          error.response ? error.response.data : error
        );
        toast.error("Có lỗi xảy ra khi đồng bộ giỏ hàng!");
      }
    } else {
      console.error("Error syncing cart to server: Cart data is empty!");
      toast.error("Dữ liệu giỏ hàng trống!");
    }
  };
  
  
  
  

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
        // send cart data to server
      const cartData =  localStorage.getItem('cart')
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
