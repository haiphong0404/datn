import { useState, useEffect } from 'react';
import { fetchProductVariants } from '../api/product.js';

const useProductVariants = (productId) => {
    const [variants, setVariants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!productId) return; // Không làm gì nếu không có productId

        const fetchVariants = async () => {
            setIsLoading(true);
            setIsError(false);

            try {
                const data = await fetchProductVariants(productId);
                setVariants(data); // Lưu dữ liệu vào state
            } catch (error) {
                console.error("Error fetching product variants:", error);
                setIsError(true); // Đặt trạng thái lỗi
            } finally {
                setIsLoading(false); // Đặt trạng thái loading là false
            }
        };

        fetchVariants();
    }, [productId]); // Chạy lại khi productId thay đổi

    return { variants, isLoading, isError }; // Trả về dữ liệu, trạng thái loading và lỗi
};

export default useProductVariants;
