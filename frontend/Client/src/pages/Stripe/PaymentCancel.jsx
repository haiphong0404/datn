import React, { useEffect } from 'react';

const CancelPayment = () => {
  // Hàm xóa đơn hàng khi người dùng quay lại trang hủy
  const cancelPaymentAndDeleteOrder = () => {
    const orderId = localStorage.getItem('order_id'); // Lấy order_id từ localStorage

    if (orderId) {
      // Gửi yêu cầu xóa đơn hàng từ frontend
      fetch(`http://127.0.0.1:8000/api/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          // Xử lý sau khi xóa đơn hàng thành công (ví dụ: chuyển hướng về trang khác)
          alert('Đơn hàng đã bị hủy và xóa.');
          window.location.href = '/';  // Chuyển hướng về trang chủ
        } else {
          alert('Lỗi khi xóa đơn hàng.');
        }
      })
      .catch(error => {
        console.error('Error canceling order:', error);
        alert('Có lỗi xảy ra khi hủy đơn hàng.');
      });
    }
  };

  // UseEffect để tự động gọi khi trang được tải lại
  useEffect(() => {
    cancelPaymentAndDeleteOrder();
  }, []);

  return (
    <div className="container text-center my-5 p-4 border rounded shadow-sm bg-light">
    <h1 className="text-danger mb-3">Thanh toán bị hủy</h1>
    <p className="text-muted mb-4">Đơn hàng của bạn đã bị hủy. Đang xóa đơn hàng...</p>
    <button 
      className="btn btn-primary" 
      onClick={() => window.location.href = '/'}
    >
      Trở về trang chủ
    </button>
  </div>
  );
};

export default CancelPayment;