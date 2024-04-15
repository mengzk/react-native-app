/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc: 备注输入框带
 */
import React from 'react';

interface ItemData {
  name: string;
  tag: string;
  icon: string | NodeRequire;
}

interface SharePopProps {
  share_items?: Array<ItemData>; // 标题
  onPress?: (index, tag) => void;
}

declare class SharePopBase extends React.Component<SharePopProps> {}
declare const SharePop: React.ReactElement<SharePopProps> & typeof SharePopBase;

export default SharePop;
