import React, { useState } from "react";
import { useLoginForm } from '../../hooks/useLoginForm.js';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
    const [isDisplay, setIsDisplay] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const {
        register,
        handleSubmit,
        errors,
        handleLogin,
        handleForgotPasswordSubmit,
    } = useLoginForm(isDisplay);

    const handlePasswordChange = () => {
        setIsDisplay(!isDisplay);
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="col-lg-12">
                <div className="login-reg-form-wrap">
                    <h4>{isDisplay ? "Quên mật khẩu" : "Đăng nhập"}</h4>
                    <form onSubmit={handleSubmit(isDisplay ? handleForgotPasswordSubmit : handleLogin)}>
                        <div className="single-input-item">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Nhập địa chỉ email"
                                {...register('email', { required: 'Vui lòng nhập địa chỉ email' })}
                            />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </div>
                        {!isDisplay && (
                            <div className="single-input-item">
                                <div className="input-group">
                                    <input
                                        type={isPasswordVisible ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Nhập mật khẩu"
                                        {...register('password', { required: 'Vui lòng nhập mật khẩu' })}
                                    />
                                    <span
                                        className="input-group-text"
                                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                    >
                                        {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                    </span>
                                </div>
                                {errors.password && <span className="text-danger">{errors.password.message}</span>}
                            </div>
                        )}
                        <div className="single-input-item">
                            <div className="login-reg-form-meta d-flex align-items-center justify-content-between">
                                {!isDisplay && (
                                    <>
                                        <div className="remember-meta">
                                            <div className="custom-control custom-checkbox">
                                                <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    id="rememberMe"
                                                />
                                            </div>
                                        </div>
                                        <a href="#" className="forget-pwd" onClick={handlePasswordChange}>
                                            Quên mật khẩu?
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="single-input-item ">
                            <button type="submit" className="btn btn-sqr">
                                {isDisplay ? "Lấy lại mật khẩu" : "Đăng nhập"}
                            </button>
                            {isDisplay && (
                                <button
                                    type="button"
                                    className="forget-pwd d-flex justify-content-end pt-3"
                                    onClick={() => setIsDisplay(false)}
                                >
                                    Quay lại đăng nhập
                                </button>
                            )}
                            {!isDisplay && (
                                <Link to="/register">
                                    <h3 className="forget-pwd pt-4">Tôi chưa có tài khoản!</h3>
                                </Link>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
