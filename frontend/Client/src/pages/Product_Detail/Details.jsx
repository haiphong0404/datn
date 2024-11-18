import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProductvariants from '../../hooks/useProductVariants';
import useProductById from '../../hooks/useProductById';
import useProductSlider from '../../hooks/useProductSlider';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import add, { loadCartFromLocalStorage } from '../../actions/action';
import { toast } from 'react-toastify';

const Details = () => {
    // addtocart
    const cart = useSelector(state => state.updateCart)
    const [localCart, setLocalCart] = useState(cart);
    const dispatch = useDispatch()
    const handleAddToCart = () => {
        const selectedVariant = variants.find(variant =>
            variant.color === selectedColor && variant.size === selectedSize
        );
        const quantity = selectedQuantity;
        const existingProduct = localCart.find(item => item.id === selectedVariant.id);

        if (selectedVariant) {
            if (existingProduct) {
                if (existingProduct.quantity + quantity <= selectedVariant.quantity) {
                    existingProduct.quantity += quantity;
                    setLocalCart([...localCart]);
                    localStorage.setItem("cart", JSON.stringify([...localCart]));
                    dispatch(add(existingProduct));
                    toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
                } else {
                    toast.error("Số lượng bạn muốn thêm vượt quá số lượng tối đa trong kho!");
                }
            } else {
                if (quantity <= selectedVariant.quantity) {
                    const newProduct = {
                        id: selectedVariant.id,
                        productId: product.id,
                        productName: product.name,
                        image: selectedVariant.images,
                        price: selectedVariant.price,
                        quantity: quantity,
                        size: selectedVariant.size,
                        color: selectedVariant.color,
                        stock: selectedVariant.quantity
                    };
                    const updatedCart = [...localCart, newProduct];
                    setLocalCart(updatedCart);
                    localStorage.setItem("cart", JSON.stringify(updatedCart));
                    dispatch(add(newProduct));
                    toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
                } else {
                    toast.error("Số lượng bạn muốn thêm vượt quá số lượng tối đa trong kho!");
                }
            }
        } else {
            toast.error("Vui lòng chọn màu và kích thước sản phẩm!");
        }
    };
    
    
    

    useEffect(() => {
        const savedCart = loadCartFromLocalStorage(); // Lấy giỏ hàng từ localStorage
        setLocalCart(savedCart);
    }, [cart]);
    // product variant
    const { productId } = useParams();
    const { product, loading: productLoading, error: productError } = useProductById(productId);
    const { variants, isLoading: variantsLoading, error: variantsError } = useProductvariants(productId);
    const { settings } = useProductSlider();

    const [selectedImage, setSelectedImage] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [availabilityMessage, setAvailabilityMessage] = useState('');
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    useEffect(() => {
        if (variants.length > 0) {
            setSelectedImage(variants[0].images); // Default to the first image
        }
    }, [variants]);

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
            setAvailabilityMessage(selectedVariant.quantity > 0 ? '' : '');
            setSelectedPrice(selectedVariant.quantity > 0 ? selectedVariant.price : null);
        } else {
            setAvailabilityMessage('Vui lòng chọn màu và kích thước.');
            setSelectedPrice(null);
        }
    }, [selectedColor, selectedSize, selectedVariant]);

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

    if (productLoading || variantsLoading) {
        return <div>Loading...</div>;
    }

    if (productError || variantsError) {
        return <div>Error fetching product details: {productError?.message || variantsError?.message}</div>;
    }

    // Filter unique images
    const uniqueImages = new Set();
    const filteredVariants = variants.filter(variant => {
        if (!uniqueImages.has(variant.images)) {
            uniqueImages.add(variant.images);
            return true; // Only return images not already in the Set
        }
        return false; // Skip images that are already included
    });

    const isOutOfStock = !selectedVariant || selectedVariant.quantity <= 0;

    return (
        <div className="product-details-inner">
            <div className="row">
                <div className="col-lg-5">
                    <div className="product">
                        <div className="product-large-img">
                            <img src={selectedImage || filteredVariants[0]?.images} alt="product-large" />
                        </div>
                        <Slider {...settings}>
                            {filteredVariants.map((variant, index) => (
                                <div className='imgslide'
                                    key={index}
                                    onClick={() => {
                                        setSelectedImage(variant.images);
                                        // Reset color and size selection on image click
                                        setSelectedColor(''); 
                                        setSelectedSize(''); 
                                    }}
                                >
                                    <img
                                        src={variant.images}
                                        alt={`Product ${index + 1}`}
                                        className={`w-full h-auto cursor-pointer ${selectedImage === variant.images ? 'selected-image' : ''}`}
                                        style={{ border: 'none' }} // Ensure no border
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
                                                    setSelectedSize(''); // Reset size selection when color is changed
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

                        {availabilityMessage && (
                            <p className={`text-sm ${availabilityMessage.includes('hết hàng') ? 'text-red-600' : 'text-green-600'}`}>
                                {availabilityMessage}
                            </p>
                        )}

                        <div className="price-box">
                            <span className="price-regular">${selectedPrice !== null ? selectedPrice : product.price}</span>
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
                                className={`btn btn-cart2 ${isOutOfStock ? 'disabled' : ''}`}
                                onClick={isOutOfStock ? undefined : handleAddToCart}
                                disabled={isOutOfStock}
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;