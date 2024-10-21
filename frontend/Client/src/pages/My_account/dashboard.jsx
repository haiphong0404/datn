

import React from 'react';
import { Link } from 'react-router-dom';
const Dashboard = () => {

    return (
        <div>
            <div

            >
                <div className="myaccount-content">
                    <h5>Xác Nhận Email</h5>
                    <div className="welcome">
                        <p>
                            Xin chào, <strong>Erik Jhonson</strong>!
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
                </div>


            </div>
        </div>
    );
};

export default Dashboard;