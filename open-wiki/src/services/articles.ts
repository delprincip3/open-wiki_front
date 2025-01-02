import { articleApi } from './api';
import type { Article } from '@/types';

export const articleService = {
    async getArticles() {
        const response = await articleApi.get<Article[]>('/articles');
        return response.data;
    },

    async saveArticle(article: Omit<Article, 'id' | 'userId'>) {
        const response = await articleApi.post<Article>('/articles', article);
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