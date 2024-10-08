/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: App 入口
 */

import React from 'react';
import {DeviceEventEmitter} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import Configs from './config/index';
import AppStackNavigator from './pages/router';
import DebugBox from './pages/widget/debug/DebugBox';
import AppLoading from './pages/widget/Loading';
import HintModel from './pages/widget/HintModel';

// 获取 route 信息
function getRoute(route) {
  if (route.state && route.state.routes) {
    const route2 = route.state.routes[route.state.index];
    return getRoute(route2);
  }
  return route;
}

// 初始化配置 -useEffect 会加载两次
Configs.init();
const App = () => {
  return (
    <NavigationContainer
      onStateChange={state => {
        const route = getRoute(state.routes[state.index]);
        console.log('App onStateChange Log:', route);
        delete route.params;
        DeviceEventEmitter.emit('app_route_change', route);
      }}>
      <AppStackNavigator />
      <DebugBox />
      <AppLoading />
      <HintModel />
    </NavigationContainer>
  );
};

export default App;
