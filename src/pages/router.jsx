/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 路由导航
 */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabStack from './BottomTabStack';

import {LogPage, LogDetailPage, PanelPage} from './debug/index';
import {NewProject, WebPage, TestPage} from './index';
import Launcher from './Launch';

const StackView = createNativeStackNavigator();
const AppStackNavigator = () => {
  return (
    <StackView.Navigator
      screenOptions={{headerShown: false, animation: 'slide_from_right'}}
      screenListeners={(res) => {
        // console.log('==============> navigation <==============')
        //  console.log(res?.navigation);
        return res;
      }}>
      <StackView.Screen name="Launch" component={Launcher} />
      <StackView.Screen name="Main" component={BottomTabStack} />
      <StackView.Screen name="NewProject" component={NewProject} />
      <StackView.Screen name="WebPage" component={WebPage} />
      <StackView.Screen name="TestPage" component={TestPage} />

      {/* 调试 */}
      <StackView.Screen name="LogPage" component={LogPage} />
      <StackView.Screen name="LogDetailPage" component={LogDetailPage} />
      <StackView.Screen name="PanelPage" component={PanelPage} />
    </StackView.Navigator>
  );
};

export default AppStackNavigator;
