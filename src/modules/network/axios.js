/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc:
 */
import axios from 'axios';

const instance = axios.create({
  // baseURL: '',
  timeout: 20000, // 毫秒
  headers: {'Content-Type': 'application/json; charset=utf-8'},
});

// 请求拦截
// instance.interceptors.request.use(
//   (config) => config,
//   (error) => Promise.reject(error)
// )

// 响应拦截（可根据具体业务作出相应的调整）
instance.interceptors.response.use(
  (response) => {
    return response.data;
    // const apiData = response.data
    // const responseType = response.request?.responseType
    // if (responseType == "blob" || responseType == "arraybuffer") {
    //   return apiData
    // }
  },
  (error) => {
    console.log("-----> interceptor error")
    console.log(error.code, error.message, error)
    if(error.response) {
      console.log(error.response)
    }else if(error.request) {
      console.log(error.request)
    }else {
      console.log(error)
    }
    const message = parseError(error.code)
    return Promise.reject({message, code: error.code})
  }
)

// 请求方法
export function network(options={}) {
  return instance.request(options)
}

export function parseError(status) {
  let msg = '未知异常';
  switch (status) {
    case 0:
    case 200:
    case 201:
      msg = 'ok';
      break;
    case 400:
      msg = '请求方法错误';
      break;
    case 401:
      msg = '登录已过期';
      break;
    case 403:
      msg = '拒绝访问';
      break;
    case 404:
      msg = '请求地址出错';
      break;
    case 408:
      msg = '请求超时';
      break;
    case 500:
      msg = '服务器内部错误';
      break;
    case 501:
      msg = '服务未实现';
      break;
    case 502:
      msg = '网关错误';
      break;
    case 503:
      msg = '服务不可用';
      break;
    case 504:
      msg = '网关超时';
      break;
    case 505:
      msg = 'HTTP 版本不受支持';
      break;
    case 'ERR_NETWORK':
      msg = 'No address associated with hostname';
      break;
    default:
      break;
  }
  return msg;
}

/**
 * 打印日志
 * @param {*} options 
 * @param {*} tag 
 */
function printLog(options, tag) {
  console.log('------> '+tag, options);
}