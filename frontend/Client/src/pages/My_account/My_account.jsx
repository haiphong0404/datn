import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchUsers } from '../../hooks/user';

const My_account = () => {
  const [account, setAccount] = useState({});

  const handleGetAccount = async () => {
    const res = await fetchUsers();
    const { data, message } = res?.data;

    try {
      if (res?.status === 200) {
        setAccount(data)
      } else {
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAccount();

  }, []);

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
                          <a href="#dashboad" className="active" data-bs-toggle="tab">
                            <i className="fa fa-dashboard" />
                            Bảng Điều Khiển
                          </a>
                          <a href="#orders" data-bs-toggle="tab">
                            <i className="fa fa-cart-arrow-down" />
                            Đơn Hàng
                          </a>
                          <a href="#c" data-bs-toggle="tab">
                            <i className="fa fa-cloud-download" />
                            Tải Xuống
                          </a>
                          <a href="#payment-method" data-bs-toggle="tab">
                            <i className="fa fa-credit-card" />
                            Phương Thức Thanh Toán
                          </a>
                          <a href="#address-edit" data-bs-toggle="tab">
                            <i className="fa fa-map-marker" />
                            Địa Chỉ
                          </a>
                          <a href="#account-info" data-bs-toggle="tab">
                            <i className="fa fa-user" /> Chi Tiết Tài Khoản
                          </a>
                          <a href="login-register.html">
                            <i className="fa fa-sign-out" /> Đăng Xuất
                          </a>
                        </div>

                      </div>
                      {/* My Account Tab Menu End */}
                      {/* My Account Tab Content Start */}
                      <div className="col-lg-9 col-md-8">
                        <div className="tab-content" id="myaccountContent">
                          {/* Single Tab Content Start */}
                          <div
                            className="tab-pane fade show active"
                            id="dashboad"
                            role="tabpanel"
                          >
                            <div className="myaccount-content">
                              <h5>Xác Nhận Email</h5>
                              <div className="welcome">
                                <p>
                                  Xin chào, <strong>Erik Jhonson</strong>!
                                </p>
                              </div>
                              <p className="mb-0">
                                Cảm ơn bạn đã đăng ký! Vui lòng kiểm tra email của bạn và nhấp vào liên kết xác nhận để kích hoạt tài khoản của bạn.
                              </p>
                              <p>
                                Nếu bạn không nhận được email xác nhận, hãy kiểm tra thư mục spam hoặc nhấp vào nút bên dưới để gửi lại email xác nhận.
                              </p>

                              {/* Nút xác nhận */}
                              <div className="button-container">
                                <div className="button_mail">
                                  <button className="news-btn" id="mc-submit">
                                    Gửi lại xác nhận
                                  </button>
                                </div>
                              </div>

                              <p id="status-message" className="mt-2"></p>
                            </div>


                          </div>
                          {/* Single Tab Content End */}
                          {/* Single Tab Content Start */}
                          <div className="tab-pane fade" id="orders" role="tabpanel">
                            <div className="myaccount-content">
                              <h5>Đơn Hàng</h5>
                              <div className="myaccount-table table-responsive text-center">
                                <table className="table table-bordered">
                                  <thead className="thead-light">
                                    <tr>
                                      <th>Đơn Hàng</th>
                                      <th>Ngày</th>
                                      <th>Trạng Thái</th>
                                      <th>Tổng Cộng</th>
                                      <th>Hành Động</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>1</td>
                                      <td>22 Tháng 8, 2018</td>
                                      <td>Đang Xử Lý</td>
                                      <td>$3000</td>
                                      <td>
                                        <Link to="/Order_detail_cancel" className="btn btn-sqr">
                                          Xem
                                        </Link>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>2</td>
                                      <td>22 Tháng 7, 2018</td>
                                      <td>Đã Phê Duyệt</td>
                                      <td>$200</td>
                                      <td>
                                        <Link to="/Order_detail_cancel" className="btn btn-sqr">
                                          Xem
                                        </Link>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>3</td>
                                      <td>12 Tháng 6, 2017</td>
                                      <td>Đang Chờ</td>
                                      <td>$990</td>
                                      <td>
                                        <Link to="/Order_detail_cancel" className="btn btn-sqr">
                                          Xem
                                        </Link>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          {/* Single Tab Content End */}
                          {/* Single Tab Content Start */}
                          <div
                            className="tab-pane fade"
                            id="download"
                            role="tabpanel"
                          >
                            <div className="myaccount-content">
                              <h5>Tải Xuống</h5>
                              <div className="myaccount-table table-responsive text-center">
                                <table className="table table-bordered">
                                  <thead className="thead-light">
                                    <tr>
                                      <th>Sản Phẩm</th>
                                      <th>Ngày</th>
                                      <th>Hết Hạn</th>
                                      <th>Tải Xuống</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>GIÀY NAM PRIMITIVE</td>
                                      <td>22 Tháng 8, 2018</td>
                                      <td>Có</td>
                                      <td>
                                        <a href="#" className="btn btn-sqr">
                                          <i className="fa fa-cloud-download" />
                                          Tải Tệp
                                        </a>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>GIÀY NỮ REXPO</td>
                                      <td>12 Tháng 9, 2018</td>
                                      <td>Không Bao Giờ</td>
                                      <td>
                                        <a href="#" className="btn btn-sqr">
                                          <i className="fa fa-cloud-download" />
                                          Tải Tệp
                                        </a>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                          {/* Single Tab Content End */}
                          {/* Single Tab Content Start */}
                          <div
                            className="tab-pane fade"
                            id="payment-method"
                            role="tabpanel"
                          >
                            <div className="myaccount-content">
                              <h5>Phương Thức Thanh Toán</h5>
                              <p className="saved-message">
                                Bạn chưa lưu phương thức thanh toán.
                              </p>
                            </div>
                          </div>
                          {/* Single Tab Content End */}
                          {/* Single Tab Content Start */}
                          <div
                            className="tab-pane fade"
                            id="address-edit"
                            role="tabpanel"
                          >
                            <div className="myaccount-content">
                              <h5>Địa Chỉ Thanh Toán</h5>
                              <address>
                                <p>
                                  <strong>Erik Jhonson</strong>
                                </p>
                                <p>Địa chỉ của bạn</p>
                              </address>
                              <a href="#" className="btn btn-sqr">
                                <i className="fa fa-edit" />
                                Chỉnh Sửa Địa Chỉ
                              </a>
                            </div>

                          </div>
                          {/* Single Tab Content End */}
                          {/* Single Tab Content Start */}
                          <div
                            className="tab-pane fade"
                            id="account-info"
                            role="tabpanel"
                          >
                            <div className="myaccount-content">
                              <h5>Chi Tiết Tài Khoản</h5>
                              <div className="account-details-form">
                                <form action="#">
                                  {!account && (
                                    <div className="row">
                                      <div className="col-lg-6">


                                        <div className="single-input-item">
                                          <label htmlFor="first-name" className="required">
                                            Tên
                                          </label>
                                          <input
                                            type="text"
                                            id="first-name"
                                            placeholder="Tên"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-6">
                                        <div className="single-input-item">
                                          <label htmlFor="last-name" className="required">
                                            Họ
                                          </label>
                                          <input
                                            type="text"
                                            id="last-name"
                                            placeholder="Họ"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  <div className="single-input-item">
                                    <label htmlFor="display-name" className="required">
                                      Tên Hiển Thị
                                    </label>
                                    <input
                                      type="text"
                                      id="display-name"
                                      placeholder="Tên Hiển Thị"
                                      value={account?.username}
                                    />
                                  </div>
                                  <div className="single-input-item">
                                    <label htmlFor="email" className="required">
                                      Địa Chỉ Email
                                    </label>
                                    <input
                                      type="email"
                                      id="email"
                                      placeholder="Địa Chỉ Email"
                                      value={account?.email}
                                    />
                                  </div>
                                  <div className="single-input-item">
                                    <label htmlFor="email_verified_at" className="required">
                                      Email được xác minh:
                                    </label>
                                    <input
                                      type="text"
                                      // id="email"
                                      placeholder="Email xác minh tại:"
                                      value={account?.email_verified_at}
                                    />
                                  </div>
                                  <div className="single-input-item">
                                    <label htmlFor="phone" className="required">
                                      Số điện thoại
                                    </label>
                                    <input
                                      type="text"
                                      // id="email"
                                      placeholder="Số điện thoại"
                                      value={account?.phone}
                                    />
                                  </div>
                                  <div className="single-input-item">
                                    <label htmlFor="address" className="required">
                                      Địa Chỉ
                                    </label>
                                    <input
                                      type="text"
                                      // id="email"
                                      placeholder="Địa Chỉ "
                                      value={account?.address}
                                    />
                                  </div>

                                  {/* <fieldset>
                                    <legend>Thay Đổi Mật Khẩu</legend>
                                    <div className="single-input-item">
                                      <label htmlFor="current-pwd" className="required">
                                        Mật Khẩu Hiện Tại
                                      </label>
                                      <input
                                        type="password"
                                        id="current-pwd"
                                        placeholder="Mật Khẩu Hiện Tại"
                                      />
                                    </div>
                                    <div className="row">
                                      <div className="col-lg-6">
                                        <div className="single-input-item">
                                          <label htmlFor="new-pwd" className="required">
                                            Mật Khẩu Mới
                                          </label>
                                          <input
                                            type="password"
                                            id="new-pwd"
                                            placeholder="Mật Khẩu Mới"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-lg-6">
                                        <div className="single-input-item">
                                          <label htmlFor="confirm-pwd" className="required">
                                            Xác Nhận Mật Khẩu
                                          </label>
                                          <input
                                            type="password"
                                            id="confirm-pwd"
                                            placeholder="Xác Nhận Mật Khẩu"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </fieldset> */}
                                  {/* <div className="single-input-item">
                                    <button className="btn btn-sqr">
                                      Lưu Thay Đổi
                                    </button>
                                  </div> */}
                                </form>
                              </div>
                            </div>
                          </div>{" "}
                          {/* Single Tab Content End */}
                        </div>
                      </div>{" "}
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
export default My_account;