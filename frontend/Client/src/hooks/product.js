import axios from 'axios';

// Lấy danh sách sản phẩm
export const fetchProducts = async () => {
    try {
        const response = await axios.get('/products', {   
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

// Lấy thông tin chi tiết sản phẩm theo ID
export const fetchProductById = async (productId) => {
    try {
        const response = await axios.get(`https://mayfly-ultimate-toucan.ngrok-free.app/api/products/${productId}`, {
            headers: {
                'Accept': 'application/json', // Đảm bảo rằng bạn yêu cầu dữ liệu JSON
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Không tìm thấy dữ liệu sản phẩm id: ${productId}:`, error);
        throw error; // Ném lỗi lên cho các hàm gọi hàm này xử lý
    }
};
