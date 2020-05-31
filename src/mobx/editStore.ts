import { observable, action } from "mobx";
class EditStore {
  @observable public id: string = "";

  @action.bound
  getId() {
    return this.id;
  }

  @action.bound
  setId(param: string) {
    this.id = param;
  }
}

const editStore = new EditStore();
export default editStore;
