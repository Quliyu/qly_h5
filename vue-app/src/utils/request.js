import axios from 'axios';
import qs from 'qs';
import {
  deviceName,
  ProSun,
} from '@/const';
import router from '../router';

const appVersion = window.localStorage.getItem('appVersion') || '';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API || '', // api的base_url
  timeout: 10000, // 请求超时时间
});

// 去APP登录页面
const goAppLoginPage = (config) => {
  // 判断是否在app内部打开
  if (appVersion >= '1.0.0' && window.webkit) {
    const body = {
      login_event: 'goLoginPage()',
    };
    if (deviceName === 'ios') {
      window.webkit.messageHandlers.CLOUDM.postMessage({
        body,
      });
    } else if (deviceName === 'android') {
      window.webkit.postMessage(JSON.stringify(body));
    }
  } else {
    // 不在app内部
    console.log('需要登录，不在app内部');
    const url = config.url || '';
    if (url.indexOf(ProSun) >= 0) {
      console.log(url);
      router.push({
        path: 'AzbLogin',
        query: {},
      });
    }
  }
};

// request拦截器
service.interceptors.request.use((config) => {
  const conf = config;
  if (conf.method === 'post') {
    conf.data = qs.stringify(conf.data);
  }
  if (conf.jsonData) {
    conf.headers['Content-Type'] = 'application/json';
    conf.data = JSON.stringify(conf.jsonData);
  }
  const token = window.localStorage.getItem('token') || '';
  if (token) {
    conf.headers.token = token;
  }
  return conf;
}, (error) => {
  const err = error;
  return Promise.reject(err);
});

// respone拦截器
service.interceptors.response.use((response) => {
  const res = response;
  if (res && res.data && Number(res.data.code) === -10086) {
    // console.log('devMsg=>', res.data.devMsg);
    goAppLoginPage(res.config || {});
  }
  return res;
}, (error) => {
  const err = error;
  return Promise.reject(err);
});

export default service;
