import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../../hooks/product';

const ProductItem = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch product data
        const getProducts = async () => {
            try {
                const data = await fetchProducts();
                console.log('Dữ liệu xuất ra:', data); // Log the fetched products
                setProducts(data); // Store products in state
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error); // Log any errors
                setError(error);
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading products: {error.message}</p>;
    }

    if (products.length === 0) {
        return <p>No products available.</p>; // Handle case where no products exist
    }

    return (
        <div>
            {products.map(product => (
                <div>
                    <div className="product-item" key={product.id}>
                        <div className="product-thumb">
                            <Link to={`/product-details/${product.id}`}>
                                <img src={product.image} alt={product.name} />
                            </Link>
                            <div className="button-group">
                                <Link to="/wishlist" data-bs-toggle="tooltip" title="Add to Wishlist">
                                    <i className="fa fa-heart-o" />
                                </Link>
                                <Link to="#" data-bs-toggle="modal" data-bs-target="#quick_view">
                                    <span data-bs-toggle="tooltip" title="Quick View">
                                        <i className="fa fa-eye" />
                                    </span>
                                </Link>
                            </div>
                            <div className="product-label">
                                <span>new</span>
                            </div>
                            <div className="discount-label">
                                <span>-10% Off</span>
                            </div>
                        </div>
                        <div className="product-content">
                            <div className="product-caption">
                                <h6 className="product-name">
                                    <Link to={`/product-details/${product.id}`}>
                                        {product.name}
                                    </Link>
                                </h6>
                                <div className="price-box">
                                    <span className="price-old">
                                        <del>${90.00}</del> {/* Use actual old price if available */}
                                    </span>
                                    <span className="price-regular">${70.00}</span> {/* Use actual price from API */}
                                </div>
                                <Link className="add-to-cart" to="/cart">
                                    <i className="fa fa-shopping-cart" />
                                </Link>
                            </div>
                            <div className="ratings">
                                <span><i class="fa fa-star"></i></span>
                                <span><i class="fa fa-star"></i></span>
                                <span><i class="fa fa-star"></i></span>
                                <span><i class="fa fa-star"></i></span>
                                <span><i class="fa fa-star"></i></span>
                            </div>
                        </div>
                    </div>


                </div>
            ))}

        </div>
    );
};

export default ProductItem;
