import { useState } from "react";
import axios from "axios";

const useForgotPassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const forgotPassword = async (email) => {
        console.log("Gửi yêu cầu quên mật khẩu với email:", email);
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post("/password/email", { email });
            console.log("Phản hồi từ server:", response);

            setSuccess(response.data.message);
        } catch (error) {
            setError(error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return { forgotPassword, loading, error, success };
};

export default useForgotPassword;