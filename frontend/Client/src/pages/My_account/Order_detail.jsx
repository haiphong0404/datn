import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useOrderDetail from '../../hooks/useOderDetail';

const Order_detail = () => {
    const { orderId } = useParams(); // Lấy orderId từ URL
    const { orderDetail, error, loading } = useOrderDetail(orderId); 

    useEffect(() => {
        console.log("Order Detail:", orderDetail);
        console.log("Loading:", loading);
        console.log("Error:", error);
    }, [orderDetail, loading, error]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
          
                <div >
                    <div>
                        <div className="section-bg-color">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="cart-table table-responsive">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th className="pro-thumbnail">Thumbnail</th>
                                                    <th className="pro-title">Product</th>
                                                    <th className="pro-price">Price</th>
                                                    <th className="pro-quantity">Quantity</th>
                                                    <th className="pro-subtotal">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderDetail?.map((item) => (
                                                    <tr key={item.id}>
                                                        <td className="pro-thumbnail">
                                                            <a href="#">
                                                                <img
                                                                    className="img-fluid"
                                                                    src={item.image || '/assets/img/product/default.jpg'} // Sử dụng hình ảnh mặc định nếu không có
                                                                    alt={item.productName || 'Product Image'} // Cung cấp giá trị mặc định cho alt
                                                                />
                                                            </a>
                                                        </td>
                                                        <td className="pro-title">
                                                            <a href="#">{item.productName || 'Unknown Product'}</a> {/* Thay thế tên sản phẩm nếu không có */}
                                                        </td>
                                                        <td className="pro-price">
                                                            <span>${parseFloat(item.price).toFixed(2)}</span> {/* Chuyển đổi price sang số và định dạng */}
                                                        </td>
                                                        <td className="pro-quantity">
                                                            <div className="pro-qty">
                                                                <span>{item.quantity}</span>
                                                            </div>
                                                        </td>
                                                        <td className="pro-subtotal">
                                                            <span>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span> {/* Tính tổng cho mục */}
                                                        </td>
                                                    </tr>
                                                ))} 
                                            </tbody>
                                        </table>
                                    </div>
                                    <span>Reason: I want to enter/change the voucher code</span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-5 ms-auto">
                                    <div className="cart-calculator-wrapper">
                                        <div className="cart-calculate-items">
                                            <h6>Cart Totals</h6>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <tbody>
                                                        <tr>
                                                            <td>Sub Total</td>
                                                            <td>${orderDetail.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0).toFixed(2)}</td> {/* Tính tổng cho tất cả các mục */}
                                                        </tr>
                                                        <tr>
                                                            <td>Shipping</td>
                                                            <td>${orderDetail.shipping || 0}</td> {/* Đảm bảo rằng shipping có giá trị mặc định */}
                                                        </tr>
                                                        <tr className="total">
                                                            <td>Total</td>
                                                            <td className="total-amount">${orderDetail.total || 0}</td> {/* Đảm bảo rằng total có giá trị mặc định */}
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="cart-update-option d-block d-md-flex justify-content-between">
                                            <div className="pay-now">
                                                <a href="#" className="btn btn-sqr">
                                                    Acquisition/Pay Now
                                                </a>
                                            </div>
                                            <div className="cart-delete">
                                                <a href="#" className="btn btn-danger">
                                                    DELETE
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
        </div>
    );
};

export default Order_detail;
