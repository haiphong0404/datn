import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLoginForm } from '../hooks/useLoginForm';
import usePostOrder from '../hooks/usePostOrder';
import useApplyVoucher from '../hooks/useApplyVoucher';
import axios from 'axios';

const Checkout = () => {
  const { userInfo } = useLoginForm();
  const { postOrder } = usePostOrder();
  const { applyVoucher, loading } = useApplyVoucher(); // Use hook to get applyVoucher, loading, error, and voucherData
  const [userDetails, setUserDetails] = useState({
    email: '',
    username: '',
    address: '',
    phone: '',
    info: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [voucherError, setVoucherError] = useState(""); // Để lưu thông báo lỗi
  const [voucherCode, setVoucherCode] = useState(""); // Mã giảm giá nhập vào
  const [selectedProducts, setSelectedProducts] = useState([]); // Sản phẩm đã chọn
  const [totalAmount, setTotalAmount] = useState(0); // Tổng số tiền cần thanh toán
  const [shippingFee] = useState(40000); // Phí vận chuyển mặc định
  const [shippingExpress] = useState(60000); // Phí vận chuyển hỏa tốc
  const [selectedShippingFee, setSelectedShippingFee] = useState(0); // Phí vận chuyển được chọn
  const [isShippingSelected, setIsShippingSelected] = useState(false); //
  const [voucherDiscount, setVoucherDiscount] = useState(0); // Giá trị giảm giá của voucher
  const [voucherType, setVoucherType] = useState(""); // Loại voucher
  const [isVoucherApplied, setIsVoucherApplied] = useState(false); // Trạng thái áp dụng voucher
  const [appliedVoucherId, setAppliedVoucherId] = useState(null);

 
  // Handle applying voucher
  const handleApplyVoucher = async () => {
    if (!voucherCode.trim()) {
      toast.error("Vui lòng nhập mã giảm giá!");
      return;
    }

    try {
      const appliedVoucher = await applyVoucher(voucherCode);

      if (appliedVoucher) {
        const {
          id, // Lấy id của voucher
          discount_value,
          discount_percentage,
          min_order_value,
          max_discount_value,
        } = appliedVoucher.voucher;

       

        // Lưu id vào state
        setAppliedVoucherId(id);

        // Kiểm tra xem đơn hàng có đủ điều kiện min_order_value không
        const subtotal = selectedProducts.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
       
        if (subtotal < min_order_value) {
          toast.error(
            `Đơn hàng của bạn chưa đủ giá trị tối thiểu (${min_order_value.toLocaleString()} VND) để áp dụng mã giảm giá.`
          );
          return;
        }

        // Kiểm tra discount_percentage trước, nếu có thì áp dụng
        if (discount_percentage !== null) {
          let discountAmount = (subtotal * discount_percentage) / 100;

          // Kiểm tra nếu discountAmount vượt quá max_discount_value
          if (max_discount_value !== null && discountAmount > max_discount_value) {
            discountAmount = max_discount_value; // Nếu vượt quá max_discount_value thì gán lại giá trị tối đa
          }

          setVoucherDiscount(discountAmount); // Cập nhật giá trị discount
          setVoucherType("percentage");
        }
        // Nếu không có discount_percentage, kiểm tra discount_value
        else if (discount_value !== null) {
          setVoucherDiscount(parseFloat(discount_value)); // Chuyển discount_value sang số
          setVoucherType("fixed");
        }

        setIsVoucherApplied(true);
        toast.success("Mã giảm giá đã được áp dụng!");
      } else {
        toast.error("Mã giảm giá không hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi khi áp dụng voucher:", error); // Log lỗi chi tiết
      toast.error("Lỗi khi áp dụng mã giảm giá.");
    }
  };

  // Get token from localStorage or any state where it's saved
  const token = localStorage.getItem('token'); // or use some global state management

  const deleteProductFromCart = async (productId) => {
    try {
      const response = await axios.delete(`/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Xóa sản phẩm khỏi giỏ hàng thất bại:', error);
      throw error;
    }
  };

  // Lấy dữ liệu người dùng và giỏ hàng khi component được mount
  useEffect(() => {
    if (userInfo) {
      setUserDetails({
        email: userInfo.email || '',
        username: userInfo.username || '',
        address: userInfo.address || '',
        phone: userInfo.phone || '',
        info: ''
      });
    }

    // Lấy sản phẩm đã chọn từ localStorage
    const storedCart = JSON.parse(localStorage.getItem('selectedProducts') || '[]');
    setSelectedProducts(storedCart);
    setTotalAmount(calculateTotalAmount(storedCart));
  }, [userInfo]);

  const handleShippingSelection = (event) => {
    const { username, address, phone, email } = userDetails;

    // Kiểm tra xem thông tin người dùng đã đầy đủ chưa
    if (!username || !email || !address || !phone) {
      toast.error("Vui lòng điền đầy đủ thông tin trước khi chọn vận chuyển!");
      return;
    }

    // Lấy phương thức vận chuyển được chọn từ radio button
    const selectedMethod = event.target.id;

    // Cập nhật phí vận chuyển tương ứng
    if (selectedMethod === "cashon") {
      setSelectedShippingFee(shippingFee);  // Phí vận chuyển tiêu chuẩn
    } else if (selectedMethod === "shippingexpress") {
      setSelectedShippingFee(shippingExpress);  // Phí vận chuyển hỏa tốc
    }

    // Đánh dấu trạng thái đã chọn phương thức vận chuyển
    setIsShippingSelected(true);

    // Cập nhật lại tổng tiền khi phương thức vận chuyển thay đổi
    const newTotal = calculateTotalAmount(selectedProducts);  // Tính lại tổng số tiền
    setTotalAmount(newTotal); // Cập nhật lại giá trị tổng tiền

    // Thông báo cho người dùng rằng phương thức vận chuyển đã được thêm
    toast.success("Vận chuyển đã được thêm!");
  };

  // Hàm tính toán tổng số tiền của giỏ hàng
  const calculateTotalAmount = (items) => {
    // Tính toán tổng tiền từ các sản phẩm trong giỏ hàng
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    let totalWithDiscount = subtotal;

    // Áp dụng giảm giá nếu có
    if (isVoucherApplied) {
      if (voucherDiscount) {
        const discountAmount = parseFloat(voucherDiscount);
        if (!isNaN(discountAmount)) {
          totalWithDiscount = Math.max(0, subtotal - discountAmount);  // Tránh giá trị âm
        }
      }
    }

    // Tính tổng tiền với phí vận chuyển
    const totalWithShipping = isShippingSelected
      ? totalWithDiscount + selectedShippingFee  // Cộng thêm phí vận chuyển đã chọn
      : totalWithDiscount;

    return Math.max(0, totalWithShipping);  // Trả về tổng tiền không âm
  };

  // Cập nhật totalAmount mỗi khi selectedShippingFee hoặc các yếu tố khác thay đổi
  useEffect(() => {
    const newTotal = calculateTotalAmount(selectedProducts);
    setTotalAmount(newTotal);
  }, [
    selectedShippingFee,
    selectedProducts,
    voucherDiscount,
    voucherType,
    isShippingSelected,
    isVoucherApplied
  ]);




  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [id]: value,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const validateForm = () => {
    const { username, address, phone } = userDetails;
    if (!username || !address || !phone) {
      toast.error("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return false;
    }
    return true;
  };

  const handleSubmitOrder = async () => {
    // Check if shipping is selected
    if (selectedProducts.length === 0) {
      toast.error("Vui lòng chọn sản phẩm trước khi đặt hàng!");  // Show error if no products are selected
      return;
    }

    // Check if shipping is selected
    if (!isShippingSelected) {
      toast.error("Vui lòng chọn vận chuyển trước khi đặt hàng!");  // Show error if shipping is not selected
      return;
    }

    // Validate the form data (if necessary)
    if (!validateForm()) return;

    const orderDate = new Date().toISOString();
    const orderData = {
      order_date: orderDate,
      status: "pending",
      total_amount: totalAmount,
      shipping_fee: selectedShippingFee,  
      voucher_discount: voucherDiscount,  
      name: userDetails.username,
      email: userDetails.email,
      phone: userDetails.phone,
      address: userDetails.address,
      infor: userDetails.info,
      payment_method: paymentMethod,
      user_id: userInfo?.id,
      products: selectedProducts.map((item) => ({
        product_variant_id: item.id_productVariant,
        product_id: item.productId, 
        image: item.image,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      })),
      ...(appliedVoucherId && { id: appliedVoucherId }), // Chỉ thêm voucher_id nếu có
    };

    console.log(orderData);

    if (userInfo?.id) {
      try {
        // Send the order data
        await postOrder(userInfo.id, orderData);
        toast.success("Đặt hàng thành công!");

        // Remove selected products from the cart in the database
        for (const item of selectedProducts) {
          await deleteProductFromCart(item.id_productVariant);
        }

        // Remove cart from localStorage
        localStorage.removeItem('selectedProducts');
        localStorage.removeItem('cart');
        setSelectedProducts([]);
        setTotalAmount(0);

        // Reset shipping status after order
        setIsShippingSelected(false);  // This resets the shipping status to false
        setIsVoucherApplied(false);
      } catch (error) {
        toast.error(`Đặt hàng thất bại: sản phẩm trong kho hiện không đủ`);
      }
    } else {
      toast.error("Xin vui lòng đăng nhập!");
    }
  };




  return (
    <div>
      <main>
        {/* Vùng breadcrumb bắt đầu */}
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
                    <h3 className="breadcrumb-title">CỬA HÀNG</h3>
                    <ul className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item">
                        <a href="index.html">
                          <i className="fa fa-home" />
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="shop.html">Cửa hàng</a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Thanh toán
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Vùng breadcrumb kết thúc */}

        {/* Vùng wrapper thanh toán bắt đầu */}
        <div className="checkout-page-wrapper section-padding">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* Thêm nội dung vào đây nếu cần */}
              </div>
            </div>
            <div className="row">
              {/* Chi tiết thanh toán */}
              <div className="col-lg-6">
                <div className="checkout-billing-details-wrap">
                  <h5 className="checkout-title">Chi tiết thanh toán</h5>
                  <div className="billing-form-wrap">
                    <form action="#">
                      <div className="single-input-item">
                        <label htmlFor="com-name">Họ và tên</label>
                        <input
                          type="text"
                          id="com-name"
                          placeholder="Họ và tên"
                          value={userDetails.username}
                          onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}

                        />
                      </div>
                      <div className="single-input-item">
                        <label htmlFor="email" className="required">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="Email"
                          value={userDetails.email}
                          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                        />
                      </div>
                      <div className="single-input-item">
                        <label htmlFor="town" className="required">Địa chỉ</label>
                        <input
                          type="text"
                          id="address"
                          placeholder="Địa chỉ"
                          value={userDetails.address || ""}
                          onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
                        />
                      </div>

                      <div className="single-input-item">
                        <label htmlFor="phone">Số điện thoại</label>
                        <input
                          type="text"
                          id="phone"
                          placeholder="Số điện thoại"
                          value={userDetails.phone}
                          onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
                        />
                      </div>

                      <div className="single-input-item">
                        <label htmlFor="info">Thông tin thêm</label>
                        <textarea
                          name="info"
                          id="info"
                          cols={30}
                          rows={3}
                          placeholder="Thông tin để shipper lưu ý"
                          value={userDetails.info || ""}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>



                      </div>



                    </form>
                  </div>
                </div>
              </div>

              {/* Chi tiết tóm tắt đơn hàng */}
              <div className="col-lg-6">
                <div className="order-summary-details">
                  <h5 className="checkout-title">Tóm tắt đơn hàng của bạn</h5>
                  <div className="order-summary-content">
                    <div className="order-summary-table table-responsive text-center">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th><b>Sản phẩm</b></th>
                            <th><b>Màu sắc</b></th>
                            <th><b>Kích cỡ</b></th>
                            <th><b>Tạm tính</b></th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedProducts.map((product, index) => (
                            <tr key={index}>
                              <td>
                                <a href="product-details.html">
                                  {product.name} <strong> × {product.quantity}</strong>
                                </a>
                              </td>
                              <td>{product.color}</td>
                              <td>{product.size}</td>
                              <td>{(product.price * product.quantity).toLocaleString()} VND</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          {isVoucherApplied && (
                            <tr>
                              <th colSpan={3}>Mã Giảm giá</th>
                              <td>-{voucherDiscount.toLocaleString()} VND</td>
                            </tr>
                          )}
                          <tr>
                            <th colSpan={3}>Phí vận chuyển</th>
                            <td>{isShippingSelected ? selectedShippingFee.toLocaleString() : "0"} VND</td>

                          </tr>
                          <tr>
                            <th className="text-center" colSpan={3}>Tổng cộng</th>
                            <td>{totalAmount.toLocaleString()} VND</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  </div>
                  {/* Hiển thị thông báo nếu chưa nhập đủ thông tin */}
                  {/* Hiển thị phương thức vận chuyển khi đủ thông tin */}
                  {userDetails.username && userDetails.address && userDetails.phone && userDetails.email && selectedProducts.length > 0 && (
       
       <div className="order-payment-method">
        <h5 className="checkout-title">Phương thức vận chuyển</h5>
                      <div className="single-payment-method show">
                        <div className="payment-method-name">
                          <div className="custom-control custom-radio">
                            <div>
                              <input
                                type="radio"
                                id="cashon"
                                name="shipping"
                                className="custom-control-input"
                                onChange={handleShippingSelection}
                              />
                              <label className="custom-control-label" htmlFor="cashon">
                                Vận chuyển nhanh ( 40.000 VND)
                              </label>
                            </div>
                            </div>
                          </div>

                        </div>
                            <div className="single-payment-method show">
                        <div className="payment-method-name">
                          <div className="custom-control custom-radio">
                            <div>
                              <input
                                type="radio"
                                id="shippingexpress" 
                                name="shipping"
                                className="custom-control-input"
                                onChange={handleShippingSelection}
                              />
                              <label className="custom-control-label" htmlFor="shippingexpress">
                                Vận chuyển hỏa tốc ( 60.000 VND)
                              </label>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  )}


                  <div>
                    {/* Thêm input nhập mã giảm giá */}
                    <div className="order-payment-method">
                    <h5 className="checkout-title" >Mã giảm giá</h5>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nhập mã giảm giá"
                          value={voucherCode} // Liên kết với giá trị voucherCode
                          onChange={(e) => setVoucherCode(e.target.value)} // Cập nhật giá trị voucherCode
                        />
                        <button
                          className="btn btn-sqr3"
                          type="button"
                          onClick={handleApplyVoucher} // Gọi hàm applyVoucher khi nhấn nút
                          disabled={loading} // Vô hiệu hóa nút khi đang loading
                        >
                          {loading ? 'Đang kiểm tra...' : 'Áp dụng'}
                        </button>
                      </div>
                      {/* Hiển thị lỗi nếu có */}
                      {voucherError && <p className="text-danger">{voucherError}</p>}
                    </div>
                    {/* Kết thúc input mã giảm giá */}
                  </div>
                  {/* Kết thúc input mã giảm giá */}

                  <div className="order-payment-method">
                  <h5 className="checkout-title" >Phương thức thanh toán</h5>
                    <div className="single-payment-method show">
                      <div className="payment-method-name">
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="cashon"
                            name="paymentmethod"
                            value="cash"
                            className="custom-control-input"
                            checked={paymentMethod === 'cash'}
                            onChange={handlePaymentMethodChange}
                          />
                          <label className="custom-control-label" htmlFor="cashon">
                            Thanh toán khi nhận hàng
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="single-payment-method">
                      <div className="payment-method-name">
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="directbank"
                            name="paymentmethod"
                            value="bank"
                            className="custom-control-input"
                            checked={paymentMethod === 'bank'}
                            onChange={handlePaymentMethodChange}
                          />
                          <label className="custom-control-label" htmlFor="directbank">
                            Thanh toán online qua Ví điện tử MoMo
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="single-payment-method">
                      <div className="payment-method-name">
                        <div className="custom-control custom-radio">
                          <input
                            type="radio"
                            id="paypalpayment"
                            name="paymentmethod"
                            value="paypal"
                            className="custom-control-input"
                            checked={paymentMethod === 'paypal'}
                            onChange={handlePaymentMethodChange}
                          />
                          <label className="custom-control-label" htmlFor="paypalpayment">
                            Thanh toán qua PayPal
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="checkout-btn">
                    <button
                      className="btn btn-sqr"

                      onClick={handleSubmitOrder}
                    >
                      {loading ? 'Đang xử lý...' : 'Đặt Hàng'}
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
