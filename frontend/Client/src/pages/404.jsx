import React from 'react';

const NotFoundPage = () => {

    return (
        <div style={styles.container}>
            <img
                src="https://cdn-icons-png.flaticon.com/512/64/64814.png"
                alt="404 icon"
                style={styles.image}
            />
            <h1 style={styles.heading}>404</h1>
            <p style={styles.text}>page not found</p>
            <p style={styles.text}>
                Something went wrong or that page doesn’t exist yet.{" "}
                <a href="/" style={styles.link}>Return Home</a>
            </p>
        </div>
    );
};

const styles = {
    container: {
        margin: 0,
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#3cc5d5",
        fontFamily: "Arial, sans-serif",
        textAlign: "center"
    },
    image: {
        width: "150px",
        marginBottom: "20px"
    },
    heading: {
        fontSize: "96px",
        color: "white",
        margin: 0
    },
    text: {
        fontSize: "18px",
        color: "white",
        marginTop: "10px"
    },
    link: {
        color: "#ffffff",
        textDecoration: "none",
        fontWeight: "bold"
    }
};

export default NotFoundPage;
