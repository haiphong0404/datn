import React, { useState, useEffect } from 'react';
import { useLoginForm } from '../../hooks/useLoginForm.js';

const Account_info = () => {
    const { userInfo } = useLoginForm();
    const [avatar_img, setAvatarImg] = useState('');

    useEffect(() => {
        if (userInfo) {
            setAvatarImg(userInfo.avatar_img || '');
        }
    }, [userInfo]);

    if (!userInfo) {
        return <p>Không có thông tin người dùng.</p>;
    }

    return (
        <div>
            <div className="myaccount-content">
                <h5>Chi Tiết Tài Khoản</h5>
                <div className="account-details-form">
                    {/* Hiển thị ảnh đại diện */}
                    <div className="profile-image-section">
                        <h6>Ảnh đại diện</h6>
                        {avatar_img ? (
                            <img
                                src={avatar_img}
                                alt="Avatar"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginBottom: '10px',
                                }}
                            />
                        ) : (
                            <p>Không có ảnh đại diện.</p>
                        )}
                    </div>

                    {/* Form thông tin */}
                    <form>
                        <div className="single-input-item">
                            <label htmlFor="display-name" className="required">Tên Hiển Thị</label>
                            <input
                                type="text"
                                id="display-name"
                                placeholder="Tên Hiển Thị"
                                value={userInfo.username || ''}
                                readOnly
                            />
                        </div>
                        <div className="single-input-item">
                            <label htmlFor="email" className="required">Địa Chỉ Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Địa Chỉ Email"
                                value={userInfo.email || ''}
                                readOnly
                            />
                        </div>
                        <div className="single-input-item">
                            <label htmlFor="phone" className="required">Số điện thoại</label>
                            <input
                                type="text"
                                id="phone"
                                placeholder="Số điện thoại"
                                value={userInfo.phone || ''}
                                readOnly
                            />
                        </div>
                        <div className="single-input-item">
                            <label htmlFor="address" className="required">Địa Chỉ </label>
                            <input
                                type="text"
                                id="address"
                                placeholder="Địa Chỉ"
                                value={userInfo.address || ''}
                                readOnly
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Account_info;
