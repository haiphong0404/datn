import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import React from 'react';

const ProductItem = ({ product }) => { // Nhận product qua props
    return (
        <div key={product.id}> {/* Thêm thuộc tính key cho div chứa sản phẩm */}
            <div className="product-item">
                <div className="product-thumb">
                    <Link to={`/product_details/${product.id}`}>
                        <img src={product.image || '/path/to/placeholder.jpg'} alt={product.name.substring(0, 30)}
                            style={{
                                display: 'block',
                                margin: '0 auto',
                                width: '300px', // Đặt chiều rộng mong muốn
                                height: '200px', // Đặt chiều cao mong muốn
                                objectFit: 'cover', // Cắt ảnh để phù hợp với kích thước mà không bị méo
                              }} />
                    </Link>
                    <div className="button-group">

                        {/* <Link to="#" data-bs-toggle="modal" data-bs-target="#quick_view">
                            <span data-bs-toggle="tooltip" title="Quick View">
                                <i className="fa fa-eye" />
                            </span>
                        </Link> */}
                    </div>
                    {/* <div className="product-label">
                        <span>new</span>
                    </div> */}
                    {/* <div className="discount-label">
                        <span>-10% Off</span>
                    </div> */}
                </div>
                <div className="product-content" style={{height:'150px'}}>
                    <div className="product-caption">
                        <h6 className="product-name" style={{height:'40px'}}>
                            <Link to={`/product_details/${product.id}`}>
                                {product.name.substring(0, 20)}

                            </Link>
                        </h6>
                        <div className="price-box">

                            <span className="price-regular">
                                {parseFloat(product.price).toLocaleString()} VND
                            </span>
                            {/* Use actual price from API */}
                        </div>
                        <Link className="add-to-cart" to={`/product_details/${product.id}`}>
                            <i className="fa fa-shopping-cart" />
                        </Link>
                    </div>
                    {/* <div className="ratings">
                        <span><i className="fa fa-star"></i></span>
                        <span><i className="fa fa-star"></i></span>
                        <span><i className="fa fa-star"></i></span>
                        <span><i className="fa fa-star"></i></span>
                        <span><i className="fa fa-star"></i></span>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default ProductItem;