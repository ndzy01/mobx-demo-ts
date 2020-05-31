import { observable, action } from "mobx";
class AppStore {
  @observable public isExpand: boolean = true;
  @observable public routerString: string = "/";

  @action.bound
  setIsExpand() {
    this.isExpand = !this.isExpand;
  }
  @action.bound
  setRouterString(param: string) {
    this.routerString = param;
  }
}

const appStore = new AppStore();
export default appStore;
