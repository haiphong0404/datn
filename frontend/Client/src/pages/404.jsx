import React from 'react';

const NotFoundPage = () => {

    return (
        <div className="container">
            <section className="error-wrapper">
                <i className="icon-404" />
                <h1>404</h1>
                <h2>page not found</h2>
                <p className="page-404">
                    Something went wrong or that page doesn’t exist yet.{" "}
                    <a href="index.html">Return Home</a>
                </p>
            </section>
        </div>

    );
};



export default NotFoundPage;
