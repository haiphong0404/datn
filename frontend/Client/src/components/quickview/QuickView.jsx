import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useCart } from '../../contexts/CartContext';
const QuickViewModal = ({ show, onClose, product }) => {
  if (!show) return null; // Nếu modal không được hiển thị thì không làm gì

  const dispatch = useDispatch();
  const { handleAddToCart, refetch } = useCart(); // Sử dụng từ CartContext
  // Các state cho màu sắc, kích thước, biến thể, số lượng
  const [variants, setVariants] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // Fetch dữ liệu về các biến thể của sản phẩm
  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await axios.get(`/products/${product.id}/variants`);
        setVariants(response.data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu biến thể:", error);
      }
    };
    fetchVariants();
  }, [product.id]);

  // Tìm kiếm variant khi màu và kích thước thay đổi
  useEffect(() => {
    const variant = variants.find(
      (variant) => variant.color === selectedColor && variant.size === selectedSize
    );
    setSelectedVariant(variant);
  }, [selectedColor, selectedSize, variants]);

  // Cập nhật giá và tính khả dụng khi selectedVariant thay đổi
  useEffect(() => {
    if (selectedVariant) {
      setSelectedQuantity(1); // Đặt lại số lượng về 1
      setAvailabilityMessage(selectedVariant.quantity > 0 ? '' : 'Hết hàng');
      setSelectedPrice(selectedVariant.quantity > 0 ? selectedVariant.price.toLocaleString() : null);
    } else {
      setAvailabilityMessage('Vui lòng chọn màu và kích thước.');
      setSelectedPrice(null);
    }
  }, [selectedVariant]);

  // Hàm tăng số lượng
  const handleIncrease = () => {
    if (selectedVariant && selectedQuantity < selectedVariant.quantity) {
      setSelectedQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  // Hàm giảm số lượng
  const handleDecrease = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  // Thêm sản phẩm vào giỏ hàng
  const handleAddToCartClick = () => {
    if (!selectedVariant) {
      toast.error('Vui lòng chọn màu và kích thước.');
      return;
    }

    handleAddToCart({
      selectedVariant,
      selectedColor,
      selectedSize,
      product,
      selectedQuantity,
    });
  };

  // Chọn màu
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize(null); // Reset lại kích thước khi chọn màu mới
  };

  // Chọn kích thước
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className={`quickview-overlay ${show ? "show" : ""}`}>
      <div className="quickview-content">
        <button className="quickview-close-button" onClick={onClose}>X</button>

        {/* Hình ảnh sản phẩm */}
        <div className="quickview-image-container">
          <img src={product.image} alt={product.name} className="quickview-product-image" />
        </div>

        <div className="quickview-details-container">
          <h2 className="quickview-product-name">{product.name}</h2>

          {/* Chọn màu sắc */}
          <div className="color-selection">
            <h4>Chọn Màu</h4>
            <div className="color-options">
              {Array.from(new Set(variants.map((variant) => variant.color))).map((color) => (
                <button
                  key={color}
                  className={`color-option ${color === selectedColor ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Chọn kích thước */}
          {/* Chọn kích thước */}
          {/* Chọn kích thước */}
          <div className="size-selection">
            <h4>Chọn Kích Thước</h4>
            <div className="size-options">
              {variants
                .filter((variant) => variant.color === selectedColor)
                .map((variant) => (
                  <button
                    key={variant.id}
                    className={`size-option ${variant.size === selectedSize ? 'selected' : ''}`}
                    onClick={() => handleSizeSelect(variant.size)}
                    disabled={variant.quantity <= 0} // Vô hiệu hóa nếu số lượng không còn
                    style={variant.quantity <= 0 ? { cursor: "not-allowed", opacity: 0.5 } : {}}
                  >
                    {variant.size} {variant.quantity <= 0 && "(Hết hàng)"}
                  </button>
                ))}
            </div>
          </div>



          {/* Hiển thị giá */}
          <span className="quickview-product-price">
            Giá: {selectedVariant ? `${selectedVariant.price} VND` : 'Vui lòng chọn màu và kích thước'}
          </span>

          {/* Chọn số lượng */}
          <div className="selectedQuantity-selection">
            <h4>Số lượng</h4>

            <div className="selectedQuantity-buttons" style={{ paddingTop: '3px' }}>
              <button onClick={handleDecrease} disabled={selectedQuantity <= 1} style={{ paddingRight: '15px' }} >-</button>
              {selectedQuantity}
              <button
                onClick={handleIncrease}
                disabled={selectedQuantity >= (selectedVariant?.quantity || 0)} style={{ paddingLeft: '15px' }}>+</button></div>
          </div>


          {/* Trạng thái có sẵn */}
          <div className="availability">

            <i className="fa fa-check-circle"></i>
            <span>{selectedVariant?.quantity} sản phẩm còn trong kho</span>


          </div>

          {/* Thêm vào giỏ hàng */}
          <div className="action_link">
            <button
              className={`btn btn-cart2 ${!selectedVariant || selectedVariant.selectedQuantity <= 0 ? 'disabled' : ''}`}
              onClick={handleAddToCartClick}
              disabled={!selectedVariant || selectedVariant.selectedQuantity <= 0}
            >
              <i className="fa fa-cart-plus"></i> Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;