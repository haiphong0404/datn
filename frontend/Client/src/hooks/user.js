import axios from "axios";


// Lấy danh sách sản phẩm
export const fetchUsers = async () => {
    return await axios.get('/user/1');
};

// 