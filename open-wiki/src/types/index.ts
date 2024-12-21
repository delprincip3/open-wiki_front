export interface User {
  username: string;
  id: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  dateDownloaded: string;
}

export interface FeaturedArticle {
  title: string;
  excerpt: string;
  imageUrl?: string;
  url: string;
} 