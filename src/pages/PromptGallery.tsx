
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PromptCard from "@/components/ui/PromptCard";
import CategoryBadge from "@/components/common/CategoryBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePrompts,ListPromptResponse, ListCategoryResponse } from "@/context/PromptContext";
import { useLanguage } from "@/context/LanguageContext";
import { Link } from "react-router-dom";

const PromptGallery = () => {
  const {searchListPrompt, listCategory,isLoading } = usePrompts();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [sortOption, setSortOption] = useState<"newest" | "popular">("newest");
  const [searchPrompts, setSearchPrompts] = useState<ListPromptResponse>(null);
  const [listCategories, setListCategories] = useState<ListCategoryResponse>(null);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await searchListPrompt(
          searchTerm.toLowerCase(), searchTerm.toLowerCase(),
          selectedCategory, sortOption);
        setSearchPrompts(response);
      } catch (error) {
        console.error("Error fetching prompts:", error);
      }
    }
    const fetchCategories = async () => {
      try {
        const response = await listCategory();
        setListCategories(response);
      } catch (error) {
        console.error("Error fetching prompts:", error);
      }
    }
    fetchPrompts();
    fetchCategories();
  }, [searchListPrompt, listCategory,searchTerm, selectedCategory, sortOption]);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(prevCategory => 
      prevCategory === categoryId ? null : categoryId
    );
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{t('gallery.title')}</h1>
              <p className="text-gray-600">
                {t('gallery.description')}
              </p>
            </div>
            
            <Button asChild>
              <Link to="/create">Create Prompt</Link>
            </Button>
          </div>
          
          {/* Filters and Search */}
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder={t('gallery.search.placeholder')}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{t('gallery.sort.label')}</span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as "newest" | "popular")}
                    className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
                  >
                    <option value="newest">{t('gallery.sort.newest')}</option>
                    <option value="popular">{t('gallery.sort.popular')}</option>
                  </select>
                </div>
                
                <Button
                  variant={selectedCategory ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  {t('gallery.categories.all')}
                </Button>
              </div>
            </div>
            
            {/* Categories */}
            <div className="mt-4 flex flex-wrap gap-2">
              {listCategories?.list.map(category => (
                <div
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`cursor-pointer transition-all ${
                    selectedCategory === category.id
                      ? "scale-105"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <CategoryBadge category={category} />
                </div>
              ))}
            </div>
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
          ) : searchPrompts?.list.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchPrompts?.list.map(prompt => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">{t('gallery.empty.title')}</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedCategory
                  ? t('gallery.empty.searchDescription')
                  : t('gallery.empty.description')}
              </p>
              <Button asChild>
                <Link to="/create">Create Prompt</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PromptGallery;
