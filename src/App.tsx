import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import Index from "./pages/Index"
import NotFound from "./pages/NotFound"
import DocumentDashboard from "@/pages/documents"
import DocumentEditorPage from "@/pages/documents/[id]"
import TrashDashboard from "@/components/TrashDashboard"
import { ContributorLayout } from "@/components/layout/ContributorLayout"
import AuthCallbackPage from "@/pages/auth/callback"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />

            {/* ✅ Sidebar routes */}
            <Route element={<ContributorLayout />}>
              <Route path="/documents" element={<DocumentDashboard />} />
              <Route path="/documents/trash" element={<TrashDashboard />} />
            </Route>

            {/* ❌ No sidebar on document editor */}
            <Route path="/documents/:id" element={<DocumentEditorPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
