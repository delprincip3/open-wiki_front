import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Card } from "@/components/ui/card";
import { ScrollText, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Article, FeaturedArticle } from "@/types";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';

// Questi sono dati mock che verranno sostituiti con dati reali dal backend
const mockArticles: Article[] = [
  {
    id: "1",
    title: "Storia di Roma",
    content: "Lorem ipsum...",
    imageUrl: "https://picsum.photos/200/300",
    dateDownloaded: "2024-03-20"
  },
  // ... altri articoli
];

const mockFeaturedArticle: FeaturedArticle = {
  title: "La Storia dei Dinosauri",
  excerpt: "Scopri le ultime scoperte sui dinosauri...",
  imageUrl: "https://picsum.photos/400/200",
  url: "https://wikipedia.org/..."
};

export default function DashboardPage() {
  const [selectedView, setSelectedView] = useState<"featured" | "downloaded">("featured");
  const [articles, setArticles] = useState<Article[]>(mockArticles);

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

  const handleDeleteArticle = (articleId: string) => {
    // Qui andrà la chiamata API per eliminare l'articolo
    console.log("Delete article:", articleId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onLogoClick={handleLogoClick} />
      
      <div className="pt-16 flex">
        {/* Sidebar */}
        <aside className="w-64 fixed left-0 top-16 bottom-0 bg-white border-r overflow-y-auto">
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

        {/* Main content */}
        <main className="flex-1 ml-64 p-6">
          {selectedView === "featured" ? (
            // Articolo del giorno
            <Card className="p-6">
              <div className="flex flex-col space-y-4">
                <h1 className="text-2xl font-serif text-gray-900">
                  Articolo del Giorno
                </h1>
                {mockFeaturedArticle.imageUrl && (
                  <img
                    src={mockFeaturedArticle.imageUrl}
                    alt={mockFeaturedArticle.title}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                <h2 className="text-xl font-semibold">{mockFeaturedArticle.title}</h2>
                <p className="text-gray-600">{mockFeaturedArticle.excerpt}</p>
                <a
                  href={mockFeaturedArticle.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Leggi l'articolo completo
                </a>
              </div>
            </Card>
          ) : (
            // Lista degli articoli scaricati
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.id} className="overflow-hidden">
                  {article.imageUrl && (
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-40 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{article.title}</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Scaricato il: {new Date(article.dateDownloaded).toLocaleDateString()}
                    </p>
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditArticle(article)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Modifica
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteArticle(article.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Elimina
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 