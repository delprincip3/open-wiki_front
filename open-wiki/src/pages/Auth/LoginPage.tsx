import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface LoginPageProps {
  onBack: () => void;
  onRegister: () => void;
}

export default function LoginPage({ onBack, onRegister }: LoginPageProps) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const success = await login(formData.username, formData.password);
    
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Username o password non validi');
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
            Accedi a Open Wiki
          </h2>
          <p className="text-sm text-gray-500">
            Inserisci le tue credenziali per accedere
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="text-sm text-red-500 text-center">
                {error}
              </div>
            )}
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
                placeholder="Il tuo username"
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
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="La tua password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#3366cc] hover:bg-[#2a4b8d]"
            >
              Accedi
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center">
          <div className="text-sm text-gray-500">
            Non hai un account?{" "}
            <button 
              type="button"
              onClick={onRegister}
              className="text-[#3366cc] hover:underline"
            >
              Registrati ora
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 