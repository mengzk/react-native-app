/**
 * Author: Meng
 * Date: 2024-08-14
 * Modify: 2024-08-14
 * Desc: 账号信息存储
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

class UserStore {
  /**
   * 获取账号信息 {account, pwd}
   */
  static getAccount() {
    const account = AsyncStorage.getItem('login-account');
    return account ? JSON.parse(account) : null;
  }

  /**
   * 设置账号信息
   * @param {*} account {account, pwd}
   */
  static setAccount(account) {
    AsyncStorage.setItem('login-account', JSON.stringify(account));
  }

  /**
   * 获取用户信息
   */
  static getInfo() {
    const info = AsyncStorage.getItem('user-info');
    return info ? JSON.parse(info) : null;
  }

  /**
   * 设置用户信息
   * @param {*} user
   */
  static setInfo(user) {
    if (user) {
      AsyncStorage.setItem('user-info', JSON.stringify(user));
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
