

/**
 * Author: Meng
 * Date: 2024-08-10
 * Desc: 
 */
import { LiveModel, LiveData } from "../../libs/hook_widget/index"

export default class ProjectModel extends LiveModel {

  curDate = new LiveData(Date.now());

  onCreate(props) {
    console.log('===========> create: ProjectStore')
  }

  onChangeDate = () => {
    console.log('===========>: onChangeDate')
    this.curDate.next(Date.now());
  }
}