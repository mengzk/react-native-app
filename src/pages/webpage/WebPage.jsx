/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: WebPage 加载H5页面
 *  1.H5端：
 *    window/document.postMessage({event: '事件名称', params: '参数', token: '访问api授权'});
 *    window/document.addEventListener('message', (event) => { 返回数据格式：{event: '事件名称', data: '数据', code: ‘状态码：0成功’} })
 *
 *  2.React Native 端
 *    bridge 中添加对应event的具体实现
 *    this.web_view.postMessage(JSON.stringify({event: '事件名称', data: '数据', code: '状态码'}));
 */

import React, {PureComponent} from 'react';
import {View, DeviceEventEmitter, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

import {handlerWebMessage, parseWebEvent} from './bridge/index';
import {Header, SharePop} from './component/index';

import Images from '../../assets/imgs';

// 绑定 window.postMessage
const injectedJavaScript = `window.postMessage = function(data) {window.ReactNativeWebView.postMessage(data);}`;
const h5HandKey = 'handler_h5_receivers';
// -
export default class WebPage extends PureComponent {
  web_view = null;
  h5HandEmit = null;

  constructor(props) {
    super(props);
    this.state = {
      bounce: false, // 加载到底部是否反弹仅ios
      canGoBack: false,
      enableAplha: false,
      showShare: false,
      inited: false,
      title: '',
      url: 'https://dhstatic.bthome.com/appstore/test/landingpageStatic/index.html#/spatialCase/case?fromPage=pad', // h5项目地址
      curUrl: '', // 当前网站地址
      headerConfig: {},
      shareData: {title: '', desc: '', image: ''},
      rightBtns: [],
      agent: '',
    };
  }

  componentDidMount() {
    // 监听 处理Web发送消息 结果
    this.h5HandEmit = DeviceEventEmitter.addListener(
      h5HandKey,
      this.handlerEmitLis,
    );
    this.parseRoute();
  }

  componentWillUnmount() {
    if (this.web_view) {
      this.web_view = null;
    }
    if (this.h5HandEmit) {
      this.h5HandEmit.remove();
    }
  }

  // 解析参数
  parseRoute = () => {
    const route = this.props.route || {};

    this.setState({inited: true});
  };

  // 点击返回键
  onTapBack = () => {
    const canGoBack = this.state.canGoBack;
    console.log('------> onTapBack: ', canGoBack);
    if (canGoBack && this.web_view) {
      this.web_view.goBack();
    } else {
      this.props.navigation.goBack();
    }
  };

  // 显示/关闭分享弹窗
  onShowShare = (showShare = false) => {
    this.setState({showShare});
  };

  // 消息处理 {event: '操作项', data: '数据', state: '要刷新的数据'}
  handlerEmitLis = (res = {}) => {
    // console.log(`------> handlerEventResult:`, res);
    switch (res.event) {
      case 'chatRoom': // 聊天室/客服
        break;
      case 'payment': // 支付
        break;
      default:
        break;
    }

    this._sendEvent(res);
  };

  /**
   * h5与native交互
   * @param {Object} params {action: '事件名称', data: '数据'}
   */
  _handlerWebEmit = (params = {}) => {
    console.log('------> handlerWebEmit:', params);
    DeviceEventEmitter.emit(params.action, params.data);
  };

  /**
   * 发送消息到web
   * @param {*} msgData {event: '事件', data: '数据', code: '状态码', state: '要刷新的数据'}
   */
  _sendEvent = (msgData = {}) => {
    const newState = msgData.state;
    // state不为空表示需要刷新页面
    if (newState) {
      if (typeof newState == 'object') {
        const pageState = this.state;
        for (const key in newState) {
          if (!Object.hasOwnProperty.call(pageState, key)) {
            console.warn(`------> There is no such variable: ${key}`);
          }
        }
        this.setState(newState);
      } else {
        console.warn(`------> Illegal value type: ${newState}`);
      }
      delete msgData.state;
    }
    // 发送消息到web
    if (this.web_view) {
      console.log(`------> send to h5:`, msgData);
      // todo: 对格式做校验
      this.web_view.postMessage(JSON.stringify(msgData));
    }
  };

  // 开始加载
  _onLoadStart = () => {
    // console.log('------> onLoadStart');
    if(!this.state.inited) {
      // TODO1: 加载动画
    }
  };

  // 加载结束
  _onLoadEnd = (res = {}) => {
    const nativeEvent = res?.nativeEvent || {};
    if (nativeEvent) {
      const curUrl = nativeEvent.url;
      const title = nativeEvent.title;
      const canGoBack = nativeEvent.canGoBack;
      // const {url, title, canGoBack} = nativeEvent; // 结构会报错
      this.setState({title, canGoBack, curUrl});
      // console.log(`_onLoadEnd: {back: ${canGoBack} title: ${title}, url: ${curUrl}}`);
      console.log('------> onLoadEnd: ', canGoBack, nativeEvent);
    } else {
      console.warn(`------> onLoadEnd: ${res}`);
    }
  };

  // Web错误处理
  _onWebError = (err={}) => {
    console.warn(`------> onWebError: `, err.nativeEvent);
  };

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
          navigation.push(params.path);
          break;
        case 'navigate': // 跳转新页面
          navigation.navigate({name: params.path});
          break;
        case 'replace': // 替换当前页面
          navigation.replace({name: params.path});
          break;
        case 'back': // 关闭web
          navigation.goBack();
          break;
        case 'guard': // web路由守卫监听
          // TODO3: web路由变化 -获取当前路由标题
          break;
        case 'receivers': // 接收web消息
          this._handlerWebEmit(params);
          break;
        default:
          handlerWebMessage(info, navigation, this._sendEvent);
          return;
      }
    }
  };

  render() {
    const {title, url, showShare, rightBtns, bounce, agent} = this.state;

    return (
      <View style={styles.page}>
        <Header
          title={title}
          leftIcon={Images.left_b}
          rightBtns={rightBtns}
          onBack={this.onTapBack}
        />
        <WebView
          ref={view => {
            this.web_view = view;
          }}
          style={styles.web}
          source={{uri: url}}
          bounces={bounce}
          injectedJavaScript={injectedJavaScript}
          applicationNameForUserAgent={agent}
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
