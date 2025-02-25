/**
 * Author: Meng
 * Date: 2024-05-28
 * Modify: 2024-05-28
 * Desc:
 */
import { Platform } from "react-native";
import RNFS from "react-native-fs";


const isIOS = Platform.OS === "ios";
let fileCachePath = RNFS.DocumentDirectoryPath;
// if (isIOS) {
//   fileCachePath = `${RNFS.DocumentDirectoryPath}`;
// } else {
//   fileCachePath = `${RNFS.DocumentDirectoryPath}`;
// }

/**
 * 文件缓存
 */
export async function saveFileToCache(url, path) {
  const name = url.substring(url.lastIndexOf("/") + 1);
  let file_path = `${fileCachePath}/${path || 'cache'}`; // 存放路径

  const hasFile = await RNFS.exists(file_path);
  if (!hasFile) {
    RNFS.mkdir(file_path);
  }
  file_path += `/${name}`; // 文件路径
  console.log("saveFileToCache ------> ", file_path);
  const progress = (data) => {};
  try {
    await RNFS.downloadFile({ fromUrl: url, toFile: file_path, progress })
      .promise;
  } catch (error) {
    return null;
  }
  return file_path;
}

/**
 * 读取缓存
 */
export async function readFileFromCache(path = "", name = "") {
  let file_path = `${fileCachePath}/${path || 'cache'}`; // 存放路径
  console.log("readFileFromCache ------> ", file_path);
  const hasFile = await RNFS.exists(file_path);
  if (!hasFile) {
    return [];
  }
  return RNFS.readDir(file_path)
    .then((res) => {
      // res.forEach((item) => {
      //   console.log("readFileFromCache ------> ", item.path);
      // });
      if (name) {
        return res.filter((item) => item.name === name);
      }
      return res || [];
    })
    .catch((err) => {
      console.warn("readFileFromCache ------> Err ", path, err);
      return [];
    });
}
/**
 * 读取缓存 大小
 */
export async function getSizeFromCache(path = "", name = "") {
  let file_path = `${fileCachePath}/${path || 'cache'}`; // 存放路径
  console.log("readFileSizeFromCache ------> ", file_path);
  const hasFile = await RNFS.exists(file_path);
  if (!hasFile) {
    return 0;
  }
  return RNFS.readDir(file_path)
    .then((res) => {
      let size = 0; // 文件大小 MB
      res.forEach((item) => {
        size += item.size;
      });
      size = Math.round(size / 1024 / 10.24) / 100;
      return size;
    })
    .catch((err) => {
      console.warn("readFileSizeFromCache ------> Err ", path, err);
      return 0;
    });
}
/**
 * 清理缓存
 */
export async function deleteFileCache(path, name) {
  let file_path = `${fileCachePath}/${path || 'cache'}/${name}`; // 存放路径
  console.log("deleteFileCache ------> ", file_path);
  const hasFile = await RNFS.exists(file_path);
  if (!hasFile) {
    return true;
  }
  return RNFS.unlink(file_path)
    .then((res) => {
      return true;
    })
    .catch((err) => {
      console.warn("deleteFileCache ------> Err ", path, err);
      return false;
    });
}
/**
 * 清理全部缓存
 */
export async function deleteAllCache(path) {
  let file_path = `${fileCachePath}/${path || 'cache'}`; // 存放路径
  console.log("deleteAllCache ------> ", file_path);
  const hasFile = await RNFS.exists(file_path);
  if (!hasFile) {
    return true;
  }
  return RNFS.unlink(file_path)
    .then((res) => {
      return true;
    })
    .catch((err) => {
      console.warn("deleteAllCache ------> Err ", path, err);
      return false;
    });
}
