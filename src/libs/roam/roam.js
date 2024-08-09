/**
 * Author: Meng
 * Date: 2024-08-10
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
