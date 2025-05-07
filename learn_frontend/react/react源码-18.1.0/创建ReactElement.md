# ReactElement 的创建

[[toc]]

## 关于 jsx 编译

JSX 的编译是实现了 JSX 向 ReactElement 的映射的第一步，其编译前后代码如下：
::: code-group

```js [原生jsx代码] {2-6}
function App() {
  return (
    <h1 class='test' key='122'>
      Hello World
    </h1>
  );
}
```

```js [Babel编译后] {2-9}
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

示意图如下：
:::
![babel编译jsx](https://s3.bmp.ovh/imgs/2025/05/05/f012125961ca95ff.png)

:::tip

在 React16 版本，React 内部会将 上诉 jsx 代码转换成`createElement` 函数而在 React17 之后，React 使用 babel 进行上述的处理，只不过将 `createElement`函数替换为了`jsx`函数。

:::

## 关于 ReactElement

ReactElement 是通过 JSX 转换生成的轻量级 JavaScript 对象，用于描述屏幕上应该渲染的内容。其结构与工厂函数如下如下：
::: code-group

```js [结构示例]
{
  $$typeof: Symbol("react.element"), // 唯一标识 React 元素
  type: 'div',                     // 元素类型（字符串、组件、Fragment 等）
  key: null,                       // 唯一标识符，优化列表渲染
  ref: null,                       // 用于引用真实 DOM 或组件实例
  props: {                         // 属性及子元素
    children: 'Hello',
    className: 'container'
  },
  _owner: null,                    // 创建此元素的组件（开发环境调试用）
  _store: {}                       // 内部状态存储
}
```

```js [ReactElement工厂函数]
const ReactElement = function (type, key, ref, self, source, owner, props) {
  const element = {
    // 唯一表示React元素，通常为symbol类型，symbol类型无法序列化，可有效防止xss攻击
    $$typeof: Symbol.for('react.element'),

    // jsx元素向ReactElement映射的属性，对于参数后续会进行讲解
    type: type,
    key: key,
    ref: ref,
    props: props,

    // 指向创建该元素的组件，用于调试和错误追踪
    _owner: owner,
  };
  // 开发模式下的代码...
  return element;
};
```

:::
:::tip 关于 Symbol
Symbol 是 js 的基本数据类型之一，获取一个 Symbol 值，需要调用 Symbol()函数。这个函数永远不会返回相同的值，即使每次传入的参数都一样。这意味着可以将调用 Symbol()取得的符号值安全地用于为对象添加新属性，而无须担心可能重写已有的同名属性。
:::

### :star: $$typeof

1. 唯一标识 React 元素 ​：`\$\$typeof` 是一个内部标记，用于验证对象是否为合法的 React 元素。它的值通常是 `Symbol.for('react.element')`（或旧版 React 中的特定数字），确保只有通过 React.createElement 或 JSX 创建的对象才会被 React 识别为有效元素。
2. 防止 XSS 攻击：**由于 JSON 无法序列化 Symbol**，如果攻击者尝试注入类似 `{type: 'div', props: {dangerouslySetInnerHTML: {\_\_html: '恶意代码'}}}` 的伪元素，React 会因缺少正确的 $$typeof 属性而拒绝渲染，从而避免执行恶意内容。

::: code-group

```js [合法React元素]
const element = {
  $$typeof: Symbol.for('react.element'), // 或特定数字（如0xeac7）
  type: 'div',
  props: { children: 'Hello' },
  // ...
};
```

```js [非法对象（缺少$$typeof）]
const fakeElement = {
  type: 'div',
  props: { dangerouslySetInnerHTML: { __html: '<script>恶意代码</script>' } },
};
// React会忽略此对象，不会渲染其中的HTML内容。
```

:::
:::tip xss 攻击简介
XSS（Cross-Site Scripting）​​ 是一种通过将恶意脚本注入到可信网页中，利用用户浏览器执行这些脚本的攻击方式。攻击者可窃取用户数据、劫持会话或破坏页面功能。
:::

### \_owner

1. 记录创建者 ​：\_owner 指向创建该元素的组件（通常是当前正在渲染的 Fiber 节点或组件实例）。这一信息在开发阶段用于调试和错误追踪。
2. 错误堆栈追踪 ​：当组件抛出错误时，React 可以通过 \_owner 生成包含组件调用链的错误信息，帮助开发者定位问题根源。
3. 开发者工具支持 ​：React DevTools 使用 \_owner 属性展示组件树结构，并高亮更新来源。

比如在开发环境中，如果组件 MyComponent 渲染时报错：

```js
function MyComponent() {
  // 抛出错误的代码
  throw new Error('示例错误');
}

