/**
 * Author: Meng
 * Date: 2022-03-03
 * Desc: 
 */
import { Platform } from 'react-native';
// import RNFS from 'react-native-fs';

const uploadHost = '';

// 上传多文件
export function uploadImgs(files = []) {
  if (files && files.length > 0) {

    return new Promise((resolve) => {
      Promise.all(files.map((e) => uploadImg(e)))
        .then((array) => {
          let data = { all: false, count: array.length, imgs: [] };
          if (array) {
            array.forEach((e) => {
              if (e.fileUrl) {
                data.imgs.push(e);
              }
            });
            data.all = data.imgs.length == data.count;
          }
          resolve({ code: 0, data });
        })
        .catch((err) => {
          console.log(err);
          resolve({ code: -1003, data: null });
        });
    });
  }
}

// 上传文件
export function uploadImg(file = '') {
  return new Promise((resolve) => {

    let fileName = file.substring(file.lastIndexOf('/') + 1, file.length);

    const body = new FormData();
    body.append('name', 'file');
    body.append('bucket', 'b-p');
    body.append("file", { uri: file, type: 'multipart/form-data', name: 'file' }, fileName);
    // body.append("uploadFile", { uri: file, type: 'multipart/form-data', name: 'uploadFile' }, fileName);
    // body.append("photo", file, fileName);
    // console.log(fileName, file)

    fetch(uploadHost, {
      body,
      method: 'POST',
    }).then((response) => response.json())
      .then((res) => {
        console.log('uploadImg resolve ', res);
        // console.log(res);
        if (res) {
          if (res.success) {
            const info = res.content||{};
            resolve(info);
          } else {
            resolve({ code: info.code, data: null, message: info.msg });
          }
        } else {
          resolve({ code: -1001, data: null });
        }
      }).catch((err) => {
        console.log('uploadImg Error ', err);
        resolve({ code: -1002, data: null });
      });
  });
}

// 文件下载 注：此处未做权限判断
export async function download(url, name, path) {
  console.log(url, name, path);

  let savePath = '';

  // if (Platform.OS === 'ios') {
  //   savePath = `${RNFS.DocumentDirectoryPath}`;
  // } else {
  //   savePath = `${RNFS.DownloadDirectoryPath}/${path || 'BTHome'}`;
  // }
  // const exists = await RNFS.exists(savePath);
  // if (!exists) {
  //   RNFS.mkdir(savePath);
  // }
  // let fileType = '';
  // if(url && url.includes('/')) {
  //   const lastStr = url.substring(url.lastIndexOf('/') + 1);
  //   if(lastStr.includes('.') && !name.includes('.')) {
  //     fileType = lastStr.substring(lastStr.lastIndexOf('.'));
  //   }
  //   // console.log('-------------> fileType', fileType);
  // }

  // return new Promise((resolve) => {
  //   const downloadDest = `${savePath}/${name}${fileType}`;
  //   const options = {
  //     fromUrl: url,
  //     toFile: downloadDest,
  //     background: true,
  //     headers: { 'cookie': 'info.token' || '' },
  //     begin: (res) => {
  //       console.log('=======> 下载文件开始 begin');
  //       console.log(res.contentLength);
  //     },
  //     progress: (res) => { }
  //   };
  //   const ret = RNFS.downloadFile(options);
  //   ret.promise.then(res => {
  //     if (Platform.OS === 'ios') {
  //       // Toast.showShortCenter('导出文件成功，请在“文件app”中查看')
  //     } else {
  //       let alert = downloadDest;
  //       if (downloadDest.indexOf('0') > -1) {
  //         alert = downloadDest.split('0/')[1];
  //       }
  //       // Toast.showShortCenter('文件下载成功!  路径：' + alert);
  //     }
  //     console.log('=======> 下载文件成功 success');
  //     console.log(res, downloadDest);
  //     resolve({
  //       code: res.statusCode,
  //       data: downloadDest,
  //       msg: '文件下载成功',
  //     })
  //   }).catch(err => {
  //     console.log('=======> 下载文件失败 catch');
  //     console.log(err);
  //     resolve({
  //       status: -1,
  //       data: null,
  //       msg: '文件下载失败'
  //     })
  //   });
  // })
}