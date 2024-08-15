/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 请求配置
 */
import configs from '../../config/index';
import {DEVICE, ACCOUNT} from '../../config/constants';

let userAuth = ''; // 用户认证信息
/**
 * 获取环境域名
 * @param {*} tag 域名标签
 * @param {*} env 环境
 * @returns
 */
export function getTagDomain(tag = 'api', env) {
  return env_domain[env || configs.env][tag];
}

/**
 * 合并请求参数
 * @param {*} params
 * @returns
 */
export function mergeParams(params = {}) {
  return params;
}

/**
 * 合并请求头
 * @param {*} headers
 * @returns
 */
export function mergeHeaders(headers = {}) {
  // headers['Content-Type'] = 'application/json;charset=utf-8'
  const token = ACCOUNT.token;
  if (!userAuth) {
    userAuth = JSON.stringify(DEVICE);
    // userAuth = userAuth.replace(/"/g, '');
  }
  return {
    token,
    userAuth,
    ...headers,
  };
}

// 环境域名
const env_domain = {
  prod: {
    api: 'http://api.com',
    auth: 'http://auth.com',
    order: 'http://order.com',
  },
  test: {
    api: 'http://api-test.com',
    auth: 'http://auth-test.com',
    order: 'http://order-test.com',
  },
  dev: {
    api: 'http://api-test.com',
    auth: 'http://auth-test.com',
    order: 'http://order-test.com',
  },
};
