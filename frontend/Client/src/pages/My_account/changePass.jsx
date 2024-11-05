import React, { useState } from 'react';
import useChangePassword from '../../hooks/useChangePass';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const { loading, message, handleChangePassword } = useChangePassword();

    const handleSubmit = async (e) => {
        e.preventDefault();
        handleChangePassword(oldPassword, newPassword);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Mật khẩu cũ:
                <input
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                />
            </label>
            <label>
                Mật khẩu mới:
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
            </label>
            <button type="submit" disabled={loading}>
                {loading ? 'Đang đổi...' : 'Đổi mật khẩu'}
            </button>
            {message && <p>{message}</p>}
        </form>
    );
}

export default ChangePassword;
