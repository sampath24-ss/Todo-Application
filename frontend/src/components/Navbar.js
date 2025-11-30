import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMenu}>
                    📝 TODO App
                </Link>

                <button className="navbar-toggle" onClick={toggleMenu}>
                    <span className="toggle-icon">{isMenuOpen ? '✕' : '☰'}</span>
                </button>

                <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
                    <li className="navbar-item">
                        <NavLink
                            to="/"
                            className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}
                            onClick={closeMenu}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink
                            to="/todos"
                            className={({ isActive }) => isActive ? 'navbar-link active' : 'navbar-link'}
                            onClick={closeMenu}
                        >
                            Todos
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink
                            to="/todos/new"
                            className="navbar-link navbar-link-button"
                            onClick={closeMenu}
                        >
                            + New Todo
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;