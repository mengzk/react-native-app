/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 基础能力(硬件，系统)API
 */
import { StatusBar, Alert, Platform, Linking, Dimensions, DeviceEventEmitter } from 'react-native';
// import DeviceInfo from 'react-native-device-info';
// import { useSafeAreaInsets } from 'react-native-safe-area-context'

// 原生api配置项
const bridge_base = [
  { event: 'appVersion', func: getAppVersion, auth: false },
  { event: 'deviceInfo', func: getDeviceInfo, auth: false },
  { event: 'screenInfo', func: getScreenInfo, auth: false },
  { event: 'callPhone', func: onCallPhone, auth: false },
  { event: 'setTitle', func: updateWebTitle, mode: 'state', auth: false },
  { event: 'share', func: showSharePopup, mode: 'state', auth: false },
  { event: 'getShopAndCity', func: getCurShopInfo, auth: false },
  { event: 'setShopAndCity', func: setCurShopInfo, auth: false },
  { event: 'eventEmitter', func: sendEventEmitter, auth: true },
];

const { width, height } = Dimensions.get('window');
const bottomBarHeight = 0;
const statusBarHeight = StatusBar.currentHeight || 0;
const os = Platform.OS;
const osVersion = Platform.Version;
const appVersion = '1.0.1';

// 获取设备信息
async function getAppVersion() {
  return { os, osVersion, appVersion };
}

// 获取设备屏幕相关信息
async function getScreenInfo() {
  return { width, height, statusBarHeight, bottomBarHeight, headerHeight: 48 };
}

// 获取设备信息
async function getDeviceInfo() {
  // {getBuildNumber, getDeviceId, getIpAddress, getPhoneNumber, getUniqueId}
  const uniqueId = '' // DeviceInfo.getUniqueId();
  const machine = '' // DeviceInfo.getModel();

  return { os, osVersion, appVersion, machine, uniqueId };
}

// 当前店铺信息
async function getCurShopInfo(params = {}) {
  return params;
}

// 当前店铺信息
async function setCurShopInfo(params = {}) {
  return params;
}

// 发送消息
async function sendEventEmitter(params = {}) {
  DeviceEventEmitter.emit('webpage_receivers', params);
}

async function updateWebTitle(title = {}) {
  return { title };
}

function showSharePopup(shareData={}) {
  return { showShare: true, shareData }
}

// 拨打电话
function onCallPhone(params = {}) {
  const phone = params.phone;

  if (!phone) {
    return Promise.resolve('phone error')
  }

  return new Promise((resolve) => {

    const callPhone = () => {
      Linking.openURL('tel:' + phone).then(_ => {
        resolve('ok');
      }).catch(err => {
        console.warn(`onCallPhone: ${phone}`, err);
        resolve(`error: ${phone}`);
      });
    }

    if (os == 'ios') {
      callPhone();
    } else {
      Alert.alert(params.title || '拨打热线', phone, [
        { text: '取消', onPress: () => { } },
        { text: '呼叫', onPress: () => callPhone() }
      ])
    }
  });
}

export default bridge_base;