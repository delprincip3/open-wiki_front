import axios from 'axios';

const JAVA_API_URL = 'http://localhost:8080/api';
const AUTH_API_URL = 'http://localhost:5001';
const WIKI_API_URL = 'https://it.wikipedia.org/w/rest.php/v1';

// API per Flask (autenticazione)
export const authApi = axios.create({
    baseURL: AUTH_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// API per Java (gestione articoli)
export const articleApi = axios.create({
    baseURL: JAVA_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

// API per Wikipedia REST
export const wikiApi = axios.create({
    baseURL: WIKI_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Funzione per decodificare il token JWT da Flask
const decodeFlaskToken = (cookie: string) => {
    try {
        const token = cookie.split('=')[1];
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

// Interceptor semplificato
articleApi.interceptors.request.use((config) => {
    const cookies = document.cookie.split(';');
    const sessionCookie = cookies.find(cookie => cookie.trim().startsWith('session='));
    
    if (sessionCookie) {
        const decodedToken = decodeFlaskToken(sessionCookie.trim());
        if (decodedToken?.user_id) {
            config.headers['X-User-ID'] = decodedToken.user_id.toString();
        }
    }

    return config;
});

articleApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Controlla se l'utente è già sulla pagina di login
            if (window.location.pathname !== '/') {
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);

// Funzioni helper per le chiamate alla Wikipedia REST API
export const wikiService = {
    async search(query: string, limit: number = 10) {
        const response = await wikiApi.get('/search/page', {
            params: {
                q: query,
                limit: limit,
                language: 'it'
            }
        });
        return response.data.pages;
    },

    async getArticle(title: string) {
        const response = await wikiApi.get(`/page/${encodeURIComponent(title)}/with_html`);
        return response.data;
    },

    async getFeaturedArticle() {
        try {
            // Prima otteniamo l'articolo in vetrina del giorno
            const feedUrl = 'https://it.wikipedia.org/w/api.php?action=featuredfeed&feed=featured&feedformat=json&origin=*';
            const feedResponse = await axios.get(feedUrl);
            
            // Estraiamo il titolo dall'XML del feed
            const feedData = feedResponse.data;
            const today = new Date().toISOString().split('T')[0];
            const featuredItem = feedData.find(item => item.date === today);
            
            if (!featuredItem) {
                // Se non troviamo l'articolo del giorno, prendiamo l'ultimo disponibile
                const latestItem = feedData[0];
                const title = latestItem.title;
                return await this.getArticle(title);
            }

            // Otteniamo i dettagli completi dell'articolo
            return await this.getArticle(featuredItem.title);
        } catch (error) {
            console.error('Error fetching featured article:', error);
            // In caso di errore, possiamo usare un articolo di backup
            const backupTitles = [
                'Roma_antica',
                'Rinascimento',
                'Leonardo_da_Vinci',
                'Storia_d\'Italia'
            ];
            const randomTitle = backupTitles[Math.floor(Math.random() * backupTitles.length)];
            return await this.getArticle(randomTitle);
        }
    }
}; 