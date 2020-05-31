import { observable, action } from "mobx";
class AddStore {
  @observable public sid: string = "";

  @action.bound
  getSid() {
    return this.sid;
  }

  @action.bound
  setSid(param: string) {
    this.sid = param;
  }
}

const addStore = new AddStore();
export default addStore;
