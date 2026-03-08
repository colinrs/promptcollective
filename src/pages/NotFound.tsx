
import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useLanguage } from "@/context/LanguageContext";
import SEOHead from "@/components/common/SEOHead";

const NotFound = () => {
  const location = useLocation();
  const { t, language } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title={language === 'zh' ? '页面未找到 - PromptCollective' : 'Page Not Found - PromptCollective'}
        noIndex={true}
      />
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="text-center max-w-md mx-auto">
          <div className="text-primary text-9xl font-bold mb-4">404</div>
          <h1 className="text-4xl font-bold mb-4">{t('notFound.title')}</h1>
          <p className="text-xl text-gray-600 mb-8">
            {t('notFound.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">{t('notFound.actions.home')}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/gallery">{t('notFound.actions.explore')}</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
