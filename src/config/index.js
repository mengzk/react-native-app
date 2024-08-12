/**
 * Author: Meng
 * Date: 2024-06-28
 * Modify: 2024-06-28
 * Desc:
 */
import {Platform, Dimensions} from 'react-native';

const {width, height, scale, fontScale} = Dimensions.get('window');

const Configs = {
  env: 'dev', // dev, test, prod
  log: true,
  netLog: true,
  mapKey: 'your key',
  appId: 'your id',
  theme: 'light',
  version: '1.0.0',
  platform: Platform.OS,
  osVersion: parseInt(Platform.Version, 7),
  screen: {
    width,
    height,
    scale, // 屏幕分辨率
    fontScale, // 字体缩放比例
    bottom: 0, // 底部安全区域
    top: 0, // 顶部安全区域
  },
};

export function setConfig(config = {}) {
  Object.assign(Configs, config);
}

export function initConfig(env = 'prod') {
  switch (env) {
    case 'dev':
    case 'test':
      break;
    default:
      break;
  }
}

export default Configs;
