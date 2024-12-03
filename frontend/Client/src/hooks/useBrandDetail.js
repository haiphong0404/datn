import { useState, useEffect } from "react";
import axios from "axios";

const useBrandDetail = (id) => {
    const [brand, setBrand] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBrandDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`/Apibrands/${id}`);
                setBrand(response.data);
            } catch (err) {
                setError(err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBrandDetail();
        }
    }, [id]);

    return { brand, loading, error };
};

export default useBrandDetail;
