import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { fetchBrands } from '../../api/brand';
import Slider from 'react-slick';
import useProductSlider from '../../hooks/useProductSlider';
const Brand = () => {
  const { settingsBrand } = useProductSlider();
  const { data: brands = [], error: brandsError } = useQuery({
    queryKey: ['Brands'],
    queryFn: fetchBrands,
  });
  return (
    <section
      className="testimonial-area bg-img section-padding"
      style={{
        backgroundImage: "url(/assets/img/bg/bg-testimonial.jpg)",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="testimonial-wrapper">
              <div className="testimonial-carousel">
                {/* slide item start */}
                <div className="testimonial-slide-item">
                  <div className="testimonial-item text-center">
                    <p className="testimonial-desc">
                      Giá trị cốt lõi là những nguyên tắc và tiêu chuẩn mà thương hiệu luôn tuân thủ. Đây là yếu tố quan trọng giúp xây dựng niềm tin và sự trung thành của khách hàng.
                    </p>
                    <div className="testimonial-author">
                      <img
                        src="assets/img/testimonial/testimonial-1.png"
                        alt="testimonial author"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div  style={{ marginTop: '30px'}}>
            <div className="slider-container">
              <Slider
                {...settingsBrand}
                className="responsive-slider brand-slider"
               
              >
                {Array.isArray(brands) && brands.length > 0 ? (
                  brands.map((brand) => (
                    <div className="prorelate">
                    <div key={brand.id} className="brand-item no-inline" >
                      <a href={brand.link} >
                        <img
                          src={brand.image || '/path/to/placeholder.jpg'} // Đổ hình ảnh base64 từ API
                          alt={brand.name}
                          width={80}// Kích thước hình ảnh  
                        />
                      </a>
                    </div>
                    </div>
                  ))
                ) : (
                  <p>No brands available</p> // Hiển thị nếu không có thương hiệu nào
                )}
              </Slider>
             </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Brand