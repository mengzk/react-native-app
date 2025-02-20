/**
 * Author: Meng
 * Date: 2024-08-10-03
 * Desc:
 */
import {Platform} from 'react-native';
import RNFS from 'react-native-fs';

const uploadHost = '';
const isIos = Platform.OS === 'ios';

// 上传多文件
export function uploadImgs(files = []) {
  if (files && files.length > 0) {
    return new Promise(resolve => {
      const body = new FormData();
      body.append('bucket', 'b-p');

      files.forEach(file => {
        let fileName = file.substring(file.lastIndexOf('/') + 1, file.length);
        body.append(
          'files',
          {uri: file, type: 'multipart/form-data', name: 'file'},
          fileName,
        );
      });

      fetch(uploadHost, {
        body,
        method: 'POST',
      })
        .then(response => response.json())
        .then(res => {
          console.log('---> uploadImg resolve ', res);
          // console.log(res);
          if (res) {
            if (res.success) {
              const info = res.content || {};
              resolve(info);
            } else {
              resolve({code: info.code, data: null, message: info.msg});
            }
          } else {
            resolve({code: -1001, data: null});
          }
        })
        .catch(err => {
          console.log('uploadImg Error ', err);
          resolve({code: -1002, data: null});
        });
    });
  }
}

// 上传文件
export function uploadImg(file = '') {
  return new Promise(resolve => {
    let fileName = file.substring(file.lastIndexOf('/') + 1, file.length);

    const body = new FormData();
    body.append('name', 'file');
    body.append('bucket', 'b-p');
    body.append(
      'file',
      {uri: file, type: 'multipart/form-data', name: 'file'},
      fileName,
    );
    // body.append("uploadFile", { uri: file, type: 'multipart/form-data', name: 'uploadFile' }, fileName);
    // body.append("photo", file, fileName);
    // console.log(fileName, file)

    fetch(uploadHost, {
      body,
      method: 'POST',
    })
      .then(response => response.json())
      .then(res => {
        console.log('---> uploadImg resolve ', res);
        // console.log(res);
        if (res) {
          if (res.success) {
            const info = res.content || {};
            resolve(info);
          } else {
            resolve({code: info.code, data: null, message: info.msg});
          }
        } else {
          resolve({code: -1001, data: null});
        }
      })
      .catch(err => {
        console.log('---> uploadImg Error ', err);
        resolve({code: -1002, data: null});
      });
  });
}

// 文件下载 注：此处未做权限判断
export async function download(fileUrl, fileName, folder) {
  if (!fileUrl) {
    console.warn('---> download 下载地址为空');
    return {code: -1, data: null, msg: '下载地址为空'};
  }

  const lastPath = fileUrl.lastIndexOf('/');
  const lastPoint = fileUrl.lastIndexOf('.');
  if (!fileName) {
    if (lastPoint < 0) {
      console.warn('---> download 文件名为空');
      return {code: -1, data: null, msg: '文件名为空'};
    } else {
      fileName = fileUrl.substring(lastPath + 1);
    }
  }
  if (!fileName.includes('.')) {
    console.warn('---> download 文件后缀为空');
    return {code: -1, data: null, msg: '文件后缀为空'};
  }

  let savePath = ''; // 保存路径
  let fileType = ''; // 文件后缀

  if (isIos) {
    savePath = `${RNFS.DocumentDirectoryPath}`;
  } else {
    savePath = `${RNFS.DownloadDirectoryPath}/${folder || 'Store'}`;
  }
  const exists = await RNFS.exists(savePath);
  if (!exists) {
    RNFS.mkdir(savePath);
  }
  if (fileUrl && fileUrl.includes('/')) {
    const lastStr = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
    if (lastStr.includes('.') && !fileName.includes('.')) {
      fileType = lastStr.substring(lastStr.lastIndexOf('.'));
    }
    // console.log('-------------> fileType', fileType);
  }

  const downPath = `${savePath}/${fileName}${fileType}`;
  const options = {
    fromUrl: fileUrl,
    toFile: downPath,
    background: true,
    // headers: { 'cookie': 'info.token' || '' },
    begin: res => {
      console.log('---> 下载文件开始 begin');
      console.log(res.contentLength);
    },
    progress: res => {},
  };
  // 下载文件
  const ret = RNFS.downloadFile(options);

  return ret.promise
    .then(res => {
      console.log('---> 下载文件成功');
      if (isIos) {
        // Toast.showShortCenter('导出文件成功，请在“文件app”中查看')
      } else {
        let alert = downPath;
        if (downPath.indexOf('0') > -1) {
          alert = downPath.split('0/')[1];
        }
        // Toast.showShortCenter('文件下载成功!  路径：' + alert);
      }
      console.log(res, downPath);
      return {code: res.statusCode, data: downPath, msg: '下载成功'};
    })
    .catch(err => {
      console.log('---> catch 下载文件失败');
      console.log(err);
      return {code: -1, data: null, msg: '下载失败'};
    });
}

