import axios from 'axios';

const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

api.interceptors.request.use(
    (config) => {
        console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const todoAPI = {
    getAllTodos: async () => {
        const response = await api.get('/todos');
        return response.data;
    },
    getTodoById: async (id) => {
        const response = await api.get(`/todos/${id}`);
        return response.data;
    },
    createTodo: async (todoData) => {
        const response = await api.post('/todos', todoData);
        return response.data;
    },
    updateTodo: async (id, todoData) => {
        const response = await api.put(`/todos/${id}`, todoData);
        return response.data;
    },
    toggleTodo: async (id) => {
        const response = await api.patch(`/todos/${id}/toggle`);
        return response.data;
    },
    deleteTodo: async (id) => {
        const response = await api.delete(`/todos/${id}`);
        return response.data;
    },
};

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
