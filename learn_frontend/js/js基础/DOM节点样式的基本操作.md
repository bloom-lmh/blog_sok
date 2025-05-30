# 对 DOM 节点样式的操作

[[toc]]

## 批量设置

### 通过特征来进行设置

```html
<style>
  .bgColor {
    width: 200px;
    height: 200px;
    background-color: blue;
  }
</style>
<div class="box"></div>
<script>
  let oDiv = document.querySelector('.box');
  // 通过特征来设置
  oDiv.className = 'bgColor';
</script>
```

### 通过属性来进行设置

```html
<style>
  .bgColor {
    width: 200px;
    height: 200px;
    background-color: blue;
  }
</style>
<div class="box"></div>
<script>
  let oDiv = document.querySelector('.box');
  // 通过属性来设置
  oDiv.setAttribute('class', 'bgColor');
</script>
```

## classList

如果对类单独进行控制使用 classList 属性操作
| 方法 | 说明 |
| --- | --- |
| node.classList.add | 添加类名 |
| node.classList.remove | 删除类名 |
| node.classList.toggle | 切换类名 |
| node.classList.contains | 类名检测 |

使用 toggle 切换类，即类已经存在时删除，不存在时添加

```html
<style>
  .box {
    width: 200px;
    height: 200px;
    background-color: aquamarine;
  }
  .show {
    width: 100px;
    height: 100px;
  }
</style>
<div class="box"></div>
<script>
  let oDiv = document.querySelector('.box');
  oDiv.addEventListener('click', function () {
    this.classList.toggle('show');
  });
</script>
```

## 设置行样式

### 行样式对象

每个节点都有 style 属性，这个 style 属性是一个对象（CSSStyleDeclaration）。是对元素上的 style 属性的抽象。但是其属性都是驼峰命名法（因为-连字符会被 JavaScript 视为减号）

### 样式属性设置

使用节点的 style 对象来设置行样式
多个单词的属性使用驼峰进行命名

```html
<div id="app" class="d-flex container">bloom</div>
<script>
  let app = document.getElementById('app');
  app.style.backgroundColor = 'red';
  app.style.color = 'yellow';
</script>
```

### 批量设置行样式

使用 cssText 属性可以批量设置行样式，属性名和写 CSS 一样不需要考虑驼峰命名

```html
<div id="app" class="d-flex container">bloom</div>
<script>
  let app = document.getElementById('app');
  app.style.cssText = `background-color:red;color:yellow`;
</script>
```

也可以通过 setAttribute 改变 style 特征来批量设置样式

```html
<div id="app" class="d-flex container">bloom</div>
<script>
  let app = document.getElementById('app');
  app.setAttribute('style', `background-color:red;color:yellow;`);
</script>
```

## 计算样式 getComputedStyle

通过 style 属性获取的 CSSStyleDeclaration 获取的样式仅仅包含元素标签中的 style 中的样式，而不能获取样式表中的样式。所以这时候就需要用到计算样式了。通过 getComputedStyle 方法可以获得包含 style 中样式和样式表中的样式在内的所有样式，并且这个方法调用后也返回的也是 CSSStyleDeclaration 对象。只不过这个对象是只读的，并且还有一个缺陷就是它不能返回简写属性，比如 margin。
使用 window.getComputedStyle 可获取所有应用在元素上的样式属性

- 函数第一个参数为元素
- 第二个参数为伪类

这是计算后的样式属性，所以取得的单位和定义时的可能会有不同

```html
<style>
  .box {
    width: 200px;
    height: 200px;
    background-color: aquamarine;
  }
</style>
<div class="box"></div>
<script>
  let oDiv = document.querySelector('.box');
  // 通过计算样式来获取style和css样式表的样式
  let widthValue = window.getComputedStyle(oDiv).width;
  console.log(widthValue);
</script>
```

## 操作样式表

除了上面介绍的通过 class 和 style 来操作样式以外，还可以通过操作 style 标签和 link 标签来操作样式，比如下面实现了对主题的切换

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style id="theme">
      body {
        width: 100vw;
        height: 100vh;
        background-color: black;
      }
    </style>
  </head>
  <body>
    <button onclick="changeTheme()">切换主题</button>
    <script>
      let st = document.querySelector('#theme');
      function changeTheme() {
        st.disabled = !st.disabled;
      }
    </script>
  </body>
</html>
```

## CSS 动画与事件

使用 JavaScript 还可以通过为元素添加移除 class 来完成过渡或事件。并且动画和过渡都有对应的事件派发，可以通过它们来获取事件对象进而完成更多的操作

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .transparent {
        opacity: 0;
      }
      .fadeable {
        transition: opacity 0.5s ease-in;
      }
      #box {
        width: 100px;
        height: 300px;
        background-color: aquamarine;
      }
    </style>
  </head>
  <body>
    <div id="box" class="fadeable"></div>
    <button onclick="change()">显隐</button>
    <script>
      let box = document.querySelector('#box');
      function change() {
        box.classList.toggle('transparent');
      }
      box.addEventListener('transitionstart', TransitionEvent => {
        console.log(TransitionEvent);
        console.log('动画开始了');
      });
      box.addEventListener('transitionend', () => {
        console.log('动画结束了');
      });
    </script>
  </body>
</html>
```
