
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import { API_CONFIG } from "../config/api";
import { httpClient } from "../lib/api";
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
  userSavePrompts: () => Promise<Prompt[]>;
  userLikePrompts: () => Promise<Prompt[]>;
  getPrompt: (id: string) => Promise<Prompt>;
  listPrompt: () => Promise<Prompt[]>;
  createPrompt: (prompt: Omit<Prompt, "id" | "createdAt" | "updatedAt" | "likes" | "createdBy">) => Promise<void>;
  updatePrompt: (prompt: Partial<Prompt>) => Promise<void>;
  deletePrompt: (id: string) => Promise<void>;
  likePrompt: (id: string) => Promise<void>;
  savePrompt: (id: string) => Promise<void>;
  createCategory: (name: string) => Promise<void>;
  listCategory: () => Promise<Category[]>;
  getPromptsByCategory: (categoryId: string) => Promise<Prompt[]>;
}

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const API_BASE_URL = API_CONFIG.BASE_URL;

  useEffect(() => {
    // Load initial data
    const fetchData = async () => {
      try {
        setIsLoading(false);
      } catch (error) {
        console.error("Fetch data error:", error);
        toast.error("Failed to load data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [API_BASE_URL]);


  const listPrompt = async () => {
    setIsLoading(true);
    try {
      const response = await httpClient.get<Prompt[]>(API_CONFIG.GET_PROMPTS);
      toast.success("Prompt get successfully");
      return response;
    } catch (error) {
      toast.error("Failed get prompt");
      console.error("List prompts error:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getPrompt = async (id: string) => {
    setIsLoading(true);
    try {
      const resp =  await httpClient.get<Prompt>(`${API_CONFIG.GET_PROMPT_BY_ID}?id=${id}`);
      toast.success("Prompt created successfully");
      return resp;
    } catch (error) {
      toast.error("Failed to create prompt");
      console.error("Create prompt error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const createPrompt = async (prompt: Omit<Prompt, "id" | "createdAt" | "updatedAt" | "likes" | "createdBy">) => {
    setIsLoading(true);
    try {
      await httpClient.post<Prompt>(API_CONFIG.CREATE_PROMPT, prompt);
      toast.success("Prompt created successfully");
    } catch (error) {
      toast.error("Failed to create prompt");
      console.error("Create prompt error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePrompt = async (promptUpdate: Partial<Prompt>) => {
    setIsLoading(true);
    try {
      await httpClient.put<Prompt>(API_CONFIG.UPDATE_PROMPT, promptUpdate);      
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
      await httpClient.delete(`${API_CONFIG.DELETE_PROMPT}?id=${id}`);
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
      await httpClient.post<Prompt>(`${API_CONFIG.LIKE_PROMPT}?id=${id}`);
    } catch (error) {
      toast.error("Failed to update like status");
      console.error("Like prompt error:", error);
    }
  };

  const savePrompt = async (id: string) => {
    try {
      await httpClient.post<Prompt>(`${API_CONFIG.UPDATE_PROMPT}`);
    } catch (error) {
      toast.error("Failed to update saved status");
      console.error("Save prompt error:", error);
    }
  };

  const userSavePrompts = async () => {
    try {
      const resp =  await httpClient.get<Prompt[]>(`${API_CONFIG.USER_PROMPTS_SAVE}`);
      return resp;
    } catch (error) {
      toast.error("Failed to update saved status");
      console.error("Save prompt error:", error);
      return [];
    }
  };

  const userLikePrompts = async () => {
    try {
      const resp =  await httpClient.get<Prompt[]>(`${API_CONFIG.USER_PROMPTS_LIKE}`);
      return resp;
    } catch (error) {
      toast.error("Failed to update saved status");
      console.error("Save prompt error:", error);
      return [];
    }
  };
  const createCategory = async (name: string) => {
    setIsLoading(true);
    try {
      await httpClient.post<Category>(`${API_CONFIG.CREATE_CATEGORY}`, { name });
      toast.success("Category created successfully");
    } catch (error) {
      toast.error("Failed to create category");
      console.error("Create category error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const listCategory = async () => {
    setIsLoading(true);
    try {
      const resp =  await httpClient.get<Category[]>(`${API_CONFIG.LIST_CATEGORY}`);
      toast.success("Prompt created successfully");
      return resp;
    } catch (error) {
      toast.error("Failed to create prompt");
      console.error("Create prompt error:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const getPromptsByCategory = async (categoryId: string) => {
    try {
      return await httpClient.get<Prompt[]>(`${API_CONFIG.CREATE_CATEGORY}?category_id=${categoryId}`);
    } catch (error) {
      console.error("Get prompts by category error:", error);
      toast.error("Failed to load prompts");
      return [];
    }
  };

  return (
    <PromptContext.Provider
      value={{
        userSavePrompts,
        userLikePrompts,
        getPrompt,
        listPrompt,
        createPrompt,
        updatePrompt,
        deletePrompt,
        likePrompt,
        savePrompt,
        createCategory,
        listCategory,
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
