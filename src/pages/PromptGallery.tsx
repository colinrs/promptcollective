
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PromptCard from "@/components/ui/PromptCard";
import CategoryBadge from "@/components/common/CategoryBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePrompts } from "@/context/PromptContext";
import { Link } from "react-router-dom";

const PromptGallery = () => {
  const { prompts, categories, isLoading } = usePrompts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<"newest" | "popular">("newest");
  const [filteredPrompts, setFilteredPrompts] = useState(prompts);

  useEffect(() => {
    let result = [...prompts];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        prompt =>
          prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          prompt.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(prompt => prompt.category === selectedCategory);
    }
    
    // Apply sorting
    result = result.sort((a, b) => {
      if (sortOption === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else {
        return b.likes - a.likes;
      }
    });
    
    setFilteredPrompts(result);
  }, [prompts, searchTerm, selectedCategory, sortOption]);

  const handleCategorySelect = (categoryId: string) => {
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
              <h1 className="text-3xl font-bold mb-2">Explore Prompts</h1>
              <p className="text-gray-600">
                Discover and save prompts created by the community
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
                  placeholder="Search prompts..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sort by:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as "newest" | "popular")}
                    className="rounded-md border border-gray-300 px-3 py-1.5 text-sm"
                  >
                    <option value="newest">Newest</option>
                    <option value="popular">Most Liked</option>
                  </select>
                </div>
                
                <Button
                  variant={selectedCategory ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </Button>
              </div>
            </div>
            
            {/* Categories */}
            <div className="mt-4 flex flex-wrap gap-2">
              {categories.map(category => (
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
          ) : filteredPrompts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.map(prompt => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No prompts found</h3>
              <p className="text-gray-600 mb-6">
                {searchTerm || selectedCategory
                  ? "Try adjusting your search filters"
                  : "Be the first to create a prompt"}
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
