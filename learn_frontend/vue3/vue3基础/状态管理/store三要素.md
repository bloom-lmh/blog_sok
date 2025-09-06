# store 三要素

[[toc]]

## state

### 定义 state

在大多数情况下，`state` 都是你的 `store` 的核心。人们通常会先定义能代表他们 `APP` 的 `state`。在 `Pinia` 中，`state` 被定义为一个返回初始状态的函数。这使得 `Pinia` 可以同时支持服务端和客户端。

```ts
import { defineStore } from 'pinia';

const useStore = defineStore('storeId', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断出它们的类型
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true,
    };
  },
});
```

::: tip Vue2 种添加新属性
如果你使用的是 `Vue 2`，你在 state 中创建的数据与 Vue 实例中的 data 遵循同样的规则，即 state 对象必须是清晰的，当你想向其添加新属性时，你需要调用 `Vue.set()`
:::

### state 类型定义

你并不需要做太多努力就能使你的 `state` 兼容 TS。确保启用了 `strict`，或者至少启用了 `noImplicitThis`，`Pinia` 将自动推断您的状态类型！ 但是，在某些情况下，您应该帮助它进行一些转换：

```typescript
const useStore = defineStore('storeId', {
  state: () => {
    return {
      // 用于初始化空列表
      userList: [] as UserInfo[],
      // 用于尚未加载的数据
      user: null as UserInfo | null,
    };
  },
});

interface UserInfo {
  name: string;
  age: number;
}
```

如果你愿意，你可以用一个接口定义 state，并添加 `state()` 的返回值的类型。

```ts
interface State {
  userList: UserInfo[];
  user: UserInfo | null;
}

const useStore = defineStore('storeId', {
  state: (): State => {
    return {
      userList: [],
      user: null,
    };
  },
});

interface UserInfo {
  name: string;
  age: number;
}
```

### 访问 state

#### 组合式 API 用法

默认情况下，你可以通过 store 实例访问 state，直接对其进行读写

```ts
const store = useStore();
store.count++;
```

注意，新的属性如果没有在 `state()` 中被定义，则不能被添加。它必须包含初始状态。例如：如果 `secondCount` 没有在 state() 中定义，我们无法执行 `store.secondCount = 2`。

#### 选项式 API 用法

1. 映射为只读计算属性:如果你不能使用组合式 API，但你可以使用 `computed`，`methods`，...，那你可以使用 `mapState()` 辅助函数将 state 属性映射为只读的计算属性：

```ts
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // 可以访问组件中的 this.count
    // 与从 store.count 中读取的数据相同
    ...mapState(useCounterStore, ['count'])
    // 与上述相同，但将其注册为 this.myOwnName
    ...mapState(useCounterStore, {
      myOwnName: 'count',
      // 你也可以写一个函数来获得对 store 的访问权
      double: store => store.count * 2,
      // 它可以访问 `this`，但它没有标注类型...
      magicValue(store) {
        return store.someGetter + this.count + this.double
      },
    }),
  },
}
```

2. 映射为可变属性：如果你想修改这些 state 属性 (例如，如果你有一个表单)，你可以使用 `mapWritableState()` 作为代替。但注意你不能像 `mapState()` 那样传递一个函数：

```ts
import { mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // 可以访问组件中的 this.count，并允许设置它。
    // this.count++
    // 与从 store.count 中读取的数据相同
    ...mapWritableState(useCounterStore, ['count'])
    // 与上述相同，但将其注册为 this.myOwnName
    ...mapWritableState(useCounterStore, {
      myOwnName: 'count',
    }),
  },
}
```

### 重置 state

使用选项式 API 时，你可以通过调用 store 的 `$reset()` 方法将 state 重置为初始值。

```ts
const store = useStore();
store.$reset();
```

在 `$reset()` 内部，会调用 `state()` 函数来创建一个新的状态对象，并用它替换当前状态
在 `Setup Stores` 中，您需要创建自己的 `$reset()` 方法：

```ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0);

  function $reset() {
    count.value = 0;
  }

  return { count, $reset };
});
```

### 变更 state

#### 单个变更

```ts
const store = useStore();
store.count++;
```

#### 批量变更的两个方式

除了用 `store.count++` 直接改变 store，你还可以调用 `$patch` 方法。它允许你用一个 state 的补丁对象在同一时间更改多个属性：

```ts
store.$patch({
  count: store.count + 1,
  age: 120,
  name: 'DIO',
});
```

不过，用这种语法的话，有些变更真的很难实现或者很耗时：任何集合的修改（例如，向数组中添加、移除一个元素或是做 `splice` 操作）都需要你创建一个新的集合。因此，$patch 方法也接受一个函数来组合这种难以用补丁对象实现的变更。

```ts
store.$patch(state => {
  state.items.push({ name: 'shoes', quantity: 1 });
  state.hasChanged = true;
});
```

两种变更 store 方法的主要区别是，$patch() 允许你将多个变更归入 `devtools` 的同一个条目中。同时请注意，直接修改 `state`，`$patch()`也会出现在`devtools`中，而且可以进行`time travel` (在 Vue 3 中还没有)。

### 替换 state

你不能完全替换掉 store 的 state，因为那样会破坏其响应性。但是，你可以 patch 它。

```ts
// 这实际上并没有替换`$state`
store.$state = { count: 24 };
// 在它内部调用 `$patch()`：
store.$patch({ count: 24 });
```

你也可以通过变更 pinia 实例的 state 来设置整个应用的初始 state。这常用于 SSR 中的激活过程。

```ts
pinia.state.value = {};
```

### 订阅 state
