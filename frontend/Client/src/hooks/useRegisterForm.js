import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../api/user.js";

// Xác thực với Yup
const schema = yup.object().shape({
    username: yup.string().required("Vui lòng nhập tên tài khoản"),
    email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
    password: yup.string().min(6, "Mật khẩu phải đủ 6 ký tự").required("Vui lòng nhập mật khẩu"),
    password_confirmation: yup
        .string()
        .oneOf([yup.ref("password"), null], "Mật khẩu không khớp")
        .required("Vui lòng nhập lại mật khẩu"),
    phone: yup
        .string()
        .matches(/^[0-9]{10}$/, "Số điện thoại không hợp lệ")
        .required("Vui lòng nhập số điện thoại"),
});

export const useRegisterForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const handleRegister = async (data) => {
        try {
            await registerUser(data); // Gọi hàm đăng ký
            toast.success("Đăng ký thành công!"); // Hiển thị thông báo thành công
            navigate("/login"); // Điều hướng về trang đăng nhập
        } catch (err) {
            toast.error("Đăng ký thất bại. Vui lòng thử lại."); // Hiển thị thông báo lỗi
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        handleRegister,
    };
};
