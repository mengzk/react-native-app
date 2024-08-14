/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 底部导航栏
 */
 import React from 'react';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
 
 import Home from './home/Home';
 import Project from './project/Project';
 import My from './my/My';
 
 const Tab = createBottomTabNavigator();
 
 const TabTexts = {
   Home: '首页',
   Project: '项目',
   My: '我的',
 };
 
 // 底部栏-view
 function MyTabBar({ state, descriptors, navigation }) {
   const routes = state.routes;
 
   function TabView(isNew, isFocused, label) {
     label = TabTexts[label];
     if (isNew) {
       return (
         <View style={styles.noteTab}>
           <View style={styles.noteImg} />
           <Text style={styles.noteText}>{label}</Text>
         </View>
       );
     } else {
       //  const icon = isFocused
       return (
         <View style={styles.view}>
           <View style={isFocused ? styles.tabImg: styles.tabImg2} />
           <Text style={isFocused ? styles.tabText: styles.tabText2}>{label}</Text>
         </View>
       );
     }
   }
 
   return (
     <View>
       <View style={styles.tabBox}>
         {routes.map((route, index) => {
           const { options } = descriptors[route.key];
           const label =
             options.tabBarLabel !== undefined
               ? options.tabBarLabel
               : options.title !== undefined
                 ? options.title
                 : route.name;
 
           const isFocused = state.index === index;
           const isNew = label == 'Project';
 
           const onPress = () => {
             const event = navigation.emit({
               type: 'tabPress',
               target: route.key,
               canPreventDefault: true,
             });
 
             if (!isFocused && !event.defaultPrevented) {
               navigation.navigate({
                 name: isNew ? 'NewProject' : route.name,
                 merge: true,
               });
             }
           };
 
           const onLongPress = () => {
             navigation.emit({
               type: 'tabLongPress',
               target: route.key,
             });
           };
 
           return (
             <TouchableOpacity
               key={label}
               onPress={onPress}
               onLongPress={onLongPress}
               activeOpacity={isNew ? 1 : 0.8}
               style={styles.tab}>
               {TabView(isNew, isFocused, label)}
             </TouchableOpacity>
           );
         })}
       </View>
       {/* <SafeFooter /> */}
     </View>
   );
 }
 
 // 底部菜单
 const BottomTabStack = () => {
   return (
     <Tab.Navigator
       screenOptions={{ headerShown: false }}
       tabBar={(props) => <MyTabBar {...props} />}>
       <Tab.Screen name="Home" component={Home} />
       <Tab.Screen name="Project" component={Project} />
       <Tab.Screen name="My" component={My} />
     </Tab.Navigator>
   );
 };
 
 const styles = StyleSheet.create({
   tabBox: {
     minHeight: 52,
     flexDirection: 'row',
     backgroundColor: 'white',
   },
   tab: {
     flex: 1,
     height: 52,
     alignItems: 'center',
     justifyContent: 'center',
     backgroundColor: 'white',
   },
   noteTab: {
     width: 56,
     height: 80,
     borderRadius: 32,
     position: 'absolute',
     alignItems: 'center',
     justifyContent: 'flex-end',
     justifyContent: 'center',
     backgroundColor: 'white',
   },
   view: {
     width: '100%',
     height: 52,
     paddingBottom: 4,
     alignItems: 'center',
     justifyContent: 'flex-end'
   },
   noteText: {
     color: '#9900ff',
     fontSize: 14
   },
   noteImg: {
     width: 26,
     height: 26,
     backgroundColor: '#9900ff'
   },
   tabImg: {
     width: 22,
     height: 22,
     backgroundColor: '#3AB54A'
   },
   tabImg2: {
     width: 22,
     height: 22,
     backgroundColor: '#a8a8a8'
   },
   tabText: { 
     color: '#3AB54A', 
     fontSize: 13, 
     fontWeight: '500' 
   },
   tabText2: { 
     color: '#989898', 
     fontSize: 12, 
     fontWeight: '500' 
   }
 });
 
 export default BottomTabStack;
 