import { useState } from 'react';
import { changePassword } from '../api/user.js';

export const useChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    const handleChangePassword = async (oldPassword, newPassword) => {
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

    return { loading, message, error, handleChangePassword, resetMessage };
};
