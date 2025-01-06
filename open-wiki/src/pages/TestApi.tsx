import { useState } from 'react';
import { wikipediaService } from '@/services/wikipedia';
import { articleService } from '@/services/articles';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import type { WikiSearchResult, WikiArticle, Article } from '@/types';

export default function TestApi() {
  const [searchResults, setSearchResults] = useState<WikiSearchResult[]>([]);
  const [featuredArticle, setFeaturedArticle] = useState<WikiArticle | null>(null);
  const [savedArticles, setSavedArticles] = useState<Article[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const addLog = (message: string) => {
    setLogs(prev => [`[${new Date().toISOString()}] ${message}`, ...prev]);
  };

  const testSearch = async () => {
    setIsLoading(true);
    try {
      const results = await wikipediaService.search('Roma');
      setSearchResults(results);
      addLog('Ricerca completata con successo');
    } catch (error) {
      addLog(`Errore nella ricerca: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testFeatured = async () => {
    setIsLoading(true);
    try {
      const article = await wikipediaService.getFeaturedArticle();
      setFeaturedArticle(article);
      addLog('Articolo del giorno recuperato con successo');
    } catch (error) {
      addLog(`Errore nel recupero dell'articolo del giorno: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testGetArticles = async () => {
    setIsLoading(true);
    try {
      const articles = await articleService.getArticles();
      setSavedArticles(articles);
      addLog('Articoli salvati recuperati con successo');
    } catch (error) {
      addLog(`Errore nel recupero degli articoli salvati: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Test API</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Test Funzioni</h2>
          <div className="space-y-4">
            <Button 
              onClick={testSearch} 
              disabled={isLoading}
            >
              Test Ricerca
            </Button>
            <Button 
              onClick={testFeatured} 
              disabled={isLoading}
            >
              Test Articolo del Giorno
            </Button>
            <Button 
              onClick={testGetArticles} 
              disabled={isLoading}
            >
              Test Articoli Salvati
            </Button>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Log</h2>
          <div className="h-[300px] overflow-y-auto space-y-2 font-mono text-sm">
            {logs.map((log, i) => (
              <div key={i} className="p-2 bg-gray-50 rounded">
                {log}
              </div>
            ))}
          </div>
        </Card>

        {searchResults.length > 0 && (
          <Card className="p-4 col-span-full">
            <h2 className="text-xl font-semibold mb-4">Risultati Ricerca</h2>
            <pre className="overflow-x-auto">
              {JSON.stringify(searchResults, null, 2)}
            </pre>
          </Card>
        )}

        {featuredArticle && (
          <Card className="p-4 col-span-full">
            <h2 className="text-xl font-semibold mb-4">Articolo del Giorno</h2>
            <pre className="overflow-x-auto">
              {JSON.stringify(featuredArticle, null, 2)}
            </pre>
          </Card>
        )}

        {savedArticles.length > 0 && (
          <Card className="p-4 col-span-full">
            <h2 className="text-xl font-semibold mb-4">Articoli Salvati</h2>
            <pre className="overflow-x-auto">
              {JSON.stringify(savedArticles, null, 2)}
            </pre>
          </Card>
        )}
      </div>
    </div>
  );
} 