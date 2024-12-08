import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditProfile = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [avatarImg, setAvatarImg] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [base64Avatar, setBase64Avatar] = useState(null);

    useEffect(() => {
        // Giả sử userInfo được lấy từ hook useLoginForm hoặc từ props
        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/user/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response && response.data) {
                    const user = response.data.data;
                    setUsername(user.username || '');
                    setEmail(user.email || '');
                    setPhone(user.phone || '');
                    setAddress(user.address || '');
                    setPreviewImage(user.avatar_img ? `data:image/png;base64,${user.avatar_img_base64}` : '');
                } else {
                    toast.error('Dữ liệu người dùng không hợp lệ!');
                }
            } catch (error) {
                toast.error('Không thể tải thông tin người dùng!');
            }
        };

        fetchUserInfo();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarImg(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = async (e) => {
        e.preventDefault();

        const updatedInfo = new FormData();
        updatedInfo.append('username', username);
        updatedInfo.append('email', email);
        updatedInfo.append('phone', phone);
        updatedInfo.append('address', address);
        if (avatarImg) updatedInfo.append('avatar_img', avatarImg);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put('/api/user/${userId}', updatedInfo, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            // Kiểm tra dữ liệu trả về từ server
            if (response && response.data) {
                setBase64Avatar(response.data.data.avatar_img_base64);
                toast.success('Cập nhật thông tin thành công!');
            } else {
                toast.error('Dữ liệu phản hồi không hợp lệ!');
            }
        } catch (error) {
            if (error.response) {
                // Lỗi từ server, có thể là 404, 500 hoặc các mã lỗi khác
                toast.error('Cập nhật thông tin không thành công: ' + error.response.data.message);
            } else {
                // Lỗi không liên quan đến phản hồi từ server
                toast.error('Đã xảy ra lỗi. Vui lòng thử lại sau.');
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
