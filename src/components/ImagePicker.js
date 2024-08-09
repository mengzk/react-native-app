/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 图片上传组建
 */
import React from 'react';
import { FlatList, View, Image, StyleSheet } from 'react-native';

// interface Props {
//   imgs: string[];
//   upload?: boolean;
//   style?: object;
// }
const ImagePicker = (props) => {
  const size = props.imgs.length;
  let column = 3;
  if (!props.upload) {
    if (size < 2) {
      column = 1;
    } else if (size < 5) {
      column = 2
    }
  }

  if (column < 2 && size > 0) {
    return <Image style={styles.big} resizeMode="contain" source={{ uri: props.imgs[0] }} />
  }

  function itemView({ item }) {
    return (
      <View style={styles.box}>
        <Image style={styles.img} resizeMode="contain" source={{ uri: item }} />
      </View>
    )
  }

  return (
    <FlatList style={props.style} numColumns={column} data={props.imgs} renderItem={itemView} />
  )
}

const styles = StyleSheet.create({
  box: {
    width: '31%',
    marginHorizontal: '1%'
  },
  img: {
    width: '100%',
    height: 102,
    borderRadius: 4,
  },
  big: {
    width: '100%',
    height: 144,
    borderRadius: 4,
  }
})

export default ImagePicker;
