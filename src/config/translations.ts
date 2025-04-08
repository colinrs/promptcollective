export type Language = 'en' | 'zh';

type TranslationKeys = {
  // 导航栏
  'nav.home': string;
  'nav.gallery': string;
  'nav.create': string;
  'nav.myPrompts': string;
  'nav.favorites': string;
  'nav.login': string;
  'nav.register': string;
  'nav.logout': string;

  // 首页
  'home.hero.title': string;
  'home.hero.titleHighlight': string;
  'home.hero.description': string;
  'home.hero.getStarted': string;
  'home.hero.createFirst': string;
  'home.hero.explore': string;
  'home.features.title': string;
  'home.features.create.title': string;
  'home.features.create.description': string;
  'home.features.organize.title': string;
  'home.features.organize.description': string;
  'home.features.share.title': string;
  'home.features.share.description': string;
  'home.popular.title': string;
  'home.popular.viewAll': string;
  'home.cta.title': string;
  'home.cta.description': string;
  'home.cta.signup': string;

  // 认证页面
  'auth.login.title': string;
  'auth.login.description': string;
  'auth.register.title': string;
  'auth.register.description': string;
  'auth.email': string;
  'auth.password': string;
  'auth.name': string;
  'auth.emailRequired': string;
  'auth.emailInvalid': string;
  'auth.passwordRequired': string;
  'auth.passwordLength': string;
  'auth.nameRequired': string;
  'auth.submit.login': string;
  'auth.submit.register': string;
  'auth.switchMode.login': string;
  'auth.switchMode.register': string;

  // 创建提示词页面
  'create.title': string;
  'create.editTitle': string;
  'create.description': string;
  'create.editDescription': string;
  'create.form.title': string;
  'create.form.titlePlaceholder': string;
  'create.form.content': string;
  'create.form.contentPlaceholder': string;
  'create.form.category': string;
  'create.form.createCategory': string;
  'create.form.newCategory': string;
  'create.form.selectCategory': string;
  'create.form.cancel': string;
  'create.form.submit': string;
  'create.form.update': string;
  'create.form.creating': string;
  'create.form.updating': string;
  'create.validation.title': string;
  'create.validation.content': string;
  'create.validation.category': string;

  // 收藏页面
  'favorites.title': string;
  'favorites.description': string;
  'favorites.empty.title': string;
  'favorites.empty.description': string;
  'favorites.empty.action': string;

  // 我的提示词页面
  'myPrompts.title': string;
  'myPrompts.description': string;
  'myPrompts.createNew': string;
  'myPrompts.empty.title': string;
  'myPrompts.empty.description': string;
  'myPrompts.empty.action': string;
  'myPrompts.deleteConfirm.title': string;
  'myPrompts.deleteConfirm.description': string;
  'myPrompts.actions.edit': string;
  'myPrompts.actions.delete': string;

  // 404页面
  'notFound.title': string;
  'notFound.description': string;
  'notFound.actions.home': string;
  'notFound.actions.explore': string;

  // 提示词详情页面
  'promptDetails.back': string;
  'promptDetails.timeAgo': string;
  'promptDetails.actions.like': string;
  'promptDetails.actions.save': string;
  'promptDetails.actions.saved': string;
  'promptDetails.actions.copy': string;
  'promptDetails.share.title': string;
  'promptDetails.copySuccess': string;
  'promptDetails.copyError': string;

  // 提示词画廊页面
  'gallery.title': string;
  'gallery.description': string;
  'gallery.search.placeholder': string;
  'gallery.sort.label': string;
  'gallery.sort.newest': string;
  'gallery.sort.popular': string;
  'gallery.categories.all': string;
  'gallery.empty.title': string;
  'gallery.empty.description': string;
  'gallery.empty.searchDescription': string;
};

