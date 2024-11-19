import React, { useState } from 'react';
import { useChangePassword } from '../../hooks/useChangePass';

function ChangePassword() {
    const [oldpassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassConfirmation] = useState('');
    const {
        loading,
        message,
        error,
        handleChangePassword,
        oldPasswordError,
        newPasswordError,
        password_confirmationError,
    } = useChangePassword();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleChangePassword(oldpassword, password, password_confirmation);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="container p-5 border rounded shadow-sm my-5"
            style={{ maxWidth: '800px', margin: 'auto' }}
        >
            <h2 className="text-center mb-4">Đổi mật khẩu</h2>

            {/* Mật khẩu cũ */}
            <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label">Mật khẩu cũ:</label>
                <div className="col-sm-9">
                    <input
                        type="password"
                        className="form-control"
                        value={oldpassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                    {oldPasswordError && <div className="alert alert-danger mt-2">{oldPasswordError}</div>}
                </div>
            </div>

            {/* Mật khẩu mới */}
            <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label">Mật khẩu mới:</label>
                <div className="col-sm-9">
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {newPasswordError && <div className="alert alert-danger mt-2">{newPasswordError}</div>}
                </div>
            </div>

            {/* Nhập lại mật khẩu mới */}
            <div className="row align-items-center mb-3">
                <label className="col-sm-3 col-form-label">Nhập lại mật khẩu mới:</label>
                <div className="col-sm-9">
                    <input
                        type="password"
                        className="form-control"
                        value={password_confirmation}
                        onChange={(e) => setPassConfirmation(e.target.value)}
                        required
                    />
                    {password_confirmationError && <div className="alert alert-danger mt-2">{password_confirmationError}</div>}
                </div>
            </div>

            {/* Nút submit */}
            <div className="row">
                <div className="col-sm-9 offset-sm-3">
                    <button
                        type="submit"
                        className="btn btn-sqr w-100"
                        disabled={loading}
                    >
                        {loading ? 'Đang đổi...' : 'Đổi mật khẩu'}
                    </button>
                </div>
            </div>

            {/* Thông báo lỗi/success */}
            <div className="mt-4">
                {error && <div className="alert alert-danger text-center">{error}</div>}
                {message && <div className="alert alert-success text-center">{message}</div>}
            </div>
        </form>
    );
}

export default ChangePassword;
