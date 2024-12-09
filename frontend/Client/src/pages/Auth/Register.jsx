import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterForm } from "../../hooks/useRegisterForm.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const navigate = useNavigate();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const {
        register,
        handleSubmit,
        errors,
        handleRegister
    } = useRegisterForm();

    return (
        <div className="container mt-5 mb-5">
            <div className="col-lg-12">
                <div className="login-reg-form-wrap sign-up-form justify-content">
                    <h4>Đăng ký</h4>
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <div className="single-input-item">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Họ Tên"
                                {...register("username")}
                            />
                            {errors.username && (
                                <span className="text-danger">{errors.username.message}</span>
                            )}
                        </div>
                        <div className="single-input-item">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Nhập địa chỉ email"
                                {...register("email")}
                            />
                            {errors.email && (
                                <span className="text-danger">{errors.email.message}</span>
                            )}
                        </div>
                        <div className="row mt-4">
                            <div className="col-lg-6">
                                <div className="input-group">
                                    <input
                                        type={isPasswordVisible ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Nhập mật khẩu"
                                        {...register("password")}
                                    />
                                    <span
                                        className="input-group-text"
                                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                    >
                                        {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                {errors.password && (
                                    <span className="text-danger">{errors.password.message}</span>
                                )}
                            </div>

                            <div className="col-lg-6">
                                <div className="input-group">
                                    <input
                                        type={isConfirmPasswordVisible ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Nhập lại mật khẩu"
                                        {...register("password_confirmation")}
                                    />
                                    <span
                                        className="input-group-text"
                                        onClick={() =>
                                            setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                                        }
                                    >
                                        {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                {errors.password_confirmation && (
                                    <span className="text-danger">
                                        {errors.password_confirmation.message}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="single-input-item">
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Nhập số điện thoại"
                                {...register("phone")}
                            />
                            {errors.phone && (
                                <span className="text-danger">{errors.phone.message}</span>
                            )}
                        </div>
                        <div className="single-input-item btn btn-sqr">
                            <button type="submit" className="btn btn-sqr">Đăng ký</button>
                        </div>
                        <div className="single-input-item text-end ">
                            <button
                                type="button"
                                className="forget-pwd d-flex justify-content-end"
                                onClick={() => navigate("/login")}
                            >
                                Quay lại đăng nhập
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
