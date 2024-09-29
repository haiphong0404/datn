import React from 'react';

const NotFoundPage = () => {
    const pageStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to right, #f8d7da 20%, white 20%)',
        flexDirection: 'column',
        textAlign: 'center',
        color: '#333',
    };

    const textStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    };

    const imageStyle = {
        width: '150px',
        height: '150px',
        backgroundColor: '#f0f0f0',
        marginBottom: '20px',
    };

    const linkStyle = {
        textDecoration: 'none',
        color: '#007bff',
    };

    return (
        <div style={pageStyle}>
            <div style={imageStyle}>
                {/* Placeholder for missing image */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="150"
                    height="150"
                    fill="currentColor"
                    className="bi bi-image"
                    viewBox="0 0 16 16"
                >
                    <path d="M14.002 3a1 1 0 0 1 1 1v8.002a1 1 0 0 1-1 1H2.001a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zm0-1H2.001a2 2 0 0 0-2 2v8.002a2 2 0 0 0 2 2h12.001a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
                    <path d="M10.648 8.646a.5.5 0 1 1-.707-.708l2-2a.5.5 0 1 1 .707.708l-2 2zm-5.991 5.991a.5.5 0 0 1-.707 0l-3-3a.5.5 0 1 1 .707-.708l3 3a.5.5 0 0 1 0 .708zm4.853-4.061a.5.5 0 0 0-.707 0L3.854 13.146a.5.5 0 1 0 .707.708l5.002-5.002a.5.5 0 0 0 0-.707z" />
                </svg>
            </div>
            <h1 style={textStyle}>404</h1>
            <p>Page not found</p>
            <p>Something went wrong or that page doesn't exist yet. Return Home</p>
            <a href="/" style={linkStyle}>Return Home</a>
        </div>
    );
};

export default NotFoundPage;
