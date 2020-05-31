import React, { useState, useEffect } from "react";
import { createHashHistory } from "history";

import BraftEditor from "braft-editor";
import { ContentUtils } from "braft-utils";
import { Button, Input, message, Upload } from "antd";
import api from "../http";
const history = createHashHistory();

export default function EditC(props: any) {
  // BraftEditor.use(
  //   CodeHighlighter({
  //     includeEditors: ["editor-with-code-highlighter"],
  //   })
  // );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(BraftEditor.createEditorState(null));
  const [mHtml, setMHtml] = useState(BraftEditor.createEditorState(null));
  const controls: any = [
    "headings",
    "font-size",
    "list-ul",
    "list-ol",
    "text-color",
    "bold",
    "italic",
    "underline",
    "code",
    "hr",
    "link",
    "clear",
  ];

  const uploadProps = {
    name: "file",
    action: "http://www.ndzy01.com:8888/upload/",
    headers: {
      authorization: "authorization-text",
    },
  };

  const extendControls: any = [
    {
      key: "antd-uploader",
      type: "component",
      component: (
        <Upload
          {...uploadProps}
          accept="image/*"
          showUploadList={false}
          onChange={(info: any) => {
            if (info.file.status !== "uploading") {
              // console.log(info.file, info.fileList)
            }
            if (info.file.status === "done") {
              message.success(`${info.file.name} file uploaded successfully`);
              setContent(
                ContentUtils.insertMedias(content, [
                  {
                    type: "IMAGE",
                    url: info.file.response.data.url,
                  },
                ])
              );
              setMHtml(
                ContentUtils.insertMedias(mHtml, [
                  {
                    type: "IMAGE",
                    url: info.file.response.data.url,
                  },
                ])
              );
            } else if (info.file.status === "error") {
              message.error(`${info.file.name} file upload failed.`);
            }
          }}
        >
          <Button
            className="control-item button upload-button"
            data-title="插入图片"
          >
            插入图片
          </Button>
        </Upload>
      ),
    },
  ];

  useEffect(() => {
    if (props.eid !== "") {
      api("/tree/getArticleById", "POST", {
        id: props.eid,
      }).then((res) => {
        setTitle(res.data.data.title);
        setContent(BraftEditor.createEditorState(res.data.data.content));
      });
    }
  }, [props]);

  return (
    <div>
      <div style={{ margin: " 20px", display: "flex" }}>
        <Input readOnly value={title} />{" "}
        <Button
          type="primary"
          onClick={() => {
            api("/tree/edit", "POST", {
              id: props.eid,
              content: content.toRAW(),
              html: mHtml.toHTML(),
            }).then((res) => {
              message.success("successfully edited");
              history.push({ pathname: "/" });
            });
          }}
        >
          Submit
        </Button>
      </div>
      <div>
        <BraftEditor
          style={{
            border: "2px solid #976767",
            margin: "2px",
          }}
          className="my-editor"
          value={content}
          controls={controls}
          extendControls={extendControls}
          onChange={(editorState) => {
            setContent(editorState);
            setMHtml(editorState);
          }}
          placeholder="Please enter the text content!"
        />
      </div>
    </div>
  );
}
