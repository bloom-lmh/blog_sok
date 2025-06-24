# vue 应用实例

[[toc]]

## 什么是应用实例

应用实例（App Instance）​​ 是通过 createApp() 创建的 Vue 应用的全局管理者，负责整合所有组件、插件和配置。它是整个 Vue 应用的总控中心，但本身不直接处理视图渲染或业务逻辑，而是通过协调其他模块（如组件、路由、状态管理）来实现功能。比如它能够：

- 全局配置
- 注册全局资源（全局组件、全局指令等）
- 安装插件
- 挂载应用实例
- 管理路由

下面将逐步去学习应用实例

## 什么是根组件

根组件是应用的入口组件，它是应用的根节点，也是所有组件的父组件。通常来说一个应用是由一棵嵌套的、可重用的组件树组成的

```bash
App (root component)
├─ TodoList
│  └─ TodoItem
│     ├─ TodoDeleteButton
│     └─ TodoEditButton
└─ TodoFooter
   ├─ TodoClearButton
   └─ TodoStatistics
```

::: tip 区别组件、模块和应用

- 组件是 vue 应用的基本组成单位（是对样式、模板、逻辑的封装）
- 模块是 vue 的插件、库、扩展等（是对逻辑和功能的封装）
- 应用实例是 vue 应用的总控中心，负责整合组件、模块和配置。

:::

## 创建应用实例-createApp

```js
function createApp(rootComponent: Component, rootProps?: object): App
```

- rootComponent: 根组件，即应用的入口组件
- rootProps: 根组件的 props

示例：

::: code-group

```js [直接内联根组件]
import { createApp } from 'vue';

const app = createApp({
  /* 根组件选项 */
  data() {},
  methods: {},
});
```

```js [从别处导入的组件]
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
```

:::

::: tip 多个应用实例
应用实例并不只限于一个。createApp API 允许你在同一个页面中创建多个共存的 Vue 应用，而且每个应用都拥有自己的用于配置和全局资源的作用域。
:::

## 挂载应用实例-mount

vue 应用实例必须要挂载后才能生效，调用 `.mount()` 方法可以将应用实例渲染到页面上（容器元素自己将不会被视为应用的一部分）。对于每个应用实例，`mount()` 仅能调用一次

`.mount()`方法的参数可以是一个实际的 DOM 元素或一个 CSS 选择器 (使用第一个匹配到的元素)。返回根组件的实例。

```js
interface App {
  mount(rootContainer: Element | string): ComponentPublicInstance;
}
<div id='app'></div>;
app.mount('#app');
```

::: tip 若组件没有模板
如果该组件有模板或定义了渲染函数，它将替换容器内所有现存的 DOM 节点。否则在运行时编译器可用的情况下，容器元素的 innerHTML 将被用作模板。
:::

## 卸载应用实例-unmount

卸载一个已挂载的应用实例。

```js
interface App {
  unmount(): void;
}
```

::: warning 卸载应用的副作用
卸载一个应用会触发该应用组件树内所有组件的卸载生命周期钩子。
:::

## 应用实例卸载时的生命周期钩子-onUnmount()

可以为应用实例注册一个回调函数，在应用卸载时调用。

```js
interface App {
  onUnmount(callback: () => any): void;
}
```

## 注册全局组件-component()

全局组件就是在应用中任何地方都可以使用的组件，可以直接通过 `app.component()` 方法注册。

- 如果同时传递一个组件名字符串及其定义，则注册一个全局组件；
- 如果只传递一个名字，则会返回用该名字注册的组件 (如果存在的话)。

```js
import { createApp } from 'vue';
const app = createApp({});
// 注册一个选项对象
app.component('MyComponent', {
  /* ... */
});
// 得到一个已注册的组件
const MyComponent = app.component('MyComponent');
```

## 注册全局指令-directive()

全局指令是应用中任何地方都可以使用的指令，可以直接通过 `app.directive()` 方法注册。

- 如果同时传递一个名字和一个指令定义，则注册一个全局指令；
- 如果只传递一个名字，则会返回用该名字注册的指令 (如果存在的话)。

```js
interface App {
  directive(name: string): Directive | undefined
  directive(name: string, directive: Directive): this
}
```

