import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// Request interceptor for logging
api.interceptors.request.use(
    (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// TODO API methods
export const todoAPI = {
    // Get all todos
    getAllTodos: async () => {
        const response = await api.get('/todos');
        return response.data;
    },

    // Get single todo by ID
    getTodoById: async (id) => {
        const response = await api.get(`/todos/${id}`);
        return response.data;
    },

    // Create new todo
    createTodo: async (todoData) => {
        const response = await api.post('/todos', todoData);
        return response.data;
    },

    // Update todo
    updateTodo: async (id, todoData) => {
        const response = await api.put(`/todos/${id}`, todoData);
        return response.data;
    },

    // Toggle todo completion
    toggleTodo: async (id) => {
        const response = await api.patch(`/todos/${id}/toggle`);
        return response.data;
    },

    // Delete todo
    deleteTodo: async (id) => {
        const response = await api.delete(`/todos/${id}`);
        return response.data;
    },
};

// Health check
export const checkHealth = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL.replace('/api', '')}/health`);
        return response.data;
    } catch (error) {
        console.error('Health check failed:', error);
        return null;
    }
};

export default api;