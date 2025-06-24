# vue 简介

## vue 的特点

- 声明式渲染：Vue 基于标准 HTML 拓展了一套模板语法，使得我们可以声明式地描述最终输出的 HTML 和 JavaScript 状态之间的关系。

```html
<div id="app">
  <!-- 声明式的描述出最终输出的 HTML 和 JavaScript 状态之间的关系 -->
  <button @click="count++">Count is: {{ count }}</button>
</div>
```

- 组件化：一个 vue 文件就是一个组件，所谓的组件就是结构、样式、逻辑的封装，可以复用，提高代码的可维护性。

```vue
<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
```

- 响应式：Vue 会自动跟踪 JavaScript 状态并在其发生变化时响应式地更新 DOM。
- 渐进式：Vue 是一个渐进式框架，允许你逐步应用它到你的项目中。
- 单页面应用：Vue 通过路由和状态管理模式实现了单页面应用的功能，即页面的切换不会导致页面的刷新。

## API 风格

### 选项式 API

选项式 API 就是通过选项（配置）的方式来规定这个组件具有哪些状态、逻辑、行为等。组件的状态和逻辑分散，使得代码结构不清晰且组件与状态和逻辑耦合，导致状态和逻辑难以复用

```vue
<script>
export default {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    increment() {
      this.count++;
    },
  },
};
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>
```

### 组合式 API

组合式 API 就是通过函数对状态和逻辑进行封装，让状态和逻辑集中且让状态和逻辑与组件解耦。就类似于 React 的 Hooks。也就是说一个 use 函数就是一个模块，封装了状态和行为。不同组件可以使用这个模块，以此达到状态逻辑复用的目的，这样更加灵活。

比如如下的代码：
::: code-group

```js [定义组合函数]
import { ref } from 'vue';

// 一个函数 = 一个可复用的计数器逻辑
export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  const increment = () => count.value++;
  const decrement = () => count.value--;

  return { count, increment, decrement }; // 暴露状态和方法
}
```

```vue [在组件中使用]
<script setup>
import { useCounter } from './useCounter';

// 直接调用函数获取逻辑
const { count, increment, decrement } = useCounter(10);
</script>

<template>
  <button @click="decrement">-</button>
  <span>{{ count }}</span>
  <button @click="increment">+</button>
</template>
```

:::

### :star: 两者区别

#### 上下文 this 上

- 选项式 API：​ 选项式 API 的核心是组件，因此 this 指向组件实例，可以直接访问组件的状态和方法。
- 组合式 API：​ 组件的状态和逻辑都在函数中， this 指向 undefined（因为 `setup()` 执行时组件实例尚未创建），且在函数作用域中可直接使用响应式变量和函数，无需 this。

#### ​ 代码组织方式上

