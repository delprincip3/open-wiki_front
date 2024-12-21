export interface User {
  username: string;
  id: string;
  email: string;
  avatar: string;
}

export interface Article {
  id: string;
  userId: string;
  title: string;
  content: string;
  imageUrl?: string;
  dateDownloaded: string;
}

export interface FeaturedArticle {
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string;
  url: string;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
} 