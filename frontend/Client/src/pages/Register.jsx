import React from "react";

const Register = () => {
    return (
        <>
        <div className="container mt-5 mb-5">
            <div className="col-lg-12">
                <div className="login-reg-form-wrap sign-up-form justify-content">
                    <h4>Register</h4>
                    <form action="#" method="post">
                        <div className="single-input-item">
                            <input type="text" placeholder="Full Name" required="" />
                        </div>
                        <div className="single-input-item">
                            <input type="email" placeholder="Enter your Email" required="" />
                        </div>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="single-input-item">
                                    <input
                                        type="password"
                                        placeholder="Enter your Password"
                                        required=""
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="single-input-item">
                                    <input
                                        type="password"
                                        placeholder="Repeat your Password"
                                        required=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="single-input-item">
                            <div className="login-reg-form-meta">
                                <div className="remember-meta">
                                    <div className="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="subnewsletter"
                                        />
                                        <label className="custom-control-label" htmlFor="subnewsletter">
                                            Subscribe Our Newsletter
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="single-input-item">
                            <button className="btn btn-sqr">Register</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </>
    )
}
export default Register