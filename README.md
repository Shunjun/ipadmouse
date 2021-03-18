# ipadMouse-React

在浏览器中模拟 ipad 鼠标, 并提供 Cursor 组件, 可以快速在基于 React 的项目中实现此效果.

> ⚠️ 仅支持桌面浏览器

> 界面 UI 参考: [Exploration - Digital Wallet App - iPad](https://dribbble.com/shots/14728548--Exploration-Digital-Wallet-App-iPad/attachments/6429819?mode=media)

### 使用方法

```jsx
import React from "react";
import ReactDOM from "react-dom";
import Cousor ,{ Alternate } from "ipadMouse";
ReactDOM.render(<Cousor range="window">
   <Alternate>anyting</Alternate>
</Cousor>, container);
```

### API

#### Cursor
用来包裹需要改变鼠标的范围

props
| name    | type   | default   | description                                                           |
| :------ | :----- | :-------- | :-------------------------------------------------------------------- |
| size    | number | `20`      | 鼠标的直径,单位为`px`                                                 |
| shape   | string | `square`  | 鼠标的形状, 取值 `square` 或者 `circle`                               |
| radius  | number | `6`       | 鼠标的圆角, 仅在 `shape` 为 `square` 时有效                           |
| color   | string | `#000000` | 鼠标的颜色,仅支持 `hex color` 或者 `web color name`                   |
| opacity | number | `0.3`     | 鼠标的透明度                                                          |
| range   | string | `window`  | 限制鼠标生效的范围,可以选择整个屏幕 `window` 或者 `Cursor` 包裹的范围 |


#### Alternate
用来包裹可点击部分的元素, 仅支持直接包裹 HTMLElement, 且不支持 children 数组...

> `Alternate` 必须是 `Cursor` 的子孙元素,否则无法生效

props
| name            | type   | default   | description                                     |
| :-------------- | :----- | :-------- | :---------------------------------------------- |
| backgroundColor | string | `#000000` | 鼠标 hover 时的颜色,不传等于 `Cursor` 的颜色    |
| opacity         | number | `0.3`     | 鼠标 hover 的透明度, 不传等于 `Cursor` 的透明度 |
| hoverStyle      | object | {}        | 鼠标 hover 时的 style                           |