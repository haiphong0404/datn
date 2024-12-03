import { useState } from "react";
import { toast } from "react-toastify";

const useForgotPassword = () => {
    const [loading, setLoading] = useState(false);

    const forgotPassword = async (email) => {
        console.log("Gửi yêu cầu quên mật khẩu với email:", email);
        setLoading(true);

        try {
            const response = await axios.post("/password/reset-link", { email });
            console.log("Phản hồi từ server:", response);
            toast.success("Lấy lại mật khẩu thành công, vui lòng kiểm tra email!");
        } catch (error) {
            console.error("Chi tiết lỗi:", error);
            const errorMsg = error.response?.data || "Lỗi không xác định!";
            toast.error(`Lấy lại mật khẩu không thành công: ${errorMsg}`);
        } finally {
            setLoading(false);
        }
    };

    return { forgotPassword, loading };
};

export default useForgotPassword;
