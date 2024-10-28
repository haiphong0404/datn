import React from "react";
import { useLoginForm } from '../../hooks/useLoginForm.js';

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
                    <h4>Login</h4>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="single-input-item">
                            <input 
                                type="email" 
                                placeholder="Email or Username" 
                                {...register('email', { required: 'Email is required' })} // Register email field
                            />
                            {errors.email && <span className="text-danger">{errors.email.message}</span>}
                        </div>
                        <div className="single-input-item">
                            <input 
                                type="password" 
                                placeholder="Enter your Password" 
                                {...register('password', { required: 'Password is required' })} // Register password field
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
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                                <a href="#" className="forget-pwd">
                                    Forget Password?
                                </a>
                            </div>
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>} {/* Hiển thị lỗi */}
                        {success && <div className="alert alert-success">{success}</div>} {/* Hiển thị thành công */}
                        <div className="single-input-item">
                            <button type="submit" className="btn btn-sqr">Login</button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    );
}

export default Login;
