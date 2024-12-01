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

            </div>
            <div className="product-content-list">
                <h4 className="product-name">
                    <Link to={`/product-details/${product.id}`}>
                        {product.name}
                    </Link>
                </h4>
                {/* <div className="ratings">
                    <span><i className="fa fa-star"></i></span>
                    <span><i className="fa fa-star"></i></span>
                    <span><i className="fa fa-star"></i></span>
                    <span><i className="fa fa-star"></i></span>
                    <span><i className="fa fa-star"></i></span>
                </div> */}
                <div className="price-box">

                    <span className="price-regular">
                        {parseFloat(product.price).toLocaleString()} VND
                    </span>

                </div>
                <p>
                    {product.description}
                </p>
                <Link to={`/product_details/${product.id}`} className="btn btn-large hover-color">
                    XEM CHI TIẾT
                </Link>
            </div>
        </div>
    );
};

export default ProductList;
