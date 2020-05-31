import { observable, action } from "mobx";
class HomeStore {
  @observable public articleId: string = "";

  @action.bound
  getArticleId() {
    return this.articleId;
  }

  @action.bound
  setArticleId(param: string) {
    this.articleId = param;
  }
}

const homeStore = new HomeStore();
export default homeStore;
