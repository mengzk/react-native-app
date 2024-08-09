/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 
 */

// eslint-disable-next-line
import React, { useEffect, useState } from "react";

const LiveWidget = (props) => {
  const data = props.data.value;

  const [value, setValue] = useState(data);

  useEffect(() => {
    const liveData = props.data;
    // 这里可以对数据包装一下，主要是对错误兼容
    liveData.bind((msg) => {
      setValue(msg);
    });

    return liveData.unbind;
  }, [props.data]);

  return props.child(value);
}

export default LiveWidget;