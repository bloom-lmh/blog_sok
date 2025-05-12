# DOM 基础知识

:::tip 每日回顾

1. 如何获取 DOM 元素的原型链，DOM 元素的原型链上有哪些对象,这些对象分别具有什么方法和属性

2. NodeList 和 HtmlCollection 的区别和共同点，哪些返回 NodeList 哪些返回 HTMLCollection

:::
[[toc]]

## DOM 简介

每个 Window 对象(全局对象)上都有一个 document 属性，引用一个 Document 对象，这个 Document 对象是操作文档的核心对象

## DOM 元素的原型链

对于每个 DOM 元素都有原型对象

### 查看原型链

通过下面的方法可以提取原型链

```html
<h1 id="app">bloom</h1>
<script>
  function prototype(el) {
    console.dir(el.__proto__);
    el.__proto__ ? prototype(el.__proto__) : '';
  }
  prototype(document.getElementById('app'));
</script>
```

比如 h1 标签结点的原型链如下：

| 原型               | 说明                                                                    |
| ------------------ | ----------------------------------------------------------------------- |
| Object             | 根对象，提供 hasOwnProperty 等基本对象操作支持                          |
| EventTarget        | 提供 addEventListener、removeEventListener 等事件支持方法               |
| Node               | 提供 firstChild、parentNode 等节点操作方法                              |
| Element            | 提供 getElementsByTagName、querySelector 等方法                         |
| HTMLElement        | 所有元素的基础类，提供 childNodes、nodeType、nodeName、className 等方法 |
| HTMLHeadingElement | Head 标题元素类                                                         |

### 在原型链上添加方法

可以为 DOM 对象原型链上添加方法

```html
<h1 id="app">bloom</h1>
<script>
  let app = document.getElementById('app');
  HTMLHeadingElement.prototype = Object.assign(HTMLHeadingElement.prototype, {
    color(color) {
      this.style.color = color;
    },
    hide() {
      this.style.display = 'none';
    },
  });
  app.hide();
</script>
```

## Nodelist 和 HtmlCollection

### length

Nodelist 与 HTMLCollection 包含 length 属性，记录了节点元素的数量

```html
<div name="app">
  <div id="bloom">bloom</div>
  <div name="bloom">bloom</div>
</div>
<script>
  const nodes = document.getElementsByTagName('div');
  for (let i = 0; i < nodes.length; i++) {
    console.log(nodes[i]);
  }
</script>
```

### item

Nodelist 与 HTMLCollection 提供了 item()方法来根据索引获取元素

```html
<div name="app">
  <div id="bloom">bloom</div>
  <div name="lmh">bloom</div>
</div>

<script>
  const nodes = document.getElementsByTagName('div');
  console.dir(nodes.item(0));
  // 也可以使用数组下标
  console.dir(nodes[0]);
</script>
```

### namedItem

HTMLCollection 具有 namedItem 方法可以按 name 或 id 属性来获取元素

```html
<div name="app">
  <div id="bloom">bloom</div>
  <div name="lmh">bloom</div>
</div>

<script>
  const nodes = document.getElementsByTagName('div');
  console.dir(nodes.namedItem('bloom'));
  console.dir(nodes.namedItem('lmh'));
  // 也可以使用下面的方式
  console.dir(nodes['bloom']);
  console.dir(nodes.lmh);
</script>
```

### 动态与静态

通过 getElementsByTagname 等 getElementsBy... 函数获取的 Nodelist 与 HTMLCollection 集合是动态的，即有元素添加或移动操作将实时反映最新状态。
• 使用 getElement...返回的都是动态的集合
• 使用 querySelectorAll 返回的是静态集合
比如下面的案例

```html
<div id="app">
  <li>bloom</li>
  <li>lmh</li>
</div>
<button onclick="handleAddElement()">添加元素</button>
<script>
  let nodeList = document.querySelectorAll(`#app li`);
  let htmlCollection = document.getElementsByTagName('li');
  function handleAddElement() {
    let nLi = document.createElement('li');
    nLi.innerHTML = 'new Element';
    document.getElementById('app').appendChild(nLi);
    // 下面的nodeList长度不会变化，因为这个nodeList是静态的
    console.log(nodeList.length);
    // 下面的htmlCollection会发生变化，htmlCollection是动态的
    console.log(htmlCollection.length);
  }
</script>
```

### 小结

| 特性     | NodeList                                              | HTMLCollection                                         |
| -------- | ----------------------------------------------------- | ------------------------------------------------------ |
| 包含内容 | 任意节点（元素、文本、注释等）                        | 仅元素节点                                             |
| 动态性   | 可以是静态（快照）或动态（实时）                      | 始终动态（实时更新）                                   |
| 访问方式 | item(index)、forEach、数组索引                        | item(index)、namedItem(id)、数组索引                   |
| 新增方法 | 支持 forEach（现代浏览器）                            | 无 forEach，需转换为数组遍历                           |
| 常见场景 | querySelectorAll、childNodes、getElementsByName(动态) | getElementsByTagName、getElementsByClassName、children |

::: tip 伪数组
NodeList 和 HTMLCollection 都是伪数组，可看数组章节
:::
