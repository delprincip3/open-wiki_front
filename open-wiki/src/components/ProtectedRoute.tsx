import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Reindirizza alla pagina di login se l'utente non è autenticato
    return <Navigate to="/" replace />;
  }

  // Se l'utente è autenticato, mostra il contenuto protetto
  return <>{children}</>;
} 