const API_URL = 'http://localhost:5001';

export const authService = {
    async login(username: string, password: string) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            credentials: 'include',  // Per gestire i cookie di sessione
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error('Login failed');
        }

        return response.json();
    },

    async testConnection() {
        try {
            const response = await fetch(`${API_URL}/auth/test`, {
                method: 'GET',
                credentials: 'include'
            });
            return response.ok;
        } catch (error) {
            console.error('Connection test failed:', error);
            return false;
        }
    },

    async register(userData: {
        username: string;
        password: string;
    }) {
        // Prima testa la connessione
        const isConnected = await this.testConnection();
        if (!isConnected) {
            throw new Error('Cannot connect to server');
        }

        try {
            console.log('Sending registration request:', userData);
            
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            console.log('Response received:', response.status);
            
            const data = await response.json();
            console.log('Response data:', data);

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            return data;
        } catch (error) {
            console.error('Registration error details:', error);
            throw error;
        }
    },

    async getUser() {
        const response = await fetch(`${API_URL}/auth/user`, {
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Failed to get user');
        }

        return response.json();
    },

    async logout() {
        const response = await fetch(`${API_URL}/auth/logout`, {
            method: 'POST',
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error('Logout failed');
        }

        return response.json();
    }
}; 