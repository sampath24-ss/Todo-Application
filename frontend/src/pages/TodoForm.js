import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { todoAPI } from '../services/api';
import '../styles/TodoForm.css';

const TodoForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = Boolean(id);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        completed: false,
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isEditMode) {
            fetchTodo();
        }
    }, [id]);

    const fetchTodo = async () => {
        try {
            setLoading(true);
            const response = await todoAPI.getTodoById(id);
            setFormData({
                title: response.data.title,
                description: response.data.description || '',
                completed: response.data.completed,
            });
        } catch (err) {
            setError('Failed to fetch todo');
            console.error('Error fetching todo:', err);
        } finally {
            setLoading(false);
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length < 3) {
            newErrors.title = 'Title must be at least 3 characters';
        } else if (formData.title.length > 255) {
            newErrors.title = 'Title must be less than 255 characters';
        }

        if (formData.description && formData.description.length > 1000) {
            newErrors.description = 'Description must be less than 1000 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
        // Clear error for this field when user types
        if (errors[name]) {
            setErrors({ ...errors, [name]: null });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setLoading(true);
            setError(null);

            if (isEditMode) {
                await todoAPI.updateTodo(id, formData);
            } else {
                await todoAPI.createTodo(formData);
            }

            navigate('/todos');
        } catch (err) {
            setError(isEditMode ? 'Failed to update todo' : 'Failed to create todo');
            console.error('Error submitting form:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate(isEditMode ? `/todos/${id}` : '/todos');
    };

    return (
        <div className="todo-form-container">
            <div className="breadcrumb">
                <Link to="/">Home</Link>
                <span className="separator">/</span>
                <Link to="/todos">Todos</Link>
                <span className="separator">/</span>
                <span className="current">{isEditMode ? 'Edit' : 'New'}</span>
            </div>

            <div className="form-card">
                <h1>{isEditMode ? 'Edit Todo' : 'Create New Todo'}</h1>

                {error && (
                    <div className="alert alert-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">
                            Title <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={`form-input ${errors.title ? 'error' : ''}`}
                            placeholder="Enter todo title"
                            disabled={loading}
                        />
                        {errors.title && (
                            <span className="error-message">{errors.title}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className={`form-textarea ${errors.description ? 'error' : ''}`}
                            placeholder="Enter todo description (optional)"
                            rows="5"
                            disabled={loading}
                        />
                        {errors.description && (
                            <span className="error-message">{errors.description}</span>
                        )}
                        <span className="char-count">
                            {formData.description.length} / 1000
                        </span>
                    </div>

                    {isEditMode && (
                        <div className="form-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="completed"
                                    checked={formData.completed}
                                    onChange={handleChange}
                                    disabled={loading}
                                />
                                <span>Mark as completed</span>
                            </label>
                        </div>
                    )}

                    <div className="form-actions">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="btn btn-outline"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : isEditMode ? 'Update Todo' : 'Create Todo'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TodoForm;