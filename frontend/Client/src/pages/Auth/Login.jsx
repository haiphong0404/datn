import React, { useState } from "react";
import { useLoginForm } from '../../hooks/useLoginForm.js';
import useForgotPassword from "../../hooks/useForgotPass";
import { Link } from "react-router-dom";

const Login = () => {
    const [isDisplay, setIsDisplay] = useState(false);
    const {
        register,
        handleSubmit,
        errors,
        error,
        success,
        handleLogin,
        handleForgotPasswordSubmit
    } = useLoginForm(isDisplay);

    const { forgotPassword, loading, error: forgotError, success: forgotSuccess } = useForgotPassword();

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
                                placeholder="Nhập địa chỉ email"
                                {...register('email', { required: 'Vui lòng nhập địa chỉ email' })}
                            />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </div>
                        {!isDisplay && (
                            <div className="single-input-item">
                                <input
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    {...register('password', { required: 'Vui lòng nhập mật khẩu' })}
                                />
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
                                                <label className="custom-control-label" htmlFor="rememberMe">
                                                    Nhớ mật khẩu
                                                </label>
                                            </div>
                                        </div>
                                        <a href="#" className="forget-pwd" onClick={handlePasswordChange}>
                                            Quên mật khẩu?
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}
                        {forgotError && <div className="alert alert-danger">{forgotError}</div>}
                        {forgotSuccess && <div className="alert alert-success">{forgotSuccess}</div>}
                        <div className="single-input-item">
                            <button type="submit" className="btn btn-sqr" disabled={loading}>
                                {isDisplay ? (loading ? "Đang gửi..." : "Lấy lại mật khẩu") : "Đăng nhập"}
                            </button>
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
