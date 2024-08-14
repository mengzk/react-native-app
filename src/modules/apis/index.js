/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 接口请求
 */
import {request} from '../network/index';

// 例子
export function example(data = {}) {
  return request({
    url: '/test/request/example',
    method: 'POST',
    host: 'api',
    data,
  });
}
