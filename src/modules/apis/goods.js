/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 商品接口
 */
import { request } from '../network/index';

export function queryGoods(data = {}) {
  return request({
    url: '/visit/app/visitByCustomer',
    method: 'POST',
    data
  })
}