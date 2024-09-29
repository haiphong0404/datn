import React from 'react'

const Order_detail_cancel = () => {
    return (
        <div>
            <main>
                {/* breadcrumb area start */}
                <div
                    className="breadcrumb-area breadcrumb-img bg-img"
                    style={{
                        backgroundImage: "url(/assets/img/banner/shop.jpg)",
                    }}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="breadcrumb-wrap">
                                    <nav aria-label="breadcrumb">
                                        <h3 className="breadcrumb-title">SHOP</h3>
                                        <ul className="breadcrumb justify-content-center">
                                            <li className="breadcrumb-item">
                                                <a href="index.html">
                                                    <i className="fa fa-home" />
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item">
                                                <a href="shop.html">Shop</a>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                                Cart
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* breadcrumb area end */}
                {/* cart main wrapper start */}
                <div className="cart-main-wrapper section-padding">
                    <div className="container">
                        <div className="section-bg-color">
                            <div className="row">
                                <div className="col-lg-12">
                                    {/* Cart Table Area */}
                                    <div className="cart-table table-responsive">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th className="pro-thumbnail">Thumbnail</th>
                                                    <th className="pro-title">Product</th>
                                                    <th className="pro-price">Price</th>
                                                    <th className="pro-quantity">Quantity</th>
                                                    <th className="pro-subtotal">Total</th>
                                                    <th className="pro-remove">Remove</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="pro-thumbnail">
                                                        <a href="#">
                                                            <img
                                                                className="img-fluid"
                                                                src="assets/img/product/product-1.jpg"
                                                                alt="Product"
                                                            />
                                                        </a>
                                                    </td>
                                                    <td className="pro-title">
                                                        <a href="#">PRIMITIVE MENS SHOES</a>
                                                    </td>
                                                    <td className="pro-price">
                                                        <span>$295.00</span>
                                                    </td>
                                                    <td className="pro-quantity">
                                                        <div className="pro-qty">
                                                            <input type="text" defaultValue={1} />
                                                        </div>
                                                    </td>
                                                    <td className="pro-subtotal">
                                                        <span>$295.00</span>
                                                    </td>
                                                    <td className="pro-remove">
                                                        <a href="#">
                                                            <i className="fa fa-trash-o" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="pro-thumbnail">
                                                        <a href="#">
                                                            <img
                                                                className="img-fluid"
                                                                src="assets/img/product/product-2.jpg"
                                                                alt="Product"
                                                            />
                                                        </a>
                                                    </td>
                                                    <td className="pro-title">
                                                        <a href="#">LEATHER MENS SLIPPERS</a>
                                                    </td>
                                                    <td className="pro-price">
                                                        <span>$275.00</span>
                                                    </td>
                                                    <td className="pro-quantity">
                                                        <div className="pro-qty">
                                                            <input type="text" defaultValue={2} />
                                                        </div>
                                                    </td>
                                                    <td className="pro-subtotal">
                                                        <span>$550.00</span>
                                                    </td>
                                                    <td className="pro-remove">
                                                        <a href="#">
                                                            <i className="fa fa-trash-o" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="pro-thumbnail">
                                                        <a href="#">
                                                            <img
                                                                className="img-fluid"
                                                                src="assets/img/product/product-3.jpg"
                                                                alt="Product"
                                                            />
                                                        </a>
                                                    </td>
                                                    <td className="pro-title">
                                                        <a href="#">REXPO WOMENS SHOES</a>
                                                    </td>
                                                    <td className="pro-price">
                                                        <span>$295.00</span>
                                                    </td>
                                                    <td className="pro-quantity">
                                                        <div className="pro-qty">
                                                            <input type="text" defaultValue={1} />
                                                        </div>
                                                    </td>
                                                    <td className="pro-subtotal">
                                                        <span>$295.00</span>
                                                    </td>
                                                    <td className="pro-remove">
                                                        <a href="#">
                                                            <i className="fa fa-trash-o" />
                                                        </a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="pro-thumbnail">
                                                        <a href="#">
                                                            <img
                                                                className="img-fluid"
                                                                src="assets/img/product/product-4.jpg"
                                                                alt="Product"
                                                            />
                                                        </a>
                                                    </td>
                                                    <td className="pro-title">
                                                        <a href="#">QUICKIIN MENS SHOES</a>
                                                    </td>
                                                    <td className="pro-price">
                                                        <span>$110.00</span>
                                                    </td>
                                                    <td className="pro-quantity">
                                                        <div className="pro-qty">
                                                            <input type="text" defaultValue={3} />
                                                        </div>
                                                    </td>
                                                    <td className="pro-subtotal">
                                                        <span>$110.00</span>
                                                    </td>
                                                    <td className="pro-remove">
                                                        <a href="#">
                                                            <i className="fa fa-trash-o" />
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <span>Reason: I want to enter/change the voucher code</span>
                                    {/* Cart Update Option */}
                                    {/* <div className="cart-update-option d-block d-md-flex justify-content-between">
                                        <div className="apply-coupon-wrapper">
                                            <form action="#" method="post" className=" d-block d-md-flex">
                                                <input
                                                    type="text"
                                                    placeholder="Enter Your Coupon Code"
                                                    required=""
                                                />
                                                <button className="btn btn-sqr">Apply Coupon</button>
                                            </form>
                                        </div>
                                        <div className="cart-update">
                                            <a href="#" className="btn btn-sqr">
                                                Update Cart
                                            </a>
                                        </div>
                                    </div> */}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-5 ms-auto">
                                    {/* Cart Calculation Area */}
                                    <div className="cart-calculator-wrapper">
                                        <div className="cart-calculate-items">
                                            <h6>Cart Totals</h6>
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <tbody>
                                                        <tr>
                                                            <td>Sub Total</td>
                                                            <td>$230</td>
                                                        </tr>
                                                        <tr>
                                                            <td>Shipping</td>
                                                            <td>$70</td>
                                                        </tr>
                                                        <tr className="total">
                                                            <td>Total</td>
                                                            <td className="total-amount">$300</td>
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
                {/* cart main wrapper end */}
            </main>

        </div>
    )
}

export default Order_detail_cancel