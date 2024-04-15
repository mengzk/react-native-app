/**
 * Author: Meng
 * Date: 2023-
 * Desc: 
 */

export default class NoRequest {

  min_interval = 600; // 最小间隔
  timer_id = 0; // 定时器

  def_env = 'env';
  def_host = 'def';
  env_hosts = { prod: {}, test: {}, uat: {}, dev: {} };

  network = null;
  interceptor = null;
  parseData = null;
  parseError = null;
  showLoading = null;
  showToast = null;

  constructor(config = {}) {
    for (const key in config) {
      const value = config[key];
      this[key] = value;
    }
  }

  request = ({ url = '', method = 'GET', data = {}, headers = {}, host = 'def', env = 'prod', responseType = 'json', loading = true, loadingText = '加载中...', toast = true, reload = false, count = 1, maxCount = 3 } = {}) => {

    this._showLoading(loading, loadingText); // 加载框

    const rhost = this._getRequestHost(host || this.def_host, env || this.def_env);

    const url2 = `${rhost}${url}`;
    let data2 = null;
    let headers2 = null;

    if (this.interceptor) {
      const ma = this.interceptor();
      data2 = ma.params || {};
      headers2 = ma.headers | {};
    } else {
      data2 = this._mergeParams(data);
      headers2 = this._mergeHeaders(headers);
    }

    const options = { url: url2, data: data2, headers: headers2, method, responseType };

    return new Promise((resolve) => {
      // 请求结构封装
      const result = { code: -1, data: '', message: '' };
      if (!rhost) {
        console.error('请配置请求域名！new NoRequest({env_hosts: "项目请求的域名"})');
        resolve(result);
        return;
      }
      if (!this.network) {
        console.error('请配置请求实体！new NoRequest({network: "fetch或者axios实例"})');
        resolve(result);
      } else {
        this.network(options).then(res => {
          this._parseData(res, result);
        }).catch(err => {
          this._parseErr(err, result);
        }).finally(() => {
          this._showLoading(false, ''); // 显示加载框
          // 显示 toast
          if (result.code != 0 && toast) {
            this._showToast(result.message);
          }
          // 请求重连
          if (result.code != 0 && reload && count < maxCount) {
            const curCount = count + 1;
            const timer = setTimeout(() => {
              clearTimeout(timer);
              this.request({ url, data, method, headers, host, env, responseType, loading, toast, reload, maxCount, count: curCount });
            }, 1000);
          } else {
            resolve(result);
          }
        });
      }
    })
  }


  _getRequestHost(host = 'def', env = 'prod') {
    const envObj = this.env_hosts[env];
    const hasHost = Object.hasOwnProperty.call(envObj, host);
    return hasHost ? envObj[host] : '';
  }

  _mergeParams(params = {}) {
    return params;
  }

  _mergeHeaders(headers = {}) {
    headers['Content-Type'] = 'application/json;charset=utf-8'
    return headers;
  }

  _parseData(res, result) {
    // console.log('norequest parseDate', res);
    if (this.parseData) {
      const data = this.parseData(res);
      Object.assign(result, data);
    }
  }

  // 
  _parseErr(err, result) {
    // console.log('norequest parseErr', err);
    if (this.parseError) {
      const data = this.parseError(err);
      Object.assign(result, data);
    }
  }

  _showLoading(show, text = '加载中...') {
    if (this.timer_id) {
      clearTimeout(this.timer_id);
    }
    if (show) {
      // 显示
      this.showLoading && this.showLoading(show, text);
    } else {
      this.timer_id = setTimeout(() => {
        clearTimeout(this.timer_id);
        // 关闭
        this.showLoading && this.showLoading(show, '');
      }, this.min_interval);
    }
  }
  _showToast(text = '加载中...') {
    if (this.showToast) {
      this.showToast(text);
    }
  }
}
