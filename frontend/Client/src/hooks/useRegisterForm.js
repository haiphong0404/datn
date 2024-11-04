// src/hooks/useRegisterForm.js
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/user.js'; // Đảm bảo đường dẫn đúng

// Xác thực với Yup
const schema = yup.object().shape({
    username: yup.string().required("Vui lòng nhập tên tài khoản"),
    email: yup.string().email("Invalid email").required("Vui lòng nhập email"),
    password: yup.string().min(6, "Mật khẩu phải đủ 6 ký tự").required("vui lòng nhập mật khẩu"),
});

export const useRegisterForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (data) => {
        try {
            const res = await registerUser(data); // Gọi hàm đăng ký
            setSuccess("Đăng ký thành công.");
            setError('');
            navigate('/login');
        } catch (err) {
            setError("Đăng ký thất bại. Vui lòng thử lại.");
            setSuccess('');
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        error,
        success,
        handleRegister
    };
};
