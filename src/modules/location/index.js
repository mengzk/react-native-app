/**
 * Author: Meng
 * Date: 2024-08-12
 * Modify: 2024-08-12
 * Desc: 定位
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

class Location {
  /**
   * 获取当前定位信息
   */
  static getCurLocation() {
    return new Promise(resolve => {
      // 获取定位信息

      // 获取失败, 从缓存中获取
      // Location.getStore();
      // 存储定位信息
      // Location.setStore('location');
    });
  }

  /**
   * 获取保存定位信息
   */
  static getStore() {
    return AsyncStorage.getItem('location');
  }

  /**
   * 保存定位信息
   * @param {*} location
   */
  static setStore(location) {
    if(location){
      AsyncStorage.setItem('location', location);
    }
  }

  /**
   * 清空定位数据
   */
  static remove() {
    AsyncStorage.removeItem('location');
  }
}

export default Location;
