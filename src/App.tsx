
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider, useUser } from "@/contexts/UserContext";
import { TemplateProvider } from "@/contexts/TemplateContext";
import { LoginPage } from "@/components/auth/LoginPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Dashboard } from "@/pages/Dashboard";
import { GuestMode } from "@/pages/GuestMode";
import { getDefaultRoute } from "@/lib/roles";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/guest" element={<GuestMode />} />
      
      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      {/* Root redirect based on authentication */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate to={getDefaultRoute(user.role)} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      
      {/* Document routes (future implementation) */}
      <Route
        path="/document/:id"
        element={
          <ProtectedRoute>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Document Editor</h1>
                <p className="text-muted-foreground">Coming in Phase 2: Core Editor</p>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
      
      {/* Template routes (future implementation) */}
      <Route
        path="/template/:id"
        element={
          <ProtectedRoute>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Template Editor</h1>
                <p className="text-muted-foreground">Coming in Phase 3: Template System</p>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
      
      {/* Settings routes (future implementation) */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Settings</h1>
                <p className="text-muted-foreground">Coming in Phase 4: Essential Features</p>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
      
      {/* Admin routes (future implementation) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
                <p className="text-muted-foreground">Coming in Phase 4: User Management</p>
              </div>
            </div>
          </ProtectedRoute>
        }
      />

      {/* Catch all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <TemplateProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TemplateProvider>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
