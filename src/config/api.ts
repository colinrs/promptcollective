import { User } from "lucide-react";


// API configuration
const getBaseUrl = () => {
  if (import.meta.env.MODE === 'development') {
    return import.meta.env.VITE_DEV_API_URL;
  }
  return import.meta.env.VITE_PROD_API_URL;
};

export const API_CONFIG = {
  BASE_URL: getBaseUrl(),
  // User API
  USER_LOGIN: '/v1/user/login',
  USER_LOGOUT: '/v1/user/logout',
  USER_UPDATE: '/v1/user/update_profile',
  USER_CHANGE_PASSWORD: '/v1/user/change_password',
  USER_SEND_VERIFICATION_CODE: '/v1/user/send_verification_code',
  USER_VERIFICATION_CODE: '/v1/user/verification_code',
  USER_RESET_PASSWORD: '/v1/user/reset_password',
  USER_FORGOT_PASSWORD: '/v1/user/forgot_password',
  USER_REFRESH_TOKEN: '/v1/user/refresh_token',
  USER_REGISTER: '/v1/user/register',

  USER_PROMPTS_LIKE: '/v1/user/prompts/like',
  USER_PROMPTS_LIST: '/v1/user/prompt/list',
  USER_PROMPTS_SAVE: '/v1/user/prompts/save',
  // Category API
  CREATE_CATEGORY: '/v1/category/create',
  LIST_CATEGORY: '/v1/category/list',
  // Prompt API
  GET_PROMPTS: '/v1/prompt/list',
  CREATE_PROMPT: '/v1/prompt/create',
  UPDATE_PROMPT: '/v1/prompt/update',
  DELETE_PROMPT: '/v1/prompt/delete',
  LIKE_PROMPT: '/v1/prompt/like',
  SAVE_PROMPTS: '/v1/prompt/save',
  GET_PROMPT_BY_ID: '/v1/prompt/get',
  SEARCH_PROMPTS: '/v1/prompt/search',
  GET_PROMPT_BY_CATEGORY_ID: '/v1/prompt/list_by_category',
} as const;


export const Code = {
  UserNotExist: 20008 as number,
  UserExist: 20007 as number,
  SensitiveWord : 20017 as number,
} as const;


export const Constant = {
  MaxCategoryCount: 100 as number,
}