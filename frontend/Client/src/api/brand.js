import axios from 'axios';

// Lấy danh sách thương hiệu
export const fetchBrands = async () => {
    try {
        const response = await axios.get('/Apibrands', {
        });
        console.log('API trả về:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error.response ? error.response.data : error.message);

        setError('Lỗi không thể lấy dữ liệu thương hiệu.');
        throw error;
    }
};

// Lấy chi tiết thương hiệu
export const fetchBrandById = async (id) => {
    try {
        const response = await axios.get(`/Apibrands/${id}`);
        console.log('Chi tiết thương hiệu:', response.data);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi gọi API:', error.response ? error.response.data : error.message);
        throw new Error('Không thể lấy chi tiết thương hiệu.');
    }
};
