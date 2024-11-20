import { useState } from 'react';
import { changePassword } from '../api/user.js';

export const useChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordConfirmationError, setPasswordConfirmationError] = useState('');

    const validate = (oldpassword, password, password_confirmation) => {
        let isValid = true;
        setOldPasswordError('');
        setPasswordError('');
        setPasswordConfirmationError('');

        if (!oldpassword) {
            setOldPasswordError('Mật khẩu cũ không được để trống.');
            isValid = false;
        } else if (oldpassword.length < 8) {
            setOldPasswordError('Mật khẩu cũ phải có ít nhất 8 ký tự.');
            isValid = false;
        }

        if (!password) {
            setPasswordError('Mật khẩu mới không được để trống.');
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError('Mật khẩu mới phải có ít nhất 8 ký tự.');
            isValid = false;
        } else if (oldpassword === password) {
            setPasswordError('Mật khẩu mới phải khác mật khẩu cũ.');
            isValid = false;
        }

        if (!password_confirmation) {
            setPasswordConfirmationError('Bạn phải nhập lại mật khẩu mới.');
            isValid = false;
        } else if (password !== password_confirmation) {
            setPasswordConfirmationError('Mật khẩu xác nhận không khớp.');
            isValid = false;
        }

        return isValid;
    };


    const handleChangePassword = async (oldpassword, password, password_confirmation) => {
        if (!validate(oldpassword, password, password_confirmation)) return;

        setLoading(true);
        setMessage('');
        setError(null);

        try {
            const res = await changePassword({ oldpassword, password, password_confirmation });
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
        passwordError,
        passwordConfirmationError
    };
};
