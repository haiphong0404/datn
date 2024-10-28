
import React from 'react';
import { useLoginForm } from '../../hooks/useLoginForm.js';
const Account_info = () => {
    const { userInfo } = useLoginForm();
    console.log("Thông tin người dùng trong Account_info:", userInfo); 
    if (!userInfo) {
        return <p>Không có thông tin người dùng.</p>;
    }

    return (
        <div>
            <div className="myaccount-content">
                <h5>Chi Tiết Tài Khoản</h5>
                <div className="account-details-form">
                    <form action="#">

                        <div className="row">
                            
                        </div>

                        <div className="single-input-item">
                            <label htmlFor="display-name" className="required">
                                Tên Hiển Thị
                            </label>
                            <input
                                type="text"
                                id="display-name"
                                placeholder="Tên Hiển Thị"
                                defaultValue={userInfo.username || ''}
                            />
                        </div>
                        <div className="single-input-item">
                            <label htmlFor="email" className="required">
                                Địa Chỉ Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Địa Chỉ Email"
                                defaultValue={userInfo.email || ''}
                            />
                        </div>
                        <fieldset>
                            <legend>Thay Đổi Mật Khẩu</legend>
                            <div className="single-input-item">
                                <label htmlFor="current-pwd" className="required">
                                    Mật Khẩu Hiện Tại
                                </label>
                                <input
                                    type="password"
                                    id="current-pwd"
                                    
                                />
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="single-input-item">
                                        <label htmlFor="new-pwd" className="required">
                                            Mật Khẩu Mới
                                        </label>
                                        <input
                                            type="password"
                                            id="new-pwd"
                                            placeholder="Mật Khẩu Mới"
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="single-input-item">
                                        <label htmlFor="confirm-pwd" className="required">
                                            Xác Nhận Mật Khẩu
                                        </label>
                                        <input
                                            type="password"
                                            id="confirm-pwd"
                                            placeholder="Xác Nhận Mật Khẩu"
                                        />
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <div className="single-input-item">
                            <button className="btn btn-sqr">
                                Lưu Thay Đổi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Account_info;
