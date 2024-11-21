import axios from 'axios';



// Lấy danh sách bình luận
export const fetchComments = async () => {
    try {
        const response = await axios.get(`/comments`);
        return response.data;
    } catch (error) {
        console.error('Lỗi khi lấy danh sách comments:', error);
        throw error;
    }
};
