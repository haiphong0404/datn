// src/hooks/useRegisterForm.js
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/user.js'; // Đảm bảo đường dẫn đúng

// Xác thực với Yup
const schema = yup.object().shape({
    username: yup.string().required("Username is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
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
            setSuccess("Registration successful! Please login.");
            setError('');
            navigate('/login'); 
        } catch (err) {
            setError("Registration failed");
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
