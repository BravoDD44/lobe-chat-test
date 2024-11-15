'use client';

import axios from 'axios';

import { authFiled } from '@/const/errorCode';
import eventBus from '@/eventBus';

const req = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

req.interceptors.request.use(
  (config) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    if (userInfo?.authorization) {
      config.headers.authorization = `${userInfo?.authorization}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
req.interceptors.response.use(
  (response) => {
    // 检查响应 data 中的 code 字段
    if (response.data.code === authFiled) {
      console.log('error', response.data.code, authFiled);
      // document.dispatchEvent(new CustomEvent("openAuthModal", { detail: "" }));
      // window.localStorage.removeItem('userInfo');
      // window.location.replace('/login');
      eventBus.dispatch('openAuthModal', null);
    }
    return response.data;
  },
  (error) => {
    // 处理所有被响应拦截器所抛出的错误
    console.error('An error occurred:', error.message);
    return Promise.reject(error);
  },
);
export default req;
