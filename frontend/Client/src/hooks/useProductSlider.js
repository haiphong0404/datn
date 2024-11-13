// useProductSlider.js
import { useState } from 'react';

const useProductSlider = () => {
  const [settings] = useState({
    dots: true, // Hiện các chấm điều hướng
    infinite: false, // Không lặp lại slider
    speed: 500, // Tốc độ chuyển đổi
    slidesToShow: 3, // Số slide hiển thị
    slidesToScroll: 1, // Số slide cuộn
    arrows: true, // Hiện nút điều hướng
   
  });
 

  // Kiểm tra số lượng variants


  return { settings }; // Trả về cấu hình slider và trạng thái slider
};

export default useProductSlider;
