import React, { Component, useState, useEffect } from "react";
import { observer } from "mobx-react";
import store from "../mobx";
import { Table, Form, Input, Button, message } from "antd";

import api from "../http";

function TreeTable(props: any) {
  const [datas, setDatas] = useState<any>([]);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "sid",
      dataIndex: "sid",
      key: "sid",
    },
    {
      title: "pid",
      dataIndex: "pid",
      key: "pid",
    },
    {
      title: "title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "cTime",
      dataIndex: "cTime",
      key: "cTime",
    },
    {
      title: "mTime",
      dataIndex: "mTime",
      key: "mTime",
    },
  ];

  useEffect(() => {
    if (props.articleId !== "") {
      api("/tree/getTreesBySid", "POST", { sid: props.sid }).then((res) => {
        setDatas(res.data.data);
      });
    }
  }, [props]);
  return (
    <div>
      <Table dataSource={datas} columns={columns} pagination={false} />
    </div>
  );
}

function AddForm(props: any) {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    api("/tree/save", "POST", {
      sid: values.sid,
      pid: values.pid,
      title: values.title,
      key: values.sid,
    }).then(() => {
      message.info("成功添加！");
      form.resetFields();
    });
  };
  const onReset = () => form.resetFields();

  return (
    <div>
      <Form name="form" form={form} onFinish={onFinish}>
        <Form.Item
          label="sid"
          name="sid"
          rules={[{ required: true, message: "Can not be empty!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="pid"
          name="pid"
          rules={[{ required: true, message: "Can not be empty!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="title"
          name="title"
          rules={[{ required: true, message: "Can not be empty!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
@observer
class Add extends Component {
  public render() {
    return (
      <div className="add">
        <div style={{ margin: "10px" }}>
          <TreeTable sid={store.addStore.sid} />
          <AddForm />
          <Button
            style={{ marginTop: "5rem" }}
            type="primary"
            onClick={() => {
              api("/tree/delete", "POST", {
                sid: store.addStore.sid,
              }).then((res) => {
                message.info(res.data.msg);
              });
            }}
          >
            删除 sid 为：{store.addStore.sid} 的项
          </Button>
        </div>
      </div>
    );
  }
}

export default Add;
