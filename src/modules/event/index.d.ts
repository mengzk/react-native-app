/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 事件订阅分发
 */

interface EventDao {
  key: string; // 事件名
  callback: (data: Any) => boolean; // 事件回调函数
  tag: string; // 事件标识
  type: number; // 事件类型-1单次2普通
}
interface MsgDao {
  key: string; // 事件名
  data: any; // 数据
}

declare class EventBus {
  private static _event_list: Array<EventDao> = [];
  private static _msg_list: Array<MsgDao> = [];

  // 事件注册
  static add(key: string, callback:(data: Any) => boolean, tag?:string, type?: number): void;

  // 订阅单次事件
  static once(key: string, callback:(data: Any) => boolean, tag?:string): void;

  // 发送粘性消息
  static stick(key: string, data: any): void;

  // 发送消息
  static send(key: string, data: any, delay = 0): void;
  // 具体发送
  private static _sendMsg(key: string, data: any): void;

  // 移除消息
  static remove({key, tag, callback} = {}): void;

  // 清除全部消息
  static clear(): void;
}

export default EventBus;
