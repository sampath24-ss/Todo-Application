import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { todoAPI } from '../services/api';
import '../styles/TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all'); // all, completed, active

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await todoAPI.getAllTodos();
            setTodos(response.data || []);
        } catch (err) {
            setError('Failed to fetch todos. Please try again.');
            console.error('Error fetching todos:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = async (id) => {
        try {
            const response = await todoAPI.toggleTodo(id);
            setTodos(todos.map(todo =>
                todo.id === id ? response.data : todo
            ));
        } catch (err) {
            console.error('Error toggling todo:', err);
            alert('Failed to update todo');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this todo?')) {
            return;
        }

        try {
            await todoAPI.deleteTodo(id);
            setTodos(todos.filter(todo => todo.id !== id));
        } catch (err) {
            console.error('Error deleting todo:', err);
            alert('Failed to delete todo');
        }
    };

    const getFilteredTodos = () => {
        switch (filter) {
            case 'completed':
                return todos.filter(todo => todo.completed);
            case 'active':
                return todos.filter(todo => !todo.completed);
            default:
                return todos;
        }
    };

    const filteredTodos = getFilteredTodos();
    const stats = {
        total: todos.length,
        completed: todos.filter(t => t.completed).length,
        active: todos.filter(t => !t.completed).length,
    };

    if (loading) {
        return (
            <div className="todo-list-container">
                <div className="loading">Loading todos...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="todo-list-container">
                <div className="error">
                    <p>{error}</p>
                    <button onClick={fetchTodos} className="btn btn-primary">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="todo-list-container">
            <div className="todo-header">
                <h1>My Todos</h1>
                <Link to="/todos/new" className="btn btn-primary">
                    + New Todo
                </Link>
            </div>

            <div className="stats-bar">
                <div className="stat">
                    <span className="stat-label">Total:</span>
                    <span className="stat-value">{stats.total}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Active:</span>
                    <span className="stat-value">{stats.active}</span>
                </div>
                <div className="stat">
                    <span className="stat-label">Completed:</span>
                    <span className="stat-value">{stats.completed}</span>
                </div>
            </div>

            <div className="filter-bar">
                <button
                    className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All
                </button>
                <button
                    className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
                    onClick={() => setFilter('active')}
                >
                    Active
                </button>
                <button
                    className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                    onClick={() => setFilter('completed')}
                >
                    Completed
                </button>
            </div>

            {filteredTodos.length === 0 ? (
                <div className="empty-state">
                    <p>No todos found</p>
                    <Link to="/todos/new" className="btn btn-secondary">
                        Create your first todo
                    </Link>
                </div>
            ) : (
                <div className="todo-grid">
                    {filteredTodos.map((todo) => (
                        <div key={todo.id} className={`todo-card ${todo.completed ? 'completed' : ''}`}>
                            <div className="todo-card-header">
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleToggle(todo.id)}
                                    className="todo-checkbox"
                                />
                                <h3 className="todo-title">{todo.title}</h3>
                            </div>

                            {todo.description && (
                                <p className="todo-description">{todo.description}</p>
                            )}

                            <div className="todo-meta">
                                <span className="todo-date">
                                    {new Date(todo.created_at).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="todo-actions">
                                <Link to={`/todos/${todo.id}`} className="btn btn-sm btn-secondary">
                                    View
                                </Link>
                                <Link to={`/todos/${todo.id}/edit`} className="btn btn-sm btn-primary">
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(todo.id)}
                                    className="btn btn-sm btn-danger"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TodoList;