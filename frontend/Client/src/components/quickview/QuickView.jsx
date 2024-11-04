// QuickViewModal.js
import React from 'react';
import { Modal } from 'react-bootstrap';

const QuickViewModal = ({ show, onHide, product }) => {
  if (!product) return null; // Kiểm tra nếu không có sản phẩm được truyền vào

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="product-quick-view">
          <img src={product.image || '/path/to/placeholder.jpg'} alt={product.name} />
          <div className="product-details">
            <h4>{product.name}</h4>
            <p>{product.description}</p>
            <div className="price-box">
              <span className="price-regular">
                {product.price ? `${new Intl.NumberFormat('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(product.price)} Vnd` : "Liên hệ"}
              </span>
            </div>
            {/* Các chi tiết khác nếu cần */}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default QuickViewModal;
