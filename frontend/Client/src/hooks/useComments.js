
import { useEffect, useState, useCallback } from "react";
import { fetchComments } from "../api/commentsApi.js";

export const useComments = (productId) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    const updateComments = useCallback((updatedComment, deleteCommentId) => {
        setComments((prevComments) => {
            if (deleteCommentId) {
                return prevComments.filter((comment) => comment.id !== deleteCommentId);
            } else {
                const index = prevComments.findIndex((comment) => comment.id === updatedComment.id);
                if (index !== -1) {
                    const newComments = [...prevComments];
                    newComments[index] = updatedComment;
                    return newComments;
                }
                return [updatedComment, ...prevComments];
            }
        });
    }, []);





    useEffect(() => {
        refetch();
    }, [productId, refetch]);

    return { comments, isLoading, error, refetch, updateComments, setComments };
};
