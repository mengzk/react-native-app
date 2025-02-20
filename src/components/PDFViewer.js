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

import {download} from './down';

const pdfUrl =
  'https://dhstac.com/prod/images/pdf/2023Yearbook.pdf';

function PDFView(props) {
  const [bookmarks, setBookmarks] = useState([]);
  const [numOfPages, setNumOfPages] = useState('0/0');
  const [source, setSource] = useState({
    uri: '/storage/emulated/0/Download/Store/2023Yearbook.pdf',
    cache: false,
  });

  useEffect(() => {
    // 获取PDF元数据
    const fetchBookmarks = async () => {
      const pdf = new Pdf({source});
      await pdf.loadFile(source.uri);
      const metadata = await pdf.getMetadata();
      setBookmarks(metadata.bookmarks || []);
    };

    // fetchBookmarks();
    // downloadPDF();
  }, []);

  function downloadPDF() {
    download(pdfUrl, '2023Yearbook.pdf').then(res => {
      if (res.code == 200 && res.data) {
        setSource({
          uri: res.data,
          cache: true,
        });
      }
    });
  }

  const renderBookmark = ({item}) => (
    // <TouchableOpacity onPress={() => pdf.setPage(item.pageNumber)}>
    <TouchableOpacity>
      <Text style={styles.bookmark}>{item.title}</Text>
    </TouchableOpacity>
  );

  if (!source.uri) {
    return (
      <View style={styles.container}>
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pdf
        style={styles.pdf}
        source={source}
        fitPolicy={0}
        scale={1.0} // 设置缩放比例
        minScale={0.5} // 设置最小缩放比例
        maxScale={3.0} // 设置最大缩放比例
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`---> pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          setNumOfPages(`${page}/${numberOfPages}页`);
          console.log(`---> Current: ${page}, total pages: ${numberOfPages}`);
        }}
        onError={err => {
          console.log('---> err', err);
        }}
      />
      <View style={styles.floatNum}>
        <Text style={styles.floatText}>{numOfPages}</Text>
      </View>

      <TouchableOpacity style={styles.floatMenu}>
        <Text style={styles.floatText}>目录</Text>
      </TouchableOpacity>
      {/* <FlatList
        data={bookmarks}
        renderItem={renderBookmark}
        keyExtractor={(item, index) => index.toString()}
        style={styles.bookmarkList}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
    // width: Dimensions.get('window').width * 0.75,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 28,
  },
  bookmarkList: {
    flex: 0.25,
    backgroundColor: '#676767',
  },
  bookmark: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#979797',
  },
  floatNum: {
    position: 'absolute',
    right: 16,
    top: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
  floatText: {
    color: '#fff',
    fontSize: 14,
  },
  floatMenu: {
    position: 'absolute',
    left: 16,
    top: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
  },
});

export default PDFView;
