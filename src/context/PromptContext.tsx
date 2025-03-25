
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import { API_CONFIG } from "../config/api";
//import { mockPrompts, mockCategories } from "../utils/mockData";

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
  getPromptsByCategory: (categoryId: string) => Promise<Prompt[]>;
}

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [userPrompts, setUserPrompts] = useState<Prompt[]>([]);
  const [savedPrompts, setSavedPrompts] = useState<Prompt[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = API_CONFIG.BASE_URL;

  useEffect(() => {
    // Load initial data
    const fetchData = async () => {
      try {
        const [promptsRes, categoriesRes] = await Promise.all([
          fetch(`${API_BASE_URL}${API_CONFIG.GET_PROMPTS}`),
          fetch(`${API_BASE_URL}${API_CONFIG.GET_CATEGORY}`)
        ]);

        if (!promptsRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const promptsData = await promptsRes.json();
        const categoriesData = await categoriesRes.json();

        setPrompts(promptsData);
        setCategories(categoriesData);

        // Filter user prompts
        const userPromptsData = promptsData.filter(p => p.createdBy.id === "user-1");
        setUserPrompts(userPromptsData);

        // Filter saved prompts
        const savedPromptsData = promptsData.filter(p => p.saved);
        setSavedPrompts(savedPromptsData);

        setIsLoading(false);
      } catch (error) {
        console.error("Fetch data error:", error);
        toast.error("Failed to load data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API_BASE_URL]);

  const createPrompt = async (prompt: Omit<Prompt, "id" | "createdAt" | "updatedAt" | "likes" | "createdBy">) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}${API_CONFIG.CREATE_PROMPT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prompt),
      });

      if (!response.ok) {
        throw new Error("Failed to create prompt");
      }

      const newPrompt = await response.json();
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
      const response = await fetch(`${API_BASE_URL}${API_CONFIG.UPDATE_PROMPT}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promptUpdate),
      });

      if (!response.ok) {
        throw new Error("Failed to update prompt");
      }

      const updatedPrompt = await response.json();
      const updatePrompts = (promptsList: Prompt[]) => 
        promptsList.map(p => p.id === id ? updatedPrompt : p);

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
      const response = await fetch(`${API_BASE_URL}${API_CONFIG.DELETE_PROMPT}?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete prompt");
      }

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
      const response = await fetch(`${API_BASE_URL}/prompts/${id}/like`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to update like status");
      }

      const updatedPrompt = await response.json();
      const updatePrompts = (promptsList: Prompt[]) => 
        promptsList.map(p => p.id === id ? updatedPrompt : p);
      
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
      const response = await fetch(`${API_BASE_URL}/prompts/${id}/save`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to update saved status");
      }

      const updatedPrompt = await response.json();
      const updatePrompts = (promptsList: Prompt[]) => 
        promptsList.map(p => p.id === id ? updatedPrompt : p);
      
      setPrompts(updatePrompts);
      setUserPrompts(updatePrompts);
      
      // Update saved prompts list
      if (updatedPrompt.saved) {
        setSavedPrompts(prev => [...prev, updatedPrompt]);
      } else {
        setSavedPrompts(prev => prev.filter(p => p.id !== id));
      }
      
    } catch (error) {
      toast.error("Failed to update saved status");
      console.error("Save prompt error:", error);
    }
  };

  const createCategory = async (name: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      const newCategory = await response.json();
      setCategories(prev => [...prev, newCategory]);
      toast.success("Category created successfully");
    } catch (error) {
      toast.error("Failed to create category");
      console.error("Create category error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPromptsByCategory = async (categoryId: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}/prompts`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch prompts by category");
      }

      return await response.json();
    } catch (error) {
      console.error("Get prompts by category error:", error);
      toast.error("Failed to load prompts");
      return [];
    }
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
