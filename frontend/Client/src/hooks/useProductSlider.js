// src/hooks/useProductSlider.js
import { useState } from 'react';
import Slider from 'react-slick';

const useProductSlider = () => {
  const [settings, setSettings] = useState({
    slidesToShow: 1,
    arrows: false,
    fade: true,
    asNavFor: '.pro-nav',
  });

  const [navSettings, setNavSettings] = useState({
    slidesToShow: 3,
    asNavFor: '.product-large-slider',
    centerMode: true,
    arrows: false,
    centerPadding: '0',
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  });

  return { settings, navSettings };
};

export default useProductSlider;
