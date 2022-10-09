# Math

js 中和数学有关的方法

## API

| 方法         | 说明                   | 参数            |
| ------------ | ---------------------- | --------------- |
| getRandomInt | 获取范围内的随机整数   | (min=0， max=0) |
| getRandomNum | 获取范围内的随机数     | (min=0， max=0) |
| getRandomStr | 获取范围内的随机字符串 | (len=32)        |

## DEMOS

```js
import React from "react";
import { getRandomInt, getRandomNum, getRandomStr } from "common-library-js";

export default () => {
  return (
    <div>
      <p>{console.log(getRandomInt(1, 100))}</p>
      <p>{console.log(getRandomNum(1, 100))}</p>
      <p>{console.log(getRandomStr())}</p>
    </div>
  );
};
```
