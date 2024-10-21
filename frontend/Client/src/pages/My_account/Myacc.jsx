import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const MyAccount = () => {

  return (
    <div>
      <main>
        {/* breadcrumb area start */}
        <div
          className="breadcrumb-area breadcrumb-img bg-img"
          style={{
            backgroundImage: "url(/assets/img/banner/shop.jpg)",
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-wrap">
                  <nav aria-label="breadcrumb">
                    <h3 className="breadcrumb-title">TÀI KHOẢN CỦA TÔI</h3>
                    <ul className="breadcrumb justify-content-center">
                      <li className="breadcrumb-item">
                        <a href="index.html">
                          <i className="fa fa-home" />
                        </a>
                      </li>
                      <li className="breadcrumb-item active" aria-current="page">
                        Tài khoản của tôi
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* breadcrumb area end */}
        {/* my account wrapper start */}
        <div className="my-account-wrapper section-padding">
          <div className="container">
            <div className="section-bg-color">
              <div className="row">
                <div className="col-lg-12">
                  {/* My Account Page Start */}
                  <div className="myaccount-page-wrapper">
                    {/* My Account Tab Menu Start */}
                    <div className="row">
                      <div className="col-lg-3 col-md-4">
                        <div className="myaccount-tab-menu nav" role="tablist">
                          <Link to="/my_account" >
                            <i className="fa fa-dashboard" />
                            Bảng Điều Khiển
                          </Link>
                          <Link to="/my_account/orders">
                            <i className="fa fa-cart-arrow-down" />
                            Đơn Hàng
                          </Link>
                          <Link to="/my_account/downloads">
                            <i className="fa fa-cloud-download" />
                            Tải Xuống
                          </Link>
                          <Link to="/my_account/payment_method">
                            <i className="fa fa-credit-card" />
                            Phương Thức Thanh Toán
                          </Link>
                          <Link to="/my_account/address_edit">
                            <i className="fa fa-map-marker" />
                            Địa Chỉ
                          </Link>
                          <Link to="/my_account/account_info">
                            <i className="fa fa-user" /> Chi Tiết Tài Khoản
                          </Link>
                          <Link to="/my_account/login-register">
                            <i className="fa fa-sign-out" /> Đăng Xuất
                          </Link>
                        </div>

                      </div>
                      {/* My Account Tab Menu End */}
                      {/* My Account Tab Content Start */}
                      <div className="col-lg-9 col-md-8">
                        <div className="tab-content" id="myaccountContent">
                          <Outlet />
                        </div>
                      </div>
                      {/* My Account Tab Content End */}
                    </div>
                  </div>{" "}
                  {/* My Account Page End */}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* my account wrapper end */}
      </main>

    </div>

  );
};
export default MyAccount;