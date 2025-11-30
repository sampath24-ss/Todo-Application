import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThemeDebug from './components/ThemeDebug';
import Home from './pages/home';
import TodoList from './pages/TodoList';
import TodoDetail from './pages/TodoDetails';
import TodoForm from './pages/TodoForm';
import NotFound from './pages/NotFound';
import './styles/App.css';

function App() {
    return (
        <Router>
            <div className="app">
                <Navbar />
                <main className="main-content">
                    <Routes>
                        {/* Home Route */}
                        <Route path="/" element={<Home />} />

                        {/* Todo Routes */}
                        <Route path="/todos" element={<TodoList />} />
                        <Route path="/todos/new" element={<TodoForm />} />
                        <Route path="/todos/:id" element={<TodoDetail />} />
                        <Route path="/todos/:id/edit" element={<TodoForm />} />

                        {/* 404 Route */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
                <ThemeDebug />
            </div>
        </Router>
    );
}

export default App;