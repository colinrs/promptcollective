export type Language = 'en' | 'zh';

type TranslationKeys = {
  // 邮箱验证页面
  'emailVerification.title': string;
  'emailVerification.description': string;
  'emailVerification.checkEmail': string;
  'emailVerification.spamNotice': string;
  'emailVerification.resend': string;
  'emailVerification.resending': string;
  'emailVerification.backToLogin': string;
  'emailVerification.confirmTitle': string;
  'emailVerification.invalidParams': string;
  'emailVerification.verificationFailed': string;
  'emailVerification.success': string;
  'emailVerification.proceedToLogin': string;
  'emailVerification.backToRegister': string;
  'emailVerification.confirmDescription': string;

  // 导航栏
  'nav.home': string;
  'nav.gallery': string;
  'nav.create': string;
  'nav.myPrompts': string;
  'nav.favorites': string;
  'nav.login': string;
  'nav.register': string;
  'nav.logout': string;
  'nav.account': string;

  // 忘记密码页面
  'forgotPassword.title': string;
  'forgotPassword.description': string;
  'forgotPassword.email': string;
  'forgotPassword.verificationCode': string;
  'forgotPassword.newPassword': string;
  'forgotPassword.confirmPassword': string;
  'forgotPassword.sendCode': string;
  'forgotPassword.resetPassword': string;
  'forgotPassword.backToLogin': string;
  'forgotPassword.emailRequired': string;
  'forgotPassword.codeRequired': string;
  'forgotPassword.newPasswordRequired': string;
  'forgotPassword.confirmPasswordRequired': string;
  'forgotPassword.passwordMismatch': string;
  'forgotPassword.codeSent': string;
  'forgotPassword.resetSuccess': string;

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
  'auth.forgotPassword': string;

  'account.actions.edit': string;
  'account.actions.save': string;
  'account.actions.cancel': string;
  'account.form.email': string;
  'account.form.username': string;
  'account.form.avatarUrl': string;
  'account.description': string;
  'account.title': string;

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
  


  // toast
  'toast.auth.loginSuccess': string;
  'toast.auth.loginFailed': string;
  'toast.auth.registerSuccess': string;
  'toast.auth.registerFailed': string;
  'toast.auth.logoutSuccess': string;
  'toast.auth.verificationCodeSent': string;
  'toast.auth.verificationCodeSendFailed': string;
  'toast.auth.verificationSuccess': string;
  'toast.auth.verificationFailed': string;
  'toast.auth.resetPasswordSuccess': string;
  'toast.auth.resetPasswordFailed': string;
  'toast.prompt.createSuccess': string;
  'toast.prompt.createFailed': string;
  'toast.prompt.updateSuccess': string;
  'toast.prompt.updateFailed': string;
  'toast.prompt.deleteSuccess': string;
  'toast.prompt.deleteFailed': string;
  'toast.prompt.likeUpdateFailed': string;
  'toast.prompt.saveUpdateFailed': string;
  'toast.auth.profileUpdateSuccess': string;
  'toast.auth.profileUpdateFailed': string;
  'toast.prompt.categoryCreateSuccess': string;
  'toast.prompt.categoryCreateFailed': string;
  'toast.prompt.categorySensitiveWord': string;
};

