/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc: WebPage 加载H5
 * 使用：
 *  1.H5端：
 *    window/document.postMessage({event: 'your event type', params: 'your event params', key: '你的应用访问 api 授权key'});
 *    window/document.addEventListener('message', (event) => { 返回数据格式：{event: 'your event type', data: 'return data'} })
 *
 *  2.React Native 端
 *    bridge 中添加对应event的具体实现
 *    this.web_view.postMessage(JSON.stringify({event: 'your event type', data: 'return data'}));
 *
 */

import React, {PureComponent} from 'react';
import {View, StatusBar, DeviceEventEmitter, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import {handlerWebMessage, parseWebEvent} from './bridge/index';

// 绑定 window.postMessage
const injectedJavaScript = `window.postMessage = function(data) {window.ReactNativeWebView.postMessage(data);}`;
const receiver_key = 'h5_receivers';

class WebPage extends PureComponent {
  web_view = null;
  event_emitter = null;
  app_emitter = null;

  constructor(props) {
    super(props);
    this.state = {
      bounce: false, // 加载到底部是否反弹仅ios
      canGoBack: false,
      barAlpha: 0,
      userAgentName: '',
      hostUrl: 'https://dhstatic.bthome.com/appstore/test/landingpageStatic/index.html#/brickReplacement/upload', // h5项目地址
      webUrl: '', // 当前网站地址
    };
  }

  componentDidMount() {
    // console.log('params ========>', params)

    this.event_emitter = DeviceEventEmitter.addListener(
      receiver_key,
      (msg = {}) => {
        this._parseEmitter(msg);
      },
    );
    this.app_emitter = DeviceEventEmitter.addListener(
      'app_route_change',
      (msg = {}) => {
        this._sendEvent({event: 'app_route_change', msg});
      },
    );
  }

  componentWillUnmount() {
    if (this.web_view) {
      this.web_view = null;
    }
    if (this.event_emitter) {
      this.event_emitter.remove();
    }
    if (this.app_emitter) {
      this.app_emitter.remove();
    }
  }

  /** info: {action, params} */
  _parseEmitter = info => {
    const data = info.params || {};
    console.log('_parseEmitter:', info);
    switch (info.action) {
      case 'push':
        this.props.navigation.push(data.path);
        break;
      case 'navigate':
        this.props.navigation.navigate({name: data.path});
        break;
      case 'back':
        this.props.navigation.goBack();
        break;
      case 'h5_route_change':
        // TODO3: web路由变化
        break;
      default: // 其他类型的 emitter
        DeviceEventEmitter.emit(info.action, data);
        break;
    }
  };

  // 发送消息到web {event: 'your event type', data: 'return data'}
  _sendEvent = (msgData = {}) => {
    if (this.web_view) {
      this.web_view.postMessage(JSON.stringify(msgData));
      console.log(`WebPage _sendEvent: `, msgData);
    }
  };

  // 接受web消息
  _onWebMessage = async ev => {
    if (ev && ev.nativeEvent && ev.nativeEvent.data) {
      const info = parseWebEvent(ev.nativeEvent);

      switch (info.event) {
        case 'reload':
          this.web_view.reload();
          break;
        case receiver_key:
          DeviceEventEmitter.emit(receiver_key, info.params);
          break;
        default:
          handlerWebMessage(info).then(this._sendEvent);
          break;
      }
    } else {
      console.log(`_onLoadEnd: `);
    }
  };

  // 开始加载
  _onLoadStart = () => {
    // 加载动画
    console.log('_onLoadStart');
  };
  // 加载结束
  _onLoadEnd = res => {
    if (res && res.nativeEvent) {
      const {url, title, canGoBack} = res.nativeEvent;
      this.setState({
        title,
        canGoBack,
        webUrl: url,
      });
      console.log(
        `_onLoadEnd: {canBack: ${canGoBack}, title: ${title}, url: ${url}}`,
      );
    } else {
      console.log(`_onLoadEnd: ${res}`);
    }
  };
  // 页面滑动
  _onWebScroll = e => {
    const nativeEvent = e?.nativeEvent;
    if (nativeEvent) {
      const {contentOffset, layoutMeasurement} = nativeEvent;
      let barAlpha = Math.ceil(
        (contentOffset.y * 10) / layoutMeasurement.height,
      );
      barAlpha = barAlpha > 9 ? 'f' : barAlpha;
      this.setState({barAlpha});
    }
    console.log('_onWebScroll', e.nativeEvent || e);
  };

  // 路由状态变化 -同onLoadEnd效果一致，故不做使用;({ url, title, canGoBack })
  _onNavStateChange = () => {};
  // 对浏览器地址处理拦截或重定向 -未使用; { url, title, canGoBack }
  _onStartLoadWithRequest = () => {};

  // 页面错误 err.nativeEvent = {"canGoBack":false,"code":0,"description":"","title":"","url":""}
  _onWebError = err => {
    console.log(`_onWebError: `, err.nativeEvent);
  };

  render() {
    const {bounce, barAlpha, hostUrl, userAgentName} = this.state;
    const statusBarBg = `#ff0099${barAlpha}0`;
    return (
      <View style={styles.page}>
        <StatusBar backgroundColor={statusBarBg} />
        <WebView
          ref={view => (this.web_view = view)}
          style={styles.web}
          source={{uri: hostUrl}}
          bounces={bounce}
          injectedJavaScript={injectedJavaScript}
          applicationNameForUserAgent={userAgentName}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          mediaPlaybackRequiresUserAction={false}
          allowsBackForwardNavigationGestures={true}
          onError={this._onWebError}
          onScroll={this._onWebScroll}
          onLoadEnd={this._onLoadEnd}
          onLoadStart={this._onLoadStart}
          onMessage={this._onWebMessage}
          onNavigationStateChange={this._onNavStateChange}
          onShouldStartLoadWithRequest={this._onStartLoadWithRequest}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  web: {
    width: '100%',
    height: '100%',
  },
});
export default WebPage;
