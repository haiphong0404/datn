import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProductvariants from '../../hooks/useProductVariants';
import useProductById from '../../hooks/useProductById';
import useProductSlider from '../../hooks/useProductSlider';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, loadCartFromLocalStorage } from '../../actions/action';
import { toast } from 'react-toastify';
import axios from 'axios';

const Details = () => {
    
    const cart = useSelector(state => state.updateCart.cartItems);
    const dispatch = useDispatch();

    // State lưu giỏ hàng từ localStorage
    const [localCart, setLocalCart] = useState(cart);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [availabilityMessage, setAvailabilityMessage] = useState('');

    const { productId } = useParams();
    const { product, loading: productLoading, error: productError } = useProductById(productId);
    const { variants, isLoading: variantsLoading, error: variantsError } = useProductvariants(productId);
    const { settings } = useProductSlider();

    useEffect(() => {
        const savedCart = loadCartFromLocalStorage(); // Lấy giỏ hàng từ localStorage
        setLocalCart(savedCart); // Đồng bộ với state localCart
    }, [cart]);

    // Product variant
    useEffect(() => {
        if (variants.length > 0) {
            setSelectedImage(variants[0].images); // Default to the first image
        }
    }, [variants]);

    // Các màu và kích thước sản phẩm
    const allColors = Array.from(new Set(variants.map(variant => variant.color)));
    const allSizes = Array.from(new Set(variants.map(variant => variant.size)));

    const selectedVariant = variants.find(
        (variant) =>
            variant.color === selectedColor &&
            variant.size === selectedSize
    );

    useEffect(() => {
        if (selectedVariant) {
            setSelectedQuantity(1);
            setAvailabilityMessage(selectedVariant.quantity > 0 ? '' : 'Hết hàng');
            setSelectedPrice(selectedVariant.quantity > 0 ? selectedVariant.price.toLocaleString() : null);
        } else {
            setAvailabilityMessage('Vui lòng chọn màu và kích thước.');
            setSelectedPrice(null);
        }
    }, [selectedColor, selectedSize, selectedVariant]);

    // Handle tăng giảm số lượng
    const handleIncrease = () => {
        if (selectedVariant && selectedQuantity < selectedVariant.quantity) {
            setSelectedQuantity(prevQuantity => prevQuantity + 1);
        }
    };

    const handleDecrease = () => {
        if (selectedQuantity > 1) {
            setSelectedQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    // Cập nhật giỏ hàng khi người dùng thêm sản phẩm
    const handleAddToCart = async () => {
        const selectedVariant = variants.find(variant =>
            variant.color === selectedColor && variant.size === selectedSize
        );
        const quantity = selectedQuantity;
    
        if (selectedVariant) {
            try {
                const id_productVariant = selectedVariant.id;  // Đảm bảo lấy id của biến thể sản phẩm
    
                if (localStorage.getItem('token')) {
                    // Nếu người dùng đã đăng nhập, đồng bộ giỏ hàng lên server
                    const response = await axios.post('/cart/add', {
                        product_variant_id: id_productVariant, // Dùng id_productVariant
                        productId: product.id,
                        quantity: quantity,
                        color: selectedColor,
                        size: selectedSize,
                    }, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}` // Gửi token xác thực
                        }
                    });
    
                    if (response.status === 200) {
                        toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
                        dispatch(addCart(response.data.cart_item)); // Cập nhật Redux
                    }
                } else {
                    // Nếu người dùng chưa đăng nhập, lưu giỏ hàng vào localStorage
                    const cartData = localStorage.getItem('cart');
                    let updatedCart = cartData ? JSON.parse(cartData) : [];
    
                    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
                    const existingProductIndex = updatedCart.findIndex(item => 
                        item.id_productVariant === id_productVariant && 
                        item.size === selectedSize && 
                        item.color === selectedColor
                    );
    
                    if (existingProductIndex !== -1) {
                        // Nếu sản phẩm đã có, chỉ cần cập nhật số lượng
                        updatedCart[existingProductIndex].quantity += quantity;
                    } else {
                        // Nếu sản phẩm chưa có, thêm vào giỏ hàng mới
                        updatedCart.push({
                            id_productVariant,
                            productId: product.id,
                            color: selectedColor,
                            productName: product.name,
                            image: selectedVariant.images,
                            price: selectedVariant.price,
                            size: selectedSize,
                            quantity,
                        });
                    }
    
                    setLocalCart(updatedCart); // Cập nhật state localCart
                    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Lưu giỏ hàng vào localStorage
                    toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
                }
            } catch (error) {
                toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
            }
        } else {
            toast.error("Vui lòng chọn màu và kích thước sản phẩm!");
        }
    };
    


    if (productLoading || variantsLoading) {
        return <div>Loading...</div>;
    }

    if (productError || variantsError) {
        return <div>Error fetching product details: {productError?.message || variantsError?.message}</div>;
    }

    return (
        <div className="product-details-inner">
            <div className="row">
                <div className="col-lg-5">
                    <div className="product">
                        <div className="product-large-img">
                            <img src={selectedImage || variants[0]?.images} alt="product-large" />
                        </div>
                        <Slider {...settings}>
                            {variants.map((variant, index) => (
                                <div className='imgslide' key={index} onClick={() => {
                                    setSelectedImage(variant.images);
                                    setSelectedColor('');
                                    setSelectedSize('');
                                }}>
                                    <img
                                        src={variant.images} 
                                        alt={`Product ${index + 1}`}
                                        className={`w-full h-auto cursor-pointer ${selectedImage === variant.images ? 'selected-image' : ''}`}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>

                <div className="col-lg-7">
                    <div className="product-details-des">
                        <h3 className="product-name">{product.name}</h3>

                        {selectedImage && (
                            <>
                                <p className="text-gray-600 text-sm">Màu sắc</p>
                                <div className="flex gap-3 my-2">
                                    {allColors.map(color => {
                                        const isColorAvailable = variants.some(variant =>
                                            variant.color === color && variant.quantity > 0
                                        );
                                        return (
                                            <button
                                                key={color}
                                                className={`font-semibold text-lg px-3 py-2 rounded-2xl border 
                                                ${selectedColor === color ? 'bg-black text-white' : ''} 
                                                ${isColorAvailable ? 'text-black border-black' : 'text-gray-400 border-gray-400'}`}
                                                onClick={() => {
                                                    setSelectedColor(color);
                                                    setSelectedSize('');
                                                }}
                                                disabled={!isColorAvailable}
                                            >
                                                {color}
                                            </button>
                                        );
                                    })}
                                </div>

                                <p className="text-gray-600 text-sm">Kích thước</p>
                                <div className="flex gap-3 my-2">
                                    {allSizes.map(size => {
                                        const isSizeAvailable = variants.some(variant =>
                                            variant.color === selectedColor && variant.size === size && variant.quantity > 0
                                        );
                                        return (
                                            <button
                                                key={size}
                                                className={`font-semibold text-lg px-3 py-2 rounded-2xl border 
                                                ${selectedSize === size ? 'bg-black text-white' : ''} 
                                                ${isSizeAvailable ? 'text-black border-black' : 'text-gray-400 border-gray-400'}`}
                                                onClick={() => setSelectedSize(size)}
                                                disabled={!isSizeAvailable}
                                            >
                                                {size}
                                            </button>
                                        );
                                    })}
                                </div>
                            </>
                        )}

                        <p className="text-sm">{availabilityMessage}</p>

                        <div className="price-box">
                            <span className="price-regular">{selectedPrice !== null ? selectedPrice : product.price.toLocaleString()} VND</span>
                        </div>

                        <h6 className="option-title">Số lượng:</h6>
                        <div className="quantity d-flex align-items-center">
                            <button onClick={handleDecrease} disabled={selectedQuantity <= 1} className="btn-quantity">-</button>
                            <div className="pro-qty">{selectedQuantity}</div>
                            <button onClick={handleIncrease} disabled={selectedQuantity >= (selectedVariant?.quantity || 0)} className="btn-quantity">+</button>
                        </div>

                        <div className="availability">
                            <i className="fa fa-check-circle"></i>
                            <span>{selectedVariant?.quantity} in stock</span>
                        </div>

                        <p className="pro-desc">{product.description}</p>

                        <div className="action_link">
                            <button
                                className={`btn btn-cart2 ${!selectedVariant || selectedVariant.quantity <= 0 ? 'disabled' : ''}`}
                                onClick={handleAddToCart}
                                disabled={!selectedVariant || selectedVariant.quantity <= 0}
                            >
                                <i className="fa fa-cart-plus"></i> Thêm vào giỏ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
