/**
 * Author: Meng
 * Date: 2024-06-28
 * Modify: 2024-06-28
 * Desc:
 */

// 初始化配置 -
async function initConfig() {

}

// 设置配置
function setConfig(config = {}) {
  Object.assign(Configs, config);
}


const Configs = {
  env: 'dev', // dev, test, prod
  debug: true, // 调试模式
  log: true, // 控制台日志
  netLog: true, // 网络请求日志
  mapKey: 'your key',
  appId: 'your id',
  theme: 'light',
  locale: 'zh',
  maxLog: 100,
  init: () => initConfig(),
  setConfig,
};


export default Configs;
