import React, { useState } from "react";
import { loginUser } from "../../hooks/login";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await loginUser(formData);
            console.log(res);

            if (res?.status === 200) {
                setSuccess("Đăng nhập thành công!");
                setError(null);
                navigate('/shop')
            } else {
                setError(res?.data?.message || "Đăng nhập thất bại");
            }
        } catch (error) {
            setError("Đã xảy ra lỗi khi đăng nhập. Vui lòng thử lại sau.");
        }
    };

    return (
        <>
            <div className="container mt-5 mb-5">
                <div className="col-lg-12">
                    <div className="login-reg-form-wrap sign-up-form justify-content">
                        <h4>Đăng Nhập</h4>
                        <form onSubmit={handleLogin}>
                            <div className="single-input-item">
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email hoặc Tên đăng nhập"
                                    required
                                />
                            </div>
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
                            <div className="single-input-item">
                                <button type="submit" className="btn btn-sqr">Đăng Nhập</button>
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

export default Login;
