import React from "react";
import { useRegisterForm } from '../../hooks/useRegisterForm.js';

const Register = () => {
    const {
        register,
        handleSubmit,
        errors,
        error,
        success,
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
                                placeholder="Họ Tên"
                                {...register('username')} // Đảm bảo có trường username
                            />
                            {errors.username && <span className="text-danger">{errors.username.message}</span>}
                        </div>
                        <div className="single-input-item">
                            <input
                                type="email"
                                placeholder="Nhập địa chỉ email"
                                {...register('email')}
                            />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="single-input-item">
                                    <input
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                        {...register('password')}
                                    />
                                    {errors.password && <span className="text-danger">{errors.password.message}</span>}
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="single-input-item">
                                    <input
                                        type="password"
                                        placeholder="Nhập lại mật khẩu"
                                        {...register('password_confirmation')} // Đảm bảo có trường xác nhận
                                    />
                                    {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="single-input-item">
                                    <input
                                        type="number"
                                        placeholder="Nhập số điện thoại"
                                        {...register('phone')} // Đảm bảo có trường xác nhận
                                    />
                                    {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
                                </div>
                            </div>
                        </div>

                        {error && <div className="alert alert-danger">{error}</div>}
                        {success && <div className="alert alert-success">{success}</div>}
                        <div className="single-input-item">
                            <button type="submit" className="btn btn-sqr">Đăng ký</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register;
