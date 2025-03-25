// API configuration
export const API_CONFIG = {
  BASE_URL: 'http://192.168.0.109:8080/api',
  // User API
  USER_LOGIN: '/v1/user/login',
  USER_LOGOUT: '/v1/user/logout',
  USER_UPDATE: '/v1/user/update',
  USER_CHANGE_PASSWORD: '/v1/user/change_password',
  USER_REFRESH_TOKEN: '/v1/user/refresh_token',
  USER_REGISTER: '/v1/user/register',
  // Category API
  GET_CATEGORY: '/v1/categories',
  // Prompt API
  GET_PROMPTS: '/v1/prompt/list',
  CREATE_PROMPT: '/v1/prompt/create',
  UPDATE_PROMPT: '/v1/prompt/update',
  DELETE_PROMPT: '/v1/prompt/delete',
  GET_PROMPT_BY_ID: '/v1/prompt/get',
} as const;