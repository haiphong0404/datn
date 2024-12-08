import axios from 'axios';
export const registerUser = async (userData) => {
    try {
        const response = await axios.post("/register", userData);
        console.log(response);

        const { token } = response.data;
        if (token) {
            // Lưu token vào localStorage sau khi đăng ký thành công
            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }

        return response?.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const login = async (credentials) => {
    try {
        const response = await axios.post("/login", credentials);
        const { token, user } = response.data; // Lấy token và user từ phản hồi

        if (token) {
            localStorage.setItem('token', token); // Lưu token vào localStorage
            if (user && user.role) {
                localStorage.setItem('role', user.role); // Lưu vai trò người dùng vào localStorage
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Thiết lập header Authorization
        }

        return response.data; // Trả về dữ liệu từ phản hồi
    } catch (error) {
        throw error.response?.data || error.message; // Bắt lỗi và ném ra
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


// Sửa thông tin người dùng
export const editUserById = async (id) => {
    const token = localStorage.getItem('token'); // Lấy token từ localStorage
    try {
        const response = await axios.put(`/user/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Gửi token trong header
                'Content-Type': 'application/json',
            },
        });
        getUserByid(id)
        return response.data;

    } catch (error) {
        throw new Error('Lỗi khi sửa thông tin người dùng: ' + (error.response?.data?.message || error.message));
    }

};

// quên mật khẩu 
export const forgotPassword = async (email) => {
    console.log(email);
    try {
        const response = await axios.post("/password/reset-link", { email });
        return response.data;
    } catch (error) {
        console.error("API error:", error);
        throw error.response?.data || JSON.stringify(error.message);
    }
};


// Đặt lại mật khẩu
export const changePassword = async (data) => {
    try {
        const response = await axios.post("/change-password", data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};



