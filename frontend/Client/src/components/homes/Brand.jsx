import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { fetchBrands } from '../../api/brand';

const Brand = () => {
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
                          "Khi khách hàng tiềm năng đang nghiên cứu về bạn trực tuyến, họ đang tìm hiểu về bạn qua nội dung của trang web của bạn."
                        </p>
                        <div className="testimonial-author">
                          <img
                            src="assets/img/testimonial/testimonial-1.png"
                            alt="testimonial author"
                          />
                        </div>
                        <h6 className="author-designation">MINH HIẾU</h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="brand-section">
                  {Array.isArray(brands) && brands.length > 0 ? (
                        brands.map((brand) => (
                          <div key={brand.id} className="brand-item">
                            <a href={brand.link}>
                            <img
                                    src={brand.image || '/path/to/placeholder.jpg'} // Đổ hình ảnh base64 từ API
                                    alt={brand.name}
                                    style={{ width: '100px', height: '100px' }} // Kích thước hình ảnh
                                />
                            </a>
                          </div>
                        ))
                      ) : (
                        <p>No brands available</p> // Hiển thị nếu không có thương hiệu nào
                      )}
                </div>
              </div>
            </div>
          </div>
        </section>
  )
}

export default Brand