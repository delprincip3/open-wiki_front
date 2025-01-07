import { articleApi } from './api';
import type { Article } from '@/types';

export const articleService = {
    async getArticles() {
        const response = await articleApi.get<Article[]>('/articles');
        return response.data;
    },

    async saveArticle(article: Omit<Article, 'id' | 'userId' | 'dateDownloaded'>) {
        // Assicuriamoci che tutti i campi necessari siano presenti e validi
        const articleToSave = {
            title: article.title,
            content: article.content || '',
            pageId: article.pageId || '',
            wikiUrl: article.wikiUrl || '',
            imageUrl: article.imageUrl
        };

        const response = await articleApi.post<Article>('/articles', articleToSave);
        return response.data;
    },

    async updateArticle(id: string, article: Partial<Article>) {
        const response = await articleApi.put<Article>(`/articles/${id}`, article);
        return response.data;
    },

    async deleteArticle(id: string) {
        await articleApi.delete(`/articles/${id}`);
    }
}; 