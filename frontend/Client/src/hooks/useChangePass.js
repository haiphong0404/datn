import { useState } from 'react';
import { changePassword } from '../api/user.js';

export const useChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');

    const validate = (oldPassword, newPassword) => {
        let isValid = true;
        setOldPasswordError('');
        setNewPasswordError('');

        if (!oldPassword) {
            setOldPasswordError('Mật khẩu cũ không được để trống.');
            isValid = false;
        }

        if (!newPassword) {
            setNewPasswordError('Mật khẩu mới không được để trống.');
            isValid = false;
        } else if (oldPassword === newPassword) {
            setNewPasswordError('Mật khẩu mới phải khác mật khẩu cũ.');
            isValid = false;
        }

        return isValid;
    };

    const handleChangePassword = async (oldPassword, newPassword) => {
        if (!validate(oldPassword, newPassword)) return; // Validate before proceeding

        setLoading(true);
        setMessage('');
        setError(null);

        try {
            const res = await changePassword({ oldPassword, newPassword });
            setMessage(res.message || 'Đổi mật khẩu thành công');
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Đổi mật khẩu thất bại';
            setError(errorMsg);
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    const resetMessage = () => {
        setMessage('');
        setError(null);
    };

    return {
        loading,
        message,
        error,
        handleChangePassword,
        resetMessage,
        oldPasswordError,
        newPasswordError
    };
};
