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
    
        if (!selectedColor || !selectedSize) {
            toast.error("Vui lòng chọn màu và kích thước sản phẩm!");
            return;
        }
    
        if (!selectedVariant) {
            toast.error("Vui lòng chọn biến thể sản phẩm!");
            return;
        }
    
        // Ensure localCart is an array, even if it's null or undefined
        const cart = Array.isArray(localCart) ? localCart : [];
    
        // Kiểm tra số lượng hiện có trong giỏ hàng cho sản phẩm và biến thể này
        const existingCartQuantity = cart.reduce((total, item) => {
            return item.id_productVariant === selectedVariant.id ? total + item.quantity : total;
        }, 0);
    
        // Tổng số lượng dự kiến sau khi thêm vào giỏ hàng
        const totalQuantity = existingCartQuantity + quantity;
    
        // Kiểm tra nếu tổng số lượng muốn thêm vượt quá số lượng tồn kho
        if (totalQuantity > selectedVariant.quantity) {
            toast.error(`không thêm được quá số lượng trong kho`);
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
                    window.location.reload()
                    // Cập nhật giỏ hàng từ dữ liệu API và lưu lại trong localStorage
                    // dispatch(addCart(response.data.cart_item));
    
                    // // Đồng bộ giỏ hàng từ server về localStorage
                    // const updatedCart = cart.map(item => 
                    //     item.id_productVariant === id_productVariant 
                    //         ? { ...item, quantity: item.quantity + quantity } 
                    //         : item
                    // );
                    // if (!updatedCart.some(item => item.id_productVariant === id_productVariant)) {
                    //     updatedCart.push(cartItem);
                    // }
    
                    // // Lưu tất cả dữ liệu vào localStorage
                    // localStorage.setItem("cart", JSON.stringify(updatedCart));
                    // setLocalCart(updatedCart); // Cập nhật lại state giỏ hàng từ localStorage
                }
            } else {
                // Người dùng chưa đăng nhập: cập nhật giỏ hàng trong localStorage
                const updatedCart = cart.map(item => 
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
