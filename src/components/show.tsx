import React, { useState, useEffect } from "react";
import api from "../http";

export default function Show(props: any) {
  const [article, setArticle] = useState<any>({});
  useEffect(() => {
    if (props.articleId !== "") {
      api("/tree/getArticleById", "POST", { id: props.articleId }).then(
        (res) => {
          setArticle(res.data.data);
        }
      );
    }
  }, [props]);
  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.cTime}</p>
      <p>{article.mTime}</p>
      <div
        className="braft-output-content"
        dangerouslySetInnerHTML={{ __html: article.html }}
      ></div>
    </div>
  );
}
