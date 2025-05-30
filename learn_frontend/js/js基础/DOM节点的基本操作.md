# DOM 节点的基本操作

::: tip 注意
一定要注意对节点的操作包括对文本节点 元素节点 注释节点的操作
:::
[[toc]]

## 查询节点

### 通过 CSS 选择器

所谓的通过 css 选择器查询就是指传入 css 选择器来获取匹配的节点

#### querySelector

querySelector 使用 CSS 选择器获取一个元素，下面是根据属性获取单个元素

```html
<div id="app">
  <div class="bloom lmh" data="myData">bloom</div>
  <div class="bloom">lmh</div>
</div>
<script>
  const node = document.querySelector(`#app .bloom[data='myData']`);
  console.log(node); //<div class="bloom lmh" data="myData">bloom</div>
</script>
```

#### querySelectorAll

使用 querySelectorAll 根据 CSS 选择器获取 静态 Nodelist 节点列表

```html
<div id="app">
  <div class="bloom lmh" data="myData">bloom</div>
  <div class="bloom">lmh</div>
</div>
<script>
  const nodeList = document.querySelectorAll(`#app .bloom`);
  console.log(nodeList);
</script>
```

#### matches

用于检测元素是否含有指定的样式选择器，用于二次过滤元素节点，下面过滤掉所有有 data 属性的 div 元素

```html
<div id="app">
  <div class="bloom lmh" data="myData">bloom</div>
  <div class="bloom">lmh</div>
