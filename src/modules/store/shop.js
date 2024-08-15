/**
 * Author: Meng
 * Date: 2024-08-14
 * Modify: 2024-08-14
 * Desc: 门店存储
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

class ShopStore {
  static getShop() {
    const shop = AsyncStorage.getItem('cu-shop');
    return shop ? JSON.parse(shop) : null;
  }
  /**
   * 
   * @param {*} shop 
   */
  static setShop(shop={}) {
    AsyncStorage.setItem('cu-shop', JSON.stringify(shop));
  }
  static remove() {
    AsyncStorage.removeItem('cu-shop');
  }
}

export default ShopStore;
