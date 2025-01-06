export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
}

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface WikiSearchResult {
  id: number;
  key: string;
  title: string;
  excerpt: string;
  description: string;
  thumbnail?: {
    url: string;
    width: number;
    height: number;
  };
}

export interface WikiArticle {
  id: number;
  key: string;
  title: string;
  content?: string;
  html: string;
  description: string;
  thumbnail?: {
    url: string;
    width: number;
    height: number;
  };
}

export interface Article {
  id: string;
  userId: string;
  title: string;
  content: string;
  imageUrl?: string;
  pageId: string;
  wikiUrl: string;
  dateDownloaded: string;
} 