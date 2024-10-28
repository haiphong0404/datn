import React from 'react';
import { useLoginForm } from '../../hooks/useLoginForm.js';

const Dashboard = () => {
    const { userInfo } = useLoginForm();
    console.log("Thông tin người dùng trong Account_info:", userInfo);

    return (
        <div>
            <div className="myaccount-content">
                <h5>Xác Nhận Email</h5>

                {userInfo ? (
                    <>
                        <div className="welcome">
                            <p>
                                Xin chào, <strong>{userInfo?.username || ''}</strong>!
                            </p>
                        </div>
                        <p className="mb-0">
                            Cảm ơn bạn đã đăng ký! Vui lòng kiểm tra email của bạn và nhấp vào liên kết xác nhận để kích hoạt tài khoản của bạn.
                        </p>
                        <p>
                            Nếu bạn không nhận được email xác nhận, hãy kiểm tra thư mục spam hoặc nhấp vào nút bên dưới để gửi lại email xác nhận.
                        </p>

                        {/* Nút xác nhận */}
                        <div className="button-container">
                            <div className="button_mail">
                                <button className="news-btn" id="mc-submit">
                                    Gửi lại xác nhận
                                </button>
                            </div>
                        </div>
                        <p id="status-message" className="mt-2"></p>
                    </>
                ) : (
                    <p>Vui lòng đăng nhập tài khoản</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
