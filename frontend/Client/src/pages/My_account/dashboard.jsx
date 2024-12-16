import React from 'react';
import { useLoginForm } from '../../hooks/useLoginForm.js';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { userInfo } = useLoginForm();
    console.log("Thông tin người dùng trong Account_info:", userInfo);

    return (
        <div>
            <div className="myaccount-content">
                <h5>Chào mừng đến với Shose Thor</h5>

                {userInfo ? (
                    <>
                        <div className="welcome">
                            <p>
                                Xin chào, <strong>{userInfo?.username || ''}</strong>!
                            </p>
                        </div>
                        <p className="mb-0">
                            Cảm ơn bạn đã đăng ký! Chúng tôi rất vui được đồng hành cùng bạn. Khám phá ngay những sản phẩm tuyệt vời và tận hưởng trải nghiệm mua sắm đầy cảm hứng tại Thor!
                        </p>

                    </>
                ) : (
                    <>
                        <p>Vui lòng đăng nhập tài khoản</p>
                        <Link to="/login">
                            <button className="news-btn" id="mc-submit">
                                Đăng nhập
                            </button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
