import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import axios from 'axios';
import add from "../../actions/action";
import { toast } from "react-toastify";

const QuickViewModal = ({ show, onClose, product }) => {  
  if (!show) return null;

  const dispatch = useDispatch();

  // States for selected color, size, availability message, variants, and quantity
  const [variants, setVariants] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [quantity, setQuantity] = useState(1); // State cho số lượng

  // Fetch variants, colors, and sizes when component loads
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const colorResponse = await axios.get('/colors');
        setColors(colorResponse.data);
      } catch (error) {
        console.error("Error fetching colors:", error);
      }
    };

    const fetchSizes = async () => {
      try {
        const sizeResponse = await axios.get('/sizes');
        setSizes(sizeResponse.data);
      } catch (error) {
        console.error("Error fetching sizes:", error);
      }
    };

    const fetchVariants = async () => {
      try {
        const response = await axios.get(`products/${product.id}/variants`);
        setVariants(response.data);
      } catch (error) {
        console.error("Error fetching variants:", error);
      }
    };

    fetchColors();
    fetchSizes();
    fetchVariants();
  }, [product.id]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setSelectedSize(null);
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  useEffect(() => {
    if (selectedColor && selectedSize) {
      const variant = variants.find(
        (variant) => variant.color === selectedColor && variant.size === selectedSize
      );
      setSelectedVariant(variant);
      setAvailabilityMessage(variant ? (variant.quantity > 0 ? 'Còn hàng' : 'Hết hàng') : '');
    }
  }, [selectedColor, selectedSize, variants]);

  // Handle Add to Cart action
  const handleAddToCart = () => {
    if (selectedVariant && selectedColor && selectedSize) {
      const productData = {
        id: `${product.id}-${selectedColor}-${selectedSize}`,
        productName: product.name,
        image: product.image,
        price: selectedVariant.price,
        quantity: quantity, // sử dụng số lượng đã chọn
        color: selectedColor,
        size: selectedSize,
        variant: selectedVariant,
      };
  
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProductIndex = cart.findIndex(
        (item) => item.id === productData.id
      );
  
      if (existingProductIndex >= 0) {
        cart[existingProductIndex].quantity += quantity;
      } else {
        cart.push(productData);
      }
  
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch(add(productData));
      toast.success("Sản phẩm đã được thêm vào giỏ hàng!"); // Thông báo thành công
      onClose();
    } else {
      toast.error("Vui lòng chọn màu và kích thước."); // Thông báo lỗi nếu chưa chọn đủ
    }
  };

  return (
    <div className={`quickview-overlay ${show ? "show" : ""}`}>
  <div className="quickview-content">
    <button className="quickview-close-button" onClick={onClose}>X</button>

    <div className="quickview-image-container">
      <img src={product.image} alt={product.name} className="quickview-product-image" />
    </div>

    <div className="quickview-details-container">
      <h2 className="quickview-product-name">{product.name}</h2>
      

      <div className="color-selection">
        <h4>Chọn Màu</h4>
        <div className="color-options">
          {colors.map((color) => (
            <button
              key={color.id}
              className={`color-option ${color.name === selectedColor ? 'selected' : ''}`}
              style={{ backgroundColor: color.hex }}
              onClick={() => handleColorSelect(color.name)}
            >
              {color.name}
            </button>
          ))}
        </div>
      </div>

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
      <p className="quickview-product-price">Giá:{selectedVariant ? `${selectedVariant.price} VND` : 'Vui lòng chọn màu và kích thước'}</p>
      <div className="quantity-selection">
  <h4>Số lượng</h4>
  <div className="quantity-buttons">
    <button onClick={() => setQuantity(Math.max(1, quantity - 1))}><i class="bi bi-dash-circle"></i></button>
    <span>{quantity}</span>
    <button onClick={() => setQuantity(quantity + 1)}><i class="bi bi-plus-circle"></i></button>
  </div>
</div>


      {availabilityMessage && <p className="availability-message">{availabilityMessage}</p>}

      <button onClick={handleAddToCart} className="quickview-btn-add-to-cart">
        Thêm vào giỏ hàng
      </button>
    </div>
  </div>
</div>

  );
};

export default QuickViewModal;
