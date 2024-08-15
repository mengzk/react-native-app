/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 账号相关API
 */
import UserStore from '../../../modules/store/user'

// 原生api配置项
const bridge_account = [
  { event: 'userInfo', func: getUserInfo, auth: true },
  { event: 'getToken', func: getToken, auth: true },
];

// 
async function getUserInfo(params = {}) {
  return UserStore.getInfo();
}

// 
async function getToken(params = {}) {
  return UserStore.getToken();
}

export default bridge_account;