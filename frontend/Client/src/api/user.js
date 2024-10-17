import axios from 'axios';
export const registerUser  = async (userData) => {
    try {
        const response = await axios.post("/register", userData);
        const { token } = response.data;
        if (token) {
            // Lưu token vào localStorage sau khi đăng ký thành công
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const login = async (credentials) => {
    try {
        const response = await axios.post("/login", credentials);
        const { token } = response.data;

        if (token) {
            
            localStorage.setItem('token', token);
            localStorage.setItem('role', user.role);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
// user.js


// Hàm để lấy thông tin người dùng từ API
export const getUserByid = async (id) => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    try {
        const response = await axios.get(`/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Gửi token trong header
                'Content-Type': 'application/json',
            },
        });

        return response.data; // Trả về dữ liệu người dùng
    } catch (error) {
        throw new Error('Lỗi khi lấy thông tin người dùng: ' + (error.response?.data?.message || error.message));
    }
};
