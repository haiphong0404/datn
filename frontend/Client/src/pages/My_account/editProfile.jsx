import React, { useState, useEffect } from 'react';
import { useLoginForm } from '../../hooks/useLoginForm.js';
import { useEditUser } from '../../hooks/useEditUser';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditProfile = () => {
    const { userInfo, setUserInfo } = useLoginForm();
    const { editUserById, loading, error } = useEditUser();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatar_img, setAvatarImg] = useState(null);
    const [previewImage, setPreviewImage] = useState('');

    useEffect(() => {

        if (userInfo) {
            setUsername(userInfo.username || '');
            setEmail(userInfo.email || '');
            setPhone(userInfo.phone || '');
            setAddress(userInfo.address || '');
            setPreviewImage(userInfo.avatar_img || '');
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
            toast.error('Không thể lấy thông tin người dùng!');
        }
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        const updatedInfo = new FormData();
        updatedInfo.append('username', username);
        updatedInfo.append('email', email);
        updatedInfo.append('phone', phone);
        updatedInfo.append('address', address);
        if (avatar_img) updatedInfo.append('avatar_img', avatar_img);

        try {
            await editUserById(userInfo.id, updatedInfo);
            toast.success('Cập nhật thông tin thành công!');
            await fetchUserInfo(userInfo.id);
        } catch (error) {
            toast.error('Cập nhật thông tin không thành công: ' + error.message);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarImg(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    if (!userInfo) {
        return <p>Không có thông tin người dùng.</p>;
    }

    return (
        <div>
            <div className="myaccount-content">
                <h5>Chỉnh sửa thông tin</h5>
                <div className="account-details-form">
                    <form onSubmit={handleSaveChanges}>
                        <div className="single-input-item">
                            <label htmlFor="profile-image">Ảnh đại diện</label>
                            {previewImage && (
                                <img
                                    src={previewImage}
                                    alt="Preview"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        borderRadius: '50%',
                                        marginBottom: '10px',
                                    }}
                                />
                            )}
                            <input
                                type="file"
                                id="profile-image"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
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
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
