import React, { useState } from "react";
import { registerUser } from "../../hooks/register";

const Register = () => {
    // State để lưu trữ thông tin form
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: '',
        subscribe: false
    });

    // State để lưu trữ thông báo lỗi và thành công
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // Hàm xử lý khi người dùng nhập liệu
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Hàm xử lý khi submit form đăng ký
    const handleRegister = async (e) => {
        e.preventDefault();

        // Kiểm tra xem mật khẩu và xác nhận mật khẩu có trùng khớp không
        if (formData.password !== formData.password_confirmation) {
            setError("Passwords do not match");
            return;
        }

        try {
            const res = await registerUser(formData);
            console.log(res);

            if (res?.status === 201) {
                setSuccess("Đăng ký thành công!");
                setError(null);
            } else {
                setError(res?.data?.message || "Đăng ký thất bại");
            }
        } catch (error) {
            setError("Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại sau.");
        }
    };

    return (
        <>
            <div className="container mt-5 mb-5">
                <div className="col-lg-12">
                    <div className="login-reg-form-wrap sign-up-form justify-content">
                        <h4>Register</h4>
                        <form onSubmit={handleRegister}>
                            <div className="single-input-item">
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    placeholder="Tên đăng nhập"
                                    required
                                />
                            </div>
                            <div className="single-input-item">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder=" Email"
                                    required
                                />
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="single-input-item">
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            placeholder="Mật khẩu"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="single-input-item">
                                        <input
                                            type="password"
                                            name="password_confirmation"
                                            value={formData.password_confirmation}
                                            onChange={handleInputChange}
                                            placeholder="Nhập lại mật khẩu"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="single-input-item">
                                        <input
                                            type="number"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder="số điện thoại"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="single-input-item">
                            <div className="login-reg-form-meta">
                                <div className="remember-meta">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="subnewsletter"
                                            name="subscribe"
                                            checked={formData.subscribe}
                                            onChange={handleInputChange}
                                        />
                                        <label className="custom-control-label" htmlFor="subnewsletter">
                                            Subscribe Our Newsletter
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div> */}
                            <div className="single-input-item">
                                <button type="submit" className="btn btn-sqr">Dăng ký</button>
                            </div>
                        </form>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {success && <p style={{ color: 'green' }}>{success}</p>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;


