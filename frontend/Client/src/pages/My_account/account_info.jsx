import React, { useState, useEffect } from 'react';
import { useLoginForm } from '../../hooks/useLoginForm.js';

const Account_info = () => {
    const { userInfo, updateUserInfo } = useLoginForm();

    // State để lưu thông tin người dùng và chỉ cập nhật khi có thay đổi từ phía người dùng
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    // Dùng useEffect để cập nhật state khi userInfo thay đổi
    useEffect(() => {
        if (userInfo) {
            setUsername(userInfo.username || '');
            setEmail(userInfo.email || '');
            setPhone(userInfo.phone || '');
        }
    }, [userInfo]); // Chỉ cập nhật khi userInfo thay đổi

    const handleSaveChanges = (e) => {
        e.preventDefault();

        const updatedInfo = {
            username,
            email,
            phone
        };
        console.log(updatedInfo);

        updateUserInfo(updatedInfo); // Gọi hàm updateUserInfo để cập nhật thông tin
    };

    if (!userInfo) {
        return <p>Không có thông tin người dùng.</p>;
    }

    return (
        <div>
            <div className="myaccount-content">
                <h5>Chi Tiết Tài Khoản</h5>
                <div className="account-details-form">
                    <form onSubmit={handleSaveChanges}>
                        <div className="single-input-item">
                            <label htmlFor="avatar_img" className="required">Ảnh</label>
                            <img width={150} src={userInfo.avatar_img} alt="Ảnh" />
                        </div>
                        <div className="single-input-item">
                            <label htmlFor="display-name" className="required">Tên Hiển Thị</label>
                            <input
                                type="text"
                                id="display-name"
                                placeholder="Tên Hiển Thị"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="single-input-item">
                            <label htmlFor="email" className="required">Địa Chỉ Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Địa Chỉ Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="single-input-item">
                            <label htmlFor="phone" className="required">Số điện thoại</label>
                            <input
                                type="text"
                                id="phone"
                                placeholder="Số điện thoại"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="single-input-item">
                            <button type="submit" className="btn btn-sqr">Lưu Thay Đổi</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Account_info;
