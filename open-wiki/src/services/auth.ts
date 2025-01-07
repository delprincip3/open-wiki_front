import { authApi } from './apiConfig';
import type { User } from '@/types';
import { articleApi } from './apiConfig';

export const authService = {
    async register(data: { username: string; password: string }): Promise<User> {
        try {
            const response = await authApi.post('/auth/register', data);
            return response.data;
        } catch (error: any) {
            if (error.code === 'ERR_NETWORK') {
                throw new Error('Impossibile connettersi al server. Verifica la tua connessione.');
            }
            throw error;
        }
    },

    async login(username: string, password: string): Promise<User> {
        try {
            const response = await authApi.post('/auth/login', { username, password });
            return response.data;
        } catch (error: any) {
            if (error.code === 'ERR_NETWORK') {
                throw new Error('Impossibile connettersi al server. Verifica la tua connessione.');
            }
            throw error;
        }
    },

    async logout(): Promise<void> {
        await authApi.post('/auth/logout');
    },

    async getCurrentUser(): Promise<User> {
        const response = await authApi.get('/auth/me');
        return response.data;
    },

    async updateProfile(updates: {
        username?: string;
        currentPassword?: string;
        newPassword?: string;
    }): Promise<User> {
        const response = await authApi.put('/auth/update-profile', updates);
        return response.data;
    },

    async saveArticle(article: {
        title: string;
        content: string;
        pageId: string;
        wikiUrl: string;
        imageUrl?: string;
    }): Promise<void> {
        try {
            // Formatta l'articolo nel formato corretto per il DB
            const formattedArticle = {
                title: article.title,
                content: article.content,
                page_id: article.pageId,        // Converti in snake_case
                wiki_url: article.wikiUrl,      // Converti in snake_case
                image_url: article.imageUrl     // Converti in snake_case
            };

            console.log('Saving formatted article:', formattedArticle); // Debug log
            
            // Usa articleApi invece di authApi
            await articleApi.post('/articles', formattedArticle);
        } catch (error: any) {
            console.error('Error saving article:', error);
            if (error.code === 'ERR_NETWORK') {
                throw new Error('Impossibile connettersi al server. Verifica la tua connessione.');
            }
            throw error;
        }
    }
}; 