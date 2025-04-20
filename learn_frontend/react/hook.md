# Hook

[[toc]]

## useEffect

### 什么是 useEffect

useEffect 是一个 React Hook 函数，用于在 React 组件中创建不是由事件引起而是由渲染本身引起的操作（副作用）, 比如发送 AJAX 请求，更改 DOM 等等
::: tip
有点像 Vue 生命周期钩子，就是在组件生命周期的各个阶段添加副作用。所谓的副作用就是做一些主要任务无关其它事情（比如主任务是做组件渲染，而你在组件渲染中做了一些其它操作，比如请求数据那些，这个操作就叫做副作用），其基本语法为`useEffect(()=>{},[])`

1. 参数 1 是一个函数，可以把它叫做副作用函数，在函数内部可以放置要执行的操作
2. 参数 2 是一个数组（可选参），在数组里放置依赖项，不同依赖项会影响第一个参数函数的执行，当是一个空数组的时候，副作用函数只会在组件渲染完毕之后执行一次
   :::

### 副作用函数执行时机

useEffect 副作用函数的执行时机存在多种情况，根据传入依赖项的不同，会有不同的执行表现
| 依赖项 | 副作用函数执行时机 |
|--------------------|----------------------------------------|
| 没有依赖项 | 组件初始渲染 + 组件更新时执行 |
| 空数组依赖 `[]` | 只在初始渲染时执行一次 |
| 添加特定依赖项 | 组件初始渲染 + 特定依赖项变化时执行 |

### 基本使用

接口地址：http://geek.itheima.net/v1_0/channels
::: code-group

```js [没有依赖项] {4-6}
import { useEffect, useState } from "react";
function App() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    console.log("没有依赖项，组件初始渲染 + 组件更新时执行" + count);
  });
  const add = () => {
    setCount(count + 1);
  };
  return (
    <div>
      this is app
      <button onClick={add}>{count}</button>
    </div>
  );
}
```

```js [空数组依赖]{6-13}
import { useEffect, useState } from "react";
// 1.创建一个顶层的上下文
const URL = "http://geek.itheima.net/v1_0/channels";
function App() {
  const [list, setList] = useState([]);
  useEffect(() => {
    async function getList() {
      const res = await fetch(URL);
      const jsonRes = await res.json();
      setList(jsonRes.data.channels);
    }
    getList();
  }, []);
  return (
    <div>
      this is app
      <ul>
        {list.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```

```js [添加特定依赖项] {4-6}
import { useEffect, useState } from "react";
function App() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    console.log("添加特定依赖项，组件初始渲染 + 特性依赖项变化时执行" + count);
  }, [count]);
  const add = () => {
    setCount(count + 1);
  };
  return (
    <div>
      this is app
      <button onClick={add}>{count}</button>
    </div>
  );
}
```

:::

### 清除副作用

在 useEffect 中编写的由渲染本身引起的对接组件外部的操作，社区也经常把它叫做副作用操作，比如在 useEffect 中开启了一个定时器，我们想在组件卸载时把这个定时器再清理掉，这个过程就是清理副作用
<br>
说明：清除副作用的函数最常见的执行时机是在组件卸载时自动执行
<br>
需求：在 Son 组件渲染时开启一个定制器，卸载时清除这个定时器

```js {8-10}
import { useEffect, useState } from "react";
function Son() {
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("定时器执行");
    }, 1000);
    // 组件卸载时的回调,清除副作用
    return () => {
      clearInterval(timer);
    };
  }, []);
  return <div>this is son</div>;
}
function App() {
  const [show, setShow] = useState(true);

  const handleShow = () => {
    setShow(false);
  };
  return (
    <div>
      {show && <Son></Son>}
      <button onClick={handleShow}>卸载组件</button>
    </div>
  );
}
```

## 自定义 Hook

自定义 Hook 是以 use 打头的函数，通过自定义 Hook 函数可以用来实现逻辑的封装和复用

```js{3-13}
import { useEffect, useState } from "react";
// 自定义hook函数
function useToggle() {
  const [value, setValue] = useState(true);

  const handleToggle = () => {
    setValue(!value);
  };
  return {
    value,
    handleToggle,
  };
}
function App() {
  // 使用自定义hook
  const { value, handleToggle } = useToggle();
  return (
    <div>
      {value && <div>this is div</div>}
      <button onClick={handleToggle}>toggle</button>
    </div>
  );
}
```

封装自定义 hook 通用思路总结

1. 声明一个以 use 打头的函数
2. 在函数体内封装可复用的逻辑（只要是可复用的逻辑）
3. 把组件中用到的状态或者回调 return 出去（以对象或者数组）
4. 在哪个组件中要用到这个逻辑，就执行这个函数，解构出来状态和回调进行使用

## React Hooks 使用规则

1. 只能在组件中或者其他自定义 Hook 函数中调用
2. 只能在组件的顶层调用，不能嵌套在 **if、for、其他函数中**
   比如

```js{15-23}
import { useState } from "react";
// 自定义hook函数
function useToggle() {
  const [value, setValue] = useState(true);

  const handleToggle = () => {
    setValue(!value);
  };
  return {
    value,
    handleToggle,
  };
}
function App() {
  // 下面是hook的错误用法
  // 1.不能在if中使用
  if (Math.random() > 0.5) {
    const { value, handleToggle } = useToggle();
  }
  // 2. 不能在for循环中使用
  for (let i = 0; i < 2; i++) {
    const { value, handleToggle } = useToggle();
  }
  return (
    <div>
      {value && <div>this is div</div>}
      <button onClick={handleToggle}>toggle</button>
    </div>
  );
}
```

## 总结 hook

React Hooks 的核心本质就是**逻辑的复用与封装。它们通过将组件中的状态逻辑、副作用逻辑等抽离成可复用的函数**，解决了 Class 组件时代逻辑难以复用、组件嵌套过深（"Wrapper Hell"）等问题
::: Tip
在开发中组件抽象原则为

1. 智能组件负责数据的获取
2. UI 组件负责数据渲染

:::
