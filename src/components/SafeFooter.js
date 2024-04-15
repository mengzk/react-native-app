/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc:
 */
import React from 'react';
import { View } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SafeFooter = (props) => {
  // let min = useSafeAreaInsets().bottom;
  let min = 0;
  min = Math.min(min, 16);
  const style = { height: min, backgroundColor: props.dark ? '#000000' : '#FFFFFF' }
  return (
    <View style={style} />
  );
};

export default SafeFooter;
