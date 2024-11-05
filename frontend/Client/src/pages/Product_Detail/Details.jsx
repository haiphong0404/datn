import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useProductvariants from '../../hooks/useProductVariants';
import useProductById from '../../hooks/useProductById';
import useProductSlider from '../../hooks/useProductSlider';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import add, { loadCartFromLocalStorage } from '../../actions/action';
import { toast } from 'react-toastify';

const Details = () => {
    const cart = useSelector(state => state.updateCart)
    const [localCart, setLocalCart] = useState(cart);
    const dispatch = useDispatch()
    const handleAddToCart = () => {
        const quantityInput = document.querySelector('.pro-qty input');
        const quantity = parseInt(quantityInput.value) || 1; // Lấy số lượng từ ô nhập
        const selectedVariant = variants[selectedVariantIndex]; // Lấy biến thể đã chọn
        const existingProduct = localCart.find(item => item.id === selectedVariant.id);
    
        if (existingProduct) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng
            if (existingProduct.quantity + quantity <= selectedVariant.quantity) {
                existingProduct.quantity += quantity; // Tăng số lượng trong giỏ hàng
                setLocalCart([...localCart]); // Cập nhật trạng thái giỏ hàng
                localStorage.setItem("cart", JSON.stringify([...localCart])); // Cập nhật localStorage
                dispatch(add(existingProduct)); // Gọi action thêm vào Redux
                toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
            } else {
                toast.error("Số lượng bạn muốn thêm vượt quá số lượng tối đa trong kho!");
            }
        } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng
            if (quantity <= selectedVariant.quantity) {
                const newProduct = {
                    id: selectedVariant.id, // ID biến thể
                    productId: product.id, // ID của sản phẩm chính
                    productName: product.name, // Tên sản phẩm
                    image: selectedVariant.images, // Hình ảnh sản phẩm
                    price: selectedVariant.price, // Giá sản phẩm
                    quantity: quantity, // Số lượng sản phẩm
                    size: selectedVariant.size, // Kích thước của biến thể đã chọn
                    color: selectedVariant.color, // Màu sắc của biến thể đã chọn
                    stock: selectedVariant.quantity
                };
    
                // Cập nhật giỏ hàng
                const updatedCart = [...localCart, newProduct];
                setLocalCart(updatedCart); // Cập nhật trạng thái giỏ hàng
                localStorage.setItem("cart", JSON.stringify(updatedCart)); // Lưu vào localStorage
                dispatch(add(newProduct)); // Gọi action thêm vào Redux
                toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
            } else {
                toast.error("Số lượng bạn muốn thêm vượt quá số lượng tối đa trong kho!");
            }
        }
    };
    
    
    

    useEffect(() => {
        const savedCart = loadCartFromLocalStorage(); // Lấy giỏ hàng từ localStorage
        setLocalCart(savedCart);
    }, [cart]);

    const { productId } = useParams();
    const { product, loading: productLoading, error: productError } = useProductById(productId);
    const { variants, isLoading: variantsLoading, error: variantsError } = useProductvariants(productId);
    const { settings } = useProductSlider();

    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const [availabilityMessage, setAvailabilityMessage] = useState('');

    if (productLoading || variantsLoading) {
        return <div>Loading...</div>;
    }

    if (productError || variantsError) {
        return <div>Error fetching product details: {productError?.message || variantsError?.message}</div>;
    }

    const handleVariantSelect = (index) => {
        setSelectedVariantIndex(index);
        const selectedVariant = variants[index];

        if (selectedVariant.quantity === 0) {
            setAvailabilityMessage('This variant is out of stock.');
        } else {
            setAvailabilityMessage('This variant is available.');
        }
    };

    const isOutOfStock = variants[selectedVariantIndex].quantity === 0;

    return (
        <div>
            <div className="product-details-inner">
                <div className="row">
                    <div className="col-lg-5">
                        {/* Slider lớn với hình ảnh cố định */}
                        <Slider {...settings} className="product-large-slider">
                            <div className="pro-large-img img-zoom">
                                <img
                                    src={variants[selectedVariantIndex].images} // Giữ nguyên hình ảnh đã chọn
                                    alt="product-details"
                                />
                            </div>
                        </Slider>

                        {/* Hiển thị ảnh dạng checkbox (đã ẩn checkbox) */}
                        <div className="variant-checkbox-group">
                            {variants.map((variant, index) => (
                                <label key={variant.id} className="variant-checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={selectedVariantIndex === index}
                                        onChange={() => handleVariantSelect(index)}
                                        style={{ display: 'none' }} // Ẩn checkbox
                                    />
                                    <div
                                        className={`variant-checkbox-thumbnail ${selectedVariantIndex === index ? 'selected' : ''}`} // Thêm class 'selected'
                                        style={{
                                            backgroundImage: `url(${variant.images})`,
                                            backgroundSize: 'cover',
                                            width: '150px',
                                            height: '150px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleVariantSelect(index)} // Xử lý chọn khi click vào ảnh
                                    ></div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="product-details-des">
                            <h3 className="product-name">{product.name}</h3>
                            <p className="text-gray-600 text-sm">SIZE</p>
                            <div className="flex gap-3 my-2">
                                {/* Hiển thị tất cả các kích thước */}
                                {variants.map((variant, index) => (
                                    <button
                                        key={index}
                                        className={`${selectedVariantIndex === index ? 'text-black' : 'text-[#d5a26e]'
                                            } font-semibold text-lg px-3 py-2 rounded-2xl border ${selectedVariantIndex === index ? 'border-none' : 'border-[#d5a26e]'
                                            } transition duration-200 ease-in-out`}
                                        onClick={() => handleVariantSelect(index)}
                                    >
                                        {variant.size}
                                    </button>
                                ))}
                            </div>

                            <p className="text-gray-600 text-sm">COLOR</p>
                            <div className="flex gap-3 my-2">
                                {/* Hiển thị tất cả các màu sắc */}
                                {variants.map((variant, index) => (
                                    <button
                                        key={index}
                                        className={`${selectedVariantIndex === index ? 'text-black' : 'text-[#d5a26e]'
                                            } font-semibold text-lg px-3 py-2 rounded-2xl border ${selectedVariantIndex === index ? 'border-none' : 'border-[#d5a26e]'
                                            } transition duration-200 ease-in-out`}
                                        onClick={() => handleVariantSelect(index)}
                                    >
                                        {variant.color}
                                    </button>
                                ))}
                            </div>
                            {availabilityMessage && (
                                <p className={`text-sm ${isOutOfStock ? 'text-red-600' : 'text-green-600'}`}>
                                    {availabilityMessage}
                                </p>
                            )}
                            <div className="price-box">
                                <span className="price-regular">{variants[selectedVariantIndex].price} Vnd</span>
                            </div>
                            <div className="availability">
                                <i className="fa fa-check-circle" />
                                <span>{variants[selectedVariantIndex].quantity} in stock</span>
                            </div>
                            <p className="pro-desc">{product.description}</p>
                            <div className="quantity-cart-box d-flex align-items-center">
                                <h6 className="option-title">qty:</h6>
                                <div className="quantity">
                                    <div className="pro-qty">
                                        <input type="text" defaultValue={1} />
                                    </div>
                                </div>
                                <div className="action_link">
                                    <button
                                        className={`btn btn-cart2 ${isOutOfStock ? 'disabled' : ''}`}
                                        
                                        onClick={(e) => {
                                            if (isOutOfStock) {
                                                e.preventDefault(); // Ngăn chặn hành động mặc định nếu hết hàng
                                            } else {
                                                handleAddToCart(product); // Gọi hàm thêm vào giỏ hàng nếu không hết hàng
                                            }
                                        }}
                                    >
                                        {isOutOfStock ? 'Out of Stock' : 'Add To Cart'}
                                    </button>
                                </div>

                            </div>
                            <div className="useful-links">
                                <a href="#">
                                    <i className="fa fa-refresh" />
                                    compare
                                </a>
                                <a href="#">
                                    <i className="fa fa-heart-o" />
                                    wishlist
                                </a>
                            </div>
                            <div className="like-icon">
                                <a className="facebook" href="#">
                                    <i className="fa fa-facebook" />
                                    like
                                </a>
                                <a className="twitter" href="#">
                                    <i className="fa fa-twitter" />
                                    tweet
                                </a>
                                <a className="pinterest" href="#">
                                    <i className="fa fa-pinterest" />
                                    save
                                </a>
                                <a className="google" href="#">
                                    <i className="fa fa-google-plus" />
                                    share
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;