import React, { useState } from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import { createHashHistory } from "history";
import { Switch, Button } from "antd";
import store from "./mobx";
import "./styles/app.scss";
import MenuTree from "./components/menuTree";

import Home from "./views/Home";
import Add from "./views/Add";
import Edit from "./views/Edit";

const history = createHashHistory();

function Side() {
  const [classN, setClassN] = useState("scroll-left");

  return (
    <div className="left">
      <div>
        <Switch
          className="switch"
          defaultChecked
          onChange={() => {
            store.appStore.setIsExpand();
            store.appStore.isExpand
              ? setClassN("scroll-left")
              : setClassN("scroll-left-collapse");
          }}
        />
      </div>
      <div className={classN}>
        <div className="force-overflow">
          <div>
            <div>
              <Button
                type="default"
                onClick={() => {
                  history.push("/");
                  store.appStore.setRouterString("/");
                }}
              >
                主页
              </Button>
              <Button
                type="default"
                onClick={() => {
                  history.push("/add");
                  store.appStore.setRouterString("/add");
                }}
              >
                添加
              </Button>
              <Button
                type="default"
                onClick={() => {
                  history.push("/edit");
                  store.appStore.setRouterString("/edit");
                }}
              >
                编辑
              </Button>
            </div>
            <MenuTree />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app">
   
      <Side />
      <div className="right">
        <div className="scroll-right">
          <div className="force-overflow">
            <Router>
              <Route exact path="/" component={Home} />
              <Route path="/add" component={Add} />
              <Route path="/edit" component={Edit} />
              {/* <Route path="/show" component={Show} /> */}
              {/* <Route path="/search" component={Search} /> */}
            </Router>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
