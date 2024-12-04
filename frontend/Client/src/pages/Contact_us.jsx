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
                    <h3 className="breadcrumb-title">LIÊN HỆ</h3>
                    <ul className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item">
                        <a href="index.html">
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
              {/* <div className="col-lg-6">
                <div className="contact-message">
                  <h4 className="contact-title">Bạn có thể điền vào mẫu dưới đây</h4>
                  <form id="contact-form" action="" method="post" className="contact-form">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <input name="first_name" placeholder="Tên *" type="text" required />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <input name="phone" placeholder="Số điện thoại *" type="text" required />
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6">
                        <input name="email_address" placeholder="Email *" type="text" required />
                      </div>
                      
                      <div className="col-12">
                        <div className="contact2-textarea text-center">
                          <textarea placeholder="Message *" name="message" className="form-control2" required defaultValue={""} />
                        </div>
                        <div className="contact-btn">
                          <button className="btn btn-sqr" type="submit">Gửi</button>
                        </div>
                      </div>
                      <div className="col-12 d-flex justify-content-center">
                        <p className="form-messege" />
                      </div>
                    </div>
                  </form>
                </div>
              </div> */}
              {contactInfo.slice(0, 2).map((info) => (
                <div className="col-lg-6" key={info.id}>
                  <div className="contact-info">
                    <h4 className="contact-title">Liên hệ với chúng tôi</h4>
                    <p>
                      Chúng tôi luôn sẵn sàng hỗ trợ bạn. Hãy liên hệ với chúng tôi qua các phương thức dưới đây
                    </p>
                    <ul>
                      <li>
                        <i className="fa fa-fax" /> Tên: {info.name}
                      </li>
                      <li>
                        <i className="fa fa-envelope-o" /> E-mail: {info.email}
                      </li>
                      <li>
                        <i className="fa fa-phone" /> {info.phone}
                      </li>
                    </ul>
                    <div class="working-time">
                      <h6>Giờ Làm Việc</h6>
                      <p>Thứ Hai - Thứ Sáu: 8:00 AM - 6:00 PM</p>
                      <p>Thứ Bảy: 9:00 AM - 2:00 PM</p>
                      <p>Chủ Nhật: Nghỉ</p>
                    </div>
                  </div>
                </div>
              ))}


            </div>
          </div>
        </div>
        {/* contact area end */}
      </main>
    </div>
  );
};

export default Contact_us;
