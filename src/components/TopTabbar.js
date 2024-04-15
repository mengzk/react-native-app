/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc:
 */
import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export function TopTabbar({ state, descriptors, navigation, position }) {
  const routes = state.routes;
  
  return (
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

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (route.name == 'ProjectTab') {
              navigation.navigate({ name: 'ProjectTab', merge: true });
            } else {
              navigation.navigate({ name: route.name, merge: true });
            }
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
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}>
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBox: {
    height: 44,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});