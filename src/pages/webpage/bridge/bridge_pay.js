/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 支付相关API
 *    event: '事件名称', 
 *    func: 执行函数, 
 *    mode: 是否需要更新WebPage状态, 
 *    auth: 是否需要权限 
 */

// 原生api配置项
const bridge_pay = [
  { event: 'payment', func: openPayment, auth: false },
  { event: 'cashier', func: openCashier, auth: false },
];

// 
async function openPayment(params = {}) {
  return params
}

// 
async function openCashier(params = {}) {
  return params
}

export default bridge_pay;