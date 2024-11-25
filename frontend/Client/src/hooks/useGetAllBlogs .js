import { useState, useEffect } from 'react';
import axios from 'axios';

const useGetAllArticles = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/Apiarticles');
                console.log('API trả về:', response.data); // Log phản hồi từ API
                setArticles(response.data);
            } catch (error) {
                console.error('Lỗi khi gọi API:', error.response ? error.response.data : error.message);
                setError('Lỗi không thể lấy dữ liệu bài viết.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []); // Chỉ chạy một lần khi component được mount

    return { articles, loading, error };
};

export default useGetAllArticles;
