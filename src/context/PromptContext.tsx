
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import { mockPrompts, mockCategories } from "../utils/mockData";

export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  likes: number;
  liked?: boolean;
  saved?: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

interface PromptContextType {
  prompts: Prompt[];
  userPrompts: Prompt[];
  savedPrompts: Prompt[];
  categories: Category[];
  isLoading: boolean;
  createPrompt: (prompt: Omit<Prompt, "id" | "createdAt" | "updatedAt" | "likes" | "createdBy">) => Promise<void>;
  updatePrompt: (id: string, prompt: Partial<Prompt>) => Promise<void>;
  deletePrompt: (id: string) => Promise<void>;
  likePrompt: (id: string) => Promise<void>;
  savePrompt: (id: string) => Promise<void>;
  createCategory: (name: string) => Promise<void>;
  getPromptsByCategory: (categoryId: string) => Prompt[];
}

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [userPrompts, setUserPrompts] = useState<Prompt[]>([]);
  const [savedPrompts, setSavedPrompts] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load initial data
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 800));
      setPrompts(mockPrompts);
      
      // Filter user prompts (assuming user-1 is logged in)
      const userPromptsData = mockPrompts.filter(p => p.createdBy.id === "user-1");
      setUserPrompts(userPromptsData);
      
      // Filter saved prompts
      const savedPromptsData = mockPrompts.filter(p => p.saved);
      setSavedPrompts(savedPromptsData);
      
      setCategories(mockCategories);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const createPrompt = async (prompt: Omit<Prompt, "id" | "createdAt" | "updatedAt" | "likes" | "createdBy">) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const newPrompt: Prompt = {
        id: `prompt-${Date.now()}`,
        ...prompt,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likes: 0,
        createdBy: {
          id: "user-1", // Mocked current user
          name: "Demo User",
        },
      };
      
      setPrompts(prevPrompts => [newPrompt, ...prevPrompts]);
      setUserPrompts(prevPrompts => [newPrompt, ...prevPrompts]);
      
      toast.success("Prompt created successfully");
    } catch (error) {
      toast.error("Failed to create prompt");
      console.error("Create prompt error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePrompt = async (id: string, promptUpdate: Partial<Prompt>) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const updatePrompts = (promptsList: Prompt[]) => 
        promptsList.map(p => 
          p.id === id ? { ...p, ...promptUpdate, updatedAt: new Date().toISOString() } : p
        );
      
      setPrompts(updatePrompts);
      setUserPrompts(updatePrompts);
      setSavedPrompts(updatePrompts);
      
      toast.success("Prompt updated successfully");
    } catch (error) {
      toast.error("Failed to update prompt");
      console.error("Update prompt error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deletePrompt = async (id: string) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const filterPrompts = (promptsList: Prompt[]) => 
        promptsList.filter(p => p.id !== id);
      
      setPrompts(filterPrompts);
      setUserPrompts(filterPrompts);
      setSavedPrompts(filterPrompts);
      
      toast.success("Prompt deleted successfully");
    } catch (error) {
      toast.error("Failed to delete prompt");
      console.error("Delete prompt error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const likePrompt = async (id: string) => {
    try {
      // Toggle like status
      const updatePrompts = (promptsList: Prompt[]) => 
        promptsList.map(p => {
          if (p.id === id) {
            const isLiked = !p.liked;
            return { 
              ...p, 
              liked: isLiked,
              likes: isLiked ? p.likes + 1 : p.likes - 1
            };
          }
          return p;
        });
      
      setPrompts(updatePrompts);
      setUserPrompts(updatePrompts);
      setSavedPrompts(updatePrompts);
      
    } catch (error) {
      toast.error("Failed to update like status");
      console.error("Like prompt error:", error);
    }
  };

  const savePrompt = async (id: string) => {
    try {
      // Toggle saved status
      const updatePrompts = (promptsList: Prompt[]) => 
        promptsList.map(p => {
          if (p.id === id) {
            const isSaved = !p.saved;
            return { ...p, saved: isSaved };
          }
          return p;
        });
      
      setPrompts(updatePrompts);
      setUserPrompts(updatePrompts);
      
      // Update saved prompts list
      const updatedPrompt = prompts.find(p => p.id === id);
      if (updatedPrompt) {
        const newSavedStatus = !updatedPrompt.saved;
        
        if (newSavedStatus) {
          setSavedPrompts(prev => [...prev, { ...updatedPrompt, saved: true }]);
        } else {
          setSavedPrompts(prev => prev.filter(p => p.id !== id));
        }
      }
      
    } catch (error) {
      toast.error("Failed to update saved status");
      console.error("Save prompt error:", error);
    }
  };

  const createCategory = async (name: string) => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Simple color generator for new categories
      const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      const newCategory: Category = {
        id: `category-${Date.now()}`,
        name,
        color: randomColor,
      };
      
      setCategories(prev => [...prev, newCategory]);
      toast.success("Category created successfully");
    } catch (error) {
      toast.error("Failed to create category");
      console.error("Create category error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPromptsByCategory = (categoryId: string) => {
    return prompts.filter(p => p.category === categoryId);
  };

  return (
    <PromptContext.Provider
      value={{
        prompts,
        userPrompts,
        savedPrompts,
        categories,
        isLoading,
        createPrompt,
        updatePrompt,
        deletePrompt,
        likePrompt,
        savePrompt,
        createCategory,
        getPromptsByCategory,
      }}
    >
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompts = () => {
  const context = useContext(PromptContext);
  if (context === undefined) {
    throw new Error("usePrompts must be used within a PromptProvider");
  }
  return context;
};
