// // src/components/QuickView.js
// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import add from "../../actions/action";

// const QuickViewModal = ({ product, onClose, show }) => {
//   const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
//   const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (product) {
//       setSelectedSize(product.sizes[0]);
//       setSelectedColor(product.colors[0]);
//     }
//   }, [product]);

//   const handleAddToCart = () => {
//     const variant = {
//       id: product.id,
//       name: product.name,
//       price: product.price,
//       size: selectedSize,
//       color: selectedColor,
//     };
//     dispatch(add(variant));
//     onClose(); // Đóng cửa sổ Quick View sau khi thêm vào giỏ
//   };

//   if (!show || !product) return null; // Nếu không có sản phẩm hoặc show = false thì không render modal

//   return (
//     <div className="quickview-overlay">
//       <div className="quickview-modal">
//         <button onClick={onClose} className="close-btn">X</button>
//         <h2>{product.name}</h2>
//         <img src={product.image} alt={product.name} />
//         <p>{product.description}</p>
//         <p className="price">
//           {product.price ? `${new Intl.NumberFormat('vi-VN').format(product.price)} VND` : "Liên hệ"}
//         </p>

//         <div className="variant-selection">
//           <div className="size-selector">
//             <label>Size:</label>
//             <select
//               value={selectedSize}
//               onChange={(e) => setSelectedSize(e.target.value)}
//             >
//               {product.sizes.map((size) => (
//                 <option key={size} value={size}>
//                   {size}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="color-selector">
//             <label>Color:</label>
//             <select
//               value={selectedColor}
//               onChange={(e) => setSelectedColor(e.target.value)}
//             >
//               {product.colors.map((color) => (
//                 <option key={color} value={color}>
//                   {color}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <button onClick={handleAddToCart} className="add-to-cart-btn">
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuickViewModal;
