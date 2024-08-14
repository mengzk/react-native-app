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
    return AsyncStorage.getItem('account');
  }

  /**
   * 设置账号信息
   * @param {*} account 
   */
  static setAccount(account) {
    return AsyncStorage.setItem('account', account);
  }

  /**
   * 获取用户信息
   */
  static getUser() {
    return AsyncStorage.getItem('user');
  }

  /**
   * 设置用户信息
   * @param {*} user 
   */
  static setUser(user) {
    return AsyncStorage.setItem('user', user);
  }

  /**
   * 获取用户token
   */
  static getToken() {
    return AsyncStorage.getItem('token');
  }

  /**
   * 设置用户信息
   */
  static remove() {
    return AsyncStorage.removeItem('token');
  }

  /**
   * 清空数据
   */
  static clear() {
    return AsyncStorage.clear();
  }
}

export default UserStore;
