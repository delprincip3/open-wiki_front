import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LoginPage from "../Auth/LoginPage";

export default function WelcomePage() {
  const [showLogin, setShowLogin] = useState(false);

  if (showLogin) {
    return <LoginPage onBack={() => setShowLogin(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] px-4 py-8">
      {/* Header con logo e titolo */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-serif mb-4 text-gray-800">
          Benvenuto in Open Wiki
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          La tua fonte di conoscenza libera e collaborativa
        </p>
      </header>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Card principale per il login */}
        <Card className="p-8 md:p-10 bg-white/80 backdrop-blur">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Unisciti alla nostra community
          </h2>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-gray-600">
              Il clone ufficiale di Wikipedia
            </p>
          </div>

          <p className="text-gray-700 mb-8">
            Accedi per iniziare a contribuire alla più grande enciclopedia collaborativa
          </p>

          <Button 
            className="w-full text-lg py-6 bg-[#3366cc] hover:bg-[#2a4b8d]" 
            size="lg"
            onClick={() => setShowLogin(true)}
          >
            Sign up / Login
          </Button>
        </Card>

        {/* Sezione informativa */}
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Perché Open Wiki?
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Accesso a milioni di articoli in diverse lingue
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Contribuisci con le tue conoscenze
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Interfaccia moderna e intuitiva
              </li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Statistiche
            </h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[#3366cc]">1M+</p>
                <p className="text-gray-600">Articoli</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#3366cc]">500K+</p>
                <p className="text-gray-600">Utenti</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-600">
        <p className="max-w-2xl mx-auto">
          Open Wiki è un progetto open source che mira a rendere la conoscenza accessibile a tutti.
          Unisciti a noi in questa missione.
        </p>
      </footer>
    </div>
  );
} 