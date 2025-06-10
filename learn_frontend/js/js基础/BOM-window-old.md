# BOM-window

[[toc]]

BOM 是浏览器对象模型，就是将浏览器看成一个对象，提供操作浏览器的方法。其中一个核心对象是 window，它表示浏览器的一个实例，同时又是全局对象。
因此全局作用域中声明的变量函数都会变成 window 对象的属性和方法。同时其上还有一个 document 属性代表文档对象

## 视口与文档

### 视图与文档所包含的区域

- 视口尺寸不包括浏览器工具条、菜单、标签、状态栏等，当你打开控制台后，视口尺寸就相应变小了
- 文档区域就是整个 HTML 文档

![视图与文档所包含的区域](https://s3.bmp.ovh/imgs/2025/05/22/6c182a21c0e668b6.png)

### 视口与文档中的定位

- fixed 使用视口定位
- position
  - 若为 relative：则元素会相对于没给它设置 position 属性时的位置进行定位
  - 若为 absolute：则相对于文档或最近的包含它的定位元素进行定位，后者产生的坐标系是容器坐标，与视图坐标和窗口坐标相区别

### 视口与文档坐标

- 文档坐标在页面滚动时不发生改变
- 视口坐标的操作需要考虑滚动条的位置

![视口与文档坐标系](https://s3.bmp.ovh/imgs/2025/05/22/a740b7cd2cd9c67b.png)

## 尺寸与坐标

### 视口尺寸

视口坐标需要知道滚动条位置才可以进行计算，有以下几种方式获取滚动位置
| 属性 | 含义 | 包含内容 |
|------------------------|------------|--------|
| `window.innerWidth` | 视口尺寸 | 视口宽度，包括滚动条（不常用） |
| `document.documentElement.clientWidth` |视口尺寸|视口宽度不包含滚动条 |

### 元素尺寸

元素在页面中拥有多个描述几何数值的尺寸，下面截图进行了形象的描述。

| 属性                     | 含义     | 包含内容                                            |
| ------------------------ | -------- | --------------------------------------------------- |
| `element.offsetWidth`    | 视觉尺寸 | content + padding + border + scrollbar              |
| `element.clientWidth`    | 可用尺寸 | content + padding（行元素尺寸为 0，且不包含滚动条） |
| `element.scrollWidth`    | 内容尺寸 | content + padding + 溢出部分 + scrollbar            |
| `element.clientLeft/top` | 边框尺寸 | boder-left/top （若滚动条在左侧则包含滚动条宽度）   |

### 元素的相对坐标

| 属性                      | 描述                                                                                      | 计算基准                          |
| ------------------------- | ----------------------------------------------------------------------------------------- | --------------------------------- |
| `getBoundingClientRect()` | 返回元素在视口坐标及元素大小，不包括外边距，width/height 与 offsetWidth/offsetHeight 匹配 | 窗口坐标                          |
| `element.offsetLeft`      | 元素相对于祖先元素的 X 轴坐标                                                             | 基于 `offsetParent` 的定位        |
| `element.offsetTop`       | 元素相对于祖先元素的 Y 轴坐标                                                             | 同上，注意祖先的 `transform` 影响 |

### 元素的滚动坐标

| 属性/方法            | 类型 | 备注                 |
| -------------------- | ---- | -------------------- |
| `element.scrollLeft` | 属性 | 水平滚动条已滚动距离 |
| `element.scrollTop`  | 属性 | 垂直滚动条已滚动距离 |

## 相对元素

根据图片中的信息，整理成 Markdown 表格如下：

| **属性/方法**              | **说明**                                           | **特殊情况**                               |
| -------------------------- | -------------------------------------------------- | ------------------------------------------ |
| `element.getClientRects()` | 返回行级元素每行尺寸和位置组成的数组               | -                                          |
| `element.offsetParent`     | 返回拥有定位属性的父级，或`body`/`td`/`th`/`table` | 对于隐藏元素、`body`或`html`元素返回`null` |

## 相关 API 总结

![元素尺寸坐标信息](https://s3.bmp.ovh/imgs/2025/05/22/dd926dd0be047aca.png)

## 坐标点元素

### 坐标点元素集合

element.elementsFromPoint 返回指定坐标点上的元素集合

```html
<style>
  div {
    width: 200px;
    height: 200px;
  }
</style>
<div></div>
<script>
  const info = document.elementsFromPoint(100, 100);
  console.log(info);
</script>
```

返回结果为

```html
0: div 1: body 2: html
```

### 坐标点底层元素

element.elementFromPoint 返回指定坐标点最底层的元素

```html
<style>
  div {
    width: 200px;
    height: 200px;
  }
</style>
<div></div>
<script>
  const info = document.elementFromPoint(100, 100);
  console.log(info);
</script>
```

## 滚动控制

### scrollBy

使用 scrollBy 滚动文档：每次会在上一次的基础上相加
behavior:smooth 为平滑滚动

```html
<style>
  body {
    height: 3000px;
    width: 3000px;
    overflow-x: scroll;
  }
</style>

<script type="module">
  setInterval(() => {
    document.documentElement.scrollBy({ left: 10, top: 30, behavior: 'smooth' });
  }, 100);
</script>
```

### scroll

使用 scroll 滚动到指定位置

```html
<style>
  body {
    height: 3000px;
  }
</style>

<script type="module">
  setTimeout(() => {
    document.documentElement.scroll({ top: 30, behavior: 'smooth' });
  }, 1000);
</script>
```

### scrollIntoView

options（可选 - 对象形式）

- behavior（可选）：滚动行为，可选 "smooth"（平滑滚动）或 "auto"（立即滚动，默认值）。
- block（可选）：垂直方向的对齐方式，可选 "start"（顶部对齐）、"center"（居中）、"end"（底部对齐）或 "nearest"（最近边缘，默认值）。
- inline（可选）：水平方向的对齐方式，可选 "start"、"center"、"end" 或 "nearest"（默认值）。

alignToTop（旧版 - 布尔值）

- true：元素顶部与视口顶部对齐（相当于 {block: "start"}）。
- false：元素底部与视口底部对齐（相当于 {block: "end"}）。

```html
<style>
  div {
    height: 2000px;
    background: red;
    border-top: solid 50px #efbc0f;
    border-bottom: solid 50px #1bb491;
  }
  span {
    border-radius: 50%;
    color: #fff;
    background: #000;
    width: 50px;
    height: 50px;
    display: block;
    text-align: center;
    line-height: 50px;
    position: fixed;
    top: 50%;
    right: 50px;
    border: solid 2px #ddd;
  }
</style>
<div id="app">hdcms.com</div>
<span>TOP</span>

<script>
  document.querySelector('span').addEventListener('click', () => {
    let app = document.querySelector('#app');
    app.scrollIntoView({ block: 'end', behavior: 'smooth' });
  });
</script>
```

## 导航控制

`window.open()`既可以导航到一个特定的 urL,也可以打开一个新的浏览器窗口
如果`window.open()`传递了第二个参数，且该参数是已有窗口或者框架的名称，那么就会在目标窗口加载第一个参数指定的 URL
window.open()会返回新窗口的引用，也就是新窗口的 window 对象

```js
const myWin = window.open('htttp://www.vue3js.cn','topFrame')
==> < a href=" " target="topFrame"></ a>
```

`window.close()`仅用于通过`window.open()`打开的窗口
新创建的 window 对象有一个 opener 属性，该属性指向打开他的原始窗口对象

## 常用事件

Window 对象代表浏览器窗口，提供了许多有用的事件。以下是常见的 window 事件及其用途：

### 加载 & 卸载事件

| 事件               | 触发时机                             | 示例用途                   |
| ------------------ | ------------------------------------ | -------------------------- |
| `load`             | 页面所有资源（图片、脚本等）加载完成 | 初始化页面、绑定事件       |
| `DOMContentLoaded` | DOM 树构建完成（不等待资源）         | 尽早执行脚本、提高用户体验 |
| `beforeunload`     | 页面即将卸载（关闭/刷新/跳转）       | 提示用户保存未提交的数据   |
| `unload`           | 页面正在卸载                         | 清理资源、发送统计数据     |

示例代码

```javascript
window.addEventListener('load', () => {
  console.log('所有资源加载完成');
});

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM 已就绪');
});

window.addEventListener('beforeunload', e => {
  e.preventDefault();
  e.returnValue = '您有未保存的更改，确定离开吗？';
});
```

### 窗口大小 & 滚动事件

| 事件     | 触发时机     | 示例用途                      |
| -------- | ------------ | ----------------------------- |
| `resize` | 窗口大小改变 | 响应式布局调整                |
| `scroll` | 页面滚动时   | 懒加载、返回顶部按钮显示/隐藏 |

示例代码：

```javascript
window.addEventListener('resize', () => {
  console.log(`窗口尺寸：${window.innerWidth}x${window.innerHeight}`);
});

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    console.log('已滚动超过 100px');
  }
});
```

### 焦点 & 可见性事件

| 事件               | 触发时机                       | 示例用途                 |
| ------------------ | ------------------------------ | ------------------------ |
| `focus`            | 窗口获得焦点                   | 恢复动画、继续音视频播放 |
| `blur`             | 窗口失去焦点                   | 暂停动画、节省资源       |
| `visibilitychange` | 页面可见性变化（如切换标签页） | 暂停后台任务、节省电量   |

示例代码：

```javascript
window.addEventListener('focus', () => {
  console.log('窗口获得焦点');
});

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('页面不可见');
  } else {
    console.log('页面可见');
  }
});
```

#### 键盘 & 鼠标事件

| 事件        | 触发时机     | 示例用途               |
| ----------- | ------------ | ---------------------- |
| `keydown`   | 按下键盘按键 | 快捷键操作、表单控制   |
| `keyup`     | 释放键盘按键 | 松开按键时的操作       |
| `click`     | 鼠标点击     | 交互元素响应           |
| `mousemove` | 鼠标移动     | 拖拽效果、鼠标跟随元素 |

示例代码：

```javascript
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    console.log('按下了 ESC 键');
  }
});

window.addEventListener('click', e => {
  console.log(`点击位置：(${e.clientX}, ${e.clientY})`);
});
```

### 其他实用事件

| 事件               | 触发时机                      | 示例用途                  |
| ------------------ | ----------------------------- | ------------------------- |
| `hashchange`       | URL 的哈希部分变化            | 单页面应用（SPA）路由更新 |
| `online`/`offline` | 网络连接状态变化              | 提示用户网络状态          |
| `message`          | 接收到跨窗口消息（如 iframe） | 跨窗口通信                |

示例代码

```javascript
window.addEventListener('hashchange', () => {
  console.log('URL 哈希变化：', window.location.hash);
});

window.addEventListener('online', () => {
  console.log('网络已连接');
});

window.addEventListener('message', e => {
  console.log('收到消息：', e.data);
});
```
