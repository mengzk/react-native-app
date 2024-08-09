/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc:
 */
import React from 'react';
import { Image } from 'react-native';

//  interface Props {
//   style?: object;
//   icon: require(path); 
//   size: number; 
//  }

const Icons = (props) => {
  const style = { width: props.size || 24, height: props.size || 24 }
  return (
    <Image style={props.style || style} source={props.icon} />
  )
}

export default Icons;

