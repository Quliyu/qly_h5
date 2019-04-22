import Vue from 'vue';
import Router from 'vue-router';

import HelloWorld from '@/components/page/HelloWorld';
import IndexPage from '@/components/page/IndexPage';
import NotFoundPage from '@/components/page/NotFoundPage';

// 微信相关页面
import WxOauth2 from '@/components/page/Wx/Oauth2';

import BmJwjy from '@/components/page/Bm/Jwjy/Index';

Vue.use(Router);

export default new Router({
  // mode: 'history',
  base: './',
  routes: [// 首页
    { path: '/', component: IndexPage },
    // 欢迎页面
    { path: '/HelloWorld', component: HelloWorld },

    { path: '/bm_jwJy', component: BmJwjy },

    // 微信相关页面
    { path: '/WxOauth2', component: WxOauth2 },

    { path: '/*', component: NotFoundPage },
  ],
});
