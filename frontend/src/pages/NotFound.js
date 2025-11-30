import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css';

const NotFound = () => {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="error-code">404</h1>
                <h2 className="error-title">Page Not Found</h2>
                <p className="error-description">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <div className="error-actions">
                    <Link to="/" className="btn btn-primary">
                        Go Home
                    </Link>
                    <Link to="/todos" className="btn btn-secondary">
                        View Todos
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;