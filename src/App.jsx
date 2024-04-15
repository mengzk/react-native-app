/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc:
 */

import React from 'react';
import {DeviceEventEmitter} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AppStackNavigator from './pages/router.jsx';

// 获取 route 信息
function getRoute(route) {
  if (route.state && route.state.routes) {
    const route2 = route.state.routes[route.state.index];
    return getRoute(route2);
  }
  return route;
}

const App = () => {
  return (
    <NavigationContainer
      onStateChange={state => {
        const route = getRoute(state.routes[state.index]);
        console.log('App.js Log:', route);
        delete route.params;
        DeviceEventEmitter.emit('app_route_change', route);
      }}>
      <AppStackNavigator />
    </NavigationContainer>
  );
};

export default App;
