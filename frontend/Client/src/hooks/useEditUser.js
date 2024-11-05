import { useState } from 'react';
import axios from 'axios';

export const useEditUser = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const editUserById = async (id, userData) => {
        const token = localStorage.getItem('token');
        setLoading(true);
        setError(null);

        try {
            const response = await axios.put(
                `/user/${id}`,
                userData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setData(response.data);
            localStorage.setItem("userInfo", JSON.stringify(response.data.data));
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message;
            setError(errorMessage);
            throw new Error('Lỗi khi sửa thông tin người dùng: ' + errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { editUserById, loading, error, data };
};