// 渲染时：
<MyComponent />;

// React会生成类似以下错误信息：
// Error: 示例错误
//    at MyComponent (MyComponent.js:2)
//    at div (由 MyComponent 创建)
//    at App (App.js:5)
```

## jsx 函数源码解析

### jsx 函数简介

jsx 函数用于提取 jsx 的信息并创建 ReactElement 元素，其在创建前需要进行参数校验等前置操作。
与 ReactElement 工厂函数不同，ReactElement 工厂函数只负责创建 React，而无关乎逻辑和参数校验
:::tip \_\_DEV\_\_
在进行源码阅读时需要补充一下关于开发模式和生产模式的知识，因为 React 在源码中大量的使用\_\_DEV\_\_来表示当前项目是处在开发模式还是生成模式。对于开发模式 React 会提供更多的调试支持如： 错误提示、组件栈、严格模式等，而在生成环境 React 会自动优化性能，移除所有开发代码。

React 本身并不会动态“感知”你当前处于开发还是生产环境，而是通过构建工具（如 Webpack、Vite 等）在代码编译阶段提前确定环境，并将这一信息“固化”到 React 代码中。
:::

### jsx 函数参数详解

`function jsxDEV(type, config, maybeKey, source, self) {}`
| 参数名 | 类型 | 描述 | 是否可选 | 示例/备注 | 功能 |
| :--------- | :-------------------- | :-------------------------------------------------------------------- | :------: | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `type` | `string` / `Function` | JSX 元素的类型（DOM 标签名或 React 组件） | **必填** | `'div'`、`MyComponent` | 决定元素的渲染行为：DOM 元素直接创建节点，组件则触发其 render 逻辑。 |
| `config` | `Object` | 元素的属性集合（已过滤 `key` 和 `ref`） | **必填** | `{ children: 'Hello', className: 'container' }` | 包含除 key 和 ref 外的所有 props（React 内部会提取这两个属性）。开发模式下会校验 props 的合法性（如禁止非法属性名）。 |
| `maybeKey` | `string` | 元素的 `key`，用于列表渲染优化 | 可选 | 显式传递时：`"list-item-1"`<br>未传递时：`undefined` | 仅在列表渲染（如 Array.map）时显式传递，用于 React 的 Diffing 算法优化，**每个元素的 key 应该是稳定的唯一的字符串**。未设置时值为 undefined，不会出现在元素属性中。 |
| `source` | `Object` | **开发环境专用**，记录元素定义的源码位置信息（文件名、行号、列号） | **必填** | `{ fileName: 'App.js', lineNumber: 5, columnNumber: 10 }` | 由 Babel 或 JSX 转换工具自动注入，帮助开发者定位元素定义位置。生产环境下会被移除，避免代码臃肿。 |
| `self` | `ReactComponent` | **开发环境专用**，指向创建此元素的组件实例或 Fiber 节点，用于调试追踪 | **必填** | 在 `<MyComponent>` 内部渲染时，指向 `MyComponent` 实例或对应 Fiber 节点 | 在 Fiber 架构中，self 通常指向创建该元素的 Fiber 节点。用于开发工具（如 React DevTools）展示组件层级关系。 |

比如下面的代码：
::: code-group

```js [源码]
// 源码位置：src/App.js 第 5 行
<MyComponent key='item-1' className='box'>
  Hello
</MyComponent>
```

```js [babel转义后]
jsxDEV(
  MyComponent, // type
  { className: 'box', children: 'Hello' }, // config（已过滤 key）
  'item-1', // maybeKey
  { fileName: 'src/App.js', lineNumber: 5, columnNumber: 10 }, // source
  MyComponentInstance, // self（当前组件实例）
);
```

:::
:::tip 补充关于 config.key 和 显示 key

| 场景                        | maybeKey 值     | config.key 值    | 最终 key        | 说明                                                           |
| --------------------------- | --------------- | ---------------- | --------------- | -------------------------------------------------------------- |
| ​**显式传递**​              | `"explicitKey"` | 不存在           | `"explicitKey"` | 显式传递 `key` 时，`config.key` 被过滤，最终使用显式值。       |
| ​**通过 config 传递**​      | `undefined`     | `"fromConfig"`   | `"fromConfig"`  | ​**仅在生产环境生效**​！开发模式下会忽略 `config.key` 并警告。 |
| ​**显式 key + config.key**​ | `"explicitKey"` | 不存在（被过滤） | `"explicitKey"` | 显式 `key` 优先级最高，`config.key` 直接被过滤。               |

:::

### checkKeyStringCoercion 校验函数

checkKeyStringCoercion 是为了确保 key 为稳定唯一的字符串而设立的函数，其作用如下：

1. 防止不稳定的 Key​：当 key 值可能被隐式转换为不唯一的字符串时（如对象、函数等），确保开发者意识到这可能导致渲染异常或性能问题。
2. 避免隐式转换陷阱 ​：通过显式提示开发者应手动将非原始类型的 key 转换为稳定字符串（如使用 String(key) 或唯一标识）。

checkKeyStringCoercion 校验函数的源码如下:

```js
function checkKeyStringCoercion(key) {
  if (__DEV__) {
    if (typeof key === 'function' || typeof key === 'object' || typeof key === 'symbol') {
      console.error(
        'Key 类型 "%s" 转换为字符串可能导致不稳定的渲染行为。' +
          '请手动转换为明确字符串（如：key={String(value)}）或使用静态原始值（字符串、数字）。',
        typeof value,
      );
    }
  }
}
```

比如如下的代码

```js
const data = { id: 1 };
const items = [data];

