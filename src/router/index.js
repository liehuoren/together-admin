import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import store from '@/store'
import {routers} from './router';
import { getToken, getLockStatus, canTurnTo } from '@/libs/utils'

Vue.use(VueRouter);

const LOCK_PAGE_NAME = 'locking'
const LOGIN_PAGE_NAME = 'login'
const IS_LOCKED = getLockStatus()

// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: routers
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  Util.title(to.meta.title);
  if (IS_LOCKED && to.name !== LOCK_PAGE_NAME) {
    // 当前是锁定状态并且用户要跳转到的页面不是解锁页面
    next({
      replace: true, // 重定向到解锁页面
      name: LOCK_PAGE_NAME
    })
  } else if (IS_LOCKED && to.name === LOCK_PAGE_NAME) {
    // 当前未锁定且用户要跳转到的页面是解锁页面
    next(false) // 不做跳转
  } else {
    const token = getToken()
    if (!token && to.name !== LOGIN_PAGE_NAME) {
      // 未登录且要跳转的页面不是登录页
      next({
        name: LOGIN_PAGE_NAME // 跳转到登录页
      })
    } else if (!token && to.name === LOGIN_PAGE_NAME) {
      // 未登陆且要跳转的页面是登录页
      next() // 跳转
    } else if (token && to.name === LOGIN_PAGE_NAME) {
      // 已登录且要跳转的页面是登录页
      next({
        name: 'home' // 跳转到home页
      })
    } else {
      store.dispatch('getUserInfo').then(user => {
        // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
        if (canTurnTo(to.name, user.access, routers)) next() // 有权限，可访问
        else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
      })
    }
  }
});

router.afterEach((to) => {
  Util.openNewPage(router.app, to.name, to.params, to.query);
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});
