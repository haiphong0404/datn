import { useState, useEffect } from 'react';
import { fetchProductById } from '../api/product.js'; // Đường dẫn tới file API

const useProductById = (productId) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      getProduct();
    }
  }, [productId]);

  return { product, loading, error };
};

export default useProductById;
