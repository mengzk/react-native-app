/**
 * Author: Meng
 * Date: 2024-06-28
 * Modify: 2024-06-28
 * Desc:
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

// 配置
const Configs = {
  env: 'dev', // dev, test, prod -禁止外部赋值
  debug: true, // 调试模式
  log: true, // 控制台日志
  netLog: true, // 网络请求日志
  mapKey: 'your key',
  appId: 'your id',
  theme: 'light',
  locale: 'zh',
  maxLog: 50,
  init: () => initConfig(),
  setConfig,
  setEnv,
};

// 初始化配置 -
async function initConfig() {
  if(Configs.debug) {
    const env = await AsyncStorage.getItem('configEnv');
    if (env) {
      Configs.env = env;
    }
    // console.log('-----> config: ', Configs);
  }
}

// 设置配置
function setConfig(config = {}) {
  Object.assign(Configs, config);
}

// 设置切换环境 -防止乱输入
function setEnv(key) {
  let env = key;
  switch (key) {
    case 'dev':
    case 'uat':
    case 'test':
    case 'prod':
      break;
    default:
      env = 'prod';
      break;
  }
  Configs.env = env;
  AsyncStorage.setItem('configEnv', env);
}

export default Configs;
