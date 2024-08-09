/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 请求配置
 */
import app_config from '../constant/index'

// 常量配置
// export const net_config = {env: app_config.def_env}

export function getRequestHost(host='def', env=app_config.env) {
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
    def: 'http://def.com',
    auth: 'http://auth.com',
    order: 'http://order.com',
  },
  test: {
    def: 'http://def-test.com',
    auth: 'http://auth-test.com',
    order: 'http://order-test.com',
  },
  dev: {
    def: 'http://def-test.com',
    auth: 'http://auth-test.com',
    order: 'http://order-test.com',
  }
}