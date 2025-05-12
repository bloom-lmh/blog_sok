# DOM 基本操作

[[toc]]

## 查询结点

### 通过 CSS 选择器

所谓的通过 css 选择器查询就是指传入 css 选择器来获取匹配的结点

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

用于检测元素是否含有指定的样式选择器，用于二次过滤元素结点，下面过滤掉所有有 data 属性的 div 元素

```html
<div id="app">
  <div class="bloom lmh" data="myData">bloom</div>
  <div class="bloom">lmh</div>
</div>
<script>
  const nodeList = document.querySelectorAll(`#app .bloom`);
  const filteredNodeList = [...nodeList].filter(node => {
    // 返回不包含data='myData'属性的结点
    return !node.matches(`[data='myData']`);
  });
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

## 遍历结点

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
  Array.from(nodeList, (node, index) => {
    console.log(node.nodeType);
  });
</script>
```

### 展开语法

下面使用点语法转换节点为数组

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

## 创建结点

## 删除结点
