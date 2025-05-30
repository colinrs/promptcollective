
import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PromptCard from "@/components/ui/PromptCard";
import { Button } from "@/components/ui/button";
import { usePrompts,Prompt } from "@/context/PromptContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

const Favorites = () => {
  const navigate = useNavigate();
  const { userSavePrompts } = usePrompts();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [savedPrompts, setSavedPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedPrompts = async () => {
      try {
        const prompts = await userSavePrompts();
        setSavedPrompts(prompts?.list);
      } catch (error) {
        console.error("Failed to fetch saved prompts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchSavedPrompts();
    }
  }, [isAuthenticated, userSavePrompts]);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    navigate("/auth?mode=login");
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{t('favorites.title')}</h1>
            <p className="text-gray-600">
              {t('favorites.description')}
            </p>
          </div>
          
          {/* Prompts Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-12 w-12 bg-primary/20 rounded-full mb-4"></div>
                <div className="h-4 w-32 bg-gray-200 rounded mb-3"></div>
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : savedPrompts?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPrompts?.map(prompt => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">{t('favorites.empty.title')}</h3>
              <p className="text-gray-600 mb-6">
                {t('favorites.empty.description')}
              </p>
              <Button onClick={() => navigate("/gallery")}>
                {t('favorites.empty.action')}
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Favorites;
