import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const NotFoundPage = () => {
    return (
        <div>
            <div
                className="breadcrumb-area breadcrumb-img bg-img"
                style={{
                    backgroundImage: "url(/assets/img/banner/shop.jpg)",
                    height: "300px", // Adjust height as necessary
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumb-wrap text-center">
                                <nav aria-label="breadcrumb">
                                    <h3 className="breadcrumb-title">404 Not Found</h3>
                                    <ul className="breadcrumb justify-content-center">
                                        <li className="breadcrumb-item">
                                            <Link to="/">
                                                <i className="fa fa-home" />
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            404
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container text-center">
                <section className="error-wrapper" style={{ margin: "50px 0" }}>
                    <i className="icon-404" style={{ fontSize: "100px", color: "#ff0000" }} />
                    <h1 style={{ fontSize: "72px", fontWeight: "bold", margin: "20px 0" }}>404</h1>
                    <h2 style={{ fontSize: "36px", margin: "10px 0" }}>Page Not Found</h2>
                    <p className="page-404" style={{ fontSize: "18px", margin: "20px 0" }}>
                        Something went wrong or that page doesn’t exist yet.{" "}
                        <Link to="/" style={{ color: "#007bff", textDecoration: "underline" }}>Return Home</Link>
                    </p>
                </section>
            </div>
        </div>
    );
};

export default NotFoundPage;
