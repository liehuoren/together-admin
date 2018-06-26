import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () => import('@/views/login.vue')
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () => import('@/views/error-page/404.vue')
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () => import('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () => import('@/views/error-page/500.vue')
};


export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: () => import('@/views/home/home.vue') },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: () => import('@/views/own-space/own-space.vue') },
        { path: 'message', title: '消息中心', name: 'message_index', component: () => import('@/views/message/message.vue') },

        { path: 'article-add', title: '文章新增', name: 'article-add', component: () => import('@/views/article/article-add.vue') },
        { path: 'article-edit/:id', title: '文章编辑', name: 'article-edit', component: () => import('@/views/article/article-edit.vue') },

        { path: 'banner-add', title: '广告新增', name: 'banner-add', component: () => import('@/views/banner/banner-add.vue') },

        { path: 'feedback-edit', title: '反馈处理', name: 'feedback-edit', component: () => import('@/views/form/system/feedback/feedback-action.vue') },

        { path: 'games-add', title: '游戏新增', name: 'games-add', icon: 'compose', component: () => import('@/views/form/game/games-action.vue') },
        { path: 'games-edit', title: '游戏编辑', name: 'games-edit', icon: 'compose', component: () => import('@/views/form/game/games-action.vue') },
        { path: 'games-config', title: '游戏配置', name: 'games-config', icon: 'compose', component: () => import('@/views/form/game/games-config.vue') }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/',
        icon: 'android-checkbox',
        name: 'information',
        title: '信息资讯',
        component: Main,
        children: [
            { path: 'article-list', title: '文章管理', name: 'article-list', icon: 'compose', component: () => import('@/views/article/article-list.vue') },
            { path: 'banner-list', title: 'Banner管理', name: 'banner-list', icon: 'compose', component: () => import('@/views/banner/banner-list.vue') },
            { path: 'comment-list', title: '评论管理', name: 'comment-list', icon: 'compose', component: () => import('@/views/comment/comment-list.vue') }
        ]
    },
    {
        path: '/system',
        icon: 'android-checkbox',
        name: 'system',
        title: '系统管理',
        component: Main,
        children: [
            { path: 'about', title: '关于小程序', name: 'about', icon: 'compose', component: () => import('@/views/company-about/about.vue') },
            { path: 'feedback', title: '反馈意见管理', name: 'feedback', icon: 'compose', component: () => import('@/views/form/system/feedback/feedback.vue') }
        ]
    },
    {
        path: '/game',
        icon: 'android-checkbox',
        name: 'game',
        title: '游戏管理',
        component: Main,
        children: [
            { path: 'games', title: '游戏列表', name: 'games', icon: 'compose', component: () => import('@/views/form/game/games.vue') }            
        ]
    },
    {
        path: '/user',
        icon: 'android-checkbox',
        name: 'user',
        title: '用户管理',
        component: Main,
        children: [
            { path: 'users', title: '用户列表', name: 'users', icon: 'compose', component: () => import('@/views/form/user/users.vue') }
        ]
    }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
