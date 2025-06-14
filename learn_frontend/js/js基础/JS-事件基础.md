# Js 事件

[[toc]]

## 事件处理程序

### 绑定事件处理程序

#### HTML 绑定

可以在 html 元素上设置事件处理程序，浏览器解析后会绑定到 DOM 属性中

```html
<button onclick="alert(`houdunren.com`)">后盾人</button>
```

往往事件处理程序业务比较复杂，所以绑定方法或函数会很常见,绑定函数或方法时需要加上括号

```html
<button onclick="show()">后盾人</button>
<script>
  function show() {
    alert('houdunren.com');
  }
</script>
```

当然也可以使用方法做为事件处理程序

```html
<input type="text" onkeyup="HD.show()" />
<script>
  class HD {
    static show() {
      console.log('houdunren');
    }
  }
</script>
```

可以传递事件源对象与事件对象

```html
<button onclick="show(this,'houdunren','hdcms','向军大叔',event)">后盾人</button>
<script>
  function show(...args) {
    console.log(args);
  }
</script>
```

#### DOM 绑定

将事件处理程序作为事件目标对象或文档元素的一个属性，缺点就是后面注册的事件处理程序会把前面的事件给覆盖掉
也可以将事件处理程序绑定到 DOM 属性中

- 使用 setAttribute 方法设置事件处理程序无效
- 属性名区分大小写

```html
<div id="app">houdunren.com</div>
<script>
  const app = document.querySelector('#app');
  app.onclick = function () {
    this.style.color = 'red';
  };
</script>
```

无法为事件类型绑定多个事件处理程序，下面绑定了多个事件处理程序，因为属性是相同的所以只有最后一个有效

```html
<div id="app">houdunren.com</div>
<script>
  const app = document.querySelector('#app');
  app.onclick = function () {
    this.style.color = 'red';
  };
  app.onclick = function () {
    this.style.fontSize = '55px';
  };
</script>
```

#### 使用 addEventListener 注册

通过上面的说明我们知道使用 HTML 与 DOM 绑定事件都有缺陷，建议使用新的事件监听绑定方式 addEventListener 操作事件

##### addEventListener 添加事件处理程的特点

- transtionend / DOMContentLoaded 等事件类型只能使用 addEventListener 处理
- 同一事件类型设置多个事件处理程序，按设置的顺序先后执行
- 也可以对未来添加的元素绑定事件

##### addEventListener 方法的参数

使用 addEventListener 方法，每个目标对象都有一个该方法，该方法可以实现为同一个目标同一个事件添加多个事件处理程序，该方法接受三个参数

- 第一个参数为事件类型
- 第二个参数为该事件的处理程序
- 第三个参数为该事件的配置选项，可以只是一个 boolean 值也可以是一个对象

##### 绑定多个事件

使用 addEventListener 来多个事件处理程序

```html
<div id="app">houdunren.com</div>
<script>
  const app = document.querySelector('#app');
  app.addEventListener('click', function () {
    this.style.color = 'red';
  });
  app.addEventListener('click', function () {
    this.style.fontSize = '55px';
  });
</script>
```

##### :star:通过对象绑定

事件处理程序可以是对象，对象的 handleEvent 方法会做为事件处理程序执行。下面将元素的事件统一交由对象处理

```html
<div id="app">houdunren.com</div>
<script>
  const app = document.querySelector('#app');
  class HD {
    handleEvent(e) {
      this[e.type](e);
    }
    click() {
      console.log('单击事件');
    }
    mouseover() {
      console.log('鼠标移动事件');
    }
  }
  app.addEventListener('click', new HD());
  app.addEventListener('mouseover', new HD());
</script>
```

##### 事件选项

addEventListener 的第三个参数为定制的选项，可传递 object 或 boolean 类型
下面是传递对象时的说明

| 选项    | 可选参数   |                                                                                                                            |
| ------- | ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| once    | true/false | 只执行一次事件                                                                                                             |
| capture | true/false | 事件是在捕获/冒泡哪个阶段执行，<br>true: 捕获阶段 false: 冒泡阶段                                                          |
| passive | true/false | 声明事件里不会调用<br>preventDefault()，可以减少系统默认行为的等待。传入了 passive 选项，该选项会导致 preventDefault()无效 |

