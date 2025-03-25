
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PromptProvider } from "./context/PromptContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import PromptGallery from "./pages/PromptGallery";
import MyPrompts from "./pages/MyPrompts";
import Favorites from "./pages/Favorites";
import CreatePrompt from "./pages/CreatePrompt";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
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
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </PromptProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
