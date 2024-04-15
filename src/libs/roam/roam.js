/**
 * Author: Meng
 * Date: 2023-
 * Desc: 
 */

// 监听函数
export function roam(model) {

  function observer(data) {
    this.setState({
      date: Date.now()
    })
  }

  return function (target) {
    target.prototype.roamObserver = observer;
    
  }

}
