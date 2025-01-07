import axios from 'axios';

const AUTH_API_URL = 'http://localhost:5001';
const JAVA_API_URL = 'http://localhost:8080/api';
const WIKI_API_URL = 'https://it.wikipedia.org/w/rest.php/v1';

// API per autenticazione (Flask)
export const authApi = axios.create({
    baseURL: AUTH_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// API per articoli (Java)
export const articleApi = axios.create({
    baseURL: JAVA_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// API per Wikipedia
export const wikiApi = axios.create({
    baseURL: WIKI_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Configurazione interceptors
authApi.interceptors.response.use(
    response => response,
    error => {
        if (error.code === 'ERR_NETWORK') {
            console.error('Network error:', error);
            throw new Error('Impossibile connettersi al server. Verifica la tua connessione.');
        }
        throw error;
    }
);

// Interceptor per debugging SOLO per richieste non sensibili
authApi.interceptors.request.use(
    config => {
        // Non logghiamo mai le richieste di autenticazione
        if (!config.url?.includes('/auth/')) {
            console.log('Request URL:', config.url);
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Interceptor per aggiungere user_id alle richieste Java
articleApi.interceptors.request.use(
    async config => {
        try {
            const response = await authApi.get('/auth/user');
            if (response.data?.id) {
                config.headers['X-User-ID'] = response.data.id;
            }
            return config;
        } catch (error) {
            return Promise.reject(error);
        }
    }
); 