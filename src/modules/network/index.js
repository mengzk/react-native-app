/**
 * Author: Meng
 * Date: 2022-03
 * Desc: 网络请求封装类
 */

// import { network } from './fetch';
import { network } from './axios';
import { getRequestHost, mergeHeaders, mergeParams } from './config';

const min_interval = 600; // 最小间隔
let timer_id = 0; // 定时器


export function request({ url = '', method = 'GET', data = {}, headers = {}, host = 'def', env = '', isLoading = true, loadingText = '加载中...', isToast = true, reload = false, count = 1, maxCount = 3 } = {}) {

  _showLoading(isLoading, loadingText); // 加载框

  const url2 = `${getRequestHost(env, host)}${url}`;
  const data2 = mergeParams(data);
  const headers2 = mergeHeaders(headers);

  const options = { url: url2, data: data2, headers: headers2, method };
  return new Promise((resolve) => {
    // 请求结构封装
    const result = { code: -1, data: '', message: '' };

    network(options).then(res => {
      _parseData(res, result);
    }).catch(err => {
      _parseErr(err, result);
    }).finally(() => {
      _showLoading(false, ''); // 显示加载框
      // 显示 toast
      if (result.code != 0 && isToast) {
        _showToast(result.message);
      }
      // 请求重连
      if (result.code != 0 && reload && count < maxCount) {
        const curCount = count + 1;
        const timer = setTimeout(() => {
          clearTimeout(timer);
          request({ url, data, method, headers, host, env, isLoading, isToast, reload, maxCount, count: curCount });
        }, 1000);
      } else {
        resolve(result);
      }
    });
  })
}

function _parseData(res, result) {
  console.log(res);
}

// 
function _parseErr(res, result) {
  // console.log(err);
  let code = res.code, message = '', url = '', status = -1;
  const reqInfo = res.request || {};

  if (printLog) {
    url = reqInfo.responseURL || reqInfo._url;
    const param = reqInfo.__sentry_xhr__?.body || {};
    const header = reqInfo._headers || {};
    header.method = reqInfo.__sentry_xhr__?.method || 'GET';

    console.log('------> error request info:', reqInfo || res);
    console.log(`------> error request status: ${reqInfo.status}, code: ${code}, url: ${url}`);
    addNetLog(url, 100, param, { status: reqInfo.status, code }, header);
  }

  if (reqInfo) {
    code = (code || '').toLowerCase();
    status = reqInfo.status;
    url = reqInfo.responseURL || reqInfo._url;
    switch (status) {
      case 0:
        status = -1;
        message = `${code == 'econnaborted' ? '请求超时' : '网络异常'}，请重新连接`;
        break;
      case 404:
        message = '请求地址不存在'
        break;
      case 405:
        message = '请求方式错误，请联系开发人员'
        break;
      case 500:
      case 502:
        message = '服务重启中, 请稍后'
        break;
      case 504:
        message = '网关连接超时, 请稍后'
        break;
      default:
        message = `抱歉, 请求失败:${status}`
        break;
    }
  }
  return { code: status, message, url };
}

function _showLoading(show, text = '加载中...') {
  if (timer_id) {
    clearTimeout(timer_id);
  }
  if (show) {
    // 显示
  } else {
    timer_id = setTimeout(() => {
      clearTimeout(timer_id);
      // 关闭
    }, min_interval);
  }
}
function _showToast(text = '加载中...') {

}
