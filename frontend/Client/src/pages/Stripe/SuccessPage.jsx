import React from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  const [order, setOrder] = React.useState(null);

  React.useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/stripe/verify-session/${sessionId}`);
      const data = await response.json();
      if (data.status === "success") {
        setOrder(data.order);
      }
    };

    fetchOrder();
  }, [sessionId]);

  return (
    <div class="payment-success-container">
      <h2 class="payment-success-title">Thanh toán thành công!</h2>
      {order && (
        <div class="order-info">
          <h3 class="order-info-title">Thông tin đơn hàng</h3>
          <p class="order-id">ID đơn hàng: {order.id}</p>
          <p class="order-status">Trạng thái: {order.status === 'pending' ? (
            <p>Đơn hàng đang xử lý</p>
          ) : (
            <p>Trạng thái đơn hàng: {order.status}</p>
          )}</p>
          <p class="payment-method">Phương thức thanh toán: {order.payment_method}</p>
          <p class="payment-status">Trạng thái thanh toán: {order.payment_status === 'unpaid'
            ? 'Thanh Toán Khi Nhận Hàng'
            : order.payment_status === 'paid'
              ? 'Đã Thanh Toán'
              : 'Không Xác Định'}</p>

        </div>
      )}
    </div>

  );
};

export default PaymentSuccess;
