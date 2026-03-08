import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonicalUrl?: string;
  noIndex?: boolean;
}

const BASE_URL = 'https://www.pmpsh.cn';

const defaultMeta = {
  en: {
    title: 'PromptCollective - Discover & Share AI Prompts',
    description: 'Explore, create and share creative AI prompts. Join our community of prompt creators and discover the best prompts for ChatGPT, Claude, Midjourney and more.',
  },
  zh: {
    title: 'PromptCollective - AI提示词分享平台',
    description: '探索、创建和分享创意AI提示词。加入我们的提示词创作者社区，发现最佳的ChatGPT、Claude、Midjourney提示词。',
  },
};

export const SEOHead = ({
  title,
  description,
  keywords,
  ogImage = `${BASE_URL}/og-image.png`,
  ogType = 'website',
  canonicalUrl,
  noIndex = false,
}: SEOHeadProps) => {
  const { language } = useLanguage();
  
  const finalTitle = title || defaultMeta[language].title;
  const finalDescription = description || defaultMeta[language].description;
  const finalCanonical = canonicalUrl || window.location.href.split('?')[0];

  useEffect(() => {
    // Update document title
    document.title = finalTitle;

    // Helper to update or create meta tag
    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attr}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attr, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update meta tags
    setMeta('description', finalDescription);
    if (keywords) setMeta('keywords', keywords);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // Open Graph
    setMeta('og:title', finalTitle, true);
    setMeta('og:description', finalDescription, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:type', ogType, true);
    setMeta('og:url', finalCanonical, true);

    // Twitter
    setMeta('twitter:title', finalTitle);
    setMeta('twitter:description', finalDescription);
    setMeta('twitter:image', ogImage);

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', finalCanonical);

    // Language
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
  }, [finalTitle, finalDescription, keywords, ogImage, ogType, finalCanonical, noIndex, language]);

  return null;
};

export default SEOHead;
