# Url

和 url 有关的方法集合

## API

| 方法           | 说明                    | 参数   |
| -------------- | ----------------------- | ------ |
| getQueryToObj  | url 转成 url 对象       |
| getQueryByName | 获取 url 中某个参数值   | (name) |
| getUrlLast     | 获取 url 中最后一个路径 |        |

## DEMOS

```js
import React from "react";
import { getQueryToObj, getQueryByName, getUrlLast } from "common-library-js";

export default () => {
  return (
    <div>
      <p>{console.log(getQueryToObj())}</p>
      <p>{console.log(getQueryByName("name"))}</p>
      <p>{console.log(getUrlLast())}</p>
    </div>
  );
};
```
