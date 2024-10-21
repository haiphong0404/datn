import { useState } from 'react';
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

    const handleLogin = async (data) => {
        try {
            const res = await login(data);
            console.log("Phản hồi từ đăng nhập:", res);

            // Lấy thông tin người dùng từ phản hồi
            const currentUser = res.user; // Lấy đối tượng người dùng từ phản hồi

            // Kiểm tra xem ID và vai trò có tồn tại không
            if (!currentUser || !currentUser.id || !currentUser.role) {
                throw new Error("Không tìm thấy thông tin người dùng.");
            }

            const userId = currentUser.id; // Lấy ID người dùng
            console.log("ID người dùng:", userId);

            // Gọi hàm getUserByid để lấy thông tin người dùng
            const userData = await getUserByid(userId); // Truyền userId vào hàm getUserByid
            console.log("Thông tin người dùng:", userData.data);



            // Kiểm tra vai trò người dùng
            if (userData && userData.data && userData.data.role) {
                const role = userData.data.role; // Lấy vai trò từ dữ liệu người dùng
                console.log("Vai trò người dùng:", role);

                setUserInfo(userData.data); // Lưu thông tin người dùng vào state

                if (role == 'admin') {
                    window.location.href = 'http://127.0.0.1:8000/';
                } else {
                    navigate('/my_account/account_info'); // Chuyển hướng đến trang thông tin tài khoản
                }
            } else {
                console.error("Không tìm thấy thông tin vai trò người dùng.");
                setError("Không tìm thấy thông tin vai trò người dùng.");
            }
        } catch (err) {
            console.error("Lỗi:", err);
            setError("Đăng nhập thất bại");
            setSuccess('');
        }
    };


    return {
        register,
        handleSubmit,
        errors,
        error,
        success,
        handleLogin,
        userInfo,
    };
};
