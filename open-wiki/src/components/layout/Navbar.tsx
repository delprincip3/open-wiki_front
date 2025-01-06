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
  currentView: "featured" | "downloaded";
}

export default function Navbar({ onLogoClick, currentView }: NavbarProps) {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const searchTerm = e.currentTarget.search.value;
    try {
      const results = await wikipediaService.search(searchTerm);
      
      // Mostra direttamente i risultati senza salvarli nello state
      await Swal.fire({
        title: 'Risultati della ricerca',
        html: `
          <div class="space-y-4 max-h-[60vh] overflow-y-auto">
            ${results.map((result: WikiSearchResult) => `
              <div class="p-4 border rounded">
                <h3 class="font-bold">${result.title}</h3>
                <p class="text-sm text-gray-600">${result.excerpt}</p>
                <div class="mt-2">
                  <small>ID: ${result.id}</small>
                  <br/>
                  <small>Key: ${result.key}</small>
                </div>
              </div>
            `).join('')}
          </div>
        `,
        width: '600px'
      });

    } catch (error) {
      console.error("Search failed:", error);
      setError("Errore durante la ricerca");
      
      await Swal.fire({
        icon: 'error',
        title: 'Errore',
        text: 'Impossibile completare la ricerca. Controlla la console per i dettagli.'
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
    const { value: formValues } = await Swal.fire({
      title: 'Modifica Profilo',
      html: `
        <div class="space-y-4">
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input 
              id="swal-username" 
              class="w-full p-2 border rounded" 
              value="${user?.username || ''}"
            />
          </div>
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Password Attuale
            </label>
            <input 
              type="password" 
              id="swal-current-password" 
              class="w-full p-2 border rounded"
            />
          </div>
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nuova Password
            </label>
            <input 
              type="password" 
              id="swal-new-password" 
              class="w-full p-2 border rounded"
            />
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Salva',
      cancelButtonText: 'Annulla',
      preConfirm: () => {
        return {
          username: (document.getElementById('swal-username') as HTMLInputElement).value,
          currentPassword: (document.getElementById('swal-current-password') as HTMLInputElement).value,
          newPassword: (document.getElementById('swal-new-password') as HTMLInputElement).value,
        };
      }
    });

    if (formValues) {
      try {
        await authService.updateProfile(formValues);
        await refreshUser();
        await Swal.fire({
          icon: 'success',
          title: 'Profilo aggiornato!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
      } catch (error) {
        await Swal.fire({
          icon: 'error',
          title: 'Errore',
          text: error instanceof Error ? error.message : 'Errore durante l\'aggiornamento del profilo',
        });
      }
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