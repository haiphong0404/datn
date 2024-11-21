import { useEffect, useState } from 'react';
import { fetchComments } from '../api/commentsApi.js';

export const useComments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getComments = async () => {
            try {
                const data = await fetchComments();
                setComments(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getComments();
    }, []);

    return { comments, loading, error };
};