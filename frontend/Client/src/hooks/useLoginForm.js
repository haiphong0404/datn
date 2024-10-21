import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { login, getUserByid } from '../api/user.js'; // Import getUserByid

// Tạo schema Yup để validate form
const schema = yup.object().shape({
    email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
    password: yup.string().min(6, 'Mật khẩu phải ít nhất 6 ký tự').required('Mật khẩu là bắt buộc'),
});

export const useLoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    // Lấy thông tin người dùng từ localStorage nếu có
    useEffect(() => {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            setUserInfo(JSON.parse(storedUserInfo));
        }
    }, []);

    const handleLogin = async (data) => {
        try {
            const res = await login(data);
            console.log("Phản hồi từ đăng nhập:", res);

            // Lấy thông tin người dùng từ phản hồi
            const currentUser = res.user;

            // Kiểm tra nếu người dùng không tồn tại hoặc thiếu thông tin cần thiết
            if (!currentUser || !currentUser.id || !currentUser.role) {
                throw new Error("Không tìm thấy thông tin người dùng.");
            }

            const userId = currentUser.id;
            console.log("ID người dùng:", userId);

            // Gọi hàm getUserByid để lấy thông tin chi tiết người dùng
            const userData = await getUserByid(userId);
            console.log("Thông tin người dùng:", userData.data);

            // Kiểm tra và lưu vai trò của người dùng
            if (userData && userData.data && userData.data.role) {
                const role = userData.data.role;
                console.log("Vai trò người dùng:", role);

                // Lưu thông tin người dùng vào state và localStorage
                setUserInfo(userData.data);
                localStorage.setItem('userInfo', JSON.stringify(userData.data));

                // Chuyển hướng dựa trên vai trò
                if (role === 'admin') {
                    window.location.href = 'http://127.0.0.1:8000/';
                } else {
                    navigate('/my_account/account_info');
                }
            } else {
                throw new Error("Không tìm thấy thông tin vai trò người dùng.");
            }
        } catch (err) {
            console.error("Lỗi:", err);
            setError("Đăng nhập thất bại");
            setSuccess('');
        }
    };

    // Hàm đăng xuất để xóa thông tin người dùng khỏi state và localStorage
    const handleLogout = () => {
        setUserInfo(null);
        localStorage.removeItem('userInfo');
        navigate('/login'); // Chuyển hướng đến trang đăng nhập
    };

    return {
        register,
        handleSubmit,
        errors,
        error,
        success,
        handleLogin,
        userInfo,
        handleLogout, // Trả về thêm hàm đăng xuất
    };
};
