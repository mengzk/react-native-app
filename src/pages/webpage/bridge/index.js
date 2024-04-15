/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc: Web消息 处理与解析
 */

import bridge_account from './bridge_account';
import bridge_base from './bridge_base';
import bridge_libs from './bridge_libs';
import bridge_pay from './bridge_pay';

/**
 * 处理 Web发送的消息
 */
export async function handlerWebMessage(info = {}, navigation, sendEvent) {

  let result = { event: info.event || 'undefined', data: null, code: -1 };
  if (info.event) {
    let item = bridge_base.find(e => e.event == info.event); // 基础方法
    !item && (item = bridge_account.find(e => e.event == info.event)); // 账号相关
    !item && (item = bridge_libs.find(e => e.event == info.event)); // 三方库API相关
    !item && (item = bridge_pay.find(e => e.event == info.event)); // 支付相关

    try {
      result.event = info.event;
      if (item && item.func) {
        if (item.auth) {
          const useApi = checkApiAuth(info.key);
          if (!useApi) {
            result.data = '你没有权限访问该方法！';
            return
          }
        }
        const data = await item.func(info.params, navigation, sendEvent);

        result.data = data;
        result.code = 0;
        // mode取值{state, page}
        if (item.mode == 'state') {
          result.state = data;
        } else if (item.mode == 'page') {
          return; // page：表示自处理
        }
      } else {
        result.data = `未发现${info.event}方法！`;
      }
    } catch (error) {
      console.warn(`handlerWebMessage ------> Err: `, error);
      result.data = 'Handle your api error!';
    }
  } else {
    console.warn(`handlerWebMessage ------> api event = undefined `);
    result.data = 'Your api event value = undefined';
  }
  // 发送消息
  sendEvent(result);
}

/**
 * 对 Web 端消息 JSON.parse(msg) 处理
 */
export function parseWebEvent(nativeEvent = {}) {
  const url = nativeEvent.url;
  const data = nativeEvent.data;
  const title = nativeEvent.title;
  console.log(`parseWebEvent ------> title: ${title}, url: ${url}, data: ${data}`);

  let info = {};
  try {
    if (data != null) {
      info = JSON.parse(data);
    }
  } catch (err) {
    console.warn(`parseWebEvent JSON.parse ------> Err: `, err);
    info = { event: 'parse_error', data: '数据格式错误: {event, params, key}', code: -1 }
  }
  return info;
}

/**
 * key: api授权访问的key
 */
function checkApiAuth(key = '') {
  return true;
}