- 选项式 API：​ 按选项分类，逻辑分散在固定的选项中（如 data、methods、lifecycle hooks），使得代码结构不清晰。并且组件与状态和逻辑耦合，让状态逻辑难以复用。
<div style="display: flex; gap: 10px;">
<img width="50%" src="https://image-bucket-1307756649.cos.ap-chengdu.myqcloud.com/image/options-api1.gif?q-sign-algorithm=sha1&q-ak=AKIDlPGTvnAWsNbVS9V3hBvAFGZu1VMm9btKl_0KdKD-jWdJcuXJ6vIkvcDfgjMBMPsu&q-sign-time=1750647582;1750651182&q-key-time=1750647582;1750651182&q-header-list=host&q-url-param-list=ci-process&q-signature=cfb3beb71d335fad12b11bd4189b01327f7696a1&x-cos-security-token=12bEkZz2UBKct0bH6jtTFMxSAC40Zjqafba9d27dfb382f23284ddd2c5efa21a58QvgLzZz62B1vmy5PaKeEuZPQQmK7c-CkpR3GCYBfx_9dCUPp0YXkZS3fnoS3B0rNrnQVueO75z1kaC-W3UncF7NwpNAlMnRt48c4onc3Ix-CiRLiN0pnOIxzv1WsqZvgWIHmmuH7h4p7lffqkYu4m-M9Wv6gOqxpWm3c6gB35M8qBwEa4NsvzBL17EU83hGCPKjhX3Gh-5WdztpBahA-bBMaK4rumE4u4CgxlqCR-lyf3hZoZoethgdwe8hVaJ3GK43kq91SJPbMLmqiMIm5A&ci-process=originImage">
<img width="50%" src="https://image-bucket-1307756649.cos.ap-chengdu.myqcloud.com/image/options-api2.gif?q-sign-algorithm=sha1&q-ak=AKID4X4530WsOFjNjW2G-MWJ16YskelcKJrp1pE49yE9x4JXIh-lny5YBW6aiQosF5ap&q-sign-time=1750647587;1750651187&q-key-time=1750647587;1750651187&q-header-list=host&q-url-param-list=ci-process&q-signature=cf6efd3d8e31c32ba3d25714bc1ee50eaa3a3141&x-cos-security-token=12bEkZz2UBKct0bH6jtTFMxSAC40Zjqa9c29aff2d8fb74ce2a9e0f9a3ebdb6118QvgLzZz62B1vmy5PaKeEjd2WKEZTu6TBq3Ms7QrhF6RJRvcexFp1GhDCFd9wpxj_iVV5B5-x1hBw_au5k3mZVE4YFFnfPSTpGyTyUl6OIiKnLxxQ1TzMca4lDXatQ4RllAhzHwp-IBNSbKuhAUl47lwdv_KQVfybobaTsd53HXYWSKPxbXRj2jOepIOMzGOJUnRbW9y87_UaFAu0Y0h3-7de4TaUVkllVMTOV5l-ntwMtj_R-OH9qGerM5QHdvL92qLEtjS7Ix-nUCe0Btigw&ci-process=originImage">
</div>

- 组合式 API：​ 将状态和逻辑封装成函数，让状态和逻辑集中（内聚）实现与组件解耦。使得代码结构清晰，方便状态逻辑的复用。

<div style="display: flex; gap: 10px;">
<img width="50%" src="https://image-bucket-1307756649.cos.ap-chengdu.myqcloud.com/image/composite-api2.gif?q-sign-algorithm=sha1&q-ak=AKIDDCCNa_p5HouiKKQ1BO2IP83_OT1jkbVdJk_C8n4f8qyF-4QG93Uz_NZmnPp65nc0&q-sign-time=1750647490;1750651090&q-key-time=1750647490;1750651090&q-header-list=host&q-url-param-list=ci-process&q-signature=043e332430cc1d590861eb431b8373f3c3e7c321&x-cos-security-token=7hpwlvpDMtg7pJfd9ZjF5idJ9totWZ2a3eb9814a50c8bdf035af0f152128bc09v0qYclrgWLxWjspdeLAYU59mh5f91J_b3B_ZfZIgu27_nAupi2e06nw8YE8owZECzplOWvEcqMlZJQOWruZ2TDqC5nHWYb4Z2lXsW9ET92Tw6HiNR7YA-xcWfEnw3ws-ZzxvfSJ2YJ_FFl6t1Zhg6Zs8C4a78hsZHb2zpiD3M4iizNZl8yWKmMTzre3pwYEf-vyi-2U7IX2Bss7RaPd9XkG97t05jAd0QHeZAhPTng7tMMqIUQJq1pArVm6k-hYKpn71uDd0lOnGKnbPanMdiA&ci-process=originImage">
<img width="50%" src="https://image-bucket-1307756649.cos.ap-chengdu.myqcloud.com/image/composite-api1.gif?q-sign-algorithm=sha1&q-ak=AKIDx-KgljdJBBhay7NT5jKaIgrk2rGNz_AxomI7mhUYvHtnF4UcCQtkDiUcscvTpMD5&q-sign-time=1750647641;1750651241&q-key-time=1750647641;1750651241&q-header-list=host&q-url-param-list=ci-process&q-signature=fc7ad3b3ea3a377b34272b3f29885ef9bda7a80a&x-cos-security-token=7hpwlvpDMtg7pJfd9ZjF5idJ9totWZ2aa5010e8d5e683d94685d9120c37e6577v0qYclrgWLxWjspdeLAYU3rVpvnwfG88ZHljIlrSCNkJW_EbxQf1SHfarYn18of34rv3gEPicqOZawtgzNKAf3tZc8-pqObx_mQjv-mUf6YRLK8zk1twNQuulWWF8SAmxh_vD9Txx4AD8VuNJTrqaoEXLQjr2YBlY4IJjuXfisq2ZGgN3QqjzenOR71stPkjmsMRKdUud5Iob1aVDp1RLDIwkQXebV8e5f1QlRAJGeMerrVTUulUI_MV0h6t1Y4IEkVTOXPRBcYOYG1HLj4CnA&ci-process=originImage">
</div>

