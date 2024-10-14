import React from 'react';

const Bill = () => {
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
                                                <a href="shop.html">Checkout</a>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                                Bill
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* breadcrumb area end */}
                {/* checkout main wrapper start */}
                <div className="checkout-page-wrapper section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                {/* Checkout Login Coupon Accordion Start */}
                                <div className="checkoutaccordion" id="checkOutAccordion">
                                    <div className="card">
                                        <h6>
                                            CẢM ƠN QUÝ KHÁCH ĐÃ MUA HÀNG
                                        </h6>
                                        <div
                                            id="logInaccordion"
                                            className="collapse"
                                            data-bs-parent="#checkOutAccordion"
                                        >
                                        </div>
                                    </div>
                                </div>
                                {/* Checkout Login Coupon Accordion End */}
                            </div>
                        </div>
                        <div className="row">
                            {/* Checkout Billing Details */}
                            <div class="col-lg-6">
                                <div class="checkout-billing-details-wrap">
                                    <h5 class="checkout-title">Thông tin hóa đơn</h5>
                                    <div class="billing-form-wrap">
                                        <form action="#">
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <div class="single-input-item">
                                                        <label for="f_name" class="required">First Name</label>
                                                        <input type="text" id="f_name" placeholder="First Name" value="John" required disabled />
                                                    </div>
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="single-input-item">
                                                        <label for="l_name" class="required">Last Name</label>
                                                        <input type="text" id="l_name" placeholder="Last Name" value="Doe" required disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="single-input-item">
                                                <label for="email" class="required">Email Address</label>
                                                <input type="email" id="email" placeholder="Email Address" value="john.doe@example.com" required disabled />
                                            </div>
                                            <div class="single-input-item">
                                                <label for="com-name">Company Name</label>
                                                <input type="text" id="com-name" placeholder="Company Name" value="Doe Enterprises" disabled />
                                            </div>
                                            <div class="single-input-item">
                                                <label for="country" class="required">Country</label>
                                                <select name="country" id="country" disabled>
                                                    <option value="Hanoi">Hanoi</option>
                                                </select>
                                            </div>
                                            <div class="single-input-item">
                                                <label for="street-address" class="required mt-20">Street address</label>
                                                <input type="text" id="street-address" placeholder="Street address Line 1" value="123 Main St" required disabled />
                                            </div>
                                            <div class="single-input-item">
                                                <input type="text" placeholder="Street address Line 2 (Optional)" value="Apt 4B" disabled />
                                            </div>
                                            <div class="single-input-item">
                                                <label for="town" class="required">Town / City</label>
                                                <input type="text" id="town" placeholder="Town / City" value="Mumbai" required disabled />
                                            </div>
                                            <div class="single-input-item">
                                                <label for="state">State / Division</label>
                                                <input type="text" id="state" placeholder="State / Division" value="Maharashtra" disabled />
                                            </div>
                                            <div class="single-input-item">
                                                <label for="postcode" class="required">Postcode / ZIP</label>
                                                <input type="text" id="postcode" placeholder="Postcode / ZIP" value="400001" required disabled />
                                            </div>
                                            <div class="single-input-item">
                                                <label for="phone">Phone</label>
                                                <input type="text" id="phone" placeholder="Phone" value="1234567890" disabled />
                                            </div>

                                            <div class="single-input-item">
                                                <label for="ordernote">Order Note</label>
                                                <textarea name="ordernote" id="ordernote" cols="30" rows="3" placeholder="Notes about your order, e.g. special notes for delivery." disabled>Please deliver on weekends.</textarea>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>


                            {/* Order Summary Details */}
                            <div className="col-lg-6">
                                <div className="order-summary-details">
                                    <h5 className="checkout-title">Thông tin đơn hàng</h5>
                                    <div className="order-summary-content">
                                        {/* Order Summary Table */}
                                        <div className="order-summary-table table-responsive text-center">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <b>Products</b>
                                                        </th>
                                                        <th>
                                                            <b>Total</b>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <a href="product-details.html">
                                                                Suscipit Vestibulum <strong> × 1</strong>
                                                            </a>
                                                        </td>
                                                        <td>$165.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <a href="product-details.html">
                                                                Ami Vestibulum suscipit <strong> × 4</strong>
                                                            </a>
                                                        </td>
                                                        <td>$165.00</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <a href="product-details.html">
                                                                Vestibulum suscipit <strong> × 2</strong>
                                                            </a>
                                                        </td>
                                                        <td>$165.00</td>
                                                    </tr>
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <td>Sub Total</td>
                                                        <td>$400</td>
                                                    </tr>
                                                    <tr>
                                                        <td>Shipping</td>
                                                        <td className="d-flex justify-content-center">
                                                            <ul className="shipping-type">
                                                                <li>
                                                                    <div className="custom-control custom-radio">
                                                                        <input
                                                                            type="radio"
                                                                            id="flatrate"
                                                                            name="shipping"
                                                                            className="custom-control-input"
                                                                            defaultChecked=""
                                                                        />
                                                                        <label
                                                                            className="custom-control-label"
                                                                            htmlFor="flatrate"
                                                                        >
                                                                            Flat Rate: $70.00
                                                                        </label>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="custom-control custom-radio">
                                                                        <input
                                                                            type="radio"
                                                                            id="freeshipping"
                                                                            name="shipping"
                                                                            className="custom-control-input"
                                                                        />
                                                                        <label
                                                                            className="custom-control-label"
                                                                            htmlFor="freeshipping"
                                                                        >
                                                                            Free Shipping
                                                                        </label>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Total Amount</td>
                                                        <td>$470</td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                        {/* Order Payment Method */}
                                        <div className="order-payment-method">
                                            <div className="single-payment-method show">
                                                <div className="payment-method-name">
                                                    Phương thức thanh toán
                                                </div>

                                            </div>
                                            <div className="single-payment-method">
                                                <div className="payment-method-name">
                                                    <div className="custom-control custom-radio">
                                                        <input
                                                            type="radio"
                                                            id="directbank"
                                                            name="paymentmethod"
                                                            defaultValue="bank"
                                                            className="custom-control-input"
                                                            checked
                                                        />
                                                        <label
                                                            className="custom-control-label"
                                                            htmlFor="directbank"
                                                        >
                                                            Thanh toán khi nhận hàng
                                                        </label>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* checkout main wrapper end */}
            </main>

        </div>

    );
};
export default Bill;