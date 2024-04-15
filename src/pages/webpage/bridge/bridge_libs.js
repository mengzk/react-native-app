/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc: 三方库API
 */

// 原生api配置项
const bridge_libs = [
  { event: 'onPreviewImage', func: onPreviewImage, auth: false }, // 预览图片
  { event: 'onChooseAddress', func: onChooseAddress, auth: false }, // 选择城市
  { event: 'getLocation', func: getCurLocation, auth: false }, // 获取当前定位
  { event: 'qrcodeScan', func: qrcodeScan, auth: false }, // 二维码扫描
];

// 
async function onPreviewImage(params = {}) {
  return params
}

// 
async function onChooseAddress(params = {}) {
  return params
}

// 
async function getCurLocation(params = {}) {

  return params;
}

// 
async function qrcodeScan(params = {}) {
  return params;
}

export default bridge_libs;