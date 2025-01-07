import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { WikiSearchResult } from "@/types";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/auth';
import { wikipediaService } from '@/services/wikipedia';

// Questo è un dato mock che verrà sostituito con dati reali dal backend


interface NavbarProps {
  onLogoClick: () => void;
  currentView: "featured" | "downloaded" | "guide";
}

export default function Navbar({ onLogoClick, currentView }: NavbarProps) {
  const navigate = useNavigate();
  const { user, setAuthState } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const searchTerm = e.currentTarget.search.value;
    try {
        const results = await wikipediaService.search(searchTerm);
        
        // Mostra i risultati con pulsanti per selezionare
        const { value: selectedArticle } = await Swal.fire({
            title: 'Risultati della ricerca',
            html: `
                <div class="space-y-4 max-h-[60vh] overflow-y-auto">
                    ${results.map((result: WikiSearchResult, index: number) => `
                        <div 
                            class="p-4 border rounded hover:bg-gray-50 cursor-pointer article-result" 
                            data-index="${index}"
                        >
                            <div class="flex gap-4">
                                ${result.thumbnail ? `
                                    <div class="flex-shrink-0">
                                        <img 
                                            src="${result.thumbnail.url}" 
                                            alt="${result.title}"
                                            class="w-24 h-24 object-cover rounded"
                                            onerror="this.style.display='none'"
                                        />
                                    </div>
                                ` : ''}
                                <div class="flex-grow">
                                    <h3 class="font-bold">${result.title}</h3>
                                    <p class="text-sm text-gray-600">${result.excerpt}</p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `,
            width: '600px',
            showCancelButton: true,
            confirmButtonText: 'Seleziona',
            cancelButtonText: 'Annulla',
            didOpen: (modal: HTMLElement) => {
                const articles = modal.querySelectorAll('.article-result');
                articles.forEach((article, index) => {
                    article.addEventListener('click', () => {
                        articles.forEach(a => a.classList.remove('bg-blue-50'));
                        article.classList.add('bg-blue-50');
                        // Quando un articolo viene selezionato, abilitiamo il pulsante e salviamo l'articolo
                        Swal.getConfirmButton()?.removeAttribute('disabled');
                        (window as any).selectedResult = results[index];
                    });
                });
                Swal.getConfirmButton()?.setAttribute('disabled', '');
            },
            preConfirm: () => {
                return (window as any).selectedResult;
            }
        });

        if (selectedArticle) {
            const { value: action } = await Swal.fire({
                title: selectedArticle.title,
                text: 'Cosa vuoi fare con questo articolo?',
                icon: 'question',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Leggi',
                denyButtonText: 'Salva',
                cancelButtonText: 'Annulla'
            });

            if (action) { // Leggi
                const article = await wikipediaService.getArticle(selectedArticle.key);
                await Swal.fire({
                    title: article.title,
                    html: `<div class="prose max-w-none">${article.html}</div>`,
                    width: '800px',
                    showCloseButton: true,
                    showConfirmButton: false
                });
            } else if (action === false) { // Salva
                try {
                    // Formatta l'articolo prima di salvarlo
                    const articleToSave = {
                        title: selectedArticle.title,
                        content: selectedArticle.excerpt || selectedArticle.description || '',
                        pageId: selectedArticle.id.toString(),
                        wikiUrl: `https://it.wikipedia.org/wiki/${encodeURIComponent(selectedArticle.title)}`,
                        imageUrl: selectedArticle.thumbnail?.url 
                            ? selectedArticle.thumbnail.url.startsWith('http') 
                                ? selectedArticle.thumbnail.url 
                                : `https:${selectedArticle.thumbnail.url}`
                            : undefined
                    };

                    console.log('Article to save:', articleToSave); // Debug log
                    await authService.saveArticle(articleToSave);

                    await Swal.fire({
                        icon: 'success',
                        title: 'Articolo salvato!',
                        text: 'Puoi trovarlo nella sezione articoli salvati',
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000
                    });
                } catch (error) {
                    console.error('Save failed:', error);
                    await Swal.fire({
                        icon: 'error',
                        title: 'Errore',
                        text: 'Impossibile salvare l\'articolo'
                    });
                }
            }
        }
    } catch (error) {
        console.error("Search failed:", error);
        setError("Errore durante la ricerca");
        await Swal.fire({
            icon: 'error',
            title: 'Errore',
            text: 'Impossibile completare la ricerca'
        });
    } finally {
        setIsLoading(false);
    }
  };

  const handleLogoClick = () => {
    if (currentView === "featured") {
      // Se siamo nell'articolo del giorno, torniamo alla welcome page
      navigate('/');
    } else {
      // Altrimenti torniamo all'articolo del giorno
      onLogoClick();
    }
  };

  const handleLogoHover = () => {
    const tooltip = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      didOpen: (toast: HTMLElement) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

    tooltip.fire({
      icon: 'info',
      title: currentView === "featured" 
        ? 'Clicca per tornare alla pagina di benvenuto'
        : 'Clicca per tornare all\'articolo del giorno'
    });
  };

  const handleProfileHover = () => {
    const tooltip = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false
    });

    tooltip.fire({
      icon: 'info',
      title: 'Modifica il profilo'
    });
  };

  const handleProfileClick = async () => {
    try {
        const result = await Swal.fire({
            title: 'Modifica Profilo',
            text: 'Cosa vuoi modificare?',
            icon: 'question',
            showCancelButton: true,
            showDenyButton: true,
            confirmButtonText: 'Username',
            denyButtonText: 'Password',
            cancelButtonText: 'Annulla'
        });

        if (result.isConfirmed) { // Ha scelto Username
            const { value: newUsername } = await Swal.fire({
                title: 'Modifica Username',
                input: 'text',
                inputLabel: 'Nuovo Username',
                inputValue: user?.username || '',
                showCancelButton: true,
                inputValidator: (value: string) => {
                    if (!value) {
                        return 'Devi inserire un username!';
                    }
                }
            });

            if (newUsername) {
                await authService.updateProfile({ username: newUsername });
            } else {
                return; // Utente ha annullato
            }
        } else if (result.isDenied) { // Ha scelto Password
            const passwordResult = await Swal.fire({
                title: 'Modifica Password',
                html: `
                    <input type="password" id="swal-current-password" class="swal2-input" placeholder="Password attuale">
                    <input type="password" id="swal-new-password" class="swal2-input" placeholder="Nuova password">
                `,
                focusConfirm: false,
                showCancelButton: true,
                confirmButtonText: 'Salva',
                preConfirm: () => {
                    const currentPassword = (document.getElementById('swal-current-password') as HTMLInputElement).value;
                    const newPassword = (document.getElementById('swal-new-password') as HTMLInputElement).value;
                    
                    if (!currentPassword || !newPassword) {
                        Swal.showValidationMessage('Entrambi i campi sono obbligatori');
                        return false;
                    }
                    
                    return {
                        currentPassword,
                        newPassword
                    };
                }
            });

            if (passwordResult.isConfirmed && passwordResult.value) {
                await authService.updateProfile(passwordResult.value);
            } else {
                return; // Utente ha annullato
            }
        } else {
            return; // Ha cliccato Annulla
        }

        // Se siamo arrivati qui, significa che una modifica è stata effettuata
        await Swal.fire({
            icon: 'success',
            title: 'Profilo aggiornato!',
            text: 'Per applicare le modifiche è necessario effettuare nuovamente il login con le nuove credenziali',
            confirmButtonText: 'OK'
        });

        // Logout e reindirizzamento
        await authService.logout();
        setAuthState({
            user: null,
            isAuthenticated: false
        });
        navigate('/');

    } catch (error) {
        console.error('Failed to update profile:', error);
        await Swal.fire({
            icon: 'error',
            title: 'Errore',
            text: 'Impossibile aggiornare il profilo'
        });
    }
  };

  return (
    <nav className="h-16 border-b bg-white fixed top-0 left-0 right-0 z-50">
      <div className="h-full flex items-center justify-between px-4 max-w-7xl mx-auto">
        <div className="flex items-center">
          <button
            onClick={handleLogoClick}
            onMouseEnter={handleLogoHover}
            className="text-2xl font-serif text-[#3366cc] hover:text-[#2a4b8d] transition-colors"
          >
            Open Wiki
          </button>
        </div>

        <form onSubmit={handleSearch} className="w-full max-w-xl px-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              name="search"
              className="w-full pl-10"
              placeholder={isLoading ? "Ricerca in corso..." : "Cerca su Open Wiki..."}
              type="search"
              disabled={isLoading}
            />
          </div>
          {error && (
            <div className="absolute mt-1 text-sm text-red-500">
              {error}
            </div>
          )}
        </form>

        <div className="flex items-center space-x-4">
          <button
            className="text-gray-700 hover:text-gray-900 transition-colors"
            onClick={handleProfileClick}
            onMouseEnter={handleProfileHover}
          >
            {user?.username || 'Utente'}
          </button>
        </div>
      </div>
    </nav>
  );
} 