import { useState } from 'react';
import { changePassword } from '../api/user.js';
import { toast } from 'react-toastify';

export const useChangePassword = () => {
    const [loading, setLoading] = useState(false);
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
            toast.error('Mật khẩu cũ không được để trống.');
            isValid = false;
        } else if (oldpassword.length < 8) {
            setOldPasswordError('Mật khẩu cũ phải có ít nhất 8 ký tự.');
            toast.error('Mật khẩu cũ phải có ít nhất 8 ký tự.');
            isValid = false;
        }

        if (!password) {
            setPasswordError('Mật khẩu mới không được để trống.');
            toast.error('Mật khẩu mới không được để trống.');
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError('Mật khẩu mới phải có ít nhất 8 ký tự.');
            toast.error('Mật khẩu mới phải có ít nhất 8 ký tự.');
            isValid = false;
        } else if (oldpassword === password) {
            setPasswordError('Mật khẩu mới phải khác mật khẩu cũ.');
            toast.error('Mật khẩu mới phải khác mật khẩu cũ.');
            isValid = false;
        }

        if (!password_confirmation) {
            setPasswordConfirmationError('Bạn phải nhập lại mật khẩu mới.');
            toast.error('Bạn phải nhập lại mật khẩu mới.');
            isValid = false;
        } else if (password !== password_confirmation) {
            setPasswordConfirmationError('Mật khẩu xác nhận không khớp.');
            toast.error('Mật khẩu xác nhận không khớp.');
            isValid = false;
        }

        return isValid;
    };

    const handleChangePassword = async (oldpassword, password, password_confirmation) => {
        if (!validate(oldpassword, password, password_confirmation)) return false;

        setLoading(true);

        try {
            const res = await changePassword({ oldpassword, password, password_confirmation });
            toast.success(res.message || 'Đổi mật khẩu thành công');
            return true;
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Đổi mật khẩu thất bại';
            toast.error(errorMsg);
            return false;
        } finally {
            setLoading(false);
        }
    };


    return {
        loading,
        handleChangePassword,
        oldPasswordError,
        passwordError,
        passwordConfirmationError,
    };
};