下面使用 once:true 来指定事件只执行一次

```html
<button id="app">houdunren.com</button>
<script>
  const app = document.querySelector('#app');
  app.addEventListener(
    'click',
    function () {
      alert('houdunren@向军大叔');
    },
    { once: true },
  );
</script>
```

设置 { capture: true } 或直接设置第三个参数为 true 用来在捕获阶段执行事件
addEventListener 的第三个参数传递 true/false 和设置 {capture:true/false}是一样

```html
<div id="app" style="background-color: red">
  <button id="bt">houdunren.com</button>
</div>
<script>
  const app = document.querySelector('#app');
  const bt = document.querySelector('#bt');
  app.addEventListener(
    'click',
    function () {
      alert('这是div事件 ');
    },
    { capture: true },
  );

  bt.addEventListener(
    'click',
    function () {
      alert('这是按钮事件 ');
    },
    { capture: true },
  );
</script>
```

设置 { capture: false } 或直接设置第三个参数为 false 用来在冒泡阶段执行事件

```html
<div id="app" style="background-color: red">
  <button id="bt">houdunren.com</button>
</div>
<script>
  const app = document.querySelector('#app');
  const bt = document.querySelector('#bt');
  app.addEventListener(
    'click',
    function () {
      alert('这是div事件 ');
    },
    { capture: false },
  );

  bt.addEventListener(
    'click',
    function () {
      alert('这是按钮事件 ');
    },
    { capture: false },
  );
</script>
```

### 移除事件处理程序

使用 removeEventListener 删除绑定的事件处理程序

```html
<div id="app">houdunren.com</div>
<button id="hd">删除事件</button>

<script>
  const app = document.querySelector('#app');
  const hd = document.querySelector('#hd');
  function show() {
    console.log('APP我执行了');
  }
  app.addEventListener('click', show);
  hd.addEventListener('click', function () {
    app.removeEventListener('click', show);
  });
</script>
```

### 事件处理程序的返回值

在现代 JavaScript 中，事件处理程序不应该返回值。在比较老的代码中，我们还可以看到返回值的事件处理程序，而且返回的值通常用于告诉浏览器不要执行与事件相关的默认动作。比如，如果一个表单 Submit 按钮的。onclick 处理程序返回 false,浏览器将不会提交表单（通常因为事件处理程序确定用户输入未能通过客户端验证）。

### 事件处理程序的上下文

在通过设置属性注册事件处理程序时，看起来就像为目标对象定义了一个新方法:

```js
target.onclick = function () {
  /* 处理程序的代码 */
};
```

因此，没有意外，这个事件处理程序将作为它所在对象的方法被调用。换句话说，在事件处理程序的函数体中，this 关键字引用的是注册事件处理程序的对象。即便使用 addEventListener()注册，处理程序在被调用时也会以目标作为其 this 值。 不过，这不适用于箭头函数形式的处理程序。 箭头函数中 this 的值始终等于定义它的作用域的 this 值

## 事件对象

执行事件处理程序时，会产生当前事件相关信息的对象，即为事件对象。系统会自动做为参数传递给事件处理程序。

- 大部分浏览器将事件对象保存到 window.event 中
- 有些浏览器会将事件对象做为事件处理程序的参数传递

事件对象常用属性如下：

