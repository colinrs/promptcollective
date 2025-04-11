
import {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PromptCard from "@/components/ui/PromptCard";
import { usePrompts,Prompt } from "@/context/PromptContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

const Index = () => {
  const { searchListPrompt } = usePrompts();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [popularPrompts, setPopularPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    const fetchPrompts = async () => {
      const listPromptResponse = await searchListPrompt(null, null,
        null, "popular", 1, 6);
      const prompts = listPromptResponse.list;
      setPopularPrompts(prompts);
    };
    fetchPrompts();
  }, [searchListPrompt]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="flex flex-col items-start max-w-2xl animate-slide-up">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {t('home.hero.title')} 
                <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"> {t('home.hero.titleHighlight')}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-xl">
                {t('home.hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="px-8 py-6 text-lg shadow-lg shadow-primary/20 animate-pulse">
                  <Link to={isAuthenticated ? "/create" : "/auth?mode=register"}>
                    {isAuthenticated ? t('home.hero.createFirst') : t('home.hero.getStarted')}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
                  <Link to="/gallery">
                    {t('home.hero.explore')}
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="relative w-full max-w-md lg:max-w-xl animate-fade-in">
              <div className="relative bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl p-1 shadow-xl">
                <div className="absolute inset-0 bg-white/60 backdrop-blur-lg rounded-2xl"></div>
                <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <div className="ml-2 text-sm text-gray-500">prompt-example.txt</div>
                  </div>
                  <div className="text-sm text-left font-mono space-y-2 text-gray-800">
                    <p>I want you to act as <span className="text-primary font-medium">a creative writing coach</span>.</p>
                    <p>Please provide feedback on my short story about <span className="text-primary font-medium">{"{theme}"}</span>.</p>
                    <p>Focus on these aspects:</p>
                    <p>1. Character development</p>
                    <p>2. Plot structure</p>
                    <p>3. Dialogue authenticity</p>
                    <p>4. Setting descriptions</p>
                    <p>5. Emotional impact</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t('home.features.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('home.features.create.title')}</h3>
              <p className="text-gray-600">
                {t('home.features.create.description')}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M17 6.1H3a3 3 0 0 0-3 3V18a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8.9a3 3 0 0 0-3-3Z"></path>
                  <path d="M10 3 7 6.1h5.3L15 3Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('home.features.organize.title')}</h3>
              <p className="text-gray-600">
                {t('home.features.organize.description')}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover-lift">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <path d="M18 16.1h.6a2.3 2.3 0 0 0 2.3-2.3V6.4a2.3 2.3 0 0 0-2.3-2.3H5.4a2.3 2.3 0 0 0-2.3 2.3v7.4a2.3 2.3 0 0 0 2.3 2.3H6"></path>
                  <path d="m10 8.4 4 3.2-4 3.2"></path>
                  <path d="M15 17v1a3 3 0 0 1-3 3v0a3 3 0 0 1-3-3v-1"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('home.features.share.title')}</h3>
              <p className="text-gray-600">
                {t('home.features.share.description')}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Popular Prompts */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">{t('home.popular.title')}</h2>
            <Link 
              to="/gallery" 
              className="text-primary hover:underline flex items-center gap-1"
            >
              {t('home.popular.viewAll')}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPrompts.map(prompt => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-blue-500/5">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('home.cta.title')}</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('home.cta.description')}
          </p>
          <Button asChild size="lg" className="px-8 py-6 text-lg">
            <Link to={isAuthenticated ? "/create" : "/auth?mode=register"}>
              {isAuthenticated ? t('home.hero.createFirst') : t('home.cta.signup')}
            </Link>
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
