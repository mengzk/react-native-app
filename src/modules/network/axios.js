/**
 * Author: Meng
 * Date: 2022-03
 * Desc: 
 */
import axios from "axios";

const instance = axios.create({ // baseURL: '',
  timeout: 20000, // 毫秒
  headers: { "Content-Type": "application/json; charset=utf-8" },
});
// 
export function network(options) {
  return new Promise((resolve, reject) => {
    instance.request(options)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log('Error', err.message);
        }
        reject(err);
      });
  });
}