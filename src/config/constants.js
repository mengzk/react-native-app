/**
 * Author: Meng
 * Date: 2024-08-12
 * Modify: 2024-08-12
 * Desc: 常量配置文件
 */
import {Platform, Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';

// 设备屏幕信息
const {width, height, scale, fontScale} = Dimensions.get('window');

// 设置设备信息
export async function initDeviceInfo(top = 0, bottom = 0) {
  DEVICE.osVersion = DeviceInfo.getSystemVersion();
  DEVICE.model = DeviceInfo.getModel();
  DEVICE.brand = DeviceInfo.getBrand();
  DEVICE.deviceId = DeviceInfo.getDeviceId();
  // DEVICE.bundleId = DeviceInfo.getBundleId();
  DEVICE.version = DeviceInfo.getVersion();
  // DEVICE.tablet = DeviceInfo.isTablet();
  DEVICE.deviceName = await DeviceInfo.getDeviceName();
  // DEVICE.ipAddress = await DeviceInfo.getIpAddress();
  // DEVICE.macAddress = await DeviceInfo.getMacAddress();
  // DEVICE.userAgent = await DeviceInfo.getUserAgent();
  DEVICE.uniqueId = await DeviceInfo.getUniqueId();
  // DEVICE.emulator = await DeviceInfo.isEmulator();
  DEVICE.osNumber = await DeviceInfo.getApiLevel();
  // await DeviceInfo.getInstanceId();
  // DEVICE.token = await DeviceInfo.getDeviceToken();
  // const locale = await DeviceInfo.isLocationEnabled();
  if (top > 0) {
    SCREEN.top = top;
  }
  if (bottom > 0) {
    SCREEN.bottom = bottom;
  }
  console.log('-----> device: ', DEVICE);
  console.log('-----> screen: ', SCREEN);
}

// 设备信息
export const DEVICE = {
  // platform: Platform.OS,
  os: Platform.OS,
  osVersion: '',
  osNumber: '',
  model: '',
  brand: '',
  deviceName: '',
  deviceId: '',
  // bundleId: '',
  uniqueId: '',
  version: '',
  // ipAddress: '',
  // macAddress: '',
  // emulator: false,
};

// 屏幕信息
export const SCREEN = {
  width,
  height,
  scale, // 屏幕分辨率
  fontScale, // 字体缩放比例
  bottom: 0, // 底部安全区域
  top: 0, // 顶部安全区域
};

// 账号信息
export const ACCOUNT = {
  token: '',
  userId: '',
  userName: '',
  avatar: '',
  phone: '',
  email: '',
};
