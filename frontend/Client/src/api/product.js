import axios from 'axios';

// Lấy danh sách sản phẩm
export const fetchProducts = async () => {
    try {
        const response = await axios.get('/products', {   
        });
       
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
        const response = await axios.get(`/products/${productId}`, {
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
export const fetchProductVariants = async (productId) => {
    try {
        const response = await axios.get(`/products/${productId}/variants`);
        return response.data;
    } catch (error) {
        console.error(`Lỗi khi lấy biến thể sản phẩm với id: ${productId}:`, error);
        throw error;
    }
};

export const fetchColor = async () => {
    try {
        const response = await axios.get('/colors', {   
        });
      
        return response.data; 
    } catch (error) {
        console.error('Lỗi khi gọi API:', error.response ? error.response.data : error.message);
        // Giả sử bạn có một hàm setError để thông báo lỗi
        setError('Lỗi không thể lấy dữ liệu sản phẩm.');
        throw error; // Ném lỗi lên cho các hàm gọi hàm này xử lý
    }
};
export const fetchSizes = async () => {
    try {
        const response = await axios.get('/sizes', {   
        });
      
        return response.data; 
    } catch (error) {
        console.error('Lỗi khi gọi API:', error.response ? error.response.data : error.message);
        // Giả sử bạn có một hàm setError để thông báo lỗi
        setError('Lỗi không thể lấy dữ liệu sản phẩm.');
        throw error; // Ném lỗi lên cho các hàm gọi hàm này xử lý
    }
};
