import { wikiApi } from './api';
import type { WikiSearchResult, WikiArticle } from '@/types';
import axios from 'axios';

export const wikipediaService = {
    async search(query: string, limit: number = 10) {
        try {
            const response = await wikiApi.get('/search/page', {
                params: {
                    q: query,
                    limit,
                    language: 'it'
                }
            });
            return response.data.pages;
        } catch (error) {
            console.error('Error searching Wikipedia:', error);
            throw error;
        }
    },

    async getArticle(title: string) {
        try {
            const response = await wikiApi.get(`/page/${encodeURIComponent(title)}/with_html`);
            return response.data;
        } catch (error) {
            console.error('Error getting article:', error);
            throw error;
        }
    },

    async getFeaturedArticle() {
        try {
            const response = await axios.get('https://it.wikipedia.org/w/api.php', {
                params: {
                    action: 'query',
                    format: 'json',
                    prop: 'extracts|pageimages',
                    generator: 'random',
                    grnnamespace: '0',
                    grnlimit: '1',
                    exchars: '1000',
                    exlimit: '1',
                    explaintext: '1',
                    piprop: 'thumbnail',
                    pithumbsize: '400',
                    origin: '*'
                }
            });

            const pages = response.data.query.pages;
            const pageId = Object.keys(pages)[0];
            const page = pages[pageId];

            return {
                id: parseInt(pageId),
                key: page.title.replace(/ /g, '_'),
                title: page.title,
                html: page.extract,
                description: page.extract.substring(0, 200) + '...',
                thumbnail: page.thumbnail ? {
                    url: page.thumbnail.source,
                    width: page.thumbnail.width,
                    height: page.thumbnail.height
                } : undefined
            };
        } catch (error) {
            console.error('Error getting featured article:', error);
            throw error;
        }
    }
}; 