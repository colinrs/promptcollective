
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PromptProvider } from "./context/PromptContext";
import { LanguageProvider } from "./context/LanguageContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import PromptGallery from "./pages/PromptGallery";
import MyPrompts from "./pages/MyPrompts";
import Favorites from "./pages/Favorites";
import CreatePrompt from "./pages/CreatePrompt";
import PromptDetails from "./pages/PromptDetails";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import EmailVerification from "./pages/EmailVerification";

// Create a client with proper caching configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <PromptProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/gallery" element={<PromptGallery />} />
              <Route path="/my-prompts" element={<MyPrompts />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/create" element={<CreatePrompt />} />
              <Route path="/edit/:promptId" element={<CreatePrompt />} />
              <Route path="/prompt/:promptId" element={<PromptDetails />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/email-verification" element={<EmailVerification />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </PromptProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
