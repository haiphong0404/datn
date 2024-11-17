import React, { useState, useEffect } from 'react';
import { useLoginForm } from '../../hooks/useLoginForm.js';
import { useEditUser } from '../../hooks/useEditUser';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Account_info = () => {
    const { userInfo, setUserInfo } = useLoginForm();
    const { editUserById, loading, error } = useEditUser();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');


    useEffect(() => {
        if (userInfo) {
            setUsername(userInfo.username || '');
            setEmail(userInfo.email || '');
            setPhone(userInfo.phone || '');
            setAddress(userInfo.address || '');
        }
    }, [userInfo]);

    const fetchUserInfo = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`/user/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setUserInfo(response.data);
        } catch (error) {
            console.error('Không thể lấy thông tin người dùng:', error.message);
        }
    };

    const handleSaveChanges = async (e) => {
        console.log("pass");

        e.preventDefault();

        const updatedInfo = {
            username,
            email,
            phone,
            address
        };

        try {
            await editUserById(userInfo.id, updatedInfo);
            alert('Cập nhật thông tin thành công!');


            await fetchUserInfo(userInfo.id);
        } catch (error) {
            console.error(error.message);
            alert('Cập nhật thông tin không thành công: ' + error.message);
        }
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
                            <label htmlFor="address" className="required">Địa Chỉ </label>
                            <input
                                type="text"
                                id="address"
                                placeholder="Địa Chỉ"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="single-input-item">
                            <button type="submit" className="btn btn-sqr" disabled={loading}>
                                {loading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                            </button>
                            <Link to="/changePassword" type="button" className="btn btn-sqr mt-2">
                                <a >Đổi Mật Khẩu</a   >
                            </Link>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Account_info;
