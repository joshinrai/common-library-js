# Data-Type

类型判断函数

## API

| 方法       | 说明               |
| ---------- | ------------------ |
| isObj      | 判断是否是对象     |
| isEmptyObj | 判断是否是空对象   |
| isNum      | 判断是否是数字     |
| isStr      | 判断是否是字符串   |
| isBool     | 判断是否是 boolean |
| isArray    | 判断是否是数组     |
| isArray    | 判断是否是数组     |
| isArray    | 判断是否是数组     |
| isFun      | 判断是否是函数     |
| isFun      | 判断是否是 Promise |

## DEMOS

```js
import React from "react";
import {
  isObj,
  isEmptyObj,
  isNum,
  isStr,
  isBool,
  isArr,
  isFun,
  isPromise,
} from "common-library-js";

export default () => {
  return (
    <div>
      <p>{isObj({ name: "btc" }) ? "验证成功" : "验证失败"}</p>
      <p>{isEmptyObj({ name: "btc" }) ? "验证成功" : "验证失败"}</p>
      <p>{isStr("btc") ? "验证成功" : "验证失败"}</p>
      <p>{isBool(true) ? "验证成功" : "验证失败"}</p>
      <p>{isArr([1, 2, 3]) ? "验证成功" : "验证失败"}</p>
      <p>{isFun(function () {}) ? "验证成功" : "验证失败"}</p>
      <p>{isPromise(Promise.resolve()) ? "验证成功" : "验证失败"}</p>
    </div>
  );
};
```
