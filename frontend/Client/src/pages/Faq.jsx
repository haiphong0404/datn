
import React from 'react';

const faq = () => {
    return (
        <div>
            <main>
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
                                        <h3 className="breadcrumb-title">FAQ</h3>
                                        <ul className="breadcrumb justify-content-center">
                                            <li className="breadcrumb-item">
                                                <a href="index.html">
                                                    <i className="fa fa-home" />
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                                FAQ
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default faq;
