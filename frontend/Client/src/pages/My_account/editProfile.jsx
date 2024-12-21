import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLoginForm } from '../../hooks/useLoginForm.js';
import { editUserById ,uploadAvatar} from '../../api/user.js';
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
    // const [shippingFrom, setShippingFrom] = useState({
    //     province: '',
    //     district: '',
    //     ward: ''
    //   });
    //   const handleShippingChange = (data) => {
    //     setShippingFrom(data);
    //   };
    
    useEffect(() => {
        const fetchUserInfo = async () => {
            const userInfo = JSON.parse(localStorage.getItem('userInfo')); // Lấy userInfo từ localStorage
            console.log('userInfo from localStorage:', userInfo);  // In ra userInfo
    
            if (userInfo && userInfo.id) {  // Kiểm tra nếu có userInfo và userId
                try {
                    const userData = await getUserByid(userInfo.id); // Gọi API lấy thông tin người dùng
                    console.log('User data fetched:', userData);  // In ra dữ liệu người dùng nhận được từ API
                    
                   
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
    
    useEffect(() => {
        const handleUserInfoUpdate = () => {
            const updatedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (updatedUserInfo) {
                // Tại đây, bạn không cần setUserInfo nữa
                // Nếu cần update trong state hoặc context, hãy thực hiện tại đây
            }
        };

        window.addEventListener('userInfoUpdated', handleUserInfoUpdate);

        return () => {
            window.removeEventListener('userInfoUpdated', handleUserInfoUpdate);
        };
    }, []);
    
    

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

            // Gửi sự kiện để đồng bộ hóa
            window.dispatchEvent(new Event('userInfoUpdated'));

            // Cập nhật lại state của component để hiển thị dữ liệu mới
            setUsername(username);
            setEmail(email);
            setPhone(phone);
            setAddress(address);
        }
    } catch (error) {
        console.error('Error updating user:', error);
        toast.error('Cập nhật thông tin không thành công!');
    }

    // Nếu có ảnh, gửi ảnh bằng FormData
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

                // Cập nhật lại localStorage với ảnh mới
                const updatedUserInfoWithAvatar = {
                    ...JSON.parse(localStorage.getItem('userInfo')),
                    avatar_img: avatarBase64,
                };
                localStorage.setItem('userInfo', JSON.stringify(updatedUserInfoWithAvatar));

                // Gửi sự kiện để đồng bộ hóa
                window.dispatchEvent(new Event('userInfoUpdated'));

                setPreviewImage(avatarBase64);
                toast.success('Cập nhật ảnh thành công!');
            }
        } catch (error) {
            console.error('Error uploading avatar:', error);
            toast.error('Cập nhật ảnh không thành công!');
        }
    }
    window.location.reload();
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
                                readOnly
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