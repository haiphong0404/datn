// hooks/useComments.js
import { useEffect, useState, useCallback } from "react";
import { fetchComments } from "../api/commentsApi.js";

export const useComments = (productId) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Hàm refetch để gọi lại API và cập nhật danh sách bình luận
    const refetch = useCallback(async () => {
        if (!productId) return;
        setLoading(true);
        try {
            const data = await fetchComments(productId);
            setComments(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [productId]);

    // Hàm updateComments trực tiếp thay đổi state `comments` khi thêm, sửa hoặc xóa bình luận
    const updateComments = useCallback((updatedComment) => {
        setComments((prevComments) => {
            // Tìm chỉ mục của bình luận cần sửa (nếu có)
            const index = prevComments.findIndex((comment) => comment.id === updatedComment.id);
            if (index !== -1) {
                // Cập nhật bình luận nếu đã tồn tại
                const newComments = [...prevComments];
                newComments[index] = updatedComment;
                return newComments;
            }
            // Nếu không tìm thấy, thêm bình luận mới vào đầu danh sách
            return [updatedComment, ...prevComments];
        });
    }, []);
    
    


    useEffect(() => {
        refetch(); // Gọi refetch khi productId thay đổi
    }, [productId, refetch]);

    return { comments, isLoading, error, refetch, updateComments, setComments };
};
