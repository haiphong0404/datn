import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProductvariants from '../../hooks/useProductVariants';
import useProductById from '../../hooks/useProductById';
import useProductSlider from '../../hooks/useProductSlider';
import Slider from 'react-slick';

const Details = () => {
    const { productId } = useParams();
    const { product, loading: productLoading, error: productError } = useProductById(productId);
    const { variants, isLoading: variantsLoading, error: variantsError } = useProductvariants(productId);
    const { settings } = useProductSlider();

    const [selectedImage, setSelectedImage] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [availabilityMessage, setAvailabilityMessage] = useState('');
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(1); // Initialize quantity to 1

    // Set the first variant image as the selected image when variants are loaded
    useEffect(() => {
        if (variants.length > 0) {
            setSelectedImage(variants[0].images); // Select the first image by default
        }
    }, [variants]);

    useEffect(() => {
        const selectedVariant = variants.find(
            (variant) =>
                variant.images === selectedImage &&
                variant.color === selectedColor &&
                variant.size === selectedSize
        );

        if (selectedVariant) {
            setSelectedQuantity(1); // Reset quantity to 1 when selecting a variant
            setAvailabilityMessage(selectedVariant.quantity > 0 ? ' ' : 'Sản phẩm này đã hết hàng.');
            setSelectedPrice(selectedVariant.quantity > 0 ? selectedVariant.price : null);
        } else {
            setAvailabilityMessage('Sản phẩm này đã hết.');
            setSelectedPrice(null);
        }
    }, [selectedImage, selectedColor, selectedSize, variants]);

    const handleIncrease = () => {
        const selectedVariant = variants.find(
            (variant) =>
                variant.images === selectedImage &&
                variant.color === selectedColor &&
                variant.size === selectedSize
        );

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

    // Check if the selected variant is out of stock
    const selectedVariant = variants.find(
        (variant) =>
            variant.images === selectedImage &&
            variant.color === selectedColor &&
            variant.size === selectedSize
    );

    const isOutOfStock = selectedVariant ? selectedVariant.quantity === 0 : true;

    // Create unique color and size sets
    const uniqueColors = Array.from(new Set(variants.map(variant => variant.color)));
    const uniqueSizes = Array.from(new Set(variants.map(variant => variant.size)));

    return (
        <div className="product-details-inner">
            <div className="row">
                <div className="col-lg-5">
                    <div className="product-large-img">
                        <img src={selectedImage || variants[0].images} alt="product-large" />
                    </div>
                    <Slider {...settings} className="product-slider">
                        {variants.map((variant) => (
                            <div 
                                key={variant.id} 
                                className="pro" 
                                onClick={() => {
                                    setSelectedImage(variant.images);
                                    setSelectedColor(''); // Reset color
                                    setSelectedSize('');  // Reset size
                                }}
                            >
                               
                            </div>
                        ))}
                    </Slider>
                    <div className="variant-checkbox-group">
                        {variants.map((variant) => (
                            <label key={variant.id} className="variant-checkbox-label">
                                <div
                                    className="variant-checkbox-thumbnail"
                                    style={{ backgroundImage: `url(${variant.images})`, backgroundSize: 'cover', width: '150px', height: '150px', cursor: 'pointer' }}
                                    onClick={() => {
                                        setSelectedImage(variant.images);
                                        setSelectedColor(''); // Reset color
                                        setSelectedSize('');  // Reset size
                                    }}
                                ></div>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="col-lg-7">
                    <div className="product-details-des">
                        <h3 className="product-name">{product.name}</h3>
                        
                        <p className="text-gray-600 text-sm">Màu sắc</p>
                        <div className="flex gap-3 my-2">
                            {uniqueColors.map((color) => (
                                <button
                                    key={color}
                                    className={`${selectedColor === color ? 'text-black' : 'text-[#d5a26e]'} font-semibold text-lg px-3 py-2 rounded-2xl border ${selectedColor === color ? 'border-none' : 'border-[#d5a26e]'}`}
                                    onClick={() => setSelectedColor(color)}
                                >
                                    {color}
                                </button>
                            ))}
                        </div>

                        <p className="text-gray-600 text-sm">Kích thước</p>
                        <div className="flex gap-3 my-2">
                            {uniqueSizes.map((size) => (
                                <button
                                    key={size}
                                    className={`${selectedSize === size ? 'text-black' : 'text-[#d5a26e]'} font-semibold text-lg px-3 py-2 rounded-2xl border ${selectedSize === size ? 'border-none' : 'border-[#d5a26e]'}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>

                        {availabilityMessage && (
                            <p className={`text-sm ${availabilityMessage.includes('hết hàng') ? 'text-red-600' : 'text-green-600'}`}>
                                {availabilityMessage}
                            </p>
                        )}

                        <div className="price-box">
                            <span className="price-regular">${selectedPrice !== null ? selectedPrice : product.price}</span>
                        </div>

                        {/* Quantity Control */}
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
                            <a className={`btn btn-cart2 ${isOutOfStock ? 'disabled' : ''}`} href="#" onClick={isOutOfStock ? undefined : () => {/* handle add to cart */}}>
                                Add To Cart
                            </a>
                        </div>

                        <div className="like-icon">
                            <a className="facebook" href="#"><i className="fa fa-facebook"></i>like</a>
                            <a className="twitter" href="#"><i className="fa fa-twitter"></i>tweet</a>
                            <a className="pinterest" href="#"><i className="fa fa-pinterest"></i>save</a>
                            <a className="google" href="#"><i className="fa fa-google-plus"></i>share</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
