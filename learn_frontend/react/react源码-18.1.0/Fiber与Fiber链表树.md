# React 的源码与原理解读（二）：Fiber 与 Fiber 链表树

本节的内容我们将讲述 React 中的一个很重要的数据结构——Fiber ，本节先着重说明**什么是 Fiber 结构，它的数据结构是什么，以及 React 为什么要在 16.X 版本后引入 Fiber 结构**，之后的章节会讲述从 ReactElement 到 Fiber 树的过程以及 Fiber 树的生成和更新
[[toc]]

## Fiber 结构

Fiber 结构最接近带有**任务调度能力的多叉树链表**，虽然借鉴了线索树的高效遍历和链表的灵活性，但其核心设计服务于 React 的并发渲染和优先级调度，与传统的图存储结构（十字链表、邻接多重表）在目标场景和功能上有本质区别。理解 Fiber 需要聚焦于其状态管理、任务分片和双缓存机制的特性。其源码在`packages/react-reconciler/src/ReactInternalTypes.js`中。
可以用一张图形象的概括它：
![fiber树](https://s3.bmp.ovh/imgs/2025/05/07/e023c812d7983f5f.png)
它的数据结构实在过于庞大了，我们拆分成及部分来理解它我们只介绍一些重点的属性，其他的属性想要了解的可以查看源码的注释信息或者查阅其他的资料：

### DOM 相关的属性

首先是和 DOM 相关的属性，它和对应的 React Element 息息相关

```js
tag: WorkTag,        //节点的类型
key: null | string,  //React Element 的 Key
elementType: any,    //React Element 的 type ，原生标签，类组件或者函数组件
type: any,           //类组件或者函数组件
stateNode: any,      //stateNode 用于记录当前 fiber 所对应的真实 dom 节点或者当前虚拟组件的实例，用于实现对于对DOM的追踪
```

### 结构相关的属性

```js
return: Fiber | null,   //指向一个元素的父亲
child: Fiber | null,    //指向一个元素的第一个孩子
sibling: Fiber | null,  //指向一个元素的兄弟
index: number,          //在兄弟节点中的位置

```

### 计算 state 和 props 相关属性

之后是用于计算 state 和 props 的部分，这是一个 React 组件很重要的组成部分，不过这篇教程主要以讲解 Fiber 结构为主要目的，所以这部分我们会在后续进行讲解，这里按下不表：

```js
pendingProps: any,       // 本次渲染需要使用的 props
memoizedProps: any,      // 缓存的上次渲染使用的 props
updateQueue: mixed,      // 用于状态更新、回调函数、DOM更新的队列
memoizedState: any,      /// 缓存的上次渲染后的 state
dependencies: Dependencies | null,     // contexts、events 等依赖
```

### 副作用相关的属性

之后是副作用相关的部分，也就是说，当我们修改了节点的一些属性，比如 state 或者 props 等的时候，我们的 DOM 可能会发生变化，同时这种变化可能还会影响到孩子节点，具体的流程将会在对 React diff 算法的讲解的时候再次深入，这里我们只是先介绍一下相关的逻辑：

在 render 阶段时，react 会采用**深度优先遍历**，对 fiber 树进行遍历，Fiber 中会用 flags 表示对当前元素的处理，比如是更新或者删除等等，具体可以查看源码的 Flags 枚举，同时 subtreeFlags 用于表示对孩子节点的处理，而 deletions 则表示我们需要删除的子 Fiber 的序列：

```js
flags: Flags,                       //对当前节点的处理
subtreeFlags: Flags,                //对孩子节点的处理
deletions: Array<Fiber> | null,     //要删除的子节点列表
```

同时，这个阶段会把每一个有副作用的 fiber 筛选出来，放在一个链表中，以下的三个属性就是来标识这个链表的，这个链表将会在之后的阶段用于更新我们的 DOM

```js
nextEffect: Fiber | null,     //副作用的下一个 Fiber
firstEffect: Fiber | null,    //第一个有副作用的 Fiber
lastEffect: Fiber | null,     //最后一个有副作用的 Fiber
```

### 优先级相关属性

lanes 是用于表示执行 fiber 任务的优先级的，这个将会在后续的文章中详细的讲解

```js
lanes: Lanes,
childLanes: Lanes,
```

### 双缓存模型相关属性

alternate 是用于双缓冲树这个结构，简单来说就是：

- react 根据双缓冲机制维护了两个 fiber 树，一颗用于渲染页面 (current)，一颗是 workInProgress Fiber 树，用于在内存中构建，然后方便在构建完成后直接昔换 current Fiber 树
- workInprogress Fiber 树的 alternate 指向 Current Fiber 树的对应节点, current 表示页面正在使用的 fiber 树
- 当 workInprogress Fiber 树构建完成，workInProgress Fiber 则成为了 current 渲染到页面上，而之前的 current 则缓存起来成为下一次的 workInProgress Fiber，完成双缓冲模型

双缓存模型的优势就是提升效率，可以防止只用一颗树更新状态的丢失的情况，又加快了 dom 节点的替换与更新，后续我们还会详细聊聊这个结构。

```js
alternate: Fiber | null,
```

## 为什么要使用 fiber

React 使用 ​Fiber 架构 ​（链表结构的树）是为了解决传统虚拟 DOM 协调（Reconciliation）算法的局限性，并实现更高效、可中断的异步渲染。以下是核心原因和设计思路：

### ​ 支持可中断的异步渲染（Concurrent Mode）​

传统 React 的协调算法是递归同步处理组件树的，一旦开始就无法中断，可能导致主线程长时间阻塞（如复杂组件渲染卡顿动画）。

Fiber 将组件树的更新拆解为多个可中断的小任务单元 ​（Fiber Node），通过链表结构（而非树结构）实现：

- ​ 链表遍历支持暂停/恢复 ​：每个 Fiber 节点保存对父节点、子节点、兄弟节点的引用（child, sibling, return），形成一个单向链表树，可通过循环逐节点处理，记录当前进度。
- ​ 优先级调度 ​：高优先级任务（如用户交互）可打断低优先级任务（如数据加载），优先执行。

### 更细粒度的任务控制

Fiber 的每个节点代表一个工作单元，包含组件状态、副作用（如 DOM 操作）等信息：

- 增量渲染 ​：React 可以在浏览器空闲时间（通过 requestIdleCallback 或 requestAnimationFrame）分片处理 Fiber 节点，避免阻塞主线程。
- ​ 时间切片（Time Slicing）​​：将渲染任务分割到多个帧中执行，保证页面流畅。

### 高效的副作用管理

Fiber 节点通过链表结构收集副作用（如 DOM 更新）：在遍历 Fiber 树时，React 构建一个线性副作用链表，提交阶段（Commit Phase）可高效批量处理 DOM 变更，减少布局抖动。

### 支持 Suspense 和并发特性

Fiber 架构为 React 的并发模式（Concurrent Mode）​ 奠定基础：

- Suspense​：允许组件等待异步数据加载，期间显示占位内容。
- 选择性水合（Selective Hydration）​​：优先水合用户正在交互的部分，提升感知性能。

### ​ 双缓冲技术（Double Buffering）​

React 维护两棵 Fiber 树：current（当前显示内容）和 workInProgress（正在构建的更新）。通过链表结构快速切换，避免渲染中间状态导致的视觉不一致。

| ​**传统树结构**​         | ​**Fiber 链表树**​                   |
| ------------------------ | ------------------------------------ |
| 递归同步处理，不可中断   | 循环异步处理，支持中断/恢复          |
| 任务粒度粗，易阻塞主线程 | 细粒度任务分片，避免卡顿             |
| 副作用分散处理           | 集中收集副作用，提交阶段高效批量更新 |
| 无法实现优先级调度       | 支持高优先级任务插队                 |