export const translations: Record<Language, TranslationKeys> = {
  en: {
    // 邮箱验证页面
    'emailVerification.title': 'Email Verification Required',
    'emailVerification.description': 'Please verify your email address to complete registration',
    'emailVerification.checkEmail': 'We have sent a verification link to your email address. Please check your inbox and click the link to verify your account.',
    'emailVerification.spamNotice': 'If you don\'t see the email, please check your spam folder.',
    'emailVerification.resend': 'Resend Verification Email',
    'emailVerification.resending': 'Resending',
    'emailVerification.backToLogin': 'Back to Login',
    'emailVerification.confirmTitle': 'Confirm Your Email',
    'emailVerification.confirmDescription': 'Confirming your email address',
    'emailVerification.success': 'Email verification successful!',
    'emailVerification.proceedToLogin': 'Proceed to Login',
    'emailVerification.backToRegister': 'Back to Register',
    'emailVerification.invalidParams': 'Invalid verification parameters',
    'emailVerification.verificationFailed': 'Email verification failed',

    // 忘记密码页面
    'forgotPassword.title': 'Reset Password',
    'forgotPassword.description': 'Enter your email address and we will send you a verification code',
    'forgotPassword.email': 'Email',
    'forgotPassword.verificationCode': 'Verification Code',
    'forgotPassword.newPassword': 'New Password',
    'forgotPassword.confirmPassword': 'Confirm Password',
    'forgotPassword.sendCode': 'Send Code',
    'forgotPassword.resetPassword': 'Reset Password',
    'forgotPassword.backToLogin': 'Back to Login',
    'forgotPassword.emailRequired': 'Email is required',
    'forgotPassword.codeRequired': 'Verification code is required',
    'forgotPassword.newPasswordRequired': 'New password is required',
    'forgotPassword.confirmPasswordRequired': 'Please confirm your password',
    'forgotPassword.passwordMismatch': 'Passwords do not match',
    'forgotPassword.codeSent': 'Verification code sent',
    'forgotPassword.resetSuccess': 'Password reset successful',

    // 导航栏
    'nav.home': 'Home',
    'nav.gallery': 'Gallery',
    'nav.create': 'Create Prompt',
    'nav.myPrompts': 'My Prompts',
    'nav.favorites': 'Favorites',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    'nav.account': 'Account',

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
    'auth.forgotPassword': 'Forgot Password?',

    'account.actions.edit': 'Edit',
    'account.actions.save': 'Save',
    'account.actions.cancel': 'Cancel',
    'account.form.email': 'Email',
    'account.form.username': 'Name',
    'account.form.avatarUrl': 'Avatar URL',
    'account.description': 'Manage your profile information and settings',
    'account.title': 'Account',
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
    'gallery.empty.searchDescription': 'Try adjusting your search filters',
    // toast
    'toast.auth.loginSuccess': 'Successfully logged in',
    'toast.auth.loginFailed': 'Login failed. Please try again.',
    'toast.auth.registerSuccess': 'Account created successfully',
    'toast.auth.registerFailed': 'Registration failed. Please try again.',
    'toast.auth.logoutSuccess': 'Logged out successfully',
    'toast.auth.verificationCodeSent': 'Verification code sent to your email',
    'toast.auth.verificationCodeSendFailed': 'Failed to send verification code. Please try again.',
    'toast.auth.verificationSuccess': 'Verification successful',
    'toast.auth.verificationFailed': 'Verification failed. Please try again.',
    'toast.auth.resetPasswordSuccess': 'Password reset successful',
    'toast.auth.resetPasswordFailed': 'Failed to reset password. Please try again.',
    'toast.prompt.createSuccess': 'Prompt created successfully',
    'toast.prompt.createFailed': 'Failed to create prompt',
    'toast.prompt.updateSuccess': 'Prompt updated successfully',
    'toast.prompt.updateFailed': 'Failed to update prompt',
    'toast.prompt.deleteSuccess': 'Prompt deleted successfully',
    'toast.prompt.deleteFailed': 'Failed to delete prompt',
    'toast.prompt.likeUpdateFailed': 'Failed to update like status',
    'toast.prompt.saveUpdateFailed': 'Failed to update saved status',
    'toast.auth.profileUpdateSuccess': 'Profile updated successfully',
    'toast.auth.profileUpdateFailed': 'Failed to update profile',
    'toast.prompt.categoryCreateSuccess': 'Category created successfully',
    'toast.prompt.categoryCreateFailed': 'Failed to create category',
    'toast.prompt.categorySensitiveWord': 'Category name contains sensitive words'
  },
  zh: {
    // 邮箱验证页面
    'emailVerification.title': '需要验证邮箱',
    'emailVerification.description': '请验证您的邮箱地址以完成注册',
    'emailVerification.checkEmail': '我们已向您的邮箱发送了验证链接，请查收并点击链接验证您的账号。',
    'emailVerification.spamNotice': '如果您没有收到邮件，请检查垃圾邮件文件夹。',
    'emailVerification.resend': '重新发送验证邮件',
    'emailVerification.resending': '发送中',
    'emailVerification.backToLogin': '返回登录',
    'emailVerification.confirmTitle': '验证您的邮箱',
    'emailVerification.confirmDescription': '正在验证您的邮箱地址',
    'emailVerification.success': '您的邮箱已成功验证！',
    'emailVerification.proceedToLogin': '前往登录',
    'emailVerification.backToRegister': '返回注册',
    'emailVerification.invalidParams': '无效的验证参数',
    'emailVerification.verificationFailed': '邮箱验证失败',
    

    // 忘记密码页面
    'forgotPassword.title': '重置密码',
    'forgotPassword.description': '请输入您的邮箱地址，我们将向您发送验证码',
    'forgotPassword.email': '邮箱',
    'forgotPassword.verificationCode': '验证码',
    'forgotPassword.newPassword': '新密码',
    'forgotPassword.confirmPassword': '确认密码',
    'forgotPassword.sendCode': '发送验证码',
    'forgotPassword.resetPassword': '重置密码',
    'forgotPassword.backToLogin': '返回登录',
    'forgotPassword.emailRequired': '请输入邮箱',
    'forgotPassword.codeRequired': '请输入验证码',
    'forgotPassword.newPasswordRequired': '请输入新密码',
    'forgotPassword.confirmPasswordRequired': '请确认密码',
    'forgotPassword.passwordMismatch': '两次输入的密码不一致',
    'forgotPassword.codeSent': '验证码已发送',
    'forgotPassword.resetSuccess': '密码重置成功',

    // 导航栏
    'nav.home': '首页',
    'nav.gallery': '画廊',
    'nav.create': '创建',
    'nav.myPrompts': '我的提示词',
    'nav.favorites': '收藏',
    'nav.login': '登录',
    'nav.register': '注册',
    'nav.logout': '退出',
    'nav.account': '账号',

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

    'account.actions.edit': '编辑',
    'account.actions.save': '保存',
    'account.actions.cancel': '取消',
    'account.form.email': '邮箱',
    'account.form.username': '姓名',
    'account.form.avatarUrl': '头像URL',
    'account.description': '管理您的个人信息和设置',
    'account.title': '账号',
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
    'auth.forgotPassword': '忘记密码？',

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

        // Toast消息
    'toast.auth.loginSuccess': '登录成功',
    'toast.auth.loginFailed': '登录失败，请重试',
    'toast.auth.registerSuccess': '账号创建成功',
    'toast.auth.registerFailed': '注册失败，请重试',
    'toast.auth.logoutSuccess': '已成功退出登录',
    'toast.auth.verificationCodeSent': '验证码已发送到您的邮箱',
    'toast.auth.verificationCodeSendFailed': '发送验证码失败，请重试',
    'toast.auth.verificationSuccess': '验证成功',
    'toast.auth.verificationFailed': '验证失败，请重试',
    'toast.auth.resetPasswordSuccess': '密码重置成功',
    'toast.auth.resetPasswordFailed': '重置密码失败，请重试',
    'toast.prompt.createSuccess': '提示词创建成功',
    'toast.prompt.createFailed': '创建提示词失败',
    'toast.prompt.updateSuccess': '提示词更新成功',
    'toast.prompt.updateFailed': '更新提示词失败',
    'toast.prompt.deleteSuccess': '提示词删除成功',
    'toast.prompt.deleteFailed': '删除提示词失败',
    'toast.prompt.likeUpdateFailed': '更新点赞状态失败',
    'toast.prompt.saveUpdateFailed': '更新收藏状态失败',
    'toast.auth.profileUpdateSuccess': '个人信息更新成功',
    'toast.auth.profileUpdateFailed': '更新个人信息失败',
    'toast.prompt.categoryCreateSuccess': '分类创建成功',
    'toast.prompt.categoryCreateFailed': '分类创建失败',
    'toast.prompt.categorySensitiveWord': '分类名称包含敏感词'
  }
};