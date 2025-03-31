
import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import { API_CONFIG } from "../config/api";
import { httpClient } from "../lib/api";
//import { mockPrompts, mockCategories } from "../utils/mockData";

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
  searchListPrompt: (title: string,content: string, categoryId:number, sort:string) => Promise<ListPromptResponse>;
  createPrompt: (prompt: Omit<Prompt, "id" | "createdAt" | "updatedAt" | "likes" | "createdBy" | "category" | "categoryColor">) => Promise<void>;
  updatePrompt: (prompt: Partial<Prompt>) => Promise<void>;
  deletePrompt: (id: number) => Promise<void>;
  likePrompt: (id: number,action: string) => Promise<void>;
  savePrompt: (id: number,action: string) => Promise<void>;
  createCategory: (name: string) => Promise<void>;
  listCategory: () => Promise<ListCategoryResponse>;
  getPromptsByCategory: (categoryId: string) => Promise<ListPromptResponse>;
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
      const response = await httpClient.get<ListPromptResponse>(API_CONFIG.GET_PROMPTS);
      toast.success("Prompt get successfully");
      return response;
    } catch (error) {
      toast.error("Failed get prompt");
      console.error("List prompts error:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getPrompt = async (id: string) => {
    setIsLoading(true);
    try {
      const resp =  await httpClient.get<Prompt>(`${API_CONFIG.GET_PROMPT_BY_ID}?promptId=${id}`);
      toast.success("Prompt created successfully");
      return resp;
    } catch (error) {
      toast.error("Failed to create prompt");
      console.error("Create prompt error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchListPrompt = async (title: string, content: string, categoryId: number, sort: string) => {
    setIsLoading(true);
    try {
      // 构建查询参数，只有当参数有值时才添加
      const params = new URLSearchParams();
      if (title) params.append('title', title);
      if (content) params.append('content', content);
      if (categoryId) params.append('category_id', categoryId.toString());
      if (sort) params.append('sort', sort);
      
      const queryString = params.toString();
      const url = queryString ? `${API_CONFIG.SEARCH_PROMPTS}?${queryString}` : API_CONFIG.SEARCH_PROMPTS;
      
      const resp = await httpClient.get<ListPromptResponse>(url);
      toast.success("Prompts retrieved successfully");
      return resp;
    } catch (error) {
      toast.error("Failed to search prompts");
      console.error("Search prompts error:", error);
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

  const deletePrompt = async (id: number) => {
    setIsLoading(true);
    try {
      await httpClient.delete(`${API_CONFIG.DELETE_PROMPT}?promptId=${id}`);
      toast.success("Prompt deleted successfully");
    } catch (error) {
      toast.error("Failed to delete prompt");
      console.error("Delete prompt error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const likePrompt = async (id: number,action: string) => {
    try {
      await httpClient.post<Prompt>(`${API_CONFIG.LIKE_PROMPT}`,{"promptId":id, "action":action});
    } catch (error) {
      toast.error("Failed to update like status");
      console.error("Like prompt error:", error);
    }
  };

  const savePrompt = async (id: number,action: string) => {
    try {
      await httpClient.post<Prompt>(`${API_CONFIG.SAVE_PROMPTS}`,{"promptId":id, "action":action});
    } catch (error) {
      toast.error("Failed to update saved status");
      console.error("Save prompt error:", error);
    }
  };

  const userSavePrompts = async () => {
    try {
      const resp =  await httpClient.get<ListPromptResponse>(`${API_CONFIG.USER_PROMPTS_SAVE}`);
      return resp;
    } catch (error) {
      toast.error("Failed to update saved status");
      console.error("Save prompt error:", error);
      return null;
    }
  };

  const userLikePrompts = async () => {
    try {
      const resp =  await httpClient.get<ListPromptResponse>(`${API_CONFIG.USER_PROMPTS_LIKE}`);
      return resp;
    } catch (error) {
      toast.error("Failed to update saved status");
      console.error("Save prompt error:", error);
      return null;
    }
  };

  const userPrompts = async () => {
    try {
      const resp =  await httpClient.get<ListPromptResponse>(`${API_CONFIG.USER_PROMPTS_LIST}`);
      return resp;
    } catch (error) {
      toast.error("Failed to update saved status");
      console.error("Save prompt error:", error);
      return null;
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
      const resp =  await httpClient.get<ListCategoryResponse>(`${API_CONFIG.LIST_CATEGORY}`);
      toast.success("Prompt created successfully");
      return resp;
    } catch (error) {
      toast.error("Failed to create prompt");
      console.error("Create prompt error:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getPromptsByCategory = async (categoryId: string) => {
    try {
      return await httpClient.get<ListPromptResponse>(`${API_CONFIG.CREATE_CATEGORY}?category_id=${categoryId}`);
    } catch (error) {
      console.error("Get prompts by category error:", error);
      toast.error("Failed to load prompts");
      return null;
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
