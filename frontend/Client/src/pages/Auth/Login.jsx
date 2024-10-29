import React from "react";
import { useLoginForm } from '../../hooks/useLoginForm.js';
import { Link } from "react-router-dom";

const Login = () => {
    const {
        register,
        handleSubmit,
        errors,
        error,
        success,
        handleLogin,
        userInfo,

    } = useLoginForm();

    return (
        <div className="container mt-5 mb-5">
            <div className="col-lg-12">
                <div className="login-reg-form-wrap">
                    <h4>Đăng nhập</h4>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="single-input-item">
                            <input
                                type="email"
                                placeholder="Nhập địa chỉ email"
                                {...register('email', { required: 'Vui lòng nhập địa chỉ email' })} // Register email field
                            />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </div>
                        <div className="single-input-item">
                            <input
                                type="password"
                                placeholder="Nhập mật khẩu"
                                {...register('password', { required: 'Vui lòng nhập mật khẩu' })} // Register password field
                            />
                            {errors.password && <span className="text-danger">{errors.password.message}</span>}
                        </div>
                        <div className="single-input-item">
                            <div className="login-reg-form-meta d-flex align-items-center justify-content-between">
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
                                <a href="#" className="forget-pwd">
                                    Quên mật khẩu?
                                </a>
                            </div>
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>} {/* Hiển thị lỗi */}
                        {success && <div className="alert alert-success">{success}</div>} {/* Hiển thị thành công */}
                        <div className="single-input-item">
                            <button type="submit" className="btn btn-sqr">Đăng nhập</button>
                            <Link to="/register">
                                <h3 className="forget-pwd pt-4 "> Tôi chưa có tài khoản!</h3>
                            </Link>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default Login;