export const translations: Record<Language, TranslationKeys> = {
  en: {
    // 导航栏
    'nav.home': 'Home',
    'nav.gallery': 'Gallery',
    'nav.create': 'Create',
    'nav.myPrompts': 'My Prompts',
    'nav.favorites': 'Favorites',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',

    // 首页
    'home.hero.title': 'Discover and Share',
    'home.hero.titleHighlight': 'AI Prompts',
    'home.hero.description': 'Explore a world of creative AI prompts. Share your best prompts and learn from others.',
    'home.hero.getStarted': 'Get Started',
    'home.hero.createFirst': 'Create First Prompt',
    'home.hero.explore': 'Explore Gallery',
    'home.features.title': 'Why Choose Us',
    'home.features.create.title': 'Create',
    'home.features.create.description': 'Create your own prompts to share with the community',
    'home.features.organize.title': 'Organize',
    'home.features.organize.description': 'Organize your prompts into categories for easy access',
    'home.features.share.title': 'Share',
    'home.features.share.description': 'Share your prompts with the world',
    'home.popular.title': 'Popular Prompts',
    'home.popular.viewAll': 'View All',
    'home.cta.title': 'Start Creating',
    'home.cta.description': 'Create your first prompt to get started',
    'home.cta.signup': 'Sign Up Now',


    // 认证页面
    'auth.login.title': 'Welcome Back',
    'auth.login.description': 'Enter your credentials to access your account',
    'auth.register.title': 'Create Account',
    'auth.register.description': 'Join our community of prompt creators',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Name',
    'auth.emailRequired': 'Email is required',
    'auth.emailInvalid': 'Email is invalid',
    'auth.passwordRequired': 'Password is required',
    'auth.passwordLength': 'Password must be at least 6 characters',
    'auth.nameRequired': 'Name is required',
    'auth.submit.login': 'Sign In',
    'auth.submit.register': 'Sign Up',
    'auth.switchMode.login': 'Already have an account? Sign in',
    'auth.switchMode.register': 'Don\'t have an account? Sign up',

    // 创建提示词页面
    'create.title': 'Create New Prompt',
    'create.editTitle': 'Edit Prompt',
    'create.description': 'Fill in the details to create a new prompt',
    'create.editDescription': 'Update your prompt details below',
    'create.form.title': 'Title',
    'create.form.titlePlaceholder': 'E.g. Blog Post Generator',
    'create.form.content': 'Prompt Content',
    'create.form.contentPlaceholder': 'Enter your prompt content here. Use placeholders like {topic} or {style} for variables.',
    'create.form.category': 'Category',
    'create.form.createCategory': 'Create Category',
    'create.form.newCategory': 'Create New Category',
    'create.form.selectCategory': 'Select a category',
    'create.form.cancel': 'Cancel',
    'create.form.submit': 'Create Prompt',
    'create.form.update': 'Update Prompt',
    'create.form.creating': 'Creating...',
    'create.form.updating': 'Updating...',
    'create.validation.title': 'Title is required',
    'create.validation.content': 'Content is required',
    'create.validation.category': 'Category is required',

    // 收藏页面
    'favorites.title': 'My Saved Prompts',
    'favorites.description': 'Prompts you\'ve saved for quick access',
    'favorites.empty.title': 'No saved prompts yet',
    'favorites.empty.description': 'Browse the gallery and save prompts you like',
    'favorites.empty.action': 'Explore Prompts',

    // 我的提示词页面
    'myPrompts.title': 'My Prompts',
    'myPrompts.description': 'Manage your created prompts',
    'myPrompts.createNew': 'Create New Prompt',
    'myPrompts.empty.title': 'No prompts created yet',
    'myPrompts.empty.description': 'Create your first prompt to get started',
    'myPrompts.empty.action': 'Create Your First Prompt',
    'myPrompts.deleteConfirm.title': 'Are you sure?',
    'myPrompts.deleteConfirm.description': 'This action cannot be undone. This will permanently delete your prompt.',
    'myPrompts.actions.edit': 'Edit',
    'myPrompts.actions.delete': 'Delete',

    // 404页面
    'notFound.title': 'Page not found',
    'notFound.description': 'The page you\'re looking for doesn\'t exist or has been moved.',
    'notFound.actions.home': 'Go to Homepage',
    'notFound.actions.explore': 'Explore Prompts',

    // 提示词详情页面
    'promptDetails.back': 'Back',
    'promptDetails.timeAgo': '{time} ago',
    'promptDetails.actions.like': 'Like',
    'promptDetails.actions.save': 'Save',
    'promptDetails.actions.saved': 'Saved',
    'promptDetails.actions.copy': 'Copy',
    'promptDetails.share.title': 'Share this prompt',
    'promptDetails.copySuccess': 'Prompt copied to clipboard',
    'promptDetails.copyError': 'Failed to copy prompt to clipboard',

    // 提示词画廊页面
    'gallery.title': 'Explore Prompts',
    'gallery.description': 'Discover and save prompts created by the community',
    'gallery.search.placeholder': 'Search prompts...',
    'gallery.sort.label': 'Sort by:',
    'gallery.sort.newest': 'Newest',
    'gallery.sort.popular': 'Most Liked',
    'gallery.categories.all': 'All Categories',
    'gallery.empty.title': 'No prompts found',
    'gallery.empty.description': 'Be the first to create a prompt',
    'gallery.empty.searchDescription': 'Try adjusting your search filters'
  },
  zh: {
    // 导航栏
    'nav.home': '首页',
    'nav.gallery': '画廊',
    'nav.create': '创建',
    'nav.myPrompts': '我的提示词',
    'nav.favorites': '收藏',
    'nav.login': '登录',
    'nav.register': '注册',
    'nav.logout': '退出',

    // 首页
    'home.hero.title': '发现和分享',
    'home.hero.titleHighlight': 'AI提示词',
    'home.hero.description': '探索创意AI提示词的世界。分享你的最佳提示词，向他人学习。',
    'home.hero.getStarted': '开始使用',
    'home.hero.createFirst': '创建第一个提示词',
    'home.hero.explore': '浏览画廊',
    'home.features.title': '为什么选择我们',
    'home.features.create.title': '创建',
    'home.features.create.description': '创建您自己的提示词，与社区分享',
    'home.features.organize.title': '组织',
    'home.features.organize.description': '将提示词组织到分类中，方便访问',
    'home.features.share.title': '分享',
    'home.features.share.description': '与世界分享您的提示词',
    'home.popular.title': '热门提示',
    'home.popular.viewAll': '查看全部',
    'home.cta.title': '开始创建',
    'home.cta.description': '创建您的第一个提示词以开始',
    'home.cta.signup': '立即注册',

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
    'gallery.empty.searchDescription': '尝试调整搜索条件'
  }
};