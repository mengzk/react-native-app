/**
 * Author: Meng
 * Date: 2025-02-18
 * Modify: 2025-02-18
 * Desc: PDF文件查看组件
 */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import Pdf from 'react-native-pdf';
import PDFThumbnailViewer from './PDFThumbnailViewer';

function PDFViewer(props) {
  const [bookmarks, setBookmarks] = useState([]);
  const source = {
    url: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    cache: true,
  };

  useEffect(() => {
    // 获取PDF元数据
    const fetchBookmarks = async () => {
      const pdf = new Pdf();
      await pdf.loadFile(url);
      const metadata = await pdf.getMetadata();
      setBookmarks(metadata.bookmarks || []);
    };

    // fetchBookmarks();
  }, []);

  const renderBookmark = ({item}) => (
    <TouchableOpacity onPress={() => pdf.setPage(item.pageNumber)}>
      <Text style={styles.bookmark}>{item.title}</Text>
    </TouchableOpacity>
  );

  const handleThumbnailPress = page => {
    pdf.setPage(page);
  };

  return (
    <View style={styles.container}>
      <Pdf
        source={source}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}, total pages: ${numberOfPages}`);
        }}
        onError={err => {
          console.log(err);
        }}
        scale={1.5} // 设置缩放比例
        minScale={1.0} // 设置最小缩放比例
        maxScale={3.0} // 设置最大缩放比例
        style={styles.pdf}
      />
      {/* <FlatList
        data={bookmarks}
        renderItem={renderBookmark}
        keyExtractor={(item, index) => index.toString()}
        style={styles.bookmarkList}
      /> */}
      {/* <PDFThumbnailViewer url={url} onThumbnailPress={handleThumbnailPress} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    // width: Dimensions.get('window').width * 0.75,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  bookmarkList: {
    flex: 0.25,
    backgroundColor: '#f0f0f0',
  },
  bookmark: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default PDFViewer;
