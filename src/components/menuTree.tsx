import React, { useState, useEffect } from "react";
import { Tree } from "antd";
import listToTree from "../utils/listToTree";
import api from "../http";
import store from "../mobx";

const { DirectoryTree } = Tree;

export default function MenuTree() {
  const [data, setData] = useState<any>();
  const [router, setRouter] = useState("/");
  const onSelect = (selectedKeys: any, info: any) => {
    if (store.appStore.routerString === "/") {
      setRouter("/");
      store.homeState.setArticleId(info.node.id);
    } else if (store.appStore.routerString === "/add") {
      setRouter("/add");
      store.addStore.setSid(info.node.sid);
    } else {
      setRouter("/edit");
      store.editStore.setId(info.node.id);
    }
  };
  useEffect(() => {
    api("/tree/all", "GET", "").then((res) => {
      setData(listToTree(res.data.data));
    });
  }, [router]);
  return (
    <DirectoryTree
      multiple
      defaultExpandAll
      onSelect={onSelect}
      treeData={data}
    />
  );
}
