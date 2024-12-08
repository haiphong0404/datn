import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { addCart } from '../../actions/action'; // Thêm vào action của bạn để cập nhật Redux

const QuickViewModal = ({ show, onClose, product }) => {
  if (!show) return null; // Nếu modal không được hiển thị thì không làm gì

  const dispatch = useDispatch();

  // Các state cho màu sắc, kích thước, biến thể, số lượng
  const [variants, setVariants] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [localCart, setLocalCart] = useState(JSON.parse(localStorage.getItem("cart")) || []); // Lấy giỏ hàng từ localStorage

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

  // Cập nhật variant và trạng thái có sẵn khi người dùng chọn màu và kích thước
  useEffect(() => {
    if (selectedColor && selectedSize) {
      const variant = variants.find(
        (variant) => variant.color === selectedColor && variant.size === selectedSize
      );
      setSelectedVariant(variant);
      setAvailabilityMessage(variant ? (variant.quantity > 0 ? 'Còn hàng' : 'Hết hàng') : 'Vui lòng chọn màu và kích thước');
    }
  }, [selectedColor, selectedSize, variants]);

  // Hàm tăng số lượng
  const handleIncrease = () => {
    if (selectedVariant && quantity < selectedVariant.quantity) {
      setQuantity(prevQuantity => prevQuantity + 1);
    }
  };

  // Hàm giảm số lượng
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  
  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Vui lòng chọn màu và kích thước sản phẩm!");
      return;
    }
  
    if (!selectedVariant) {
      toast.error("Vui lòng chọn biến thể sản phẩm!");
      return;
    }
  
    const cart = Array.isArray(localCart) ? localCart : [];

    // Kiểm tra số lượng hiện có trong giỏ hàng cho sản phẩm và biến thể này
    const existingCartQuantity = cart.reduce((total, item) => {
      return item.id_productVariant === selectedVariant.id ? total + item.quantity : total;
    }, 0);
  
    // Tổng số lượng dự kiến sau khi thêm vào giỏ hàng
    const totalQuantity = existingCartQuantity + quantity;
  
    // Kiểm tra nếu tổng số lượng muốn thêm vượt quá số lượng tồn kho
    if (totalQuantity > selectedVariant.quantity) {
      toast.error(`Chỉ còn ${selectedVariant.quantity - existingCartQuantity} sản phẩm trong kho!`);
      return;
    }
  
    // Tạo đối tượng sản phẩm để thêm vào giỏ hàng
    const cartItem = { 
      id_productVariant: selectedVariant.id,
      productId: product.id,
      color: selectedColor,
      size: selectedSize,
      price: selectedVariant.price,
      image: selectedVariant.images,
      stock: selectedVariant.quantity,
      productName: product.name,
      quantity
    };
  
    try {
      const id_productVariant = selectedVariant.id;
      if (localStorage.getItem('token')) {
        const token = localStorage.getItem('token');
        const response = await axios.post('/cart/add', {
          product_variant_id: id_productVariant,
          quantity,
          color: selectedColor,
          size: selectedSize,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        if (response.status === 200) {
          toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
  
          // Cập nhật giỏ hàng từ dữ liệu API và lưu lại trong localStorage
          // dispatch(addCart(response.data.cart_item));
  
          // // Đồng bộ giỏ hàng từ server về localStorage
          // const updatedCart = (localCart || []).map(item => 
          //   item.id_productVariant === id_productVariant 
          //     ? { ...item, quantity: item.quantity + quantity } 
          //     : item
          // );
          // if (!updatedCart.some(item => item.id_productVariant === id_productVariant)) {
          //   updatedCart.push(cartItem);
          // }
  
          // // Lưu tất cả dữ liệu vào localStorage
          // localStorage.setItem("cart", JSON.stringify(updatedCart));
          // setLocalCart(updatedCart); // Cập nhật lại state giỏ hàng từ localStorage
        }
      } else {
        // Người dùng chưa đăng nhập: cập nhật giỏ hàng trong localStorage
        const updatedCart = localCart.map(item => 
          item.id_productVariant === selectedVariant.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
  
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm vào giỏ hàng
        if (!updatedCart.some(item => item.id_productVariant === selectedVariant.id)) {
          updatedCart.push(cartItem);
        }
  
        // Cập nhật lại giỏ hàng vào localStorage
        setLocalCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
      }
    } catch (error) {
      console.error("Error occurred while adding to cart:", error);
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
    }
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
          <div className="quantity-selection">
            <h4>Số lượng</h4>
            <div className="quantity-buttons">
              <button onClick={handleDecrease} disabled={quantity <= 1}>-</button>
              <span>{quantity}</span>
              <button onClick={handleIncrease} disabled={quantity >= (selectedVariant?.quantity || 0)}>+</button>
            </div>
          </div>

          {/* Trạng thái có sẵn */}
          <div className="availability">
            <i className="fa fa-check-circle"></i>
            <span>{selectedVariant?.quantity} Số lượng tồn kho</span>
          </div>

          {/* Thêm vào giỏ hàng */}
          <div className="action_link">
            <button
              className={`btn btn-cart2 ${!selectedVariant || selectedVariant.quantity <= 0 ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant.quantity <= 0}
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