| 属性           | 说明                                                                         | 补充说明                         |
| -------------- | ---------------------------------------------------------------------------- | -------------------------------- |
| type           | 事件类型（如："click"、"mousedown"等）                                       | 只读属性                         |
| target         | 触发事件的原始目标对象（事件冒泡的起点）                                     | 不会随冒泡过程改变               |
| currentTarget  | 当前正在处理事件的 DOM 元素                                                  | 在事件冒泡过程中会变化           |
| timeStamp      | 事件发生的时间戳（单位：毫秒）                                               | 从页面加载开始计算               |
| x              | 同 clientX，相对视口的 X 坐标                                                | 非标准属性，建议使用 clientX     |
| y              | 同 clientY，相对视口的 Y 坐标                                                | 非标准属性，建议使用 clientY     |
| clientX        | 相对浏览器视口左上角的 X 坐标（不包含滚动距离）                              | 不受页面滚动影响                 |
| clientY        | 相对浏览器视口左上角的 Y 坐标（不包含滚动距离）                              | 不受页面滚动影响                 |
| screenX        | 相对物理屏幕左上角的 X 坐标                                                  | 多显示器环境下可能有负值         |
| screenY        | 相对物理屏幕左上角的 Y 坐标                                                  | 多显示器环境下可能有负值         |
| pageX          | 相对完整文档左上角的 X 坐标（包含滚动距离）                                  | pageX = clientX + window.scrollX |
| pageY          | 相对完整文档左上角的 Y 坐标（包含滚动距离）                                  | pageY = clientY + window.scrollY |
| offsetX        | 相对目标元素 padding edge 的 X 坐标                                          | 受目标元素的 padding 影响        |
| offsetY        | 相对目标元素 padding edge 的 Y 坐标                                          | 受目标元素的 padding 影响        |
| layerX         | 相对最近定位祖先元素的 X 坐标（非标准属性）                                  | 不同浏览器实现可能不同           |
| layerY         | 相对最近定位祖先元素的 Y 坐标（非标准属性）                                  | 不同浏览器实现可能不同           |
| path           | 事件冒泡路径（从 target 到 window 的 DOM 节点数组）                          | 非标准属性，但被广泛支持         |
| composedPath() | 标准方法，返回事件冒泡路径                                                   | 替代 path 的标准方法             |
| altKey         | 事件触发时 Alt 键是否被按下                                                  | 布尔值                           |
| ctrlKey        | 事件触发时 Ctrl 键是否被按下                                                 | 布尔值                           |
| shiftKey       | 事件触发时 Shift 键是否被按下                                                | 布尔值                           |
| metaKey        | 事件触发时 Meta 键是否被按下（Mac 上是 Command 键，Windows 上是 Windows 键） | 布尔值                           |
| button         | 鼠标按键标识（0=左键，1=中键，2=右键）                                       | 仅鼠标事件                       |
| buttons        | 鼠标按键状态（位掩码：1=左键，2=右键，4=中键）                               | 表示所有按键的按下状态           |
| detail         | 点击次数（如：dblclick 事件为 2）                                            | 仅鼠标事件                       |
| relatedTarget  | 相关元素（如：mouseover 时的离开元素，mouseout 时的进入元素）                | 部分鼠标事件可用                 |
| movementX      | 上次事件后鼠标水平移动距离                                                   | 仅 mousemove 事件                |
| movementY      | 上次事件后鼠标垂直移动距离                                                   | 仅 mousemove 事件                |
| pageXOffset    | window.pageXOffset 是 window.scrollX 的别名，表示文档水平滚动距离            | 建议使用 window.scrollX          |
| pageYOffset    | window.pageYOffset 是 window.scrollY 的别名，表示文档垂直滚动距离            | 建议使用 window.scrollY          |

## 事件传播

