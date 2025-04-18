
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import { TranslationProvider } from "./hooks/useTranslation";
import { AuthProvider } from "./hooks/useAuth";
import Login from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjectEdit from "./pages/admin/AdminProjectEdit";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminCertificates from "./pages/admin/AdminCertificates";
import AdminAuthorInfo from "./pages/admin/AdminAuthorInfo";
import AdminContact from "./pages/admin/AdminContact";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminProjectinfo from "./pages/admin/AdminProjectinfo";

const queryClient = new QueryClient();

const App = () => (
  
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <TranslationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<Login />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/admin/projectinfo" element={
                <ProtectedRoute>
                  <AdminProjectinfo />
                </ProtectedRoute>
              } />
              <Route path="/admin/project/:id" element={
                <ProtectedRoute>
                  <AdminProjectEdit />
                </ProtectedRoute>
              } />
              <Route path="/admin/project/new" element={
                <ProtectedRoute>
                  <AdminProjectEdit />
                </ProtectedRoute>
              } />
              <Route path="/admin/certificates" element={
                <ProtectedRoute>
                  <AdminCertificates />
                </ProtectedRoute>
              } />
              <Route path="/admin/author-info" element={
                <ProtectedRoute>
                  <AdminAuthorInfo />
                </ProtectedRoute>
              } />
              <Route path="/admin/contact-info" element={
                <ProtectedRoute>
                  <AdminContact />
                </ProtectedRoute>
              } />
              <Route path="/admin/skills" element={
                <ProtectedRoute>
                  <AdminSkills />
                </ProtectedRoute>
              } />
              
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TranslationProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
