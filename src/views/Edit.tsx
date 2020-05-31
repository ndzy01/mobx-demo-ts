import React, { Component } from "react";
import { observer } from "mobx-react";
import store from "../mobx";
import EditComponent from "../components/editComponent";

@observer
class Edit extends Component {
  public render() {
    return <EditComponent eid={store.editStore.id}></EditComponent>;
  }
}

export default Edit;
