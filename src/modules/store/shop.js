/**
 * Author: Meng
 * Date: 2024-08-14
 * Modify: 2024-08-14
 * Desc: 门店存储
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

class ShopStore {
  static getShop() {
    return AsyncStorage.getItem('shop');
  }
  static setShop(shop) {
    AsyncStorage.setItem('shop', shop);
  }
  static remove() {
    AsyncStorage.removeItem('shop');
  }
}

export default ShopStore;
