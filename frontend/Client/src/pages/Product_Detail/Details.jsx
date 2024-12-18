import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProductvariants from '../../hooks/useProductVariants';
import useProductById from '../../hooks/useProductById';
import useProductSlider from '../../hooks/useProductSlider';
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { addCart, loadCartFromLocalStorage } from '../../actions/action';
import { toast } from 'react-toastify';
import LoadingSpinner from "../../loading/LoadingSpinner";
import axios from 'axios';
import { useCart } from '../../contexts/CartContext';


const Details = () => {
    const { handleAddToCart, refetch } = useCart(); // Sử dụng từ CartContext
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

    const groupedProducts = variants.reduce((acc, product) => {
        if (!acc[product.color]) {
            acc[product.color] = {
                color: product.color,
                image: product.images[0], // Chỉ lấy hình ảnh đầu tiên của màu sắc này
            };
        }
        return acc;
    }, {});

    const handleAddToCartClick = () => {
        const selectedVariant = variants.find(
            (variant) => variant.color === selectedColor && variant.size === selectedSize
        );

        handleAddToCart({
            selectedVariant,
            selectedColor,
            selectedSize,
            product,
            selectedQuantity,
        });
    };


    // Chuyển nhóm sản phẩm thành một mảng để dễ sử dụng
    const uniqueColorImages = Object.values(groupedProducts);

    console.log(uniqueColorImages);




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



    if (productLoading || variantsLoading) {
        return <LoadingSpinner />;
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
                            <img src={selectedImage} alt="product-large" />
                        </div>
                        <Slider {...settings}>
                            {uniqueColorImages.map((variant, index) => (
                                <div
                                    className="imgslide m-4 sm:m-2 md:m-3 lg:m-4"
                                    key={index}
                                    onClick={() => {
                                        setSelectedImage(variant.image);
                                        setSelectedColor(variant.color);
                                        setSelectedSize('');
                                    }}
                                >
                                    <img
                                        src={variant.image}
                                        alt={`Variant ${index}`}
                                        className={`w-full h-auto cursor-pointer ${selectedImage === variant.image ? 'selected-image' : ''
                                            }`}
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
                                    {allSizes
                                        .sort((a, b) => a - b) // Sắp xếp theo thứ tự từ bé đến lớn
                                        .map(size => {
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
                        <div className="quantity d-flex align-items-center"
                            style={{ marginTop: '10px' }} >

                            <div className="pro-qty" style={{ paddingTop: '3px' }}>
                                <button onClick={handleDecrease} disabled={selectedQuantity <= 1} style={{ paddingRight: '15px' }} >-</button>
                                {selectedQuantity}
                                <button
                                    onClick={handleIncrease}
                                    disabled={selectedQuantity >= (selectedVariant?.quantity || 0)} style={{ paddingLeft: '15px' }}>+</button></div>
                        </div>

                        <div className="availability">
                            <i className="fa fa-check-circle"></i>
                            <span>{selectedVariant?.quantity} Số lượng tồn kho</span>
                        </div>

                        <p className="pro-desc">{product.description}</p>

                        <div className="action_link">
                            <button
                                className={`btn btn-cart2 ${!selectedVariant || selectedVariant.quantity <= 0 ? 'disabled' : ''}`}
                                onClick={handleAddToCartClick}
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