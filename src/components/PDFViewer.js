/**
 * Author: Meng
 * Date: 2025-02-18
 * Modify: 2025-02-18
 * Desc: PDF文件查看组件
 */
import React, {useState, useEffect, useRef} from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import Pdf from 'react-native-pdf';

// import {download} from './down';

const {width, height} = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';
const pdfUrl =
  'https://dhstat.com/prod/images/pdf/2023Yearbook.pdf';

function PDFViewer(props) {
  const pdfRef = useRef(null);
  const flatListRef = useRef(null); // 创建 FlatList 的引用
  const total = useRef(0);

  const [showMenu, setShowMenu] = useState(false);
  const [curNum, setCurNum] = useState(0);
  const [thumbs, setThumbs] = useState([]);
  const [source, setSource] = useState({
    uri: 'https://dhstatic.bthome.com/prod/images/bigscreen/pdf/2023Yearbook.pdf',
    cache: true,
    expiration: 1000000,
  });

  useEffect(() => {
    downloadPDF();
  }, []);

  function downloadPDF() {
    if (isIOS) {
      setSource({
        uri: pdfUrl,
        cache: true,
        expiration: 1000 * 60 * 60 * 24,
      });
    }else {
      // download(pdfUrl, '2023Yearbook.pdf').then(res => {
      //   if (res.code == 200 && res.data) {
      //     setSource({
      //       uri: res.data,
      //       cache: true,
      //       expiration: 1000 * 60 * 60 * 24,
      //     });
      //   }
      // });
    }
  }

  // 缩略图
  const renderThumb = ({item}) => {
    // console.log('---> item', item);
    const boxStyle = curNum == item ? styles.menuView2 : styles.menuView;
    return(
      <TouchableOpacity
        style={boxStyle}
        onPress={() => {
          const pdf = pdfRef.current;
          if (pdf.setPage) {
            pdf.setPage(item);
          }
        }}>
        <Text style={styles.menu}>{item}</Text>
      </TouchableOpacity>
    )
  };

  // 浮动按钮
  function floatView() {
    if(curNum < 1) {
      return <></>
    }else {
      return(
        <>
          <View style={styles.floatNum}>
            <Text style={styles.floatText}>{curNum}/{total.current}页</Text>
          </View>
          <TouchableOpacity
            style={showMenu ? styles.floatMenu2 : styles.floatMenu}
            activeOpacity={0.8}
            onPress={() => setShowMenu(!showMenu)}>
            <Text style={styles.floatText}>目录</Text>
          </TouchableOpacity>
        </>
      )
    }
  }

  function progressView(progress) {
    const value = Math.round(progress*100);
    return(
      <View style={styles.progressBox}>
        <Text style={styles.progressText}>{value}%</Text>
      </View>
    )
  }

  if (!source.uri) {
    return (
      <View style={styles.container}>
        <View style={styles.empty}>
          <Text>加载中...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showMenu ? (
        <FlatList
          ref={flatListRef}
          style={styles.menuList}
          data={thumbs}
          renderItem={renderThumb}
          keyExtractor={(_, index) => index.toString()}
        />
      ) : (
        <></>
      )}
      <Pdf
        style={showMenu ? styles.pdf : styles.pdfFull}
        ref={pdfRef}
        source={source}
        fitPolicy={0}
        // scale={1.0} // 设置缩放比例
        minScale={0.5} // 设置最小缩放比例
        maxScale={3.0} // 设置最大缩放比例
        renderActivityIndicator={progressView}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`---> size: ${numberOfPages}, path: ${filePath}`);
          const thumbs = Array.from(
            {length: numberOfPages},
            (_, index) => index + 1,
          );
          setThumbs(thumbs);
        }}
        onPageChanged={(page, numberOfPages) => {
          setCurNum(page);
          total.current = numberOfPages;
          const flat = flatListRef.current;
          if (flat && page > 0) {
            flat.scrollToIndex({
              animated: true,
              index: page - 1,
            });
          }
          // console.log(`---> current: ${page}, total: ${numberOfPages}`);
        }}
        onPressLink={(uri) => {
          console.log(`---> press link: ${uri}`);
        }}
        onError={err => {
          console.log('---> err', err);
        }}
      />
      {floatView()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#5d5d5d',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pdf: {
    width: width - 152,
    height: height - 28,
    backgroundColor: '#5d5d5d',
  },
  pdfFull: {
    width: width,
    height: height - 28,
    backgroundColor: '#5d5d5d',
  },
  progressBox: {
    width: 120,
    height: 46,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  progressText: {
    fontSize: 20,
    color: '#fff',
  },
  menuList: {
    width: 152,
    height: height - 28,
    paddingTop: 16,
    backgroundColor: '#4d4d4d',
  },
  menuView: {
    width: 120,
    height: 80,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#868686',
  },
  menuView2: {
    width: 120,
    height: 80,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4e89ffc9',
    transform: [{scale: 1.1}],
  },
  menu: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  floatNum: {
    position: 'absolute',
    right: 16,
    top: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  floatText: {
    color: '#fff',
    fontSize: 12,
  },
  floatMenu: {
    position: 'absolute',
    left: 16,
    top: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  floatMenu2: {
    position: 'absolute',
    left: 168,
    top: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
});

export default PDFViewer;
