import React, { useState, useEffect } from 'react';
import { useLoginForm } from '../../hooks/useLoginForm.js';
import { getUserByid } from '../../api/user.js';
import { toast } from 'react-toastify';

const Account_Info = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatarImg, setAvatarImg] = useState('');

    const { userInfo } = useLoginForm();

    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo && userInfo.id) {
                try {
                    const userData = await getUserByid(userInfo.id);

                    if (userData && userData.data) {
                        setUsername(userData.data.username || '');
                        setEmail(userData.data.email || '');
                        setPhone(userData.data.phone || '');
                        setAddress(userData.data.address || '');
                        setAvatarImg(userData.data.avatar_img || '');
                    } else {
                        toast.error('Dữ liệu người dùng không hợp lệ.');
                    }
                } catch (error) {
                    console.error('Error fetching user info:', error);
                    toast.error('Không thể tải thông tin người dùng!');
                }
            } else {
                console.log('No userId found in localStorage');
            }
        };

        fetchUserInfo();
    }, []);

    return (
        <div className="container  mb-5">
            <div className="card shadow-sm">
                <div className="card-header text-center  text-white">
                    <h5>Thông tin người dùng</h5>
                </div>
                <div className="card-body">
                    <div className="text-center mb-4">
                        {avatarImg && (
                            <img
                                src={avatarImg}
                                alt="User Avatar"
                                className="rounded-circle border"
                                style={{ width: '120px', height: '120px', padding: '5px' }}
                            />
                        )}
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Tên Hiển Thị</label>
                        <p className="form-control bg-light">{username}</p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Địa Chỉ Email</label>
                        <p className="form-control bg-light">{email}</p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Số điện thoại</label>
                        <p className="form-control bg-light">{phone}</p>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-bold">Địa Chỉ</label>
                        <p className="form-control bg-light">{address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account_Info;