示例如下：

```js
import { createApp } from 'vue';

const app = createApp({
  /* ... */
});
// 注册（对象形式的指令）
app.directive('myDirective', {
  /* 自定义指令钩子 */
});
// 注册（函数形式的指令）
app.directive('myDirective', () => {
  /* ... */
});
// 得到一个已注册的指令
const myDirective = app.directive('myDirective');
```

## 注册插件-use()

安装一个插件。若 `app.use()` 对同一个插件多次调用，该插件只会被安装一次。

```js
interface App {
  use(plugin: Plugin, ...options: any[]): this;
}
```

- plugin: 插件对象，可以是对象形式的插件或函数形式的插件
- options: 要传递给插件的选项

::: tip 关于自定义插件
插件可以是一个带 `install()` 方法的对象，亦或直接是一个将被用作 `install()` 方法的函数。插件选项 (`app.use()` 的第二个参数) 将会传递给插件的 `install()` 方法。
:::

## 全局混入-mixin()

应用一个全局 mixin (适用于该应用的范围)。一个全局的 mixin 会作用于应用中的每个组件实例。

::: warning 减少使用 mixin
Mixins 在 Vue 3 支持主要是为了向后兼容，因为生态中有许多库使用到。在新的应用中应尽量避免使用 mixin，特别是全局 mixin。
若要进行逻辑复用，推荐用组合式函数来替代。
:::

## 组件内使用全局注入-provide 和 inject

提供一个值，可以在应用中的所有后代组件中注入使用 **（注意：只在组件树内部使用，不在组件外部使用）**。

```js
interface App {
  provide<T>(key: InjectionKey<T> | symbol | string, value: T): this;
}
```

- key: 注入的 key，可以是一个 InjectionKey 对象、一个 symbol 或一个字符串
- value: 要提供的值
  使用示例

:::code-group

```js [全局提供]
import { createApp } from 'vue';

const app = createApp(/* ... */);

app.provide('message', 'hello');
```

```js [注入]
import { inject } from 'vue';

export default {
  setup() {
    console.log(inject('message')); // 'hello'
  },
};
```

:::

## 组件外使用全局注入 -runWithContext()

前面讲到 Vue 的 provide/inject 默认只能在组件树内部使用（即在组件的 setup() 或模板中）。但是如果要在组件外部使用，可以通过 `runWithContext()` 方法来实现。

```js
// src/utils/厨师.js
import { app } from '../main.js';

export function 做菜() {
  app.runWithContext(() => {
    const 秘方 = inject('家族秘方'); // ✅ 临时获得权限
    console.log('用秘方做菜:', 秘方);
  });
}
```

::: tip 理解 runWithContext
provide 和 inject 就类似于家族内部传递秘密，只能在组件中定义和获取。外部不能直接访问。比如家族秘方：

```js
// 爷爷组件
provide('家族秘方', '祖传酱油配方');

// 孙子组件
const 秘方 = inject('家族秘方'); // ✅ 直接获取
```

但问题来了 ​：如果有一个外人 ​（比如家族雇佣的厨师）想临时用这个秘方，默认情况下他无法直接拿到！
这时就可以使用到 runWithContext 方法了，这方法就像是临时通行证，让外部的工具函数等可以使用到

```js
// 外部厨师（非组件代码）
function 做菜() {
  app.runWithContext(() => {
    const 秘方 = inject('家族秘方'); // ✅ 临时获得权限
    console.log('用秘方做菜:', 秘方);
  });
}
```

:::

## 应用版本-version

提供当前应用所使用的 Vue 版本号。这在插件中很有用，因为可能需要根据不同的 Vue 版本执行不同的逻辑。

```js
interface App {
  version: string;
}
```

在一个插件中对版本作判断：

```js
export default {
  install(app) {
    const version = Number(app.version.split('.')[0]);
    if (version < 3) {
      console.warn('This plugin requires Vue 3');
    }
  },
};
```

## 应用配置-config

每个应用实例都会暴露一个 config 对象，其中包含了对这个应用的配置设定。你可以在挂载应用前更改这些属性 (下面列举了每个属性的对应文档)。
