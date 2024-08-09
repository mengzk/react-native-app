/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc:
 */
import { request } from '../network/index';

export function queryGoods(data = {}) {
  return request({
    url: 'xhcrmH5Api/apis/visit/app/listAppVisitByCustomerId.do',
    method: 'POST',
    data
  })
}