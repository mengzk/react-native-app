/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc:
 */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabStack from './BottomTabStack';

import {NewProject, WebPage, TestPage} from './index';
import AddRecord from './home/test/AddRecord';
import RetailSalesData from './home/test/RetailSalesData';

import AnimatedClass from './project/Animated';

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
      <StackView.Screen name="Main" component={BottomTabStack} />
      <StackView.Screen name="NewProject" component={NewProject} />
      <StackView.Screen name="WebPage" component={WebPage} />
      <StackView.Screen name="TestPage" component={TestPage} />
      <StackView.Screen name="AddRecord" component={AddRecord} />
      <StackView.Screen name="RetailSalesData" component={RetailSalesData} />
      <StackView.Screen name="AnimatedClass" component={AnimatedClass} />
    </StackView.Navigator>
  );
};

export default AppStackNavigator;
