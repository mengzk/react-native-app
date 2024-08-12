/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 请求配置
 */
import configs from '../../config/index'

// 获取环境域名
export function getRequestHost(host='api', env=configs.env) {
  return env_hosts[env][host];
}

export function mergeParams(params={}) {

  return params;
}

export function mergeHeaders(headers={}) {
  headers['Content-Type'] = 'application/json;charset=utf-8'
  return headers;
}

const env_hosts =  {
  prod: {
    api: 'http://def.com',
    auth: 'http://auth.com',
    order: 'http://order.com',
  },
  test: {
    api: 'http://def-test.com',
    auth: 'http://auth-test.com',
    order: 'http://order-test.com',
  },
  dev: {
    api: 'http://def-test.com',
    auth: 'http://auth-test.com',
    order: 'http://order-test.com',
  }
}