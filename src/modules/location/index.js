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
      // 权限检查

      // 获取定位信息

      // 获取失败, 从缓存中获取
      // Location.getStore();

      // 更新存储定位信息
      // Location.setStore('location');
    });
  }

  /**
   * 获取保存定位信息 {lat, lon, address, city, code}
   */
  static getStore() {
    const latlon = AsyncStorage.getItem('location');
    return latlon ? JSON.parse(latlon) : null;
  }

  /**
   * 保存定位信息
   * @param {*} location {lat, lon}
   */
  static setStore(location={}) {
    AsyncStorage.setItem('location', JSON.stringify(location));
  }

  /**
   * 清空定位数据
   */
  static remove() {
    AsyncStorage.removeItem('location');
  }
}

export default Location;
