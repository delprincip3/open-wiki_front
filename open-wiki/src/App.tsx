import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/Welcome/WelcomePage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import TestApi from "./pages/TestApi";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/test-api" 
            element={
              <ProtectedRoute>
                <TestApi />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;