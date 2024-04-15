/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc: 账号相关API
 */

// 原生api配置项
const bridge_account = [
  { event: 'userInfo', func: getUserInfo, auth: true },
  { event: 'getToken', func: getToken, auth: true },
];

// 
async function getUserInfo(params = {}) {
  return params
}

// 
async function getToken(params = {}) {
  return params
}

export default bridge_account;