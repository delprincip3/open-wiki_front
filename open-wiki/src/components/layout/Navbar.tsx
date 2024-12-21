import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { User } from "@/types";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/dist/sweetalert2.css';
import { useNavigate } from 'react-router-dom';

// Questo è un dato mock che verrà sostituito con dati reali dal backend
const mockUser: User = {
  username: "Mario Rossi",
  id: "1"
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

  const handleLogoHover = () => {
    const tooltip = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });

    // Mostra un messaggio diverso in base alla vista corrente
    if (currentView === "featured") {
      tooltip.fire({
        icon: 'info',
        title: 'Torna alla pagina iniziale'
      });
    } else {
      tooltip.fire({
        icon: 'info',
        title: 'Clicca per tornare all\'articolo del giorno'
      });
    }
  };

  const handleLogoClick = () => {
    if (currentView === "featured") {
      // Se siamo già nell'articolo del giorno, torniamo alla welcome page
      navigate('/');
    } else {
      // Altrimenti torniamo all'articolo del giorno
      onLogoClick();
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
          <span className="text-gray-700">
            {mockUser.username}
          </span>
        </div>
      </div>
    </nav>
  );
} 