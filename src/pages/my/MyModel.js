/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 
 */
import { LiveData, LiveModel } from '../../libs/hook_widget/index'

export default class MyModel extends LiveModel {

  curDate = new LiveData(Date.now());

  onchange = () => {
    console.log('=====>my')
    this.curDate.next(Date.now())
  }
}