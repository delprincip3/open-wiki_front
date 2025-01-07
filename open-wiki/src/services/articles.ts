import { articleApi } from './api';
import type { Article } from '@/types';

export const articleService = {
    async getArticles(): Promise<Article[]> {
        try {
            const response = await articleApi.get<Article[]>('/articles');
            return response.data;
        } catch (error: any) {
            console.error('Error fetching articles:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.response?.data?.message || error.message
            });

            // Gestione specifica degli errori
            if (error.response?.status === 500) {
                throw new Error('Errore interno del server. Riprova più tardi.');
            } else if (error.response?.status === 401) {
                throw new Error('Sessione scaduta. Effettua nuovamente il login.');
            } else if (error.response?.status === 404) {
                // Se non ci sono articoli, restituisci un array vuoto invece di lanciare un errore
                return [];
            }

            // Per altri errori
            throw new Error(error.response?.data?.message || 'Errore nel caricamento degli articoli');
        }
    },

    async saveArticle(article: Omit<Article, 'id' | 'userId' | 'dateDownloaded'>) {
        try {
            const response = await articleApi.post<Article>('/articles', article);
            return response.data;
        } catch (error: any) {
            console.error('Error saving article:', {
                status: error.response?.status,
                data: error.response?.data
            });
            if (error.response?.status === 500) {
                throw new Error('Errore del server nel salvare l\'articolo');
            }
            throw error;
        }
    },

    async updateArticle(id: string, article: Partial<Article>) {
        const response = await articleApi.put<Article>(`/articles/${id}`, article);
        return response.data;
    },

    async deleteArticle(id: string) {
        try {
            await articleApi.delete(`/articles/${id}`);
        } catch (error: any) {
            console.error('Error deleting article:', {
                status: error.response?.status,
                data: error.response?.data
            });
            if (error.response?.status === 500) {
                throw new Error('Errore del server nell\'eliminare l\'articolo');
            }
            throw error;
        }
    }
}; 