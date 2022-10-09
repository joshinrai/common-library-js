# Window

和 Window 有关的方法集合

## API

| 方法      | 说明             | 参数             |
| --------- | ---------------- | ---------------- |
| loadScipt | 动态加载 js 文件 | (url, globalVar) |

## DEMOS

```jsx
import React from "react";
import { loadScript } from "common-library-js";

export default () => {
  React.useEffect(() => {
    setTimeout(() => {
      loadScript("https://unpkg.com/react@16.7.0/umd/react.production.min.js");
      console.log(React);
    }, 1000);

    setTimeout(() => {
      loadScript("https://unpkg.com/react@16.7.0/umd/react.production.min.js");
      console.log(React);
    }, 3000);
  }, []);
  return <div></div>;
};
```
