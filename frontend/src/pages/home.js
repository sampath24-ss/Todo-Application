import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="hero-section">
                <h1 className="hero-title">Welcome to TODO App</h1>
                <p className="hero-subtitle">
                    Manage your tasks efficiently and stay organized
                </p>
                <div className="hero-buttons">
                    <Link to="/todos" className="btn btn-primary">
                        View All Todos
                    </Link>
                    <Link to="/todos/new" className="btn btn-secondary">
                        Create New Todo
                    </Link>
                </div>
            </div>

            <div className="features-section">
                <h2>Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">📝</div>
                        <h3>Create Tasks</h3>
                        <p>Easily create and organize your tasks with titles and descriptions</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">✅</div>
                        <h3>Track Progress</h3>
                        <p>Mark tasks as complete and track your productivity</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">✏️</div>
                        <h3>Edit & Update</h3>
                        <p>Update your tasks anytime with our easy-to-use interface</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🗑️</div>
                        <h3>Delete Tasks</h3>
                        <p>Remove completed or unnecessary tasks to keep your list clean</p>
                    </div>
                </div>
            </div>

            <div className="stats-section">
                <div className="stat-card">
                    <h3>Simple</h3>
                    <p>Clean and intuitive interface</p>
                </div>
                <div className="stat-card">
                    <h3>Fast</h3>
                    <p>Quick task management</p>
                </div>
                <div className="stat-card">
                    <h3>Reliable</h3>
                    <p>Your data is always safe</p>
                </div>
            </div>
        </div>
    );
};

export default Home;