import { useState, useEffect } from 'react';
import { fetchBrands } from '../api/brand.js';

const useBrands = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getBrands = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchBrands();
                setBrands(data);
            } catch (err) {
                setError(err.response ? err.response.data : err.message);
            } finally {
                setLoading(false);
            }
        };

        getBrands();
    }, []);

    return { brands, loading, error };
};

export default useBrands;
