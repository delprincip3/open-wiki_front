import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { authService } from '@/services/auth';

interface RegisterPageProps {
  onBack: () => void;
}

export default function RegisterPage({ onBack }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (formData.password !== formData.confirmPassword) {
        setError("Le password non coincidono");
        return;
    }
    
    try {
        await authService.register({
            username: formData.username,
            password: formData.password
        });
        onBack(); // Redirect al login dopo registrazione
    } catch (error) {
        if (error instanceof Error) {
            setError(error.message);
        } else {
            setError("Errore durante la registrazione");
        }
        console.error('Registration error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <Button
            variant="ghost"
            className="absolute left-4 top-4"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Indietro
          </Button>
          <h2 className="text-2xl font-semibold tracking-tight pt-6">
            Registrati su Open Wiki
          </h2>
          <p className="text-sm text-gray-500">
            Crea il tuo account per contribuire alla community
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Scegli il tuo username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Scegli una password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Conferma Password
              </label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Conferma la tua password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
              />
            </div>
            {error && (
              <p className="text-sm text-red-500 mt-2">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full bg-[#3366cc] hover:bg-[#2a4b8d]"
            >
              Registrati
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center">
          <div className="text-sm text-gray-500">
            Hai già un account?{" "}
            <button 
              type="button"
              onClick={onBack} 
              className="text-[#3366cc] hover:underline"
            >
              Accedi
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 