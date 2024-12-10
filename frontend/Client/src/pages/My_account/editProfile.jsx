import React, { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { useLoginForm } from '../../hooks/useLoginForm.js';
import { editUserById } from '../../api/user.js';
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
        if (userInfo) {
            const initialData = {
                username: userInfo.username || '',
                email: userInfo.email || '',
                phone: userInfo.phone || '',
                address: userInfo.address || '',
                avatar_img: userInfo.avatar_img || '',
            };

            // Log dữ liệu userInfo và initialData để kiểm tra
            console.log('Dữ liệu userInfo:', userInfo);
            console.log('Dữ liệu initialData:', initialData);

            setUsername(initialData.username);
            setEmail(initialData.email);
            setPhone(initialData.phone);
            setAddress(initialData.address);
            setPreviewImage(initialData.avatar_img);
        }
    }, [userInfo]);


    // Function to handle image file selection and preview update
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarImg(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        const updatedData = new FormData();
        updatedData.append('username', username);
        updatedData.append('email', email);
        updatedData.append('phone', phone);
        updatedData.append('address', address);

        // Thêm tệp hình ảnh nếu có
        if (avatarImg) {
            updatedData.append('avatar_img', avatarImg);
        }

        console.log('Dữ liệu cập nhật:', updatedData);

        try {
            // Lấy userInfo từ localStorage và trích xuất userId
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
                    avatar_img: avatarImg ? avatarImg.name : userInfo.avatar_img,
                };
                localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));


                setUsername(username);
                setEmail(email);
                setPhone(phone);
                setAddress(address);
                setPreviewImage(avatarImg ? URL.createObjectURL(avatarImg) : previewImage);

                fetchUserData();
            }
        } catch (error) {

        }
    };



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
                            <label htmlFor="address" className="required">Địa Chỉ</label>
                            <input
                                type="text"
                                id="address"
                                placeholder="Địa Chỉ"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="single-input-item">
                            <button type="submit" className="btn btn-sqr">
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