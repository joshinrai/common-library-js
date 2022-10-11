# Date

Date格式化

## API
| 类         | 说明                   | 参数            |
| ------------ | ---------------------- | --------------- |
| FormatTime | new 一个当前时间（中国大陆）   | new Date所用的参数 |

| 方法         | 说明                   | 参数            |
| ------------ | ---------------------- | --------------- |
| format | 将大陆时间格式化为YYYY年MM月DD日 HH时ss分mm秒   | 无参数 |

## DEMOS

```js
import React from "react";
import { FormatTime } from "common-library-js";

export default () => {
    const now = new FormatTime().format();
    return now;
};
```
