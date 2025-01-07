import { authApi } from './apiConfig';
import type { User } from '@/types';

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
    }
}; 