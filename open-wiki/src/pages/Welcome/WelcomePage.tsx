import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LoginPage from "../Auth/LoginPage";
import RegisterPage from "../Auth/RegisterPage";

type AuthPage = "welcome" | "login" | "register";

export default function WelcomePage() {
  const [currentPage, setCurrentPage] = useState<AuthPage>("welcome");

  if (currentPage === "login") {
    return (
      <LoginPage 
        onBack={() => setCurrentPage("welcome")}
        onRegister={() => setCurrentPage("register")}
      />
    );
  }

  if (currentPage === "register") {
    return (
      <RegisterPage 
        onBack={() => setCurrentPage("login")} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] px-4 py-8">
      {/* Header con logo e titolo */}
      <header className="text-center mb-12">
        <h1 className="text-5xl font-serif mb-4 text-gray-800">
          Benvenuto in Open Wiki
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          La tua biblioteca personale di conoscenza, ispirata da Wikipedia
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
              Il clone ufficiale di Wikipedia che ti permette di salvare e personalizzare i tuoi articoli preferiti
            </p>
          </div>

          <p className="text-gray-700 mb-8">
            Accedi per iniziare a creare la tua collezione personale di articoli Wikipedia
          </p>

          <Button 
            className="w-full text-lg py-6 bg-[#3366cc] hover:bg-[#2a4b8d]" 
            size="lg"
            onClick={() => setCurrentPage("login")}
          >
            Sign up / Login
          </Button>
        </Card>

        {/* Sezione informativa */}
        <div className="space-y-6">
          <div className="bg-white/80 backdrop-blur rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Caratteristiche Principali
            </h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Articolo del giorno sempre aggiornato dalla Wikipedia ufficiale
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Ricerca istantanea in tutti gli articoli di Wikipedia
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Salva i tuoi articoli preferiti per leggerli offline
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Modifica e personalizza gli articoli salvati
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                Interfaccia moderna e intuitiva, ottimizzata per ogni dispositivo
              </li>
            </ul>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              La Tua Wikipedia Personale
            </h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-[#3366cc]">Illimitati</p>
                <p className="text-gray-600">Articoli da salvare</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#3366cc]">100%</p>
                <p className="text-gray-600">Personalizzabile</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-600">
        <p className="max-w-2xl mx-auto">
          Open Wiki trasforma il modo in cui interagisci con Wikipedia. 
          Salva, personalizza e organizza la conoscenza nel modo che preferisci.
        </p>
      </footer>
    </div>
  );
} 