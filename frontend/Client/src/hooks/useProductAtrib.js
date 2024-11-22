import { useState, useEffect } from 'react';
import { fetchColor, fetchSizes } from '../api/product.js'; // Điều chỉnh đường dẫn nếu cần

const useProductAttributes = () => {
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttributes = async () => {
            try {
                // Gọi API để lấy danh sách màu
                const colorData = await fetchColor();
                setColors(colorData);

                // Gọi API để lấy danh sách kích thước
                const sizeData = await fetchSizes();
                setSizes(sizeData);
            } catch (err) {
                setError('Lỗi khi tải dữ liệu thuộc tính sản phẩm.');
                console.error(err);
            }
        };

        fetchAttributes();
    }, []);

    return { colors, sizes, error };
};

export default useProductAttributes;
