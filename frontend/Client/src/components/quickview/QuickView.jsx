import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const QuickViewModal = ({ show, onClose, product }) => {
  if (!show) return null;

  // States for selected color, size, availability message, and variants
  const [variants, setVariants] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [availabilityMessage, setAvailabilityMessage] = useState("");

  // Fetch variants, colors, and sizes when component loads
  useEffect(() => {
    // Fetch Colors
    const fetchColors = async () => {
      try {
        const colorResponse = await axios.get('/colors');
        setColors(colorResponse.data); // Giả sử response.data chứa mảng màu sắc
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    // Fetch Sizes
    const fetchSizes = async () => {
      try {
        const sizeResponse = await axios.get('/sizes');
        setSizes(sizeResponse.data); // Giả sử response.data chứa mảng kích thước
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };

    // Fetch Variants for the specific product
    const fetchVariants = async () => {
      try {
        const response = await axios.get(`products/${product.id}/variants`);
        setVariants(response.data); // Giả sử response.data là danh sách variants
      } catch (error) {
        console.error("Error fetching variants:", error);
      }
    };

    fetchColors();
    fetchSizes();
    fetchVariants();
  }, [product.id]); // Depend on product.id so it fetches again when the product changes

  // Handle color selection
  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize(null); // Reset size when color changes
  };

  // Handle size selection
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  // Find selected variant based on color and size
  useEffect(() => {
    if (selectedColor && selectedSize) {
      const variant = variants.find(
        (variant) => variant.color === selectedColor && variant.size === selectedSize
      );
      setSelectedVariant(variant);
      setAvailabilityMessage(variant ? (variant.quantity > 0 ? 'Còn hàng' : 'Hết hàng') : '');
    }
  }, [selectedColor, selectedSize, variants]);

  return (
    <div className={`quickview-overlay ${show ? "show" : ""}`}>
      <div className="quickview-content">
        <button className="quickview-close-button" onClick={onClose}>X</button>
        <h2 className="quickview-product-name">{product.name}</h2>
        <img src={product.image} alt={product.name} className="quickview-product-image" />
        {/* <p className="quickview-product-description">{product.description}</p> */}
        <p className="quickview-product-price">{selectedVariant ? `${selectedVariant.price} VND` : 'Vui lòng chọn màu và kích thước'}</p>

        {/* Color Selection */}
        <div className="color-selection">
          <h4>Chọn Màu</h4>
          <div className="color-options">
            {colors.map((color) => (
              <button
                key={color.id}
                className={`color-option ${color.name === selectedColor ? 'selected' : ''}`}
                style={{ backgroundColor: color.hex }} // Assuming colors have hex codes
                onClick={() => handleColorSelect(color.name)}
              >
                {color.name}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className="size-selection">
          <h4>Chọn Kích Thước</h4>
          <div className="size-options">
            {variants.filter(variant => variant.color === selectedColor).map((variant) => (
              <button
                key={variant.id}
                className={`size-option ${variant.size === selectedSize ? 'selected' : ''}`}
                onClick={() => handleSizeSelect(variant.size)}
              >
                {variant.size}
              </button>
            ))}
          </div>
        </div>

        {/* Product Variant Details */}
        {selectedVariant && (
          <div className="product-details">
            <h4>Thông Tin Biến Thể</h4>
            <p><strong>Giá:</strong> {selectedVariant.price} VND</p>
            <p><strong>Số lượng:</strong> {selectedVariant.quantity > 0 ? selectedVariant.quantity : 'Hết hàng'}</p>
          </div>
        )}

        {/* Availability Message */}
        {availabilityMessage && <p className="availability-message">{availabilityMessage}</p>}

        <Link to={`/product_details/${product.id}`} className="quickview-btn-detail"></Link>
      </div>
    </div>
  );
};

export default QuickViewModal;