![事件传播](https://image-bucket-1307756649.cos.ap-chengdu.myqcloud.com/image/20250614151101593.png)

### 事件捕获

事件捕获是由外到内的。在事件捕获阶段，事件会从 DOM 树的最外层开始，依次经过目标节点的各个父节点，并触发父节点上的事件，直至到达事件的目标节点。如下图。
![事件捕获](https://image-bucket-1307756649.cos.ap-chengdu.myqcloud.com/image/eventCapture.gif?q-sign-algorithm=sha1&q-ak=AKIDG7dM7xVvnKcIHUCQ2C4qfUVIvQVkwAyv7hyxjPZgrrbq0ewzwUJ-Ca6VfQynf8l_&q-sign-time=1749885284;1749888884&q-key-time=1749885284;1749888884&q-header-list=host&q-url-param-list=ci-process&q-signature=17ab7943bb2700ec9a7ca81a33754b1dc1330a15&x-cos-security-token=lTfMPcrocYJlOjyrbBZroXXM8MMxi6ya6716f5612464051443a0930bf2937712qiAdGEajRRB4MtwLLjiAYGvihFSTpV5Mb5gWpTjs3I4l7qO3mV3uurBerp7hxDM8EBMyz81bzxbq04yQrdwxd-P3FIQa1iahmy2ZHEHncK9f-3z4pMi-MqjUu-xZJ3Mj1TzrsDID2TTnxjQiYKSpIDZD73ql54hTdOZTts6KaGZRBNjaLn8dp51CFWxxNyk5hUQvU5mSb2eM9dN9o3mLaJlATGZWhe9lFpZjbeLikxQznTIdHYFKTx_L6JZW1t2TNa6Y93qmy8L-zdwR9ESlUw&ci-process=originImage)

```html
<script>
  window.addEventListener(
    'click',
    () => {
      console.log('Window');
    },
    true,
  );

  document.addEventListener(
    'click',
    () => {
      console.log('Document');
    },
    true,
  );

  document.querySelector('#box2').addEventListener(
    'click',
    () => {
      console.log('box2');
    },
    true,
  );

  document.querySelector('#box1').addEventListener(
    'click',
    () => {
      console.log('box1');
    },
    true,
  );

  document.querySelector('a').addEventListener(
    'click',
    () => {
      console.log('Click me');
    },
    true,
  );
</script>
```

### 事件冒泡

标签元素是嵌套的，在一个元素上触发的事件，同时也会向上执行父级元素的事件处理程序，一直到 HTML 标签元素。

- 大部分事件都会冒泡，但像 focus 事件则不会
- event.target 可以在获得事件链中最底层的定义事件的对象
- event.currentTarget == this 即当前执行事件的对象

上面我们说了事件捕获，事件冒泡和事件捕获是完全相反的。事件冒泡是由内到外的，它是从目标节点开始，沿父节点依次向上，并触发父节点上的事件，直至文档根节点，就像水底的气泡一样，会一直向上。如下图。
![事件冒泡](https://image-bucket-1307756649.cos.ap-chengdu.myqcloud.com/image/%E4%BA%8B%E4%BB%B6%E5%86%92%E6%B3%A1.gif?q-sign-algorithm=sha1&q-ak=AKIDc345QVG7rD3kN5CBfYrBWIJO8qN1ysiqHtd1ICUPci40ZABHg8BSOng0SkMxqp2C&q-sign-time=1749885178;1749888778&q-key-time=1749885178;1749888778&q-header-list=host&q-url-param-list=ci-process&q-signature=368122fd4c2d375462facd9a23d10990819eebd5&x-cos-security-token=mbp8HqeLlCbnhPwqfOEPI2fwXdXoJiaac1d51ecc4dd66cb97d9cd60c9642a5b0ItS39C52JXMQfbo706iC_A4R0aLQaa7vZKaMqNyBzbqINdO6IiBAVeagG6JM-3IRi1fXFO_iv2Kp_DUzp_03eATar0S4g9sjDK37U2hA_-j7sDgekFJyihh-O_S-ZuRd2ZdVg8hkYHmLH5xxenvXZoHd9DyFgvvu5G4Br4wJitQNK-WcQwAp-spyCoPUoKe8xr_8qWafC9GobB6VZUHRKPAhOkzMNXO3xjUHKBtVS54ocH-NCqKUpPyaUZGV2V1E6bU1J4NG1Pp4Wnc6WEIaGQ&ci-process=originImage)

```html
<script>
  window.addEventListener(
    'click',
    () => {
      console.log('Window');
    },
    false,
  );

  document.addEventListener(
    'click',
    () => {
      console.log('Document');
    },
    false,
  );

  document.querySelector('#box2').addEventListener(
    'click',
    () => {
      console.log('box2');
    },
    false,
  );

  document.querySelector('#box1').addEventListener(
    'click',
    () => {
      console.log('box1');
    },
    false,
  );

  document.querySelector('a').addEventListener(
    'click',
    () => {
      console.log('Click me');
    },
    false,
  );
</script>
```

::: tip 事件委托
利用事件冒泡可以实现事件委托，即将事件绑定到父元素上，然后由父元素来管理子元素的事件。这样可以减少内存占用，提高性能。
:::

## 事件取消

### 阻止默认行为

JS 中有些对象会设置默认事件处理程序，比如 A 链接在点击时会进行跳转。
一般默认处理程序会在用户定义的处理程序后执行，所以我们可以在我们定义的事件处理中取消默认事件处理程序的执行。

- 使用 onclick 绑定的事件处理程序，return false 可以阻止默认行为
- 推荐使用 event.preventDefault() 阻止默认行为

下面阻止超链接的默认行为

```html
<a href="https://www.houdunren.com">后盾人</a>
<script>
  document.querySelector('a').addEventListener('click', () => {
    event.preventDefault();
    alert(event.target.innerText);
  });
</script>
```

### 阻止事件传播

使用 `event.stopPropagation()` 和 `event.stopImmediatePropagation()` 可以阻止事件冒泡和捕获

| 方法                                   | 作用                                                                 | 区别                                                               | 使用场景                                                           |
| -------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| **`event.stopPropagation()`**          | 阻止事件继续冒泡（或捕获），但不会阻止同一元素上的其他事件监听器执行 | 只阻止事件向上传播（或向下传播），不影响当前元素上其他监听器的执行 | 当需要阻止事件冒泡到父元素，但仍需执行当前元素的其他事件处理逻辑时 |
| **`event.stopImmediatePropagation()`** | 阻止事件继续冒泡（或捕获），并且会阻止同一元素上的其他事件监听器执行 | 不仅阻止事件传播，还会阻止当前元素上后续绑定的所有事件监听器的执行 | 当需要完全阻止事件传播，并且不希望当前元素上其他监听器执行时       |

:::code-group

```javascript [stopPropagation()]
element.addEventListener('click', function (e) {
  console.log('Listener 1');
  e.stopPropagation(); // 阻止事件冒泡，但 Listener 2 仍会执行
});
element.addEventListener('click', function (e) {
  console.log('Listener 2'); // 仍然会执行
});
```

```javascript [stopImmediatePropagation()]
element.addEventListener('click', function (e) {
  console.log('Listener 1');
  e.stopImmediatePropagation(); // 阻止事件冒泡，并且阻止 Listener 2 执行
});
element.addEventListener('click', function (e) {
  console.log('Listener 2'); // 不会执行
});
```

:::

## 事件类型

比如点击事件还是键盘事件还是程序加载完的事件，不同事件有不类型，下面列举了一些常见的事件

### 网页相关事件

| 事件名              | 说明                                                                                        |
| ------------------- | ------------------------------------------------------------------------------------------- |
| window.onload       | 文档解析及外部资源加载后                                                                    |
| DOMContentLoaded    | 文档解析后执行，不需要等待图片/样式文件等外部资源加载，该事件只能通过 addEventListener 设置 |
| window.beforeunload | 文档刷新或关闭时                                                                            |
| window.unload       | 文档卸载时                                                                                  |
| scroll              | 页面滚动时                                                                                  |

### 鼠标事件

| 事件名      | 说明                                                      |
| ----------- | --------------------------------------------------------- |
| click       | 鼠标单击事件，同时触发 mousedown/mouseup                  |
| dblclick    | 鼠标双击事件                                              |
| contextmenu | 点击右键后显示的所在环境的菜单                            |
| mousedown   | 鼠标按下                                                  |
| mouseup     | 鼠标抬起时                                                |
| mousemove   | 鼠标移动时                                                |
| mouseover   | 鼠标移动时                                                |
| mouseout    | 鼠标从元素上离开时                                        |
| mouseenter  | 鼠标移入时触发，不产生冒泡行为                            |
| mouseleave  | 鼠标移出时触发，不产生冒泡行为                            |
| oncopy      | 复制内容时触发                                            |
| scroll      | 元素滚动时，可以为元素设置 overflow:auto;产生滚动条来测试 |

鼠标事件产生的事件对象包含相对应的属性
| 属性 | 说明 |
|------|------|
| which | 执行 mousedown/mouseup 时，显示所按的键 1 左键，2 中键，3 右键 |
| clientX | 相对窗口(可视区) X 坐标 |
| clientY | 相对窗口(可视区) Y 坐标 |
| pageX | 相对于文档的 X 坐标（包含滚动距离） |
| pageY | 相对于文档的 Y 坐标 （包含滚动距离）|
| offsetX | 目标元素内部的 X 坐标 |
| offsetY | 目标元素内部的 Y 坐标 |
| altKey | 是否按了 alt 键 |
| ctrlKey | 是否按了 ctrl 键 |
| shiftKey | 是否按了 shift 键 |
| metaKey | 是否按了媒体键 |
| relatedTarget | mouseover 事件时从哪个元素来的，mouseout 事件时指要移动到的元素。当无来源(在自身上移动)或移动到窗口外时值为 null |

### 键盘事件

针对键盘输入操作的行为有多种事件类型
| 事件名 | 说明 |
|--------|------|
| Keydown | 键盘按下时，一直按键不松开时 keydown 事件会重复触发 |
| keyup | 按键抬起时 |
键盘事件产生的事件对象包含相对应的属性
| 属性 | 说明 |
|------|------|
| keyCode | 返回键盘的 ASCII 字符数字 |
| code | 按键码，字符以 Key 开始，数字以 Digit 开始，特殊字符有专属名字，左右 ALT 键字符不同，不同布局键盘值会不同 |
| key | 按键的字符含义表示，大小写不同，不能区分左右 ALT 等，不同语言操作系统下值会不同 |
| altKey | 是否按了 alt 键 |
| ctrlKey | 是否按了 ctrl 键 |
| shiftKey | 是否按了 shift 键 |
| metaKey | 是否按了媒体键 |

### 表单事件

| 事件类型        | 说明                                                                                                                       |
| --------------- | -------------------------------------------------------------------------------------------------------------------------- |
| focus           | 获取焦点事件                                                                                                               |
| blur            | 失去焦点事件                                                                                                               |
| element.focus() | 让元素强制获取焦点                                                                                                         |
| element.blur()  | 让元素失去焦点                                                                                                             |
| change          | 文本框在内容发生改变并失去焦点时触发，select/checkbox/radio 选项改变时触发事件                                             |
| input           | Input、textarea 或 select 元素的 value 被修改时，会触发 input 事件。而 change 是鼠标离开后或选择一个不同的 option 时触发。 |
| submit          | 提交表单                                                                                                                   |

## 自定义事件

如果一个 JavaScript 对象有 addEventListener 方法，那它就是一个"事件目标" 这意味着该对象也有一个 dispatchEvent()方法。可以通过 CustomEvent 或 Event 构造函数创建自定义事件对象，然后再把它传给 dispatchEvent。

以下是 `CustomEvent` 和 `Event` 的区别对比表格：

| 特性               | `Event`                                   | `CustomEvent`                     |
| ------------------ | ----------------------------------------- | --------------------------------- |
| **用途**           | 创建基础 DOM 事件                         | 创建可携带自定义数据的事件        |
| **是否可携带数据** | ❌ 不能                                   | ✅ 能（通过 `detail` 属性）       |
| **构造函数参数**   | `new Event(type, options)`                | `new CustomEvent(type, options)`  |
| **options 参数**   | `{ bubbles, cancelable }`                 | `{ bubbles, cancelable, detail }` |
| **兼容性**         | 所有现代浏览器                            | 所有现代浏览器                    |
| **事件冒泡**       | 默认不冒泡（需设置 `bubbles: true`）      | 同 `Event`                        |
| **默认行为**       | 默认不可取消（需设置 `cancelable: true`） | 同 `Event`                        |
| **典型使用场景**   | 简单的事件通知                            | 需要传递数据的复杂事件通信        |

:::code-group

```javascript [Event]
// 创建事件
const event = new Event('build', {
  bubbles: true,
  cancelable: true,
});

// 触发事件
element.dispatchEvent(event);
```

```javascript [CustomEvent]
// 创建携带数据的事件
const event = new CustomEvent('build', {
  detail: {
    message: '数据载荷',
    time: new Date(),
  },
  bubbles: true,
  cancelable: true,
});

// 监听事件
element.addEventListener('build', e => {
  console.log(e.detail.message); // "数据载荷"
});

// 触发事件
element.dispatchEvent(event);
```

:::

下面是 cancelable 的使用演示

```js
// 1. 创建可取消的事件
const cancelableEvent = new Event('custom', {
  cancelable: true, // ← 关键配置
});

element.addEventListener('custom', e => {
  e.preventDefault(); // 有效！
  console.log(e.defaultPrevented); // true
});

// 2. 创建不可取消的事件
const nonCancelableEvent = new Event('custom', {
  cancelable: false, // ← 默认值
});

element.addEventListener('custom', e => {
  e.preventDefault(); // 无效！
  console.log(e.defaultPrevented); // false
});
```
