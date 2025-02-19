/**
 * Author: Meng
 * Date: 2025-02-18
 * Modify: 2025-02-18
 * Desc: PDF缩略图查看组件
 * 使用的是原生模块 android.graphics.pdf.PdfRenderer
 */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {generateThumbnail} from 'react-native-pdf-thumbnail';

const PDFThumbnailViewer = ({url, onThumbnailPress}) => {
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    const fetchThumbnails = async () => {
      const result = await generateThumbnail(url, 0); // 生成第一页的缩略图
      setThumbnails([result]);
    };

    fetchThumbnails();
  }, [url]);

  const renderThumbnail = ({item}) => (
    <TouchableOpacity onPress={() => onThumbnailPress(item.page)}>
      <Image source={{uri: item.uri}} style={styles.thumbnail} />
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={thumbnails}
      renderItem={renderThumbnail}
      keyExtractor={(item, index) => index.toString()}
      horizontal
      style={styles.thumbnailList}
    />
  );
};

const styles = StyleSheet.create({
  thumbnailList: {
    flex: 0.25,
    backgroundColor: '#f0f0f0',
  },
  thumbnail: {
    width: 100,
    height: 150,
    margin: 5,
  },
});

export default PDFThumbnailViewer;
