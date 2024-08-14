/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 网络请求封装类
 */
import {DeviceEventEmitter} from 'react-native';

import {network, parseError} from './axios';
import {getTagDomain, mergeHeaders, mergeParams} from './config';

const min_interval = 600; // 最小间隔
let timer_id = 0; // 定时器

export function request({
  url = '',
  method = 'GET',
  data = {},
  headers = {},
  responseType = 'json',
  host = '',
  env,
  isLoading = true,
  loadingText = '加载中...',
  isToast = true,
  // reload = false,
  // count = 1,
  // maxCount = 3,
  handleResponse = null,
} = op) {
  _showLoading(isLoading, loadingText); // 加载框

  const url2 = `${getTagDomain(host, env)}${url}`;
  const data2 = mergeParams(data);
  const headers2 = mergeHeaders(headers);

  const options = {
    url: url2,
    params: data2,
    headers: headers2,
    method: method.toUpperCase(),
    responseType,
  };
  return new Promise(resolve => {
    // 请求结构封装
    const result = {code: -1, data: null, message: ''};
    const startDate = Date.now();
    printLog(options, 'request');

    network(options)
      .then(res => {
        if (handleResponse) {
          handleResponse(res, result);
        } else {
          _parseData(res, result);
        }
      })
      .catch(err => {
        _parseErr(err, result);
      })
      .finally(() => {
        const dateNow = Date.now();
        const totalTime = Math.round((dateNow - startDate) / 1000);
        DeviceEventEmitter.emit('app-request-log', { ...options, ...result, time: totalTime, date: dateNow });
        printLog(result, 'response');
        _showLoading(false, ''); // 显示加载框
        // 显示 toast
        if (result.code != 0 && isToast) {
          _showToast(result.message);
        }
        resolve(result);
        // 请求重连
        // if (result.code != 0 && reload && count < maxCount) {
        //   const curCount = count + 1;
        //   const timer = setTimeout(() => {
        //     clearTimeout(timer);
        //     request({
        //       url,
        //       data,
        //       method,
        //       headers,
        //       host,
        //       env,
        //       isLoading,
        //       isToast,
        //       reload,
        //       maxCount,
        //       count: curCount,
        //     });
        //   }, 1000);
        // } else {
        //   resolve(result);
        // }
      });
  });
}
/**
 * 解析数据
 * @param {*} res
 * @param {*} result
 */
function _parseData(res, result) {
  // console.log("-----> parseData:", res)
  const code = res.code;
  result.message = parseError(code);
  switch (code) {
    case 0:
    case 200:
    case 201:
      Object.assign(result, res);
      result.code = 0;
      break;
    default:
      break;
  }
}

/**
 * 解析错误
 * @param {*} err
 * @param {*} result
 */
function _parseErr(err, result) {
  // printLog(err, 'net errpr');
  if (err.response) {
    const res = err.response;
    result.code = res.status;
    result.message = err.message;
  } else {
    result.code = -1001;
    result.message = err.message;
  }
}

/**
 * 显示加载框
 * @param {*} show
 * @param {*} text
 */
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

/**
 * 显示 toast
 * @param {*} text
 */
function _showToast(text) {}

/**
 * 打印日志
 * @param {*} options
 * @param {*} tag
 */
function printLog(data, tag) {
  console.log('------> ' + tag, data);
}
