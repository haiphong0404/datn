import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import React from 'react';

const ProductList = ({ product }) => {
    return (
        <div key={product.id} className="product-list-item">
            <div className="product-thumb">
                <Link to={`/product-details/${product.id}`}>
                    <img src={product.image} alt={product.name} />
                </Link>
                <div className="button-group">
                    <a
                        href="wishlist.html"
                        data-bs-toggle="tooltip"
                        title="Add to Wishlist"
                    >
                        <i className="fa fa-heart-o" />
                    </a>
                    <a
                        href="#"
                        data-bs-toggle="modal"
                        data-bs-target="#quick_view"
                    >
                        <span data-bs-toggle="tooltip" title="Quick View">
                            <i className="fa fa-eye" />
                        </span>
                    </a>
                </div>
                <div className="product-label">
                    <span>NEW</span>
                </div>
                <div className="discount-label">
                    <span>-10% Off</span>
                </div>
            </div>
            <div className="product-content-list">
                <h4 className="product-name">
                    <Link to={`/product-details/${product.id}`}>
                        {product.name}
                    </Link>
                </h4>
                <div className="ratings">
                    <span><i className="fa fa-star"></i></span>
                    <span><i className="fa fa-star"></i></span>
                    <span><i className="fa fa-star"></i></span>
                    <span><i className="fa fa-star"></i></span>
                    <span><i className="fa fa-star"></i></span>
                </div>
                <div className="price-box">
                    <span className="price-old">
                        <del>$90.00</del>
                    </span>
                    <span className="price-regular">$90.00</span>
                </div>
                <p>
                    {product.description}
                </p>
                <Link to="/cart" className="btn btn-large hover-color">
                    Add To Cart
                </Link>
            </div>
        </div>
    );
};

export default ProductList;
