import axios from 'axios';

// API per Flask (autenticazione)
export const authApi = axios.create({
    baseURL: import.meta.env.VITE_AUTH_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

// API per Java (gestione articoli)
export const articleApi = axios.create({
    baseURL: import.meta.env.VITE_JAVA_API_URL || 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor per il token
articleApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}); 