import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations as configT , Language } from '@/config/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.gallery': 'Gallery',
    'nav.myPrompts': 'My Prompts',
    'nav.favorites': 'Favorites',
    'nav.create': 'Create',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    
    // Home Page
    'home.hero.title': 'Create, Share, and Discover',
    'home.hero.titleHighlight': 'Powerful Prompts',
    'home.hero.description': 'Build a library of effective prompts, share them with the community, and discover prompts created by others.',
    'home.hero.getStarted': 'Get Started',
    'home.hero.createFirst': 'Create Your First Prompt',
    'home.hero.explore': 'Explore Prompts',
    
    // Features Section
    'home.features.title': 'Why Use PromptShare?',
    'home.features.create.title': 'Create Custom Prompts',
    'home.features.create.description': 'Craft and save your perfect prompts for different use cases, keeping them organized and accessible.',
    'home.features.organize.title': 'Categorize & Organize',
    'home.features.organize.description': 'Sort your prompts into categories, making it easy to find the right prompt when you need it.',
    'home.features.share.title': 'Share & Discover',
    'home.features.share.description': 'Share your best prompts with the community and discover effective prompts created by others.',
    
    // Popular Prompts Section
    'home.popular.title': 'Popular Prompts',
    'home.popular.viewAll': 'View all',
    
    // CTA Section
    'home.cta.title': 'Ready to get started?',
    'home.cta.description': 'Join our community of prompt engineers and enthusiasts today. Create, share, and discover powerful prompts.',
    'home.cta.signup': 'Sign Up for Free',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.noData': 'No data available',
  },
  zh: {
    // 导航
    'nav.home': '首页',
    'nav.gallery': '提示库',
    'nav.myPrompts': '我的提示',
    'nav.favorites': '收藏',
    'nav.create': '创建',
    'nav.login': '登录',
    'nav.register': '注册',
    'nav.logout': '退出',
    
    // 首页
    'home.hero.title': '创建、分享和发现',
    'home.hero.titleHighlight': '强大的提示词',
    'home.hero.description': '构建你的提示词库，与社区分享，发现他人创建的优质提示。',
    'home.hero.getStarted': '开始使用',
    'home.hero.createFirst': '创建第一个提示',
    'home.hero.explore': '浏览提示',
    
    // 特性部分
    'home.features.title': '为什么选择 PromptShare？',
    'home.features.create.title': '创建自定义提示',
    'home.features.create.description': '为不同场景制作和保存完美的提示词，保持组织和易于访问。',
    'home.features.organize.title': '分类与组织',
    'home.features.organize.description': '将提示词分类整理，轻松找到所需的提示。',
    'home.features.share.title': '分享与发现',
    'home.features.share.description': '与社区分享你的最佳提示，发现其他人创建的优质提示。',
    
    // 热门提示部分
    'home.popular.title': '热门提示',
    'home.popular.viewAll': '查看全部',
    
    // 号召性用语部分
    'home.cta.title': '准备好开始了吗？',
    'home.cta.description': '立即加入我们的提示工程师和爱好者社区。创建、分享和发现强大的提示词。',
    'home.cta.signup': '免费注册',

    // 认证页面
    'auth.login.title': '欢迎回来',
    'auth.login.description': '输入您的凭据以访问您的帐户',
    'auth.register.title': '创建帐户',
    'auth.register.description': '加入我们的提示词创作者社区',
    'auth.email': '邮箱',
    'auth.password': '密码',
    'auth.name': '姓名',
    'auth.emailRequired': '请输入邮箱',
    'auth.emailInvalid': '邮箱格式不正确',
    'auth.passwordRequired': '请输入密码',
    'auth.passwordLength': '密码长度至少为6个字符',
    'auth.nameRequired': '请输入姓名',
    'auth.submit.login': '登录',
    'auth.submit.register': '注册',
    'auth.switchMode.login': '已有帐户？立即登录',
    'auth.switchMode.register': '没有帐户？立即注册',

    // 创建提示词页面
    'create.title': '创建新提示词',
    'create.editTitle': '编辑提示词',
    'create.description': '填写详细信息以创建新的提示词',
    'create.editDescription': '更新您的提示词详细信息',
    'create.form.title': '标题',
    'create.form.titlePlaceholder': '例如：博客文章生成器',
    'create.form.content': '提示词内容',
    'create.form.contentPlaceholder': '在此输入您的提示词内容。使用{topic}或{style}等占位符作为变量。',
    'create.form.category': '分类',
    'create.form.createCategory': '创建分类',
    'create.form.newCategory': '创建新分类',
    'create.form.selectCategory': '选择一个分类',
    'create.form.cancel': '取消',
    'create.form.submit': '创建提示词',
    'create.form.update': '更新提示词',
    'create.form.creating': '创建中...',
    'create.form.updating': '更新中...',
    'create.validation.title': '标题不能为空',
    'create.validation.content': '内容不能为空',
    'create.validation.category': '请选择分类',

    // 收藏页面
    'favorites.title': '我的收藏提示词',
    'favorites.description': '您收藏的提示词，方便快速访问',
    'favorites.empty.title': '暂无收藏的提示词',
    'favorites.empty.description': '浏览画廊并收藏您喜欢的提示词',
    'favorites.empty.action': '探索提示词',

    // 我的提示词页面
    'myPrompts.title': '我的提示词',
    'myPrompts.description': '管理您创建的提示词',
    'myPrompts.createNew': '创建新提示词',
    'myPrompts.empty.title': '暂无创建的提示词',
    'myPrompts.empty.description': '创建您的第一个提示词',
    'myPrompts.empty.action': '创建第一个提示词',
    'myPrompts.deleteConfirm.title': '确定要删除吗？',
    'myPrompts.deleteConfirm.description': '此操作无法撤消。这将永久删除您的提示词。',
    'myPrompts.actions.edit': '编辑',
    'myPrompts.actions.delete': '删除',

    // 404页面
    'notFound.title': '页面未找到',
    'notFound.description': '您访问的页面不存在或已被移动。',
    'notFound.actions.home': '返回首页',
    'notFound.actions.explore': '探索提示词',

    // 提示词详情页面
    'promptDetails.back': '返回',
    'promptDetails.timeAgo': '{time}前',
    'promptDetails.actions.like': '点赞',
    'promptDetails.actions.save': '收藏',
    'promptDetails.actions.saved': '已收藏',
    'promptDetails.actions.copy': '复制',
    'promptDetails.share.title': '分享此提示词',
    'promptDetails.copySuccess': '提示词已复制到剪贴板',
    'promptDetails.copyError': '复制提示词到剪贴板失败',

    // 提示词画廊页面
    'gallery.title': '探索提示词',
    'gallery.description': '发现并收藏社区创建的提示词',
    'gallery.search.placeholder': '搜索提示词...',
    'gallery.sort.label': '排序方式：',
    'gallery.sort.newest': '最新',
    'gallery.sort.popular': '最受欢迎',
    'gallery.categories.all': '所有分类',
    'gallery.empty.title': '未找到提示词',
    'gallery.empty.description': '成为第一个创建提示词的人',
    'gallery.empty.searchDescription': '尝试调整搜索条件',
    // 通用
    'common.loading': '加载中...',
    'common.error': '发生错误',
    'common.noData': '暂无数据',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language');
    return (savedLang as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: keyof typeof translations.en): string => {
    return configT[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};