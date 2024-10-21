import axios from 'axios';

// Lấy danh sách sản phẩm
export const fetchBrands = async () => {
    try {
        const response = await axios.get('/Apibrands', {   
        });
        console.log('API trả về:', response.data); // Log phản hồi từ API
        return response.data; 
    } catch (error) {
        console.error('Lỗi khi gọi API:', error.response ? error.response.data : error.message);
        // Giả sử bạn có một hàm setError để thông báo lỗi
        setError('Lỗi không thể lấy dữ liệu sản phẩm.');
        throw error; // Ném lỗi lên cho các hàm gọi hàm này xử lý
    }
};