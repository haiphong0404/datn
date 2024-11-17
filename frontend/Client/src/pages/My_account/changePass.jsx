import React, { useState } from 'react';
import { useChangePassword } from '../../hooks/useChangePass';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const {
        loading,
        message,
        error,
        handleChangePassword,
        oldPasswordError,
        newPasswordError
    } = useChangePassword();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleChangePassword(oldPassword, newPassword);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="container p-5 border rounded shadow-sm my-5"
            style={{ maxWidth: '600px', margin: 'auto' }}
        >
            <h2 className="text-center mb-4">Đổi mật khẩu</h2>

            <div className="form-group mb-4">
                <label className="form-label">Mật khẩu cũ:</label>
                <input
                    type="password"
                    className="form-control form-control-lg"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                />
                {oldPasswordError && <div className="alert alert-danger mt-2">{oldPasswordError}</div>}
            </div>

            <div className="form-group mb-4">
                <label className="form-label">Mật khẩu mới:</label>
                <input
                    type="password"
                    className="form-control form-control-lg"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                {newPasswordError && <div className="alert alert-danger mt-2">{newPasswordError}</div>}
            </div>

            <button
                type="submit"
                className="btn btn-sqr"
                disabled={loading}
            >
                {loading ? 'Đang đổi...' : 'Đổi mật khẩu'}
            </button>

            {error && <div className="alert alert-danger mt-4 text-center">{error}</div>}
            {message && <div className="alert alert-success mt-4 text-center">{message}</div>}
        </form>
    );
}

export default ChangePassword;
