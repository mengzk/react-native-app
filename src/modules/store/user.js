/**
 * Author: Meng
 * Date: 2024-08-14
 * Modify: 2024-08-14
 * Desc: 账号信息存储
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

class UserStore {
  /**
   * 获取账号信息
   */
  static getAccount() {
    return AsyncStorage.getItem('login-account');
  }

  /**
   * 设置账号信息
   * @param {*} account
   */
  static setAccount(account) {
    AsyncStorage.setItem('login-account', account);
  }

  /**
   * 获取用户信息
   */
  static getInfo() {
    return AsyncStorage.getItem('user-info');
  }

  /**
   * 设置用户信息
   * @param {*} user
   */
  static setInfo(user) {
    if (user) {
      AsyncStorage.setItem('user-info', user);
      AsyncStorage.setItem('user-token', user.token);
    }
  }

  /**
   * 获取用户token
   */
  static getToken() {
    return AsyncStorage.getItem('user-token');
  }

  /**
   * 设置用户信息
   */
  static remove() {
    AsyncStorage.removeItem('user-info');
    AsyncStorage.removeItem('user-token');
  }

  /**
   * 清空数据
   */
  static clear() {
    AsyncStorage.clear();
  }
}

export default UserStore;
