# Date

Date格式化

## API

| 方法         | 说明                   | 参数            |
| ------------ | ---------------------- | --------------- |
| FormatTime | 将时间格式化为YYYY年MM月DD日 HH时ss分mm秒   | new Date所用的参数 |

## DEMOS

```js
import React from "react";
import { FormatTime } from "common-library-js";

export default () => {
    const now = new FormatTime().format();
    return now;
};
```
