/**
 * Author: Meng
 * Date: 2022-03
 * Desc:
 */

export enum EnvType {
  prod = "prod",
  test = "test",
  uat = "uat",
  dev = "dev",
}

interface RequestOption {
  url: string;
  method?: string;
  data?: object | string | undefined;
  headers?: Headers;
  /** 请求类型 分为：text/blob/form-data */
  responseType?: string;
}

interface RequestParams {
  /** 请求地址 */
  url: string;
  /** 请求方法 */
  method?: string;
  /** 请求参数 */
  data?: object | string | undefined;
  /** 请求头 */
  headers?: Headers;
  /** 域名(服务) */
  host?: string;
  /** 请求环境 */
  env?: EnvType;
  /** 是分显示加载框 */
  loading?: boolean;
  /** 加载框文案 */
  loadingText?: string;
  /** 请求错误 是否Toast提示 */
  toast?: boolean;
  /** 是否请求重连 */
  reload?: boolean;
  /** 当前请求重连次数 */
  count?: number;
  /** 最大重连次数 */
  maxCount?: number;
  /** 请求类型 分为：text/blob/stream  browser only: 'blob' */
  responseType?: string;
}

interface HostConfig {
  /** 线上环境 */
  prod: object;
  /** 测试环境 */
  test?: object;
  /** dev环境 */
  dev?: object;
  /** Uat环境 */
  uat?: object;
}

interface ResultData {
  data?: any;
  code: number;
  message: string;
  headers?: Headers;
}

interface Headers {
  append(name: string, value: string): void;
  delete(name: string): void;
  get(name: string): string | null;
  has(name: string): boolean;
  set(name: string, value: string): void;
}

interface ParamsData {
  headers?: Headers | undefined;
  params?: object;
}

interface NetConfig {
  /** 默认请求域名(服务) */
  def_host: string;
  /** 项目请求域名配置，分环境 */
  env_hosts: HostConfig;
  /** 网络请求实体 */
  network: Promise<any>;
  /** 解析请求返回数据 */
  parseData: (res: any) => ResultData;

  /** 加载框关闭间隔-防抖 */
  min_interval?: number;
  /** 请求超时时间 */
  // timeout?: number;

  /** 解析请求报错 */
  parseError?: (err: any) => ResultData;
  /** 请求错误提示 */
  showToast?: (msg: string) => void;
  /** 显示及关闭加载框 */
  showLoading?: (show: boolean, msg: string) => void;
  /** 请求前，参数及请求头配置 */
  interceptor?: (data: object, headers: object) => ParamsData;
}

declare class NoRequest {
  private def_env: string;
  private def_host: string;
  private network: (options: RequestOption) => Promise<any>;
  private env_hosts: HostConfig;
  private parseData: (res: any) => ResultData;

  private min_interval?: number;
  private timer_id?: number; // 定时器

  private parseError?: (err: any) => ResultData;
  private showToast?: (msg: string) => void;
  private showLoading?: (show: boolean, msg: string) => void;
  private interceptor?: (data: object, headers: object) => ParamsData;

  constructor(config?: NetConfig);

  /** 设置请求环境 */
  setEnv(env: EnvType): void;

  /** 发起网络请求 */
  request(options: RequestParams): Promise<ResultData>;
}

export default NoRequest;
