/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 图片上传组建
 */
import React, { useState, useEffect, useRef } from 'react';
import { View, Image, TouchableOpacity, Linking, Platform, StyleSheet } from 'react-native';
import ActionSheet from 'react-native-actionsheet';
import { Toast } from 'react-native-bnq-app-framework';
import { ImagePreviewModal } from "bnq-ui";
import ImagePicker from 'react-native-image-crop-picker';

import { CommonAsset } from '../../sssets/index';
import { BnqRouter } from 'Project/BCore/Utils/RouterUtils';
import UserStorage from '../../BCore/Utils/StorageModule/UserStorage';

// Props {
//   max: number; 最大数量
//   mode: string; // camera拍照；photo相册；all拍照-相册 默认; waterMark //增加水印拍照支持
//   icon: Image; // 添加图片或者照片 图标
//   imgs: string[];
//   style?: object;
//   onChange?: (imgs) => {};
// }

const photo_config = { multiple: true, mediaType: 'photo', compressImageMaxWidth: 720, compressImageMaxHeight: 1080, cropping: false, loadingLabelText: '处理中...' };
const img_sheet = ['取消', '拍照', '相册'];

const ImgPicker = (props) => {

  const upload = props.onChange != null;
  const max = props.max || 9;
  const icon = props.icon || '';
  const photoAndCamera = props.mode == 'all';
  const [imgList, setImgList] = useState([]); // 图片
  const pickerSheet = useRef(null); // 弹窗组件ref
  const previewRef = useRef(null); // 预览ref

  let imgs = props.imgs || [];
  useEffect(() => {
    if (imgs.length < max && upload) {
      imgs = [icon].concat(...imgs);
    }
    setImgList(imgs)
  }, [props.imgs]);

  // 删除
  function onDel(index) {
    let list = imgList.filter((e, idx) => idx != index && e != icon);
    if (list.length < max) {
      list = [icon].concat(list);
    }
    setImgList(list);
    if (props.onChange) {
      const arr = list.filter(e => e != icon);
      props.onChange(arr);
    }
  }

  // 
  async function handlePress(index) {
    if(img_sheet[index] == '取消') {
      return;
    }
    const img = await getImgList(index == 1 ? 'camera' : 'photo');
    setImgs(img);
  }

  // 选择
  async function onUpdate() {
    if (pickerSheet.current) {
      pickerSheet.current.show();
      return
    }
    const img = await getImgList(props.mode);
    setImgs(img);
  }

  // 设置图片
  function setImgs(img) {
    // let list = imgList.filter(e => e != icon);
    let list = imgList;
    if (img && img.length > 0) {
      list.push(...img.map(e => e.path));
      const len = list.length;
      if (len >= max) {
        // list.push(icon);
        list = list.filter(e => e != icon);
      }
      setImgList(list);
      if (props.onChange) {
        const arr = list.filter(e => e != icon);
        props.onChange(arr);
      }
    } else {
      Toast.showShortCenter('您的相机权限没打开，请手动打开。');
      if (Platform.OS == 'ios') {
        Linking.openURL('app-settings:').catch(err => console.log('error', err))
      }
    }
  }

  async function handleWaterMarkPic() {
     return new Promise(resolve=>{
      const userInfo = UserStorage.getUserInfo() || {}
      BnqRouter('BNQCamera', {
        watermarkContent: {title:userInfo?.employeeName||''},
        callBack: (image)=>{
          const {data,...rest} = image
          resolve(rest)
        }
      })
     })
  }

  // 获取图片
  async function getImgList(tag) {
    let imgs = [];
    let count = 9;
    if (tag == 'photo') {
      count = max - imgList.filter(e => e != icon).length;
      // photo_config.maxFiles = count;
      imgs = await ImagePicker.openPicker(photo_config);
    } else if(tag == 'waterMark'){
      const img = await handleWaterMarkPic();
      imgs.push(img);
    }else{
      const img = await ImagePicker.openCamera(photo_config);
      imgs.push(img);
    }
    let size = imgs.length;
    if (size > count) {
      return imgs.filter((_, index) => index > size - count - 1);
    }
    return imgs
  }

  // 预览
  function onPreview(index) {
    let list = imgList.filter(e => e != icon).map(url => { return { url } });
    list = list.filter(e => e.url != null);
    if(list.length < 1) {
      return
    }
    if (props.onPreview) {
      props.onPreview(list, index);
    } else {
      if (previewRef.current) {
        previewRef.current.show(list, index)
      }
    }
  }

  // 图片item
  function itemView(item, index) {
    const isAddIc = item == icon;
    if (!isAddIc) {
      return (
        <TouchableOpacity key={item} style={styles.box} activeOpacity={0.8} onPress={() => onPreview(index-1)}>
          <Image style={styles.img} resizeMode="cover" source={{ uri: item }} />
          {upload && <TouchableOpacity style={styles.delBox} onPress={() => onDel(index)} activeOpacity={0.8}><Image style={styles.delIc} source={CommonAsset.IconDelete} /></TouchableOpacity>}
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity key={item} style={styles.box} activeOpacity={0.8} onPress={onUpdate}>
          <Image style={styles.img} resizeMode="cover" source={item} />
        </TouchableOpacity>
      );
    }
  }

  // 跟组件
  return (
    <View>
      {/* <FlatList style={props.style} numColumns={3} data={imgList} renderItem={itemView} /> */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {imgList.map(itemView)}
      </View>
      {upload && photoAndCamera && <ActionSheet
        ref={pickerSheet}
        title={'选择照片'}
        options={img_sheet}
        cancelButtonIndex={0}
        onPress={handlePress}
      />}
      <ImagePreviewModal ref={previewRef} />
    </View>
  )
}

const styles = StyleSheet.create({
  box: {
    width: 72,
    marginTop: 8,
    marginRight: 8,
  },
  img: {
    width: 72,
    height: 72,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#efefef'
  },
  big: {
    width: '100%',
    height: 144,
    borderRadius: 4,
  },
  delBox: {
    top: -5,
    right: -5,
    zIndex: 9,
    position: 'absolute',
  },
  delIc: {
    width: 18,
    height: 18,
  }
})

export default ImgPicker;
