import React, { useState, useEffect } from 'react';

const Contact_us = () => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    // Gọi API để lấy thông tin liên hệ
    fetch('http://127.0.0.1:8000/api/contacts')
      .then((response) => response.json())
      .then((data) => setContactInfo(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  if (!contactInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <main>
        {/* breadcrumb area start */}
        <div
          className="breadcrumb-area breadcrumb-img bg-img"
          style={{
            backgroundImage: 'url(/assets/img/banner/shop.jpg)',
          }}
        >
          
          <div className="container">
            
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-wrap">
                  <nav aria-label="breadcrumb">
                    <h3 className="breadcrumb-title">Liên hệ</h3>
                    <ul className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item">
                        <a href="">
                          <i className="fa fa-home" />
                        </a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Liên hệ
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* breadcrumb area end */}


        {/* contact area start */}
        <div className="contact-area section-padding pt-0">
          <div className="container">
            <div className="row">
              {/* Thông tin liên hệ */}
              <div className="col-lg-6">
                <div className="contact-info">
                  <h4 className="contact-title">Liên hệ với chúng tôi</h4>
                  <p>
                    Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi qua các phương thức dưới đây
                  </p>
                  <ul>
                    <li>
                      <i className="fa fa-fax" /> Tên: {contactInfo[0].name}
                    </li>
                    <li>
                      <i className="fa fa-envelope-o" /> E-mail: {contactInfo[0].email}
                    </li>
                    <li>
                      <i className="fa fa-phone" /> {contactInfo[0].phone}
                    </li>
                  </ul>
                  <div className="working-time">
                    <h6>Giờ Làm Việc</h6>
                    <p>Thứ Hai - Thứ Sáu: 8:00 AM - 6:00 PM</p>
                    <p>Thứ Bảy: 9:00 AM - 2:00 PM</p>
                    <p>Chủ Nhật: Nghỉ</p>
                  </div>
                </div>
              </div>

              {/* Chính sách đổi trả và hoàn tiền */}
              <div className="col-lg-6">
                <div className="contact-info">
                  <h4 className="contact-title">Chính Sách Đổi Trả & Hoàn Tiền</h4>
                  <p>
                    Chúng tôi cam kết bảo vệ quyền lợi khách hàng bằng các chính sách đổi trả và hoàn tiền sau:
                  </p>
                  <ul>
                    <li>
                      <i className="fa fa-check-circle" /> <strong>Thời hạn đổi trả:</strong> Trong vòng 7 ngày kể từ khi nhận hàng.
                    </li>
                    <li>
                      <i className="fa fa-check-circle" /> <strong>Điều kiện:</strong> Sản phẩm còn nguyên vẹn, chưa qua sử dụng, có đầy đủ hóa đơn và bao bì.
                    </li>
                    <li>
                      <i className="fa fa-check-circle" /> <strong>Hoàn tiền:</strong> 
                      - Áp dụng với đơn hàng thanh toán online nếu:
                      <ul>
                        <li>Sản phẩm lỗi do nhà sản xuất.</li>
                        <li>Sản phẩm không đúng mô tả hoặc sai hàng.</li>
                      </ul>
                    </li>
                    <li>
                      <i className="fa fa-check-circle" /> <strong>Hình thức hoàn tiền:</strong> 
                      - Hoàn trả qua tài khoản ngân hàng hoặc ví điện tử mà khách hàng đã sử dụng để thanh toán.
                    </li>
                    <li>
                      <i className="fa fa-check-circle" /> <strong>Chi phí:</strong> Miễn phí đổi trả với sản phẩm lỗi. 
                      Khách hàng chịu phí vận chuyển trong trường hợp đổi ý.
                    </li>
                  </ul>
                  <p>
                    Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi. Chúng tôi sẵn sàng giúp đỡ!
                  </p>
                </div>
              </div>
            </div>
            {/* Google Map Embed */}
         
          </div>
        </div>
        {/* contact area end */}
        <div className="col-12">
  <div className="map-area" style={{ position: "relative", width: "100%", paddingBottom: "500px" }}>

    <iframe
      title="Google Map"
     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.6583486793397!2d105.71640227503195!3d21.046352080607413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345443c9ff3663%3A0x405422ba263f7975!2zMTI0IMSQLiBEaSBUcuG6oWNoLCBEaSBUcuG6oWNoLCBOYW0gVOG7qyBMacOqbSwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1734017206096!5m2!1svi!2s"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: 0,
      }}
      allowFullScreen=""
      loading="lazy"
    ></iframe>
  </div>
</div>
      </main>
    </div>
  );
};

export default Contact_us;
