interface Map {
  [key: string]: any;
  [index: number]: any;
}
export default function listToTree(list: any) {
  const tree = [];
  let map: Map = {};
  let node;

  for (let i = 0; i < list.length; i++) {
    map[list[i].sid] = list[i];
    list[i].children = [];
  }
  for (let i = 0; i < list.length; i += 1) {
    node = list[i];
    if (node.pid !== "-1") {
      map[node.pid].children.push(node);
    } else {
      tree.push(node);
    }
  }
  return tree;
}
