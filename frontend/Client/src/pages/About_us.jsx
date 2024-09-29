

import React from 'react';

const AboutUs = () => {
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
              <h3 className="breadcrumb-title">ABOUT US</h3>
              <ul className="breadcrumb justify-content-center">
                <li className="breadcrumb-item">
                  <a href="index.html">
                    <i className="fa fa-home" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  About Us
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* breadcrumb area end */}
  {/* about us area start */}
  <section className="about-us section-padding">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div
            className="about-thumb js-tilt"
            data-tilt-perspective={1000}
            data-tilt-scale={1}
            data-tilt-speed={500}
            data-tilt-max={15}
          >
            <img
              className="w-100"
              src="assets/img/about/about.jpg"
              alt="about thumb"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="about-content">
            <h2 className="about-title">PULLMAN SNEAKER ABOUT US.</h2>
            <h3 className="about-subtitle">
              Investigationes demonstraverunt lectores legere me.
            </h3>
            <p>
              Quisque consequat venenatis rutrum. Quisque posuere enim augue, in
              rhoncus diam dictum non.Nunc id ante quis tellus faucibus
            </p>
            <ul className="about-info">
              <li className="add">
                <i className="fa fa-home" />
                Your address goes here
              </li>
              <li className="phone">
                <i className="fa fa-phone" />
                Phone: 0123456789
              </li>
              <li className="mail">
                <i className="fa fa-envelope" />
                Email: demo@example.com
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* about us area end */}
  {/* choosing area start */}
  <div className="choosing-area section-padding pt-0">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="section-title text-center">
            <h3 className="title">WHY CHOOSE US</h3>
            <h4 className="sub-title">
              Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque
              libero
            </h4>
          </div>
        </div>
      </div>
      <div className="row mbn-30">
        <div className="col-lg-4 col-md-4">
          <div className="single-choose-item text-center mb-30">
            <i className="fa fa-globe" />
            <h4>Free Shipping</h4>
            <p>
              Amadea Shop is a very slick and clean e-commerce template with
              endless possibilities.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-4">
          <div className="single-choose-item text-center mb-30">
            <i className="fa fa-plane" />
            <h4>Fast Delivery</h4>
            <p>
              Amadea Shop is a very slick and clean e-commerce template with
              endless possibilities.
            </p>
          </div>
        </div>
        <div className="col-lg-4 col-md-4">
          <div className="single-choose-item text-center mb-30">
            <i className="fa fa-comments" />
            <h4>Customers Support</h4>
            <p>
              Amadea Shop is a very slick and clean e-commerce template with
              endless possibilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* choosing area end */}
  {/* testimonial area start */}
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
                    "When potential customers are researching you online,
                    they're getting to know you by way of the content of your
                    website."
                  </p>
                  <div className="testimonial-author">
                    <img
                      src="assets/img/testimonial/testimonial-1.png"
                      alt="testimonial author"
                    />
                  </div>
                  <h6 className="author-designation">jhone doe</h6>
                </div>
              </div>
              {/* slide item end */}
              {/* slide item start */}
              <div className="testimonial-slide-item">
                <div className="testimonial-item text-center">
                  <p className="testimonial-desc">
                    " When potential customers are researching you online,
                    they're getting to know you by way of the content of your
                    website. "
                  </p>
                  <div className="testimonial-author">
                    <img
                      src="assets/img/testimonial/testimonial-1.png"
                      alt="testimonial author"
                    />
                  </div>
                  <h6 className="author-designation">jhone doe</h6>
                </div>
              </div>
              {/* slide item end */}
              {/* slide item start */}
              <div className="testimonial-slide-item">
                <div className="testimonial-item text-center">
                  <p className="testimonial-desc">
                    " When potential customers are researching you online,
                    they're getting to know you by way of the content of your
                    website. "
                  </p>
                  <div className="testimonial-author">
                    <img
                      src="assets/img/testimonial/testimonial-1.png"
                      alt="testimonial author"
                    />
                  </div>
                  <h6 className="author-designation">jhone doe</h6>
                </div>
              </div>
              {/* slide item end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* testimonial area end */}
  {/* team area start */}
  <div className="team-area section-padding">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="section-title text-center">
            <h3 className="title">OUR TEAM</h3>
            <h4 className="sub-title">
              Accumsan vitae pede lacus ut ullamcorper sollicitudin quisque
              libero
            </h4>
          </div>
        </div>
      </div>
      <div className="row mbn-30">
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="team-member mb-30">
            <div className="team-thumb">
              <img src="assets/img/team/01.jpg" alt="" />
              <div className="team-social">
                <a href="#">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#">
                  <i className="fa fa-linkedin" />
                </a>
                <a href="#">
                  <i className="fa fa-google-plus" />
                </a>
              </div>
            </div>
            <div className="team-content text-center">
              <h6 className="team-member-name">Jonathan Scott</h6>
              <p>Ceo</p>
            </div>
          </div>
        </div>{" "}
        {/* end single team member */}
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="team-member mb-30">
            <div className="team-thumb">
              <img src="assets/img/team/02.jpg" alt="" />
              <div className="team-social">
                <a href="#">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#">
                  <i className="fa fa-linkedin" />
                </a>
                <a href="#">
                  <i className="fa fa-google-plus" />
                </a>
              </div>
            </div>
            <div className="team-content text-center">
              <h6 className="team-member-name">Lora Bastin</h6>
              <p>Designer</p>
            </div>
          </div>
        </div>{" "}
        {/* end single team member */}
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="team-member mb-30">
            <div className="team-thumb">
              <img src="assets/img/team/03.jpg" alt="" />
              <div className="team-social">
                <a href="#">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#">
                  <i className="fa fa-linkedin" />
                </a>
                <a href="#">
                  <i className="fa fa-google-plus" />
                </a>
              </div>
            </div>
            <div className="team-content text-center">
              <h6 className="team-member-name">Erik Jonson</h6>
              <p>Developer</p>
            </div>
          </div>
        </div>{" "}
        {/* end single team member */}
        <div className="col-lg-3 col-md-6 col-sm-6">
          <div className="team-member mb-30">
            <div className="team-thumb img-full">
              <img src="assets/img/team/04.jpg" alt="" />
              <div className="team-social">
                <a href="#">
                  <i className="fa fa-facebook" />
                </a>
                <a href="#">
                  <i className="fa fa-twitter" />
                </a>
                <a href="#">
                  <i className="fa fa-linkedin" />
                </a>
                <a href="#">
                  <i className="fa fa-google-plus" />
                </a>
              </div>
            </div>
            <div className="team-content text-center">
              <h6 className="team-member-name">Maria Mery</h6>
              <p>Marketing Officer</p>
            </div>
          </div>
        </div>{" "}
        {/* end single team member */}
      </div>
    </div>
  </div>
  {/* team area end */}
</main>


        </div>
    );
};

export default AboutUs;
