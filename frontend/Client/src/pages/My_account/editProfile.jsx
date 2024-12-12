import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLoginForm } from '../../hooks/useLoginForm.js';
import { editUserById ,uploadAvatar} from '../../api/user.js';
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

            // Cập nhật lại localStorage với dữ liệu mới
            const updatedUserInfo = {
                ...userInfo,
                username,
                email,
                phone,
                address,
            };
            localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

            // Cập nhật lại state của component để hiển thị dữ liệu mới
            setUsername(username);
            setEmail(email);
            setPhone(phone);
            setAddress(address);
        }
    } catch (error) {
        console.error('Error updating user:', error);
    }

    // Nếu có ảnh, gửi ảnh bằng FormData
    if (avatarImg) {
        const formData = new FormData();

        // Log dữ liệu trước khi thêm vào FormData
        console.log("avatarImg trước khi append:", avatarImg);

        // Thêm tệp ảnh vào formData
        formData.append("avatar", avatarImg); // Đảm bảo đây là tên trường mà API yêu cầu
        formData.append("userId", userInfo.id); // Thêm userId vào formData

        // Log FormData sau khi thêm dữ liệu
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        try {
            const response = await axios.post('/user/upload-avatar', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("Response from server:", response.data);
            if (response.data.success) {
                const avatarBase64 = response.data.data.avatar_base64; // Chuỗi base64
                setPreviewImage(avatarBase64); // Hiển thị ảnh dưới dạng base64
            }
        } catch (error) {
            console.error('Error uploading avatar:', error);
            toast.error('Cập nhật ảnh không thành công!');
        }
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