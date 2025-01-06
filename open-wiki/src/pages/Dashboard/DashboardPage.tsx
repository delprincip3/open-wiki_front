import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card } from "@/components/ui/card";
import { ScrollText, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Article, WikiArticle } from "@/types";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';
import { useAuth } from "@/contexts/AuthContext";
import { wikipediaService } from '@/services/wikipedia';
import { articleService } from '@/services/articles';

export default function DashboardPage() {
  const { user } = useAuth();
  const [selectedView, setSelectedView] = useState<"featured" | "downloaded">("featured");
  const [articles, setArticles] = useState<Article[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;
  const [featuredArticle, setFeaturedArticle] = useState<WikiArticle | null>(null);

  useEffect(() => {
    if (selectedView === "featured") {
      loadFeaturedArticle();
    } else {
      loadSavedArticles();
    }
  }, [selectedView, user]);

  const loadFeaturedArticle = async () => {
    try {
      const article = await wikipediaService.getFeaturedArticle();
      setFeaturedArticle(article);
    } catch (error) {
      console.error("Failed to load featured article:", error);
    }
  };

  const loadSavedArticles = async () => {
    if (user) {
      try {
        const userArticles = await articleService.getArticles();
        setArticles(userArticles);
      } catch (error) {
        console.error("Failed to load saved articles:", error);
      }
    }
  };

  // Calcola gli articoli da mostrare nella pagina corrente
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handleLogoClick = () => {
    setSelectedView("featured");
  };

  const handleEditArticle = async (article: Article) => {
    const { value: formValues } = await Swal.fire({
      title: 'Modifica Articolo',
      html: `
        <div class="space-y-4">
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Titolo
            </label>
            <input 
              id="swal-title" 
              class="w-full px-3 py-2 border rounded-md" 
              value="${article.title}"
            >
          </div>
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Contenuto
            </label>
            <textarea 
              id="swal-content" 
              class="w-full px-3 py-2 border rounded-md h-32"
            >${article.content}</textarea>
          </div>
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              URL Immagine
            </label>
            <input 
              id="swal-image" 
              class="w-full px-3 py-2 border rounded-md"
              value="${article.imageUrl || ''}"
            >
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Salva',
      cancelButtonText: 'Annulla',
      width: '32rem',
      preConfirm: () => {
        const title = (document.getElementById('swal-title') as HTMLInputElement).value;
        const content = (document.getElementById('swal-content') as HTMLTextAreaElement).value;
        const imageUrl = (document.getElementById('swal-image') as HTMLInputElement).value;
        
        if (!title.trim() || !content.trim()) {
          Swal.showValidationMessage('Titolo e contenuto sono obbligatori');
          return false;
        }
        
        return {
          title,
          content,
          imageUrl: imageUrl.trim() || undefined
        };
      }
    });

    if (formValues) {
      // Qui andrà la chiamata API per aggiornare l'articolo nel backend
      // Per ora aggiorniamo solo lo stato locale
      const updatedArticles = articles.map(a => 
        a.id === article.id 
          ? { ...a, ...formValues }
          : a
      );
      setArticles(updatedArticles);

      await Swal.fire({
        icon: 'success',
        title: 'Articolo aggiornato!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    }
  };

  const handleDeleteArticle = async (article: Article) => {
    const result = await Swal.fire({
      title: 'Sei sicuro?',
      text: `Vuoi eliminare l'articolo "${article.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sì, elimina',
      cancelButtonText: 'Annulla'
    });

    if (result.isConfirmed) {
      // Qui andrà la chiamata API per eliminare l'articolo dal backend
      // Per ora aggiorniamo solo lo stato locale
      const updatedArticles = articles.filter(a => a.id !== article.id);
      setArticles(updatedArticles);

      await Swal.fire({
        icon: 'success',
        title: 'Articolo eliminato!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    }
  };

  const handleReadFullArticle = async () => {
    if (!featuredArticle) return;

    try {
        const result = await Swal.fire({
            title: featuredArticle.title,
            html: `
                <div class="max-w-2xl mx-auto">
                    ${featuredArticle.thumbnail ? `
                        <div class="mb-4">
                            <img 
                                src="${featuredArticle.thumbnail.url}" 
                                alt="${featuredArticle.title}"
                                class="w-full max-h-[300px] object-contain rounded-lg"
                            />
                        </div>
                    ` : ''}
                    <div class="text-left space-y-4">
                        <p class="text-gray-600">
                            ${featuredArticle.description || ''}
                        </p>
                        <div class="prose max-w-none">
                            ${featuredArticle.html || featuredArticle.content || ''}
                        </div>
                    </div>
                </div>
            `,
            width: '600px',
            showConfirmButton: true,
            confirmButtonText: 'Salva articolo',
            showCancelButton: true,
            cancelButtonText: 'Chiudi',
            showCloseButton: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            customClass: {
                container: 'swal-article-container',
                popup: 'swal-article-popup',
                content: 'swal-article-content'
            }
        });

        if (result.isConfirmed) {
            await handleSaveArticle(featuredArticle);
        }
    } catch (error) {
        console.error("Failed to show article:", error);
        await Swal.fire({
            icon: 'error',
            title: 'Errore',
            text: 'Impossibile visualizzare l\'articolo'
        });
    }
  };

  const handleSaveArticle = async (article: WikiArticle) => {
    try {
        // Verifichiamo che tutti i campi necessari esistano
        if (!article || !article.title || !article.html) {
            throw new Error('Dati articolo incompleti');
        }

        const articleToSave = {
            title: article.title,
            content: article.html || '',
            imageUrl: article.thumbnail?.url || undefined,
            pageId: article.id?.toString() || '',
            wikiUrl: article.key ? `https://it.wikipedia.org/wiki/${article.key}` : ''
        };

        await articleService.saveArticle(articleToSave);

        await Swal.fire({
            icon: 'success',
            title: 'Articolo salvato',
            text: 'L\'articolo è stato salvato con successo',
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
        });

        setSelectedView("downloaded");
        await loadSavedArticles();
    } catch (error) {
        console.error("Failed to save article:", error);
        await Swal.fire({
            icon: 'error',
            title: 'Errore',
            text: 'Impossibile salvare l\'articolo. Verifica che tutti i dati siano presenti.'
        });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        onLogoClick={handleLogoClick} 
        currentView={selectedView}
      />
      
      <div className="pt-16 flex flex-col lg:flex-row">
        {/* Sidebar - ora responsive */}
        <aside className="w-full lg:w-64 lg:fixed lg:left-0 lg:top-16 lg:bottom-0 bg-white border-b lg:border-b-0 lg:border-r overflow-y-auto">
          <div className="p-4">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <ScrollText className="h-5 w-5" />
                Articoli Scaricati
              </h2>
            </div>
            
            <button
              onClick={() => setSelectedView("downloaded")}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                selectedView === "downloaded" 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              I miei articoli
            </button>
          </div>
        </aside>

        {/* Main content - ora responsive */}
        <main className="flex-1 p-4 lg:p-6 lg:ml-64">
          {selectedView === "featured" ? (
            // Articolo del giorno
            <Card className="p-4 lg:p-6">
              <div className="flex flex-col space-y-4">
                <h1 className="text-xl lg:text-2xl font-serif text-gray-900">
                  Articolo del Giorno
                </h1>
                {featuredArticle && featuredArticle.thumbnail && (
                    <div className="relative h-48 w-full overflow-hidden rounded-lg mb-4">
                        <img
                            src={featuredArticle.thumbnail.url.replace(/^\/\//, 'https://')}
                            alt={featuredArticle.title}
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => {
                                console.error('Errore caricamento immagine:', featuredArticle.thumbnail?.url);
                                e.currentTarget.style.display = 'none';
                            }}
                            onLoad={() => console.log('Immagine caricata:', featuredArticle.thumbnail?.url)}
                        />
                    </div>
                )}
                <h2 className="text-lg lg:text-xl font-semibold">{featuredArticle?.title}</h2>
                <p className="text-gray-600">{featuredArticle?.description}</p>
                <button
                  onClick={handleReadFullArticle}
                  className="text-blue-600 hover:underline text-left"
                >
                  Leggi l'articolo completo
                </button>
              </div>
            </Card>
          ) : (
            <div className="space-y-6 lg:space-y-8">
              {/* Grid responsiva migliorata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {currentArticles.map((article) => (
                  <Card key={article.id} className="overflow-hidden flex flex-col">
                    {article.imageUrl && (
                      <div className="relative pt-[60%]">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="font-semibold text-base lg:text-lg mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Scaricato il: {new Date(article.dateDownloaded).toLocaleDateString()}
                      </p>
                      <div className="mt-auto flex flex-col sm:flex-row gap-2 sm:justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditArticle(article)}
                          className="w-full sm:w-auto"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Modifica
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full sm:w-auto text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteArticle(article)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Elimina
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Paginazione responsiva */}
              {totalPages > 1 && (
                <div className="flex justify-center flex-wrap gap-2 px-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <Button
                      key={pageNumber}
                      variant={pageNumber === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`min-w-[2.5rem] ${
                        pageNumber === currentPage ? "bg-[#3366cc]" : ""
                      }`}
                    >
                      {pageNumber}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 