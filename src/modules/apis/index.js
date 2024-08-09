/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc:
 */
import { request } from '../network/index';

// 例子
export function example(data = {}) {
  return request({
    url: "",
    method: "POST",
    host: "sp",
    data,
  });
}
