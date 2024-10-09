import React from 'react';

const Contact_us = () => {
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
              <h3 className="breadcrumb-title">CONTACT US</h3>
              <ul className="breadcrumb justify-content-center">
                <li className="breadcrumb-item">
                  <a href="index.html">
                    <i className="fa fa-home" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Contact Us
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* breadcrumb area end */}
  {/* google map start */} 
  <div className="map-area section-padding">

  </div>
  {/* google map end
  {/* contact area start */}
  <div className="contact-area section-padding pt-0">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="contact-message">
            <h4 className="contact-title">Tell Us Your Project</h4>
            <form
              id="contact-form"
              action="https://htmldemo.net/pullman/pullman/assets/php/mail.php"
              method="post"
              className="contact-form"
            >
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <input
                    name="first_name"
                    placeholder="Name *"
                    type="text"
                    required=""
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <input
                    name="phone"
                    placeholder="Phone *"
                    type="text"
                    required=""
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <input
                    name="email_address"
                    placeholder="Email *"
                    type="text"
                    required=""
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <input
                    name="contact_subject"
                    placeholder="Subject *"
                    type="text"
                  />
                </div>
                <div className="col-12">
                  <div className="contact2-textarea text-center">
                    <textarea
                      placeholder="Message *"
                      name="message"
                      className="form-control2"
                      required=""
                      defaultValue={""}
                    />
                  </div>
                  <div className="contact-btn">
                    <button className="btn btn-sqr" type="submit">
                      Send Message
                    </button>
                  </div>
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <p className="form-messege" />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="contact-info">
            <h4 className="contact-title">Contact Us</h4>
            <p>
              Claritas est etiam processus dynamicus, qui sequitur mutationem
              consuetudium lectorum. Mirum est notare quam littera gothica, quam
              nunc putamus parum claram anteposuerit litterarum formas human.
            </p>
            <ul>
              <li>
                <i className="fa fa-fax" /> Address : Your address goes here
              </li>
              <li>
                <i className="fa fa-envelope-o" /> E-mail: demo@example.com
              </li>
              <li>
                <i className="fa fa-phone" /> 01324565789
              </li>
            </ul>
            <div className="working-time">
              <h6>Working Hours</h6>
              <p>
                <span>Monday – Saturday:</span>08AM – 22PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* contact area end */}
</main>

</div>

  );
};
export default Contact_us;