/**
 * Author: Meng
 * Date: 2021-09-27
 * Desc: WebPage 加载H5
 * 使用：
 *  1.H5端：
 *    window/document.postMessage({event: 'your event type', params: 'your event params', key: '你的应用访问 api 授权key'});
 *    window/document.addEventListener('message', (event) => { 返回数据格式：{event: 'your event type', data: 'return data', code: ‘状态：0成功’} })
 *
 *  2.React Native 端
 *    bridge 中添加对应event的具体实现
 *    this.web_view.postMessage(JSON.stringify({event: 'your event type', data: 'return data'}));
 *
 */

import React, { PureComponent } from 'react';
import { View, DeviceEventEmitter, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';

import { handlerWebMessage, parseWebEvent } from './bridge/index';
import { Header, SharePop } from './component/index';
import emit_keys from './constants/index';

import Images from '../../assets/Images';

// 绑定 window.postMessage
const injectedJavaScript = `window.postMessage = function(data) {window.ReactNativeWebView.postMessage(data);}`;

export default class WebPage extends PureComponent {
  web_view = null;

  handler_emit = null;
  app_route_emit = null;

  constructor(props) {
    super(props);
    this.state = {
      bounce: false, // 加载到底部是否反弹仅ios
      canGoBack: false,
      enableAplha: false,
      showShare: false,
      title: '',
      tagUrl: 'https://dhstatic.bthome.com/appstore/test/landingpageStatic/index.html#/spatialCase/case?fromPage=pad', // h5项目地址
      curUrl: '', // 当前网站地址
      headerConfig: {},
      shareData: { title: '', desc: '', image: '' },
      rightBtns: [],
      userAgentName: '',
    };
  }

  componentDidMount() {
    // 监听 处理Web发送消息 结果
    this.handler_emit = DeviceEventEmitter.addListener(emit_keys.handler, this._handlerEventResult);

    // 监听 Web发送的 emitter消息
    this.app_route_emit = DeviceEventEmitter.addListener(emit_keys.app_route, data => {
      this._sendEvent({ event: emit_keys.app_route, data });
    });

    // const timer = setTimeout(() => {
    //   clearTimeout(timer)
    //   this._onWebMessage({ nativeEvent: { data: JSON.stringify({ event: 'share', params: '数据' }) } });
    // }, 3000)

  }

  componentWillUnmount() {
    if (this.web_view) {
      this.web_view = null;
    }
    if (this.handler_emit) {
      this.handler_emit.remove();
    }
    if (this.app_route_emit) {
      this.app_route_emit.remove();
    }
  }

  // 开始加载 - 可做加载动画
  _onLoadStart = res => {
    console.log('------> onLoadStart', res.nativeEvent);
  };

  // // 加载 - 可做加载动画
  // _onStateChange = res => {
  //   console.log('------> onStateChange', res);
  // };
  // 加载结束
  _onLoadEnd = res => {
    const nativeEvent = res?.nativeEvent || {};
    if (nativeEvent) {
      const curUrl = nativeEvent.url;
      const title = nativeEvent.title;
      const canGoBack = nativeEvent.canGoBack;
      // const {url, title, canGoBack} = nativeEvent; // 结构会报错
      this.setState({ title, canGoBack, curUrl });
      // console.log(`_onLoadEnd: {back: ${canGoBack} title: ${title}, url: ${curUrl}}`);
      console.log('--- onLoadEnd: ', canGoBack, nativeEvent);
    } else {
      console.warn(`------> onLoadEnd: ${res}`);
    }
  };

  // Web错误处理
  _onWebError = err => {
    console.warn(`------> onWebError: `, err.nativeEvent);
  };

  // 显示/关闭分享弹窗
  onShowShare = (showShare = false) => {
    this.setState({ showShare });
  };

  // 点击返回键
  onPressBack = () => {
    const canGoBack = this.state.canGoBack;
    console.log('------> onPressBack: ', canGoBack);
    if (canGoBack && this.web_view) {
      this.web_view.goBack();
    } else {
      this.props.navigation.goBack();
    }
  };

  // 发送消息到web {event: 'your event type', data: 'return data', code: '状态：0成功', state: '要刷新的数据'}
  _sendEvent = (msgData) => {
    const newState = msgData.state; // state不为空表示需要刷新页面
    if (typeof newState == 'object') {
      const pageState = this.state;
      for (const key in newState) {
        if (!Object.hasOwnProperty.call(pageState, key)) {
          throw Error(`There is no such variable: state ------> ${key}`);
        }
      }
      this.setState(newState);
    } else if (newState != null) {
      throw Error(`Illegal value type: state ------> ${newState}`);
    }
    if (this.web_view) {
      if (newState) {
        delete msgData.state;
      }
      // todo: 对格式做校验
      this.web_view.postMessage(JSON.stringify(msgData));
      console.log(`------> sendEvent:`, msgData);
    }
  };

  // web消息处理之后操作 {event: '操作项', data: '数据', state: '要刷新的数据'}
  _handlerEventResult = (res = {}) => {
    // console.log(`------> handlerEventResult:`, res);
    let obj = null;
    switch (res.event) {
      case 'chatRoom': // 聊天室/客服
        break;
      case 'payment': // 支付
        break;
      case 'cashier': // 收银台
        break;
      default:
        break;
    }

    this._sendEvent(res);
  }

  // 接受web消息
  _onWebMessage = (ev = {}) => {
    const nativeEvent = ev.nativeEvent || {};
    if (nativeEvent.data && nativeEvent.data != 'undefined') {

      const info = parseWebEvent(nativeEvent);
      const params = info.params || {};
      const navigation = this.props.navigation;

      switch (info.event) {
        case 'reload': // 刷新当前web页面
          this.web_view.reload();
          break;
        case 'push': // 跳转新页面
          this.props.navigation.push(params.path);
          break;
        case 'navigate':
          this.props.navigation.navigate({ name: params.path });
          break;
        case 'replace':
          this.props.navigation.replace({ name: params.path });
          break;
        case 'back': // 关闭web
          this.props.navigation.goBack();
          break;
        case 'h5_route_change':
          // TODO3: web路由变化
          break;
        case 'parse_error': // web消息解析错误
          break;
        case emit_keys.receiver:
          this._handlerWebEmit(params);
          break;
        default:
          handlerWebMessage(info, navigation, this._sendEvent);
          return;
      }

      this._sendEvent(info);
    }
  };

  /** info: {action, params} */
  _handlerWebEmit = (info = {}) => {
    const data = info.params || {};
    console.log('------> handlerWebEmit:', info);
    DeviceEventEmitter.emit(info.action, data);
  };

  render() {
    const { title, tagUrl, showShare, rightBtns, bounce, userAgentName } = this.state;
    return (
      <View style={styles.page}>
        <Header title={title} leftIcon={Images.left_b} rightBtns={rightBtns} onBack={this.onPressBack} />
        <WebView
          ref={view => { this.web_view = view; }}
          style={styles.web}
          source={{ uri: tagUrl }}
          bounces={bounce}
          injectedJavaScript={injectedJavaScript}
          applicationNameForUserAgent={userAgentName}
          // onNavigationStateChange={this._onStateChange}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          mediaPlaybackRequiresUserAction={false}
          allowsBackForwardNavigationGestures={true}
          onError={this._onWebError}
          onLoadEnd={this._onLoadEnd}
          onLoadStart={this._onLoadStart}
          onMessage={this._onWebMessage}
        />
        {/* 分享弹窗 */}
        {showShare && <SharePop onPress={() => this.onShowShare(false)} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#ff0099',
  },
  web: {
    width: '100%',
    flex: 1,
  },
});
