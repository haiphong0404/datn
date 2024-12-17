// JSX
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLoginForm } from '../../hooks/useLoginForm.js';
import { editUserById } from '../../api/user.js';
import { getUserByid } from '../../api/user.js';

const EditProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatarImg, setAvatarImg] = useState(null);
    const [previewImage, setPreviewImage] = useState('');

    const { userInfo } = useLoginForm();
    const token = localStorage.getItem('token');

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
                        setPreviewImage(userData.data.avatar_img || '');
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarImg(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        const updatedData = {
            username,
            email,
            phone,
            address,
        };

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            const userId = userInfo ? userInfo.id : null;

            if (!userId) {
                throw new Error('Không tìm thấy userId.');
            }

            const response = await editUserById(userId, updatedData, token);
            if (response) {
                toast.success('Cập nhật thông tin thành công!');
                const updatedUserInfo = {
                    ...userInfo,
                    username,
                    email,
                    phone,
                    address,
                };
                localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

                setUsername(username);
                setEmail(email);
                setPhone(phone);
                setAddress(address);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Cập nhật thông tin không thành công!');
        }

        if (avatarImg) {
            const formData = new FormData();
            formData.append("avatar", avatarImg);
            formData.append("userId", userInfo.id);

            try {
                const response = await axios.post('/user/upload-avatar', formData, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.data.success) {
                    const avatarBase64 = response.data.data.avatar_base64;
                    const updatedUserInfoWithAvatar = {
                        ...JSON.parse(localStorage.getItem('userInfo')),
                        avatar_img: avatarBase64,
                    };
                    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfoWithAvatar));

                    setPreviewImage(avatarBase64);
                    toast.success('Cập nhật ảnh thành công!');
                }
            } catch (error) {
                console.error('Error uploading avatar:', error);
                toast.error('Cập nhật ảnh không thành công!');
            }
        }
    };

    return (
        <div className="container mb-5">
            <div className="card shadow-sm">
                <div className="card-header text-center  text-white">
                    <h5>Chỉnh sửa thông tin</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSaveChanges}>
                        <div className="text-center mb-4">
                            {previewImage && (
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    className="rounded-circle border"
                                    style={{ width: '120px', height: '120px', padding: '5px' }}
                                />
                            )}
                            <input
                                type="file"
                                className="form-control mt-3"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="display-name" className="form-label fw-bold">Tên Hiển Thị</label>
                            <input
                                type="text"
                                id="display-name"
                                className="form-control"
                                placeholder="Tên Hiển Thị"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-bold">Địa Chỉ Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="Địa Chỉ Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phone" className="form-label fw-bold">Số điện thoại</label>
                            <input
                                type="text"
                                id="phone"
                                className="form-control"
                                placeholder="Số điện thoại"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="address" className="form-label fw-bold">Địa Chỉ</label>
                            <input
                                type="text"
                                id="address"
                                className="form-control"
                                placeholder="Địa Chỉ"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-sqr w-100">
                                Lưu Thay Đổi
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
