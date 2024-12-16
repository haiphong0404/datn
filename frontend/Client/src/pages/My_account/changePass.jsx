import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useChangePassword } from '../../hooks/useChangePass';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function ChangePassword() {
    const [oldpassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassConfirmation] = useState('');
    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const {
        loading,
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
        <>
            <form
                onSubmit={handleSubmit}
                className="container p-5 border rounded shadow-sm "
                style={{ maxWidth: '800px', margin: 'auto' }}
            >
                <h2 className="text-center mb-4">Đổi mật khẩu</h2>

                <div className="row align-items-center mb-3">
                    <label className="col-sm-3 col-form-label">Mật khẩu cũ:</label>
                    <div className="col-sm-9">
                        <div className="input-group">
                            <input
                                type={isOldPasswordVisible ? "text" : "password"}
                                className="form-control"
                                value={oldpassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                            <span
                                className="input-group-text"
                                onClick={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
                            >
                                {isOldPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {oldPasswordError && <div className="alert alert-danger mt-2">{oldPasswordError}</div>}
                    </div>
                </div>

                {/* Mật khẩu mới */}
                <div className="row align-items-center mb-3">
                    <label className="col-sm-3 col-form-label">Mật khẩu mới:</label>
                    <div className="col-sm-9">
                        <div className="input-group">
                            <input
                                type={isNewPasswordVisible ? "text" : "password"}
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span
                                className="input-group-text"
                                onClick={() => setIsNewPasswordVisible(!isNewPasswordVisible)}
                            >
                                {isNewPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {newPasswordError && <div className="alert alert-danger mt-2">{newPasswordError}</div>}
                    </div>
                </div>

                <div className="row align-items-center mb-3">
                    <label className="col-sm-3 col-form-label">Nhập lại mật khẩu mới:</label>
                    <div className="col-sm-9">
                        <div className="input-group">
                            <input
                                type={isConfirmPasswordVisible ? "text" : "password"}
                                className="form-control"
                                value={password_confirmation}
                                onChange={(e) => setPassConfirmation(e.target.value)}
                                required
                            />
                            <span
                                className="input-group-text"
                                onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                            >
                                {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        {password_confirmationError && (
                            <div className="alert alert-danger mt-2">{password_confirmationError}</div>
                        )}
                    </div>
                </div>

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
            </form>
        </>
    );
}

export default ChangePassword;
