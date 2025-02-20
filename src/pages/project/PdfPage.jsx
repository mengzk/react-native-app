/**
 * Author: Meng
 * Date: 2025-02-20
 * Modify: 2025-02-20
 * Desc:
 */
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import PDFViewer from '../../components/PDFViewer';

function PDFPage(props) {
  const [title, setTitle] = useState('PDFView');
  const [pdfPath, setPdfPath] = useState('');

  useEffect(() => {
    const params = props.route?.params||{};
    console.log('---> PDFPage', params);
    setTitle(params.title || '文件查看');
    setPdfPath(params.url || '');
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBox}
          activeOpacity={0.8}
          onPress={() => props.navigation?.goBack()}>
          <Text style={styles.back}>返回</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>演示</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>投屏</Text>
        </TouchableOpacity>
      </View>
      <PDFViewer key={pdfPath} url={pdfPath}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 46,
    paddingRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  backBox: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  back: {
    fontSize: 16,
    color: '#1c212a',
  },
  title: {
    fontSize: 20,
    color: '#1c212a',
    fontWeight: '600',
    marginRight: 'auto',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  btnIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  btnText: {
    color: '#1c212a',
    fontSize: 18,
  },
});

export default PDFPage;