// 文件下载 注：此处未做权限判断
export async function fileDownload(fileUrl, fileName, folder) {
  if (!fileUrl) {
    console.warn('---> download 下载地址为空');
    return {code: -1, data: null, msg: '下载地址为空'};
  }

  const lastPath = fileUrl.lastIndexOf('/');
  const lastPoint = fileUrl.lastIndexOf('.');
  if (!fileName) {
    if (lastPoint < 0) {
      console.warn('---> download 文件名为空');
      return {code: -1, data: null, msg: '文件名为空'};
    } else {
      fileName = fileUrl.substring(lastPath + 1);
    }
  }
  if (!fileName.includes('.')) {
    console.warn('---> download 文件后缀为空');
    return {code: -1, data: null, msg: '文件后缀为空'};
  }

  let savePath = ''; // 保存路径
  let fileType = ''; // 文件后缀

  if (isIos) {
    savePath = `${RNFS.DocumentDirectoryPath}`;
  } else {
    savePath = `${RNFS.DownloadDirectoryPath}/${folder || 'Store'}`;
  }
  const exists = await RNFS.exists(savePath);
  if (!exists) {
    RNFS.mkdir(savePath);
  }
  if (fileUrl && fileUrl.includes('/')) {
    const lastStr = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
    if (lastStr.includes('.') && !fileName.includes('.')) {
      fileType = lastStr.substring(lastStr.lastIndexOf('.'));
    }
    // console.log('-------------> fileType', fileType);
  }

  const downPath = `${savePath}/${fileName}${fileType}`;
  // 如何文件已存在，则直接返回
  const isExist = await RNFS.exists(downPath);
  if (isExist) {
    console.log('---> 文件已存在');
    return {code: 200, data: downPath, msg: '文件已存在'};
  }

  // 下载配置
  const options = {
    fromUrl: fileUrl,
    toFile: downPath,
    background: true,
    // headers: { 'cookie': 'info.token' || '' },
    begin: res => {
      console.log('---> 下载文件开始 begin');
      console.log(res.contentLength);
    },
    progress: res => {},
  };
  // 下载文件
  const ret = RNFS.downloadFile(options);

  return ret.promise
    .then(res => {
      console.log('---> 下载文件成功');
      if (isIos) {
        // Toast.showShortCenter('导出文件成功，请在“文件app”中查看')
      } else {
        let alert = downPath;
        if (downPath.indexOf('0') > -1) {
          alert = downPath.split('0/')[1];
        }
        // Toast.showShortCenter('文件下载成功!  路径：' + alert);
      }
      console.log(res, downPath);
      return {code: res.statusCode, data: downPath, msg: '下载成功'};
    })
    .catch(err => {
      console.log('---> catch 下载文件失败');
      console.log(err);
      return {code: -1, data: null, msg: '下载失败'};
    });
}