// 警告：对象转换为字符串 "[object Object]"，所有元素的 key 会冲突！
const renderedList = items.map(item => <div key={item}>{item.id}</div>);
```

会导致控制台输出`Warning: Key 类型 "object" 转换为字符串可能导致不稳定的渲染行为。`

### hasValidKey/Ref 校验函数

hasValidKey 是 React 内部用于检查 config 对象中是否有 key 属性
hasValidRef 是 React 内部用于检查 config 对象中是否有 Ref 属性
其源代码如下:
::: code-group

```js [hasValidKey]
/**
 * 校验key是否合法
 * @function
 * @param  config 配置对象
 * @description 当key是通过config传递时，会触发ReactWarning导致key无效
 */
function hasValidKey(config) {
  if (__DEV__) {
    // 判断config是否包含key（非继承）
    if (hasOwnProperty.call(config, 'key')) {
      // 获取config中key的属性描述符中的getter方法
      const getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      // 检查是否为 React 的警告性 getter
      if (getter && getter.isReactWarning) {
        // 判定 key 无效
        return false;
      }
    }
  }
  return config.key !== undefined;
}
```

```js [hasValidRef]
// 和hasValidKey逻辑一致
function hasValidRef(config) {
  if (__DEV__) {
    if (hasOwnProperty.call(config, 'ref')) {
      const getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}
```

:::
在开发模式下 props 中不允许有 key 和 ref 属性，若存在则警告和舍弃，在生产环境下可以有 props 但当且仅当没有显示指定 key 和 ref

### warnIfStringRefCannotBeAutoConverted 函数

**React 废弃了字符串 ref​（如 `<div ref="myRef" />`），但为了帮助开发者迁移旧代码，React 试图自动将字符串 ref 转换为等效的箭头函数 ref，但是在开发模式下，当字符串 ref 转换不了为箭头函数 ref 的时候会爆出警告信息，这个函数就是检测是否能够将字符串 ref 转换为箭头函数的代码**

那么在什么情况下不能进行转换呢？如下所示：

1. 组件实例不匹配：self（实际接收 ref 的 DOM 元素或子组件实例）与 ReactCurrentOwner.current.stateNode（当前负责渲染的父组件实例）​ 不一致。
2. 作用域问题：自动生成的箭头函数需要访问父组件的 this，但如果 ref 的目标 (self) 属于其他组件（例如高阶组件包裹的子组件），此时 this 指向的父组件实例和 self 的实例不匹配，导致 ref 无法正确绑定。

假设有一个高阶组件（HOC）包裹的组件：

```js
// 高阶组件
function withExample(WrappedComponent) {
  return class extends React.Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

// 子组件（使用字符串 ref）
class Child extends React.Component {
  render() {
    return <div ref='myRef' />;
  }
}

// 使用 HOC 包裹
const WrappedChild = withExample(Child);
```

当渲染 WrappedChild 时：

- ​**self**​ 是 Child 组件内部的 `<div>` 元素。
- **ReactCurrentOwner.current.stateNode**​ 是 HOC 的实例（withExample 组件的实例）。

此时 React 尝试将字符串 ref 转换为：`<div ref={(node) => (this.myRef = node)} />`
但这里的 this 指向的是 HOC 的实例，而 node 实际是 Child 组件的 `<div>` 元素。如果开发者在 HOC 中访问 this.myRef，预期得到的是子组件的 DOM 元素，但由于作用域问题，这种隐式绑定会失败或产生意外行为

:::tip 补充高阶函数的知识
高阶函数就是返回函数的函数，高阶组件就是返回组件的组件
:::

### 收集合并属性

在 jsx 中有收集和合并属性的代码，如下所示：
::: code-group

```js [收集传递属性]
for (propName in config) {
  // 属性为非继承且不属于保留属性,则推入props中作为元素的属性
  if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
    props[propName] = config[propName];
  }
}
```

```js [合并默认属性]
if (type && type.defaultProps) {
  for (propName in type.defaultProps) {
    // 默认属性优先级小于传递属性
    if (props[propName] === undefined) {
      props[propName] = defaultProps[propName];
    }
  }
}
```

:::

之所以要合并默认属性是因为如果组件中没有传递对应的属性，就会启用默认属性，比如如下所示：

```js
function Button(props) {
  return <button>{props.text}</button>;
}

Button.defaultProps = {
  text: 'Click me', // 默认值
  color: 'blue', // 默认值
};
<Button color='red' />;
```

这个时候没有显示的传递 text 属性，则 props 会采用默认的属性最终 props 为 `{ text: "Click me", color: "red" }`。

### 防止误用保留属性-设置警告性 Getter

下面的代码会防止误用保留属性 key 和 ref
::: code-group

```js [定义key属性的警告getter]
/**
 * 定义key属性的警告getter
 * @param {*} props props对象
 * @param {*} displayName 组件名
 */
function defineKeyPropWarningGetter(props, displayName) {
  if (__DEV__) {
    // 定义警告getter
    const warnAboutAccessingKey = function () {
      console.error(
        '%s: `key` is not a prop. Trying to access it will result ' +
          'in `undefined` being returned. If you need to access the same ' +
          'value within the child component, you should pass it as a different ' +
          'prop. (https://reactjs.org/link/special-props)',
        displayName,
      );
    };
    // 标记getter为警告getter
    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true,
    });
  }
}
```

```js [定义ref属性的警告getter]
/**
 * 定义ref属性的警告getter
 * @param {*} props props对象
 * @param {*} displayName 组件名
 */
