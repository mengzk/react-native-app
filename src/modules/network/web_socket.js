/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 
 */

import { Config, getTagDomain } from './config'

const ws_host = getTagDomain('ws', Config.env);

let socket_ins = null;
let socket_status = 0; // 0未连接；1已打开；2传输中；3已断开

// 创建web socket
function start(msg = null) {
  socket_ins = new WebSocket(ws_host);
  socket_ins.onopen = function () {
    socket_status = 1;
    console.log('Socket Opened ===========>');
    msg && send(msg);
  };
  // eslint-disable-next-line
  socket_ins.onmessage = function (data) {
    socket_status = 2;
    // console.log(data.data);
  };
  socket_ins.onerror = function (ev) {
    socket_status = 3;
    console.log(ev);
    _reset();
  };
  socket_ins.onclose = function (ev) {
    socket_status = 3;
    console.log(ev);
    // _reset();
  };
}

// 发送消息
function send(data = {}, event = 'game') {
  return new Promise((resolve) => {
    if (socket_ins) {
      const eventFunc = (ev) => {
        try {
          console.log(ev.data);
          const info = JSON.parse(ev.data);
          resolve(info.data);
        } catch (error) {
          console.log(error);
          resolve({ code: -1, data: '', message: '失败' });
        }
      }
      socket_ins.addEventListener('message', eventFunc, { once: true });
      socket_ins.addEventListener('error', eventFunc, { once: true });
      socket_ins.addEventListener('close', eventFunc, { once: true });

      socket_ins.send(
        JSON.stringify({
          event,
          data,
        }),
      );
    } else {
      start(data);
      resolve({ code: -101, data: '', message: '服务初始化中' });
    }
  });
}

// 更新游戏消息
function game(data = {}) {
  return send(data, 'game');
}

function close() {
  if (socket_ins) {
    socket_ins.close();
  }
}

function _reset() {
  const timer = setTimeout(() => {
    clearTimeout(timer);
    if (socket_status == 3) {
      start();
    }
  }, 2000);
}

const Socket = {
  start,
  send,
  game,
  close
};
export default Socket;