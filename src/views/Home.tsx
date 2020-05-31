import React, { Component } from "react";
import { observer } from "mobx-react";
import store from "../mobx";
import Show from "../components/show";
import "braft-editor/dist/output.css";

// interface HomeState {
//   data: any;
// }
// const initialState: HomeState = { data: "" };
// type State = Readonly<typeof initialState>;

@observer
// class Home extends Component<object, State> {
// readonly state: State = initialState;
class Home extends Component {
  public render() {
    return <Show articleId={store.homeState.articleId} />;
  }
}

export default Home;
