import axios from "axios";
import FormData from 'form-data';
// Lấy danh sách bình luận của sản phẩm
export const fetchComments = async (productId) => {
    try {
        const response = await axios.get(`/comments/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Không có bình luận: ", error);
        throw error;
    }
};


// Thêm bình luận
export const addComment = async (productId, formData) => {
    try {
        const response = await axios.post(`/comments/${productId}`, formData);
        return response;
    } catch (error) {
        console.error("Lỗi API thêm bình luận: ", error.response || error);
        throw error.response || error;
    }
};



// xóa bình luận
export const deleteComment = async (id) => {
    try {
        const response = await axios.delete(`/comments/${id}`);
        return response.data;
    } catch (error) {
        console.error("không xóa được bình luận ", error);
        throw error;
    }
}

// sửa bình luận
export const editComment = async (id, formData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`/comments/${id}`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        });
       
        return response;
    } catch (error) {
        console.error("Error while editing comment", error);
        throw error;
    }
}
