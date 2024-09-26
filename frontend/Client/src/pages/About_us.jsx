
import React from 'react';

const AboutUs = () => {
    return (
        <div>

            {/* About Us Section */}
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h1 className="mb-4">Giới Thiệu Về Chúng Tôi</h1>
                        <p className="lead">Chào mừng bạn đến với <strong>Shoes Thor</strong>! Chúng tôi là điểm đến lý tưởng cho những xu hướng giày dép mới nhất, cung cấp đa dạng các loại giày từ giày thể thao đến giày công sở, đảm bảo phong cách và sự thoải mái cho mọi người.</p>
                    </div>
                    <div className="col-md-6 text-center">
                        <img width={100} src="https://kingshoes.vn/data/upload/media/giay-sneaker-chinh-hang-tphcm-tai-king-shoes-album-bo-suu-tap-16.jpg" alt="Shoe Store Image" className="img-fluid rounded mb-4" />
                    </div>
                    <div className="col-md-8">
                        <h2 className="mb-3">Sứ Mệnh Của Chúng Tôi</h2>
                        <p>Tại Shoes Thor, sứ mệnh của chúng tôi là mang đến những đôi giày chất lượng với giá cả phải chăng, đảm bảo mỗi khách hàng đều bước ra với phong cách và sự thoải mái. Chúng tôi luôn nỗ lực cập nhật những xu hướng giày mới nhất đến với khách hàng cùng với dịch vụ tuyệt vời.</p>

                        <h2 className="mt-4 mb-3">Tầm Nhìn Của Chúng Tôi</h2>
                        <p>Tầm nhìn của chúng tôi là trở thành nhà bán lẻ giày hàng đầu, nổi tiếng với việc cung cấp một bộ sưu tập giày đa dạng cho mọi dịp, trao quyền cho mỗi cá nhân thông qua những đôi giày thời thượng.</p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default AboutUs;
