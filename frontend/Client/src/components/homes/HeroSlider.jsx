import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button type="button" className={className} onClick={onClick} aria-label="Previous">
      <i className="fa fa-angle-left"></i>
    </button>
  );
};

const NextArrow = (props) => {
  const { className, onClick } = props;
  return (
    <button type="button" className={className} onClick={onClick} aria-label="Next">
      <i className="fa fa-angle-right"></i>
    </button>
  );
};

const HeroSlider = () => {
  const settings = {
    dots: true,
    arrows: true,
    fade: true,
    speed: 1000,
    autoplay: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  };

  return (
    <section className="hero-slider">
      <Slider {...settings} className="hero-slider-active slick-arrow-style slick-arrow-style_hero slick-dot-style">
        {/* Slide 1 */}
        <div className="hero-single-slide hero-overlay">
          <div
            className="hero-slider-item hero-1 bg-img"
            style={{
              backgroundImage: "url(/assets/img/slider/home1-slide2.jpg)",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="hero-slider-content slide-1">
                    <h1 className="slide-title">mới nhất</h1>
                    <h2 className="slide-subtitle">
                      Giày thể thao chạy bộ <span>Đàn ông thích</span>
                    </h2>
                    <a href="/shop" className="btn btn-large btn-bg">
                      Mua Ngay
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="hero-single-slide hero-overlay">
          <div
            className="hero-slider-item hero-1 bg-img"
            style={{
              backgroundImage: "url(/assets/img/slider/home2-slide1.jpg)",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="hero-slider-content slide-2">
                    <h1 className="slide-title">Giảm giá</h1>
                    <h2 className="slide-subtitle">
                      Giày thể thao chạy bộ <span>Đàn ông thích</span>
                    </h2>
                    <a href="/shop" className="btn btn-large btn-bg">
                      Mua Ngay
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default HeroSlider;
