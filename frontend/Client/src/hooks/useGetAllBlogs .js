import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetAllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/Apiarticles');
                console.log('API trả về:', response.data); // Log phản hồi từ API
                setBlogs(response.data);
            } catch (error) {
                console.error('Lỗi khi gọi API:', error.response ? error.response.data : error.message);
                setError('Lỗi không thể lấy dữ liệu blog.');
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []); // Chỉ chạy một lần khi component được mount

    return { blogs, loading, error };
};

export default useGetAllBlogs;
