# Storage

操作本地存储的函数

## API

| 方法          | 说明           | 参数                                 |
| ------------- | -------------- | ------------------------------------ |
| setStorage    | 设置存储值     | (name, value, type = 'localStorage') |
| getStorage    | 获取存储的值   | (name, type = 'localStorage')        |
| removeStorage | 清除某个存储值 | (name, type = 'localStorage')        |
| clearStorage  | 清空存储       | (type = 'localStorage')              |

## DEMOS

```js
import React from "react";
import {
  setStorage,
  getStorage,
  removeStorage,
  clearStorage,
} from "common-library-js";

export default () => {
  return (
    <div>
      输出见控制台
      <p>{setStorage("name", "test")}</p>
      <p>{setStorage("info", { name: "test", age: 8, sex: "男" })}</p>
      <p>{setStorage("arr", [1, 2, 3])}</p>
      <p>{console.log(getStorage("name"))}</p>
      <p>{console.log(getStorage("info"))}</p>
      <p>{console.log(getStorage("arr"))}</p>

    </div>
  );
};
```
