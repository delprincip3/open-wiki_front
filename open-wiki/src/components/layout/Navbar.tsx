import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { User } from "@/types";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';
import { useNavigate } from 'react-router-dom';

// Questo è un dato mock che verrà sostituito con dati reali dal backend
const mockUser: User = {
  username: "Mario Rossi",
  id: "1",
  email: "mario.rossi@example.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mario"
};

interface NavbarProps {
  onLogoClick: () => void;
  currentView: "featured" | "downloaded";
}

export default function Navbar({ onLogoClick, currentView }: NavbarProps) {
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchTerm = e.currentTarget.search.value;
    console.log("Search submitted:", searchTerm);
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
              class="w-full px-3 py-2 border rounded-md"
              value="${mockUser.username}"
            >
          </div>
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input 
              id="swal-email" 
              type="email"
              class="w-full px-3 py-2 border rounded-md"
              value="${mockUser.email}"
            >
          </div>
          <div class="text-left">
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Avatar URL
            </label>
            <input 
              id="swal-avatar" 
              class="w-full px-3 py-2 border rounded-md"
              value="${mockUser.avatar}"
            >
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'Salva',
      cancelButtonText: 'Annulla',
      width: '32rem',
      preConfirm: () => {
        const username = (document.getElementById('swal-username') as HTMLInputElement).value;
        const email = (document.getElementById('swal-email') as HTMLInputElement).value;
        const avatar = (document.getElementById('swal-avatar') as HTMLInputElement).value;
        
        if (!username.trim() || !email.trim()) {
          Swal.showValidationMessage('Username e email sono obbligatori');
          return false;
        }
        
        if (!email.includes('@')) {
          Swal.showValidationMessage('Email non valida');
          return false;
        }
        
        return { username, email, avatar };
      }
    });

    if (formValues) {
      // Qui andrà la chiamata API per aggiornare il profilo nel backend
      console.log('Profilo aggiornato:', formValues);
      
      await Swal.fire({
        icon: 'success',
        title: 'Profilo aggiornato!',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
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
              placeholder="Cerca su Open Wiki..."
              type="search"
            />
          </div>
        </form>

        <div className="flex items-center space-x-4">
          <button
            className="text-gray-700 hover:text-gray-900 transition-colors"
            onClick={handleProfileClick}
            onMouseEnter={handleProfileHover}
          >
            {mockUser.username}
          </button>
        </div>
      </div>
    </nav>
  );
} 