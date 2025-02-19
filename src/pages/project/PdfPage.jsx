/**
 * Author: Meng
 * Date: 2025-02-18
 * Modify: 2025-02-18
 * Desc: PDF文件查看组件
 */
import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import PDFViewer from '../../components/PDFViewer';

function PDFView(props) {
  const url =
    'https://dhstatic.bthome.com/prod/images/bigscreen/pdf/2023Yearbook.pdf';

  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      {/* <Text>PDFView</Text> */}
      <PDFViewer url={url} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#676767',
  },
});

export default PDFView;
