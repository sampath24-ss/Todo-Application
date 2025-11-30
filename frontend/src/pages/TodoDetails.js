import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { todoAPI } from '../services/api';
import '../styles/TodoDetail.css';

const TodoDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [todo, setTodo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTodo();
    }, [id]);

    const fetchTodo = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await todoAPI.getTodoById(id);
            setTodo(response.data);
        } catch (err) {
            setError('Failed to fetch todo details');
            console.error('Error fetching todo:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = async () => {
        try {
            const response = await todoAPI.toggleTodo(id);
            setTodo(response.data);
        } catch (err) {
            console.error('Error toggling todo:', err);
            alert('Failed to update todo');
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this todo?')) {
            return;
        }

        try {
            await todoAPI.deleteTodo(id);
            navigate('/todos');
        } catch (err) {
            console.error('Error deleting todo:', err);
            alert('Failed to delete todo');
        }
    };

    if (loading) {
        return (
            <div className="todo-detail-container">
                <div className="loading">Loading todo...</div>
            </div>
        );
    }

    if (error || !todo) {
        return (
            <div className="todo-detail-container">
                <div className="error">
                    <p>{error || 'Todo not found'}</p>
                    <Link to="/todos" className="btn btn-primary">
                        Back to Todos
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="todo-detail-container">
            <div className="breadcrumb">
                <Link to="/">Home</Link>
                <span className="separator">/</span>
                <Link to="/todos">Todos</Link>
                <span className="separator">/</span>
                <span className="current">Detail</span>
            </div>

            <div className="todo-detail-card">
                <div className="todo-detail-header">
                    <div className="status-badge">
                        <span className={`badge ${todo.completed ? 'badge-success' : 'badge-warning'}`}>
                            {todo.completed ? 'Completed' : 'Active'}
                        </span>
                    </div>
                    <div className="action-buttons">
                        <button onClick={handleToggle} className="btn btn-secondary">
                            {todo.completed ? 'Mark as Active' : 'Mark as Complete'}
                        </button>
                        <Link to={`/todos/${id}/edit`} className="btn btn-primary">
                            Edit
                        </Link>
                        <button onClick={handleDelete} className="btn btn-danger">
                            Delete
                        </button>
                    </div>
                </div>

                <div className="todo-detail-content">
                    <h1 className="todo-detail-title">{todo.title}</h1>

                    {todo.description ? (
                        <div className="todo-detail-description">
                            <h3>Description</h3>
                            <p>{todo.description}</p>
                        </div>
                    ) : (
                        <p className="no-description">No description provided</p>
                    )}

                    <div className="todo-detail-meta">
                        <div className="meta-item">
                            <span className="meta-label">Created:</span>
                            <span className="meta-value">
                                {new Date(todo.created_at).toLocaleString()}
                            </span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Last Updated:</span>
                            <span className="meta-value">
                                {new Date(todo.updated_at).toLocaleString()}
                            </span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Status:</span>
                            <span className="meta-value">
                                {todo.completed ? 'Completed ✅' : 'In Progress 🔄'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="todo-detail-footer">
                    <Link to="/todos" className="btn btn-outline">
                        ← Back to Todos
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TodoDetail;