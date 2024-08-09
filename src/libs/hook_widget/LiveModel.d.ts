/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc:
 */

declare class LiveModel {

  constructor(props?: any);

  /**
   * 创建时的回调函数 -对应
   */
  public onCreate?(props?: any): void;
  /**
   * 渲染完成的回调函数 -对应componentDidMount
   */
  public onLoad?(): void;
  /**
   * 更新回调 -对应componentDidUpdate
   * Called immediately after updating occurs. Not called for the initial render.
   * The snapshot is only present if getSnapshotBeforeUpdate is present and returns non-null.
   */
  public onUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any): void;
  /**
   * -对应getSnapshotBeforeUpdate
   * Runs before React applies the result of `render` to the document, and
   * returns an object to be given to componentDidUpdate. Useful for saving
   * things such as scroll position before `render` causes changes to it.
   * Note: the presence of getSnapshotBeforeUpdate prevents any of the deprecated
   * lifecycle events from running.
   */
  public getBeforeUpdate?(prevProps: Readonly<any>, prevState: Readonly<any>): any | null;
  /**
   * 是否更新 -对应shouldComponentUpdate
   * Called to determine whether the change in props and state should trigger a re-render.
   */
  public shouldUpdate?(nextProps: Readonly<any>,nextState: Readonly<any>,nextContext: any): boolean;
  /**
   * 异常回调 -对应componentDidCatch
   * @param error 
   * @param errorInfo 
   */
  public onCatch?(error: Error, errorInfo: any): void;
  /**
   * 销毁时回调 -对应componentWillUnmount
   */
  public onDestroy?(): void;

  public addEvent(key: string, tag: string, callback: (data: any) => boolean|void): void;
  
  public sendEvent(key: string, dat: any): void;
  // removeEvent(key: string, tag: string): void;
}

export default LiveModel;
