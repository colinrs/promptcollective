

// API configuration
const getBaseUrl = () => {
  if (import.meta.env.MODE === 'development') {
    return 'http://192.168.0.109:8080/api';
  }
  return 'https://api.promptcollective.com/api';
};

export const API_CONFIG = {
  BASE_URL: getBaseUrl(),
  // User API
  USER_LOGIN: '/v1/user/login',
  USER_LOGOUT: '/v1/user/logout',
  USER_UPDATE: '/v1/user/update',
  USER_CHANGE_PASSWORD: '/v1/user/change_password',
  USER_REFRESH_TOKEN: '/v1/user/refresh_token',
  USER_REGISTER: '/v1/user/register',
  USER_PROMPTS_SAVE: '/v1/user/prompts/save',
  USER_PROMPTS_LIKE: '/v1/user/prompts/like',
  // Category API
  CREATE_CATEGORY: '/v1/category/create',
  LIST_CATEGORY: '/v1/category/list',
  // Prompt API
  GET_PROMPTS: '/v1/prompt/list',
  CREATE_PROMPT: '/v1/prompt/create',
  UPDATE_PROMPT: '/v1/prompt/update',
  DELETE_PROMPT: '/v1/prompt/delete',
  LIKE_PROMPT: '/v1/prompt/like',
  UNLIKE_PROMPT: '/v1/prompt/unlike',
  GET_PROMPT_BY_ID: '/v1/prompt/get',
  GET_PROMPT_BY_CATEGORY_ID: '/v1/prompt/list_by_category',
} as const;