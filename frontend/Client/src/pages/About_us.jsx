
import React from 'react';

const AboutUs = () => {
    return (
        <div>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link active" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About Us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Shop</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* About Us Section */}
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 text-center">
                        <h1 className="mb-4">About Us</h1>
                        <p className="lead">Welcome to <strong>ShoeStore</strong>! We are your go-to destination for the latest trends in footwear, offering a wide range of shoes from sneakers to formal shoes, ensuring style and comfort for everyone.</p>
                    </div>
                    <div className="col-md-6 text-center">
                        <img width={100} src="https://kingshoes.vn/data/upload/media/giay-sneaker-chinh-hang-tphcm-tai-king-shoes-album-bo-suu-tap-16.jpg" alt="Shoe Store Image" className="img-fluid rounded mb-4" />
                    </div>
                    <div className="col-md-8">
                        <h2 className="mb-3">Our Mission</h2>
                        <p>At ShoeStore, our mission is to provide quality footwear at affordable prices, making sure every customer walks out in style and comfort. We aim to bring the latest trends in shoes to our customers with exceptional service.</p>

                        <h2 className="mt-4 mb-3">Our Vision</h2>
                        <p>Our vision is to become the leading shoe retailer known for offering an extensive selection of shoes for every occasion, empowering individuals through fashion-forward footwear.</p>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default AboutUs;
