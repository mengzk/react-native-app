/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 网络请求实体类
 */

// 普通请求
export function network({ url, data, headers, method }) {
  let body = null;
  if (method == 'GET') {
    url = _parseData(url, data)
  } else {
    body = JSON.stringify(data); // 注意这里请求头 Content-Type = 'application/json'
  }
  return fetch(url, { method, headers, body }).then(res => res.json());
}

// 上传文件
export function uploadFiles({ url, body, headers, method }) {
  return fetch(url, { method, headers, body }).then(res => res.json());
}

// 下载
export function download(path, option = {}) {
  return fetch(path, option).then((data) => data.blob() || data.json());
}

function _parseData(url, params = {}) {
  console.log(params)
  let list = []
  for (const key in params) {
    list.push(`${key}=${params[key]}`)
  }
  const unit = url.includes('?') ? '&' : (list.length > 0 ? '?' : '');
  return `${url}${unit}${list.join('&')}`
}

function parseErr(res) {
  // console.log(err);
  let code = res.code, message = '', url = '', status = -1;
  const reqInfo = res.request || {};

    url = reqInfo.responseURL || reqInfo._url;
    const param = reqInfo.__sentry_xhr__?.body || {};
    const header = reqInfo._headers || {};
    header.method = reqInfo.__sentry_xhr__?.method || 'GET';

    console.log('------> error request info:', reqInfo || res);
    console.log(`------> error request status: ${reqInfo.status}, code: ${code}, url: ${url}`);

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