#### 逻辑复用机制上

- 选项式 API：通过 mixins 复用逻辑，但容易导致命名冲突和数据来源不透明（难以追踪 this.someProperty 来自哪个混入）。
- 组合式 API：通过函数参数和闭包的方式实现状态和逻辑的复用，使得逻辑更加内聚，更容易追踪数据来源。显式调用，依赖关系清晰，无命名冲突。

#### ​TypeScript 支持上

- 选项式 API​：依赖 this，类型推导较困难（需额外配置）。
- 组合式 API​：基于函数和变量，天然支持 TypeScript 类型推断。

#### 生命周期钩子

- 选项式 API：​ 通过选项（如 mounted、created）定义。
- 组合式 API：​ 通过导入的函数（如 onMounted）定义

## 引入 vue

### 使用 npm 安装

使用命令：`npm create vue@latest`

### 使用 CDN

#### 使用全局构建版本

该方式的所有顶层 API 都以属性的形式暴露在了全局的 Vue 对象上

```vue {1}
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
const { createApp, ref } = Vue;

createApp({
  setup() {
    const message = ref('Hello vue!');
    return {
      message,
    };
  },
}).mount('#app');
</script>
```

#### 使用 ES 模块构建版本

现代浏览器大多都已原生支持 ES 模块。因此我们可以像这样通过 CDN 以及原生 ES 模块使用 Vue

```html
<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

  createApp({
    setup() {
      const message = ref('Hello Vue!');
      return {
        message,
      };
    },
  }).mount('#app');
</script>
```

#### 启用 Import maps

Import Maps​ 是浏览器原生支持的模块路径映射机制，允许开发者在不依赖打包工具（如 Webpack、Vite）的情况下，直接在浏览器中使用 ​ES Modules (ESM)​，并通过别名或 CDN 地址动态解析依赖项。

```js
<script type="importmap">
  {
    "imports": {
      // 映射到 CDN
      "vue": "https://unpkg.com/vue@3/dist/vue.esm-browser.js"
        // 映射到本地文件（相对路径）
       "utils": "./src/utils.js",
    }
  }
</script>

<div id="app">{{ message }}</div>

<script type="module">
  import { createApp, ref } from 'vue';

  createApp({
    setup() {
      const message = ref('Hello Vue!');
      return {
        message,
      };
    },
  }).mount('#app');
</script>
```

::: tip 关于为什么要使用 import maps
在传统浏览器 ES Modules (ESM) 中，直接使用 ​ 裸模块说明符 ​（Bare Module Specifiers，如 `import vue from 'vue'`）会报错，因为浏览器无法识别 'vue' 这种非路径的模块标识符。为了解决这个问题，我们需要使用 ​import maps​ 来映射模块标识符到 CDN 地址或本地文件路径。

:::
