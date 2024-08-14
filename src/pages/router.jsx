/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 路由导航
 */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabStack from './BottomTabStack';

import NewProject from './project/NewProject';
import TestPage from './TestPage';
import WebPage from './webpage/WebPage';
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
    </StackView.Navigator>
  );
};

export default AppStackNavigator;
