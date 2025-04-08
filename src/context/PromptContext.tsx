
import React, { createContext, useState, useContext } from "react";
import { toast } from "sonner";
import { API_CONFIG } from "../config/api";
import { httpClient } from "../lib/api";
import { useQuery } from "@tanstack/react-query";

export interface Prompt {
  id: number;
  title: string;
  content: string;
  categoryId: number;
  category: string;
  categoryColor: string;
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

export interface ListPromptResponse {
  list: Prompt[];
  page: number;
  pageSize: number;
  total: number;
}

export interface Category {
  id: number;
  name: string;
  color: string;
}

export interface ListCategoryResponse {
  list: Category[];
  page: number;
  pageSize: number;
  total: number;
}

interface PromptContextType {
  isLoading: boolean;
  userSavePrompts: () => Promise<ListPromptResponse>;
  userLikePrompts: () => Promise<ListPromptResponse>;
  userPrompts: () => Promise<ListPromptResponse>;
  getPrompt: (id: string) => Promise<Prompt>;
  listPrompt: () => Promise<ListPromptResponse>;
  searchListPrompt: (title: string, content: string, categoryId: number, sort: string, page?: number, pageSize?: number) => Promise<ListPromptResponse>;
  createPrompt: (prompt: Omit<Prompt, "id" | "createdAt" | "updatedAt" | "likes" | "createdBy" | "category" | "categoryColor">) => Promise<void>;
  updatePrompt: (prompt: Partial<Prompt>) => Promise<void>;
  deletePrompt: (id: number) => Promise<void>;
  likePrompt: (id: number, action: string) => Promise<void>;
  savePrompt: (id: number, action: string) => Promise<void>;
  createCategory: (name: string) => Promise<void>;
  listCategory: () => Promise<ListCategoryResponse>;
  getPromptsByCategory: (categoryId: string) => Promise<ListPromptResponse>;
}

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const PromptProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Fetch functions with explicit return types to prevent unnecessary re-fetching
  const getPrompt = async (id: string): Promise<Prompt> => {
    try {
      return await httpClient.get<Prompt>(`${API_CONFIG.GET_PROMPT_BY_ID}?promptId=${id}`);
    } catch (error) {
      console.error("Get prompt error:", error);
      throw error;
    }
  };

  const listPrompt = async (): Promise<ListPromptResponse> => {
    try {
      const response = await httpClient.get<ListPromptResponse>(API_CONFIG.GET_PROMPTS);
      return response;
    } catch (error) {
      console.error("List prompts error:", error);
      throw error;
    }
  };

  const searchListPrompt = async (title: string, content: string, categoryId: number, sort: string): Promise<ListPromptResponse> => {
    try {
      // Build query params, only add when values exist
      const params = new URLSearchParams();
      if (title) params.append('title', title);
      if (content) params.append('content', content);
      if (categoryId) params.append('category_id', categoryId.toString());
      if (sort) params.append('sort', sort);
      
      const queryString = params.toString();
      const url = queryString ? `${API_CONFIG.SEARCH_PROMPTS}?${queryString}` : API_CONFIG.SEARCH_PROMPTS;
      
      return await httpClient.get<ListPromptResponse>(url);
    } catch (error) {
      console.error("Search prompts error:", error);
      throw error;
    }
  };

  const createPrompt = async (prompt: Omit<Prompt, "id" | "createdAt" | "updatedAt" | "likes" | "createdBy" | "category" | "categoryColor">): Promise<void> => {
    setIsLoading(true);
    try {
      await httpClient.post<Prompt>(API_CONFIG.CREATE_PROMPT, prompt);
      toast.success("Prompt created successfully");
    } catch (error) {
      toast.error("Failed to create prompt");
      console.error("Create prompt error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePrompt = async (promptUpdate: Partial<Prompt>): Promise<void> => {
    setIsLoading(true);
    try {
      await httpClient.put<Prompt>(API_CONFIG.UPDATE_PROMPT, promptUpdate);      
      toast.success("Prompt updated successfully");
    } catch (error) {
      toast.error("Failed to update prompt");
      console.error("Update prompt error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePrompt = async (id: number): Promise<void> => {
    setIsLoading(true);
    try {
      await httpClient.delete(`${API_CONFIG.DELETE_PROMPT}?promptId=${id}`);
      toast.success("Prompt deleted successfully");
    } catch (error) {
      toast.error("Failed to delete prompt");
      console.error("Delete prompt error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const likePrompt = async (id: number, action: string): Promise<void> => {
    try {
      await httpClient.post<Prompt>(`${API_CONFIG.LIKE_PROMPT}`, {"promptId": id, "action": action});
    } catch (error) {
      toast.error("Failed to update like status");
      console.error("Like prompt error:", error);
      throw error;
    }
  };

  const savePrompt = async (id: number, action: string): Promise<void> => {
    try {
      await httpClient.post<Prompt>(`${API_CONFIG.SAVE_PROMPTS}`, {"promptId": id, "action": action});
    } catch (error) {
      toast.error("Failed to update saved status");
      console.error("Save prompt error:", error);
      throw error;
    }
  };

  const userSavePrompts = async (): Promise<ListPromptResponse> => {
    try {
      return await httpClient.get<ListPromptResponse>(`${API_CONFIG.USER_PROMPTS_SAVE}`);
    } catch (error) {
      console.error("User saved prompts error:", error);
      throw error;
    }
  };

  const userLikePrompts = async (): Promise<ListPromptResponse> => {
    try {
      return await httpClient.get<ListPromptResponse>(`${API_CONFIG.USER_PROMPTS_LIKE}`);
    } catch (error) {
      console.error("User liked prompts error:", error);
      throw error;
    }
  };

  const userPrompts = async (): Promise<ListPromptResponse> => {
    try {
      return await httpClient.get<ListPromptResponse>(`${API_CONFIG.USER_PROMPTS_LIST}`);
    } catch (error) {
      console.error("User prompts error:", error);
      throw error;
    }
  };

  const createCategory = async (name: string): Promise<void> => {
    setIsLoading(true);
    try {
      await httpClient.post<Category>(`${API_CONFIG.CREATE_CATEGORY}`, { name });
      toast.success("Category created successfully");
    } catch (error) {
      toast.error("Failed to create category");
      console.error("Create category error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const listCategory = async (): Promise<ListCategoryResponse> => {
    try {
      return await httpClient.get<ListCategoryResponse>(`${API_CONFIG.LIST_CATEGORY}`);
    } catch (error) {
      console.error("List categories error:", error);
      throw error;
    }
  };

  const getPromptsByCategory = async (categoryId: string): Promise<ListPromptResponse> => {
    try {
      return await httpClient.get<ListPromptResponse>(`${API_CONFIG.GET_PROMPT_BY_CATEGORY_ID}?category_id=${categoryId}`);
    } catch (error) {
      console.error("Get prompts by category error:", error);
      throw error;
    }
  };

  return (
    <PromptContext.Provider
      value={{
        isLoading,
        userSavePrompts,
        userLikePrompts,
        userPrompts,
        getPrompt,
        listPrompt,
        createPrompt,
        updatePrompt,
        deletePrompt,
        likePrompt,
        savePrompt,
        createCategory,
        listCategory,
        searchListPrompt,
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
