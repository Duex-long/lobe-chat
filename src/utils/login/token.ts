import { md5 } from 'js-md5';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import uuidv4 from 'uuid-random';

import { fetchGet, fetchPostJson, sha1 } from './fetch';

const USER_KEY = 'fd7d08f5-9aea-4e07-bd6a-9b6f4a92e7c3';

export const setToken = (token: string) => {
  sessionStorage.setItem('token', token);
};

export const setUserId = (username: string) => {
  sessionStorage.setItem(USER_KEY, sha1(username));
};
export const getToken = () => {
  return sessionStorage.getItem('token');
  // return true
};

export const getUserId = () => {
  return sessionStorage.getItem(USER_KEY);
};
export const removeToken = () => {
  sessionStorage.removeItem('token');
};
export const removeUserId = () => {
  sessionStorage.removeItem(USER_KEY);
};

export const setRoleInfo = (info: string) => {
  sessionStorage.setItem('info', info);
};

export const getRoleInfo = () => {
  return sessionStorage.getItem('info');
};

export const removeInfo = () => {
  return sessionStorage.removeItem('info');
};

export const getCacheKey = () => uuidv4();

export const rsaEncrypt = (publicKey: string, target: string) => {
  const JsEncrypt = require('jsencrypt');
  const myEncrypt = new JsEncrypt.default();
  const md5Target = md5(target);
  myEncrypt.setPublicKey(publicKey);
  const result = myEncrypt.encrypt(md5Target);
  return result || '';
};

export const clearCache = () => {
  removeToken();
  removeUserId();
  removeInfo();
};

const getPublicKey = async (cacheKey: string): Promise<string> => {
  const res = await fetchGet('admin/user/getPublicKey', { cacheKey });
  const { data } = await res.json();
  return data;
};

export const userLogin = async (username: string, password: string) => {
  clearCache();
  const cacheKey = getCacheKey();
  const publicKey = await getPublicKey(cacheKey);
  if (publicKey) {
    const encryptPassword = rsaEncrypt(publicKey, password);
    if (!encryptPassword) {
      throw Error('加密错误');
    }
    const userInfo = {
      username,
      password: encryptPassword,
      cacheKey,
    };
    const loginResponse = await fetchPostJson('admin/user/login', userInfo);
    const data = await loginResponse.json();
    if (data.message) {
      throw Error(data.message);
    }
    setUserId(username);
    return data.data;
  }
};

export const checkLogin = async () => {
  const token = getToken();
  if (token) {
    const res = await fetchGet('admin/user/info');
    const { data, message } = await res.json();
    if (message) {
      clearCache();
      return false;
    }
    return true;
  }
  return false;
};

export const useLogin = () => {
  const router = useRouter();
  const location = usePathname();
  if (!location.includes('welcome')) {
    checkLogin().then((res) => {
      router.replace('/welcome');
    });
  }
};