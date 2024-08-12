/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 全局点击事件包装
 */
import React, {useRef} from "react";
import { TouchableOpacity } from "react-native";

const CompatButton = (props) => {
  let lastTime = useRef(0);
  let interval = props.interval || 1000;

  function onPress() {
    if (props.onPress) {
      if (Date.now() - lastTime.current > interval) {
        props.onPress();
        // 如果需要收集点击数据统计
        // props.gatherPress && gatherPress(props.tag);
      }
    }
    lastTime.current = Date.now();
  }

  // 收集/上传埋点数据
  function gatherPress(tag = "") {}

  return (
    <TouchableOpacity
      {...props}
      onPress={onPress}
      activeOpacity={props.activeOpacity || 0.8}>
      {props.children}
    </TouchableOpacity>
  );
};

export default CompatButton;
