# React 的源码与原理解读（一）：从创建 React 元素出发

## 关于 JSX 的编译

:::tip
JSX 的编译是实现了 jsx 向 ReactElement 的映射的第一步
:::

```js
function App() {
  return (
    <h1 class='test' key='122'>
      Hello World
    </h1>
  );
}
```

对于上面的组件代码，React 会进行编译（不同版本有不同的编译方式）

1. React16：在 React16 版本，React 内部会将 上诉 jsx 代码转换成`createElement` 函数
2. React17：在 React17 之后，React 使用 babel 进行上述的处理，只不过将 `createElement`函数替换为了`jsx`函数。

对于这两个函数的使用有一些不一样

1. `createElement`:第一个参数是类型，第二个是配置项，第三个是子元素
2. `jsx`:第一个参数是类型，第二个是配置项和子元素，第三个是 key。其中 children 项中，若子结构中只有一个子元素，那么 children 就是一个 jsx()，若有多个元素时，则会转为数组

如下所示，这是上面组件代码经过编译后的代码

::: code-group

```js [React16] {3-6}
//function createElement(type, config, children){ }
function App() {
  return React.createElement("h1", {
    class: "test"
    key:"122"
  }, "Hello World");
}

```

```js [React17] {3-10}
//export function jsx(type, config, maybeKey) {}
function App() {
  return jsx(
    'h1',
    {
      class: 'test',
      children: 'Hello World',
    },
    '122',
  );
}
```

