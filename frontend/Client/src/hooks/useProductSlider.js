import { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button 
      type="button" 
      onClick={onClick} 
      aria-label="Previous"
      className="slider-arrow slider-prev"
      style={{
        backgroundColor: '#87b106',  // Màu nền xanh
        border: 'none',              // Bỏ viền
        borderRadius: '50%',         // Bọc nút thành hình tròn
        cursor: 'pointer',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        left: '10px',
        zIndex: 1,
        transform: 'translateY(-50%)',
        width: '40px',               // Đặt kích thước cho nút
        height: '40px',              // Đặt kích thước cho nút
        textAlign: 'center',         // Căn giữa văn bản trong nút
        opacity: 0,                  // Ẩn nút mặc định
        transition: 'opacity 0.3s',  // Thêm hiệu ứng chuyển tiếp
      }}
    >
      <i  className='fa fa-angle-left'
        style={{
        
          fontSize: '20px',  // Đặt kích thước mũi tên
          color: 'white',    // Màu trắng cho mũi tên
        }}
      >
      
      </i>
    </button>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button 
      type="button" 
      onClick={onClick} 
      aria-label="Next"
      className="slider-arrow slider-next"
      style={{
        backgroundColor: '#87b106',  // Màu nền xanh
        border: 'none',              // Bỏ viền
        borderRadius: '50%',         // Bọc nút thành hình tròn
        cursor: 'pointer',
        padding: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        right: '10px',
        zIndex: 1,
        transform: 'translateY(-50%)',
        width: '40px',               // Đặt kích thước cho nút
        height: '40px',              // Đặt kích thước cho nút
        textAlign: 'center',         // Căn giữa văn bản trong nút
        opacity: 0,                  // Ẩn nút mặc định
        transition: 'opacity 0.3s',  // Thêm hiệu ứng chuyển tiếp
      }}
    >
      <i className='fa fa-angle-right'
        style={{
          fontSize: '20px',  // Đặt kích thước mũi tên
          color: 'white',    // Màu trắng cho mũi tên
        }}
      >
        
      
      </i>
    </button>
  );
};

const useProductSlider = () => {
  const [settings] = useState({
    dots: true, // Hiện các chấm điều hướng
    infinite: false, // Không lặp lại slider
    speed: 500, // Tốc độ chuyển đổi
    slidesToShow: 3, // Số slide hiển thị
    slidesToScroll: 1, // Số slide cuộn
    arrows: true, // Hiện nút điều hướng
  });

  const [settingsResponsive] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Số sản phẩm hiển thị mặc định
    slidesToScroll: 1,
    prevArrow: <PrevArrow />, // Thêm nút điều hướng Prev
    nextArrow: <NextArrow />, // Thêm nút điều hướng Next
    responsive: [
      {
        breakpoint: 768, // Thiết bị dưới 768px (điện thoại)
        settings: {
          slidesToShow: 1, // Hiển thị 1 sản phẩm
        },
      },
      {
        breakpoint: 1024, // Thiết bị từ 768px đến 1024px (máy tính bảng)
        settings: {
          slidesToShow: 2, // Hiển thị 2 sản phẩm
        },
      },
    ],
  });
  const [settingsBrand] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Số sản phẩm hiển thị mặc định
    slidesToScroll: 1,
    centerMode: true, 
    prevArrow: <PrevArrow />, // Thêm nút điều hướng Prev
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 768, // Thiết bị dưới 768px (điện thoại)
        settings: {
          slidesToShow: 1, // Hiển thị 1 sản phẩm
        },
      },
      {
        breakpoint: 1024, // Thiết bị từ 768px đến 1024px (máy tính bảng)
        settings: {
          slidesToShow: 2, // Hiển thị 2 sản phẩm
        },
      },
    ],
  });

  return { settings, settingsResponsive,settingsBrand }; // Trả về cấu hình slider và trạng thái slider
};

export default useProductSlider;
