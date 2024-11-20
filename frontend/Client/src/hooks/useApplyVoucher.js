import axios from "axios";

const useApplyVoucher = () => {
  const applyVoucher = async (voucherCode) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/apply-voucher", {
        voucher_code: voucherCode, // Đảm bảo trường này khớp với yêu cầu của API backend
      });
      return response.data;
    } catch (error) {
      console.error("Error in applyVoucher:", error.response?.data?.message || error.message);
      throw error.response?.data || error; // Trả về thông báo lỗi từ backend
    }
  };

  return { applyVoucher };
};

export default useApplyVoucher;