原理示意图如下：
:::
![babel编译jsx](https://s3.bmp.ovh/imgs/2025/05/05/f012125961ca95ff.png)

## ReactElement

`createElement` 和 `jsx` 两个函数的最终目的都是创建`ReactElement`，通过打印它我们可以看到其组成成分。React 元素由 type、key、ref、props、\_owner 和 一个标识 React 元素组成，\_store, \_self, \_source 三个内部属性，在开发模式下才会被创建。`ReactElement` 如下所示：

```js
const ReactElement = function(type, key, ref, self, source, owner, props) {
    const element = {
        $$typeof: REACT_ELEMENT_TYPE， //标识
        type: type,                    //元素的类型, 可以为 HTML 元素或 React 组件
        key: key,                      //元素在其同级兄弟中的的身份标志（唯一键值）
        ref: ref,                      //对组件实例的引用
        props: props,                  //组件或 HTML 元素的属性值
        _owner: owner                  //创建该元素的起因
    }
    /** ... 此处省略开发模式的代码 ... */
    return element;
}

```

## 生成 ReactElement 的过程

:::tip 关于\_\_DEV\_\_
在进行源码阅读时需要补充一下关于开发模式和生产模式的知识，因为 React 在源码中大量的使用\_\_DEV\_\_来表示当前项目是处在开发模式还是生成模式。对于开发模式 React 会提供更多的调试支持如： 错误提示、组件栈、严格模式等，而在生成环境 React 会自动优化性能，移除所有开发代码。

React 本身并不会动态“感知”你当前处于开发还是生产环境，而是通过构建工具（如 Webpack、Vite 等）在代码编译阶段提前确定环境，并将这一信息“固化”到 React 代码中。
**本次源码解读采用开发环境的代码**
:::
React 通过`createElement`和`jsx`实现了 ReactElement 元素的创建

### createElement 函数

在 React16.x 之前的时候，创建 ReactElement 的处理过程由 `createElement` 来实现，我们看看源代码如下：

### jsx 函数

在 React17.x 之后的时候，创建 ReactElement 的处理过程由 `jsx[DEV]` 来实现，实现的原理与`createElement`大同小异，我们就简要说一说：

#### 参数解析

**type** ：表示元素类型,可以是 html 类型也可以是 ReactElement 类型

**config**：表示元素属性和内容

```js
type Config = {
  [propName: string]: any, // 所有非保留属性（如 className、style、children 等）
  key?: any, // 如果存在，会被提取到独立参数（但开发环境会警告）
  ref?: any, // 如果存在，会被提取到独立参数
};
```

**maybeKey**：显式传递的 key 当 JSX 元素通过`<Component key="value" />`直接设置 key 时，Babel 或 TypeScript 的 JSX 转换逻辑会将 key 作为第三个参数传递给 jsxDEV。如果 key 既通过展开运算符（如 {...props}）传递，又显式声明（如 `<div {...props} key="Hi" />`），maybeKey 帮助区分优先级，确保显式声明的 key 生效。

```js
const props = { key: 'from-spread' };
// Babel 会将显式 key 作为 maybeKey 参数传递
<div {...props} key='explicit-key' />;
```

maybeKey 值为 "explicit-key"，覆盖 config.key 的 "from-spread"。

**source**：用于开发环境下的调试工具（如 React DevTools），记录 JSX 元素在源码中的位置信息（文件名、行号、列号）。当组件抛出警告或错误时，source 会显示在控制台，帮助开发者快速定位问题代码。

```js
// JSX 编译后的代码（通过 Babel 插件添加 source 参数）
_jsxDEV('div', {}, 'key', {
  fileName: 'App.js',
  lineNumber: 5,
  columnNumber: 10,
});
```

控制台错误会显示：`Warning: Invalid prop value at div (at App.js:5,10)`

**self**：指向当前组件的实例（即 this），用于开发环境下的警告逻辑。当使用字符串 ref（如 `<div ref="myRef" />`）时，React 需要知道当前组件实例，以输出准确的警告信息。比如如下代码：

```js
class MyComponent extends React.Component {
  render() {
    return <div ref='myRef' />; // 字符串 ref
  }
}
```

self 值为 MyComponent 实例，用于警告：`Warning: String refs are deprecated. Convert this string ref to a callback ref.`

```js
if (hasValidRef(config)) {
  ref = config.ref;
  // 检查字符串 ref 并警告（需知道当前组件实例）
  warnIfStringRefCannotBeAutoConverted(config, self);
}
```

#### 代码逻辑解析

比如当你在代码中编写 JSX 时，例如

```js
const props = {
  className='container',
  key:'abc'
}
<div {...props} key='id' ref={divRef}>
  Hello
</div>;
会被解析为;
```

Babel 或 TypeScript 会将其转换为对 jsxDEV 的调用：

```js
jsxDEV(
  'div',
  {
    className: 'container',
    children: 'Hello',
    // key 和 ref 被提取到独立参数中，不在 config 里！
  },
  'id', // maybeKey（显式传递的 key）
  source, // 源码位置
  self, // 当前组件实例
);
```

此时：

​**config 参数**​：包含 className 和 children,但是不包含 key 和 ref
​**key 和 ref**​：被单独提取到其他参数中（maybeKey 和 ref 变量）。
下面为源代码的逻辑：
::: code-group

```js [1.提取key]
// 若显示指定了key，如<componemt key="id">，则编译时会将key作为第三个参数maybeKey传入
if (maybeKey !== undefined) {
  if (__DEV__) {
    // 做key校验
    checkKeyStringCoercion(maybeKey);
  }
  key = '' + maybeKey;
}
// 若没有显示指定key,才会在props中寻找key
if (hasValidKey(config)) {
  if (__DEV__) {
    checkKeyStringCoercion(config.key);
  }
  key = '' + config.key;
}
```

```js [校验key]
function hasValidKey(config) {
  if (__DEV__) {
    if (hasOwnProperty.call(config, 'key')) {
      const getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}
```

```js [2.checkKeyStringCoercion校验]
//checkKeyStringCoercion 是 React 开发环境中的一个内部校验函数，主要目的是确保传递给 JSX 元素的 key 可以被安全地转换为字符串（String Coercion），并在可能引发潜在问题时发出警告。以下是它的具体作用和工作原理：
function checkKeyStringCoercion(value) {
  if (__DEV__) {
    // 检查是否为需要警告的类型
    if (typeof value === 'object' || typeof value === 'function' || typeof value === 'symbol') {
      console.error(
        'Key 类型 "%s" 转换为字符串可能导致不稳定的渲染行为。' +
          '请手动转换为明确字符串（如：key={String(value)}）或使用静态原始值（字符串、数字）。',
        typeof value,
      );
    }
  }
}
// 比如如下的代码;
const data = { id: 1 };
const items = [data];

// 警告：对象转换为字符串 "[object Object]"，所有元素的 key 会冲突！
const renderedList = items.map(item => <div key={item}>{item.id}</div>);
```

```js [提取ref]
// 若指定的ref首先要进行校验
if (hasValidRef(config)) {
  ref = config.ref;
  warnIfStringRefCannotBeAutoConverted(config, self);
}
```

:::

```js
export function jsxDEV(type, config, maybeKey, source, self) {
  if (__DEV__) {
    let propName;
    const props = {};
    let key = null;
    let ref = null;
    // 若显示指定了key，如<componemt key="id">，则编译时会将key作为第三个参数maybeKey传入
    if (maybeKey !== undefined) {
      if (__DEV__) {
        checkKeyStringCoercion(maybeKey);
      }
      key = '' + maybeKey;
    }
    // 若没有显示指定key,才会在props中寻找key
    if (hasValidKey(config)) {
      if (__DEV__) {
        checkKeyStringCoercion(config.key);
      }
      key = '' + config.key;
    }
    // 若
    if (hasValidRef(config)) {
      ref = config.ref;
      warnIfStringRefCannotBeAutoConverted(config, self);
    }

    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }

    // Resolve default props
    if (type && type.defaultProps) {
      const defaultProps = type.defaultProps;
      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    if (key || ref) {
      const displayName =
        typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }
      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }

    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
}
```
