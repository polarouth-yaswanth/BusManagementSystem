import React from "react";
import './Footer.css'; // We'll add some basic styling here

function Footer() {
    const currentYear = new Date().getFullYear(); // Get the current year dynamically

    return (
        <footer className="footer">
            <p>This Project is done by Cloud Avengers. Copyright &copy; {currentYear}</p>
        </footer>
    );
}

export default Footer;
