# Http

基于 axios 二次封装的请求，提供 setConfig 函数全局配置

## API

| 方法      | 说明                |
| --------- | ------------------- |
| setConfig | 设置 axios 全局配置 |

其他方法请参考 axios 官网

## DEMOS

```jsx
import React, { useEffect } from "react";
import { http } from "common-library-js";

http.setConfig({
  timeout: 500,
  baseURL: "https://qa01web-gateway.lingxichuxing.com",
  headers: {
    sourceId: "abc",
    Token: "123",
  },
  transformResult(result) {
    console.log(result)
    const { code, data, msg } = result.data || {};
    if (code === 200) {
      return data;
    }
    return Promise.reject(result);
  },
  error(e) {
    console.log("错误：" + e);
  },
});

export default () => {
  useEffect(() => {
    // get请求实例
    http
      .get("/saas/v1/basic/dataTypes", {
        headers: {
          name: 123,
        },
        params: {
          name: "test",
          age: 18,
          text: null,
        },
        timeout: 1000, // 请求单独配置超时时间
      })
      .then((data) => {
        console.log("业务方接受到的数据：", data);
      })
      .catch((err) => {
        console.log("业务方接受到的错误", err);
      });

    // post请求实例
    http
      .post(
        "/saas/v1/basic/dataTypes",
        {
          name: "test",
          age: 18,
        },
        {
          headers: {
            abc: 22,
          },
          exId: "123",
          timeout: 2000, // 请求单独配置超时时间
        }
      )
      .then((data) => {
        console.log("业务方接受到的数据：", data);
      })
      .catch((err) => {
        console.log("业务方接受到的错误", err);
      });
  }, []);
  return (
    <div>
      <p>http配置实例</p>
      <p>请查看源代码以及控制台输出</p>
    </div>
  );
};
```