function defineRefPropWarningGetter(props, displayName) {
  if (__DEV__) {
    const warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;
        console.error(
          '%s: `ref` is not a prop. Trying to access it will result ' +
            'in `undefined` being returned. If you need to access the same ' +
            'value within the child component, you should pass it as a different ' +
            'prop. (https://reactjs.org/link/special-props)',
          displayName,
        );
      }
    };
    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true,
    });
  }
}
```

:::
比如,当在开发模式下通过 props 获取 key 或 ref 时就会触发警告

```js
// 子组件（错误地尝试访问 props.key 或 props.ref）
function MyComponent(props) {
  console.log(props.key); // ❌ 触发 defineKeyPropWarningGetter 的警告
  console.log(props.ref); // ❌ 触发 defineRefPropWarningGetter 的警告
  return <div>Hello</div>;
}

// 父组件使用 MyComponent
function Parent() {
  return <MyComponent key='1' ref={myRef} />;
}
```

### ReactCurrentOwner

ReactCurrentOwner 是 React 内部用于追踪 ​ 当前正在处理的组件（即“所有者组件”）​​ 的机制，属于 React 核心实现的一部分。以下是详细解释：

1. ReactCurrentOwner 的作用
   - 核心职责：在组件树渲染过程中，React 需要知道 ​ 当前正在处理哪个组件 ​（即“谁”触发了渲染或副作用），ReactCurrentOwner 是一个全局引用，指向这个“当前所有者组件”。
   - 数据结构：通常是一个对象，包含 current 属性，指向当前组件的 ​Fiber 节点 ​（React 内部表示组件的数据结构）。

工作原理如下（伪代码）
在 React 的渲染过程中，每当开始处理一个组件时，会更新 ReactCurrentOwner.current 为该组件的 Fiber 节点，处理完成后重置为 null 或上一个所有者。

```js
// 伪代码：渲染组件时的逻辑
function renderComponent(fiber) {
  const previousOwner = ReactCurrentOwner.current;
  ReactCurrentOwner.current = fiber; // 设置当前所有者
  try {
    // 执行组件渲染...
  } finally {
    ReactCurrentOwner.current = previousOwner; // 恢复上一个所有者
  }
}
```

## 完整 jsx 源码

```js
const ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
/**
 * ReactElement 工厂函数
 */
const ReactElement = function (type, key, ref, self, source, owner, props) {
  const element = {
    // 唯一表示React元素，通常为symbol类型，symbol类型无法序列化，可有效防止xss攻击
    $$typeof: Symbol.for('react.element'),

    // jsx元素向ReactElement映射的属性，对于参数后续会进行讲解
    type: type,
    key: key,
    ref: ref,
    props: props,

    // 指向创建该元素的组件，用于调试和错误追踪
    _owner: owner,
  };
  // 开发模式下的代码...
  return element;
};

