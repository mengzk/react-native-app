/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 账号相关API
 *    event: '事件名称', 
 *    func: 执行函数, 
 *    mode: 是否需要更新WebPage状态, 
 *    auth: 是否需要权限 
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