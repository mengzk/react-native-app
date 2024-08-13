/**
 * Author: Meng
 * Date: 2024-08-10
 * Modify: 2024-08-10
 * Desc: 入口文件
 */

import { AppRegistry } from 'react-native';

import App from './src/App';

const AppName = 'StepApp'; // 项目名称

AppRegistry.registerComponent(AppName, () => App);

// 忽略警告
// console.disableYellowBox = true;

// AppRegistry.setWrapperComponentProvider(() => {
//   return (props) => App(props);
// });

// 错误捕获
// ErrorUtils.setGlobalHandler((error) => {}, true);
global.ErrorUtils.setGlobalHandler((error) => {
  console.log('-----> ErrorUtils', error);
  // Sentry.captureException(error);
});
