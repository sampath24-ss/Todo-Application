import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                    <p className="footer-text">
                        © {currentYear} TODO App. Built with React & Express.js
                    </p>
                    <div className="footer-links">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                        >
                            GitHub
                        </a>
                        <span className="footer-separator">•</span>
                        <a
                            href="https://reactjs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                        >
                            React
                        </a>
                        <span className="footer-separator">•</span>
                        <a
                            href="https://nodejs.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                        >
                            Node.js
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;