</div>
<script>
  const nodeList = document.querySelectorAll(`#app .bloom`);
  // 返回不包含data='myData'属性的节点
  const filteredNodeList = [...nodeList].filter(node => {
    return !node.matches(`[data='myData']`);
  console.log(filteredNodeList); // <div class="bloom">lmh</div>
</script>
```

#### closest

查找最近的符合选择器的祖先元素（包括自身），下例查找父级拥有 .comment 类的最近的祖先元素

```html
<div id="app bloom" data="myData">
  <ul class="bloom" data="myData">
    <li class="lmh">lmh</div>
  </ul>
</div>
<script>
  let sDiv = document.querySelector('.lmh');
  let fDiv = sDiv.closest(`.bloom[data='myData']`);
  console.log(fDiv);  // <ul class="bloom" data="myData">
</script>
```

### 其它查询方式

#### getElementById

```html
<div id="app">
  <div id="sub" class="bloom lmh" data="myData">bloom</div>
  <div class="bloom">lmh</div>
</div>
<script>
  function getElementByIds(ids) {
    return ids.map(id => document.getElementById(id));
  }
  const nodeList = getElementByIds(['app', 'sub']);
  console.log(nodeList);
</script>
```

:::tip 需要注意的地方

1. getElementById 只能通过 document 访问，不能通过元素读取拥有 id 的子元素，下面的操作将产生错误

```html
<div id="app">
  bloom
  <div id="bloom">bloom lmh</div>
</div>
<script>
  const app = document.getElementById('app');
  const node = app.getElementById('bloom'); //app.getElementById is not a function
  console.log(node);
</script>
```

2. 拥有 id 的元素可做为 window 的属性进行访问

```html
<div id="app">
  <div id="sub" class="bloom lmh" data="myData">bloom</div>
  <div class="bloom">lmh</div>
</div>
<script>
  // 可以通过id名直接获取属性但是不推荐，这种方法的使用条件是没有与之同名的属性
  // const app = 'a'
  console.log(app); //  <div id="app">
</script>
```

:::

#### getElementsByName

使用 getElementByName 获取设置了 name 属性的元素，虽然在 DIV 等元素上同样有效，但一般用来对表单元素进行操作时使用。其返回 动态 NodeList 节点列表对象

```html
<div id="app">
  <div id="sub" class="bloom lmh" data="myData" name="@bloom">bloom</div>
  <div class="bloom" name="@bloom">lmh</div>
</div>
<script>
  let nodeList = document.getElementsByName('@bloom');
  console.log(nodeList);
</script>
```

#### getElementsByTagName

使用 getElementsByTagName 用于按标签名获取元素，其返回 HTMLCollection 节点列表对象

```html
<ul id="app">
  <li id="sub" class="bloom lmh" data="myData" name="@bloom">bloom</li>
  <li class="bloom" name="@bloom">lmh</li>
</ul>
<script>
  let htmlCollection = document.getElementsByTagName('li');
  console.log(htmlCollection);
</script>
```

#### getElementsByClassName

getElementsByClassName 用于按 class 样式属性值获取 HTMLCollection 元素集合，当设置多个值时顺序无关，只返回包含这些 class 属性的元素

```html {6}
<ul id="app">
  <li id="sub" class="bloom lmh" data="myData">bloom</li>
  <li class="bloom">lmh</li>
</ul>
<script>
  // 查找同时具有 lmh 和 bloom 两个class属性的元素
  let htmlCollection = document.getElementsByClassName('lmh bloom');
  console.log(htmlCollection);
</script>
```

### 一些预选择元素

JS 提供了访问常用节点的 api

| 方法                       | 说明                         |
| -------------------------- | ---------------------------- |
| `document`                 | DOM 操作的起始节点           |
| `document.documentElement` | 文档节点（即 `<html>` 标签） |
| `document.body`            | `<body>` 标签节点            |
| `document.head`            | `<head>` 标签节点            |
| `document.links`           | 所有超链接集合               |
| `document.anchors`         | 所有锚点集合                 |
| `document.forms`           | 表单集合                     |
| `document.images`          | 图片集合                     |

当然 js 还支持直接通过 id 和名字来索引元素

```html
<img id="title1"></img>
<img id="title2"></img>
<a name="name1"></a>
<a name="name2"></a>
<script>
  console.log(console.log(document.images.title1))
  console.log(console.log(document.anchors.name1))
  console.log(console.log(document.anchors.name2))
</script>
```

## 遍历节点列表

### forOf

Nodelist 与 HTMLCollection 是类数组的可迭代对象所以可以使用 for...of 进行遍历

```html
<div class="father">
  <div class="son"></div>
  <div class="son"></div>
</div>
<script>
  let nodeList = document.querySelectorAll('.son');
  let htmlCollection = document.getElementsByClassName('son');
  // forof方法两个都可以使用
  for (const node of nodeList) {
    console.log(node);
  }
</script>
```

### forEach

Nodelist 节点列表也可以使用 forEach 来进行遍历，但 HTMLCollection 则不可以

```html
<div class="father">
  <div class="son"></div>
  <div class="son"></div>
</div>
<script>
  let nodeList = document.querySelectorAll('.son');
  let htmlCollection = document.getElementsByClassName('son');
  // foreach方法只能NodeList方法使用
  nodeList.forEach(node => console.log(node.nodeType));
</script>
```

### call/apply

节点集合对象原型中不存在 map 方法，但可以借用 Array 的原型 map 方法实现遍历

```html
<div class="father">
  <div class="son"></div>
  <div class="son"></div>
</div>
<script>
  let nodeList = document.querySelectorAll('.son');
  let htmlCollection = document.getElementsByClassName('son');
  // NodeList 和 HtmlCollection 都没有map方法但可以借用 call和apply+Array的原型
  const nodeTypeList = Array.prototype.map.call(nodeList, (node, index) => {
    return node.nodeType;
  });
  console.log(nodeTypeList);
</script>
```

### Array.from

Array.from 用于将类数组转为组件，并提供第二个迭代函数。所以可以借用 Array.from 实现遍历

```html
<div class="father">
  <div class="son"></div>
  <div class="son"></div>
</div>
<script>
  let nodeList = document.querySelectorAll('.son');
  let htmlCollection = document.getElementsByClassName('son');
  // Array.from 用于将类数组转换为数组，可以用这个方法实现遍历
  // 回调函数的值作为数组的一个值
  Array.from(nodeList, (node, index) => {
    console.log(node.nodeType);
  });
</script>
```

### 展开语法

下面使用点语法转换节点为真实数组

```html
<h1>houdunren.com</h1>
<h1>houdunwang.com</h1>
<script>
  let elements = document.getElementsByTagName('h1');
  console.log(elements);
  [...elements].map(item => {
    item.addEventListener('click', function () {
      this.style.textTransform = 'uppercase';
    });
  });
</script>
```

## 创建节点

### 创建元素节点-createElement

创建新元素，接受一个参数，即要创建元素的标签名

```js
const divEl = document.createElement('div');
```

### 创建文本节点-createTextNode

创建一个文本节点

```js
const textEl = document.createTextNode('content');
```

### 创建文档碎片-createDocumentFragment

用来创建一个文档碎片，它表示一种轻量级的文档，主要是用来存储临时节点，然后把文档碎片的内容一次性添加到 D0M 中

```js
const fragment = document.createDocumentFragment();
```

## 插入节点

### 一般方法

| 方法                    | 说明                 |
| ----------------------- | -------------------- |
| append                  | 添加节点到子节点最后 |
| prepend                 | 添加节点到子节点最前 |
| before                  | 节点前面添加新节点   |
| after                   | 节点后面添加新节点   |
| appendChild（老方法）   | 添加节点到子节点最后 |
| insertBefore （老方法） | 节点前面添加新节点   |

```html
<ul id="list">
  <li>1</li>
  <li>2</li>
  <li>3</li>
</ul>
<button onclick="handleAppend()">添加节点到子节点最后append</button>
<button onclick="handlePrepend()">添加节点到子节点最前prepend</button>
<button onclick="handleBefore()">添加节点到元素的前面before</button>
<button onclick="handleAfter()">添加节点到元素的后面after</button>
<button onclick="handleAppendChild()">添加节点到子节点最后appendChild</button>
<button onclick="handleInsertBefore()">添加节点到元素的前面insertBefore</button>
<script>
  let list = document.querySelector('#list');
  function handleAppend() {
    let liEl = document.createElement('li');
    liEl.innerText = '新的li标签';
    list.append(liEl);
  }
  function handlePrepend() {
    let liEl = document.createElement('li');
    liEl.innerText = '新的li标签';
    list.prepend(liEl);
  }
  function handleBefore() {
    let divEl = document.createElement('div');
    divEl.innerText = '新的div标签';
    list.before(divEl);
  }
  function handleAfter() {
    let divEl = document.createElement('div');
    divEl.innerText = '新的div标签';
    list.after(divEl);
  }
  function handleAppendChild() {
    let liEl = document.createElement('li');
    liEl.innerText = '新的li标签';
    list.appendChild(liEl);
  }
  function handleInsertBefore() {
    let liEl = document.createElement('li');
    liEl.innerText = '新的li标签';
    list.insertBefore(liEl, list.children[1]);
  }
</script>
```

### insertAdjacentHTML

**将 html 文本**插入到元素指定位置，浏览器会对文本进行标签解析，包括以下位置
| 选项 | 说明 |
| ---- | ---- |
| beforebegin | 元素本身前面 |
| afterend | 元素本身后面 |
| afterbegin | 元素内部前面 |
| beforeend | 元素内部后面 |

### insertAdjacentElement

方法将指定元素插入到元素的指定位置，包括以下位置

- 第一个参数是位置
- 第二个参数为新元素节点

| 选项        | 说明         |
| ----------- | ------------ |
| beforebegin | 元素本身前面 |
| afterend    | 元素本身后面 |
| afterbegin  | 元素内部前面 |
| beforeend   | 元素内部后面 |

![位置图片](https://s3.bmp.ovh/imgs/2025/05/17/8d27d66b22446a6d.png)

## 克隆节点

使用 cloneNode 拷贝结点，因为如果某个元素已经在文档中了，你有把它插入到其他地方，那它会转移到新位置，而不会复制到一个新的过去。所以可以使用 cloneNode 来复制一个节点

```html
<h1>
  h1标题
  <span>子标题</span>
</h1>
<button onclick="handleCloneNode()">克隆节点</button>
<script>
  let h1El = document.querySelector('h1');
  function handleCloneNode() {
    // 如果有子元素需要传入true表示深克隆（含子节点） 否则为浅克隆
    let clEl = h1El.cloneNode(true);
    h1El.after(clEl);
  }
</script>
```

## 替换节点

使用 replaceWith /replaceChild 来将节点替换为新节点

```html
<h1>h1标题</h1>
<div class="parent">
  <h2>h2标题</h2>
</div>
<button onclick="handleReplaceWith()">替换节点replaceWith</button>
<button onclick="handleReplaceChild()">替换系欸但replaceChild</button>
<script>
  let h1El = document.querySelector('h1');
  let h2El = document.querySelector('h2');
  let divEl = document.querySelector('.parent');
  function handleReplaceWith() {
    let h3El = document.createElement('h3');
    h3El.innerText = 'h3标题';
    h1El.replaceWith(h3El);
  }
  function handleReplaceChild() {
    let h4El = document.createElement('h4');
    h4El.innerText = 'h4标题';
    divEl.replaceChild(h4El, h2El);
  }
</script>
```

## 删除节点

remove/removeChild 方法可以将节点或文本删除

```html
<h1>h1标题</h1>
<div>
  <h2>h2标题</h2>
</div>
<button onclick="handleRemove()">删除节点remove</button>
<button onclick="handleRemoveChild()">删除节点removeChild</button>
<script>
  let h1El = document.querySelector('h1');
  let h2El = document.querySelector('h2');
  let divEl = document.querySelector('div');
  function handleRemove() {
    h1El.remove();
  }
  function handleRemoveChild() {
    divEl.removeChild(h2El);
  }
</script>
```