// 模拟环境变量为开发环境，实际由你的项目来决定是开发环境还是生产环境
const __DEV__ = true;
/**
 * 严格key字符串校验
 * @function
 * @param  key
 * @description 用于确保key为稳定字符串
 */
function checkKeyStringCoercion(key) {
  if (__DEV__) {
    if (typeof key === 'function' || typeof key === 'object' || typeof key === 'symbol') {
      console.error(
        'Key 类型 "%s" 转换为字符串可能导致不稳定的渲染行为。' +
          '请手动转换为明确字符串（如：key={String(value)}）或使用静态原始值（字符串、数字）。',
        typeof value,
      );
    }
  }
}

/**
 * 校验key是否合法
 * @function
 * @param  config 配置对象
 * @description 当key是通过config传递时，会触发ReactWarning导致key无效
 */
function hasValidKey(config) {
  if (__DEV__) {
    // 判断config是否包含key（非继承）
    if (hasOwnProperty.call(config, 'key')) {
      // 获取config中key的属性描述符中的getter方法
      const getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      // 检查是否为 React 的警告性 getter
      if (getter && getter.isReactWarning) {
        // 判定 key 无效
        return false;
      }
    }
  }
  return config.key !== undefined;
}
function hasValidRef(config) {
  if (__DEV__) {
    // config中存在非
    if (hasOwnProperty.call(config, 'ref')) {
      const getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      // 若是react警告getter则返回
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}
/**
 * 定义key属性的警告getter
 * @param {*} props props对象
 * @param {*} displayName 组件名
 */
function defineKeyPropWarningGetter(props, displayName) {
  if (__DEV__) {
    // 定义警告getter
    const warnAboutAccessingKey = function () {
      console.error(
        '%s: `key` is not a prop. Trying to access it will result ' +
          'in `undefined` being returned. If you need to access the same ' +
          'value within the child component, you should pass it as a different ' +
          'prop. (https://reactjs.org/link/special-props)',
        displayName,
      );
    };
    // 标记getter为警告getter
    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true,
    });
  }
}
/**
 * 定义ref属性的警告getter
 * @param {*} props props对象
 * @param {*} displayName 组件名
 */
function defineRefPropWarningGetter(props, displayName) {
  if (__DEV__) {
    const warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;
        console.error(
          '%s: `ref` is not a prop. Trying to access it will result ' +
            'in `undefined` being returned. If you need to access the same ' +
            'value within the child component, you should pass it as a different ' +
            'prop. (https://reactjs.org/link/special-props)',
          displayName,
        );
      }
    };
    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true,
    });
  }
}
// 保留属性
const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};
/**
 * @name jsxDEV
 * @function
 * @param {*} type 元素的类型
 * @param {undefined}
 * @description
 */
export function jsxDEV(type, config, maybeKey, self, source, owner, props) {
  let propName;
  // 收集属性，除了key和ref使用单独的变量来进行接受
  const props = {};
  let key = null;
  let ref = null;
  // 显示传递key
  if (maybeKey !== undefined) {
    if (__DEV__) {
      // key必须是稳定唯一的字符串
      checkKeyStringCoercion(maybeKey);
    }
    key = '' + maybeKey;
  }
  // 通过config传递的key，开发模式下会警告并丢弃
  if (hasValidKey(config)) {
    if (__DEV__) {
      checkKeyStringCoercion(config.key);
    }
    key = '' + config.key;
  }
  // 校验ref，ref也不允许直接通过config传递
  if (hasValidRef(config)) {
    ref = config.ref;
    // 不可转换为箭头函数警告
  }
  // 收集传递属性
  for (propName in config) {
    // 属性为非继承且不属于保留属性,则推入props中作为元素的属性
    if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
      props[propName] = config[propName];
    }
  }
  // 合并默认属性
  if (type && type.defaultProps) {
    for (propName in type.defaultProps) {
      // 默认属性优先级小于传递属性
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  // 防止误用保留属性
  if (ref || key) {
    // 获取组件名称
    const displayName =
      typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
    // 为props的key添加警告getter
    if (key) {
      defineKeyPropWarningGetter(props, displayName);
    }
    if (ref) {
      defineRefPropWarningGetter(props, displayName);
    }
  }

  // 调用工厂函数创建ReactElement
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}
```

## 总结

jsx 函数实现了 jsx 到 ReactElement 的映射
