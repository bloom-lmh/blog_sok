# React 的源码与原理解读（三）：从 Render 开始，理解元素的挂载和解析

本节的我们将从 React 的入口函数出发，谈谈在 render() 之后，React 做了什么事情，这部分会涉及到我们**怎么样生成一个 Fiber 根节点以及一棵 Fiber 树**，然后将它 **挂载到真实 DOM 上**的问题，所以需要您先阅读前两章的内容来了解什么是 Fiber

[[toc]]

## Render 的调用

众所周知，在 React 18.0 之前，我们的根节点是这样挂载的：我们在页面获取一个元素，然后把我们的应用挂载到它内部：

```js
import ReactDOM from 'react-dom';
import App from './App';

const root = document.getElementById('root');
ReactDOM.render(<App />, root);
```

而 18.0 版本之后，我们的 render 是这样调用的 ：我们调用了一个 createRoot 方法去创建一个根元素，之后将我们的应用挂载到它的内部

```js
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

## createRoot

根据上面的逻辑，我们调用的 createRoot 方法创建了一个根元素，我们可以来看看 createRoot 做了什么

你可以直接阅读源码，它在 React 源码的这个位置 ：`packages/react-dom/src/client/ReactDOMRoot.js`
::: code-group

```js [源代码] {6,11,72,84}
export function createRoot(
  container: Element | Document | DocumentFragment,
  options?: CreateRootOptions,
): RootType {
  // 判断传入元素是元素是否合法可以挂载的元素
  if (!isValidContainer(container)) {
    throw new Error('createRoot(...): Target container is not a DOM element.');
  }

  // 如果传入body或已使用的元素，发出警告（开发环境）
  warnIfReactDOMContainerInDEV(container);

  //这部分和可选参数 options 相关，可以查看React 的相关配置，这里就不具体说明了
  let isStrictMode = false;    // 严格模式
  let concurrentUpdatesByDefaultOverride = false;    // 设置更新模式
  let identifierPrefix = '';    //  前缀
  let onRecoverableError = defaultOnRecoverableError;  // 可恢复的错误处理方法
  let transitionCallbacks = null;    // 过度回调
 if (options !== null && options !== undefined) {
    // 开发模式下的代码
    if (__DEV__) {
      // 使用createRoot创建水合根结点已经废弃了，需要使用hydrateRoot(container, <App />)代替
      if ((options: any).hydrate) {
        console.warn(
          'hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.',
        );
      } else {
        // 如果const root = createRoot(container, <App />);参数2被误传为 React 元素
        if (
          typeof options === 'object' &&
          options !== null &&
          (options: any).$$typeof === REACT_ELEMENT_TYPE
        ) {
          console.error(
            'You passed a JSX element to createRoot. You probably meant to ' +
              'call root.render instead. ' +
              'Example usage:\n\n' +
              '  let root = createRoot(domContainer);\n' +
              '  root.render(<App />);',
          );
        }
      }
    }
    // 设置选型
  if(options !== null && options !== undefined) {
      /** 设置严格模式 */
      if(options.unstable_strictMode === true) {
          isStrictMode = true;
      }
      /** 设置 ConcurrentUpdatesByDefaultMode 为 true  */
      if(
          allowConcurrentByDefault &&
          options.unstable_concurrentUpdatesByDefault === true
      ) {
          concurrentUpdatesByDefaultOverride = true;
      }
      /** 设置前缀 */
      if(options.identifierPrefix !== undefined) {
         identifierPrefix = options..identifierPrefix;
      }
      /** 设置可恢复的错误处理回调 */
      if(options.onRecoverableError !== undefined) {
          onRecoverableError = options.onRecoverableError;
      }
      /** 设置过渡回调 */
      if(options.unstable_transitionCallbacks !== undefined) {
          transitionCallbacks = options.unstable_transitionCallbacks;
      }
  }

  // 创建一个 FiberRootNode 类型的节点，fiberRootNode 是整个React应用的根节点，且在创建的时候会做一些初始化工作
  const root = createContainer(
    container,
    ConcurrentRoot,  //指定为并发渲染模式 若使用LegacyRoot = 0; 则为传统同步模式
    null,
    isStrictMode,
    concurrentUpdatesByDefaultOverride,
    identifierPrefix,
    onRecoverableError,
    transitionCallbacks,
  );

  // 标记容器元素已经为根结点
  markContainerAsRoot(root.current, container);

  // 获取传入元素的的真实 DOM
  const rootContainerElement: Document | Element | DocumentFragment =
    container.nodeType === COMMENT_NODE
      ? (container.parentNode: any)
      : container;

  // 绑定所有可支持的事件
  listenToAllSupportedEvents(rootContainerElement);

  // 使用 ReactDOMRoot 初始化一个对象
  return new ReactDOMRoot(root);
}

```

```js [isValidContainer]
// 这个函数的作用在于判断传入的是否为合法的容器
export function isValidContainer(node: any): boolean {
  return !!(
    node &&
    (node.nodeType === ELEMENT_NODE ||
      node.nodeType === DOCUMENT_NODE ||
      node.nodeType === DOCUMENT_FRAGMENT_NODE ||
      // 允许注释结点作为挂载结点且这个结点是注释结点，通常是SSR水合时才这么做
      (!disableCommentsAsDOMContainers &&
        node.nodeType === COMMENT_NODE &&
        // react-mount-point-unstable注释结点
        (node: any).nodeValue === ' react-mount-point-unstable '))
  );
}
// 下面DOM元素类型
// 元素结点 ELEMENT_NODE = 1;
// 文本结点  TEXT_NODE = 3;
// 注释结点 COMMENT_NODE = 8;
// 文档根结点 DOCUMENT_NODE = 9;
// 文档片段节点​ (轻量级虚拟容器) DOCUMENT_FRAGMENT_NODE = 11;
```

```js [warnIfReactDOMContainerInDEV]
function warnIfReactDOMContainerInDEV(container: any) {
  if (__DEV__) {
    // 若使用body作为根节点则提出警告（因为body结点经常作为第三方库所操作的对象）
    if (
      container.nodeType === ELEMENT_NODE &&
      ((container: any): Element).tagName &&
      ((container: any): Element).tagName.toUpperCase() === 'BODY'
    ) {
      console.error(
        'createRoot(): Creating roots directly with document.body is ' +
          'discouraged, since its children are often manipulated by third-party ' +
          'scripts and browser extensions. This may lead to subtle ' +
          'reconciliation issues. Try using a container element created ' +
          'for your app.',
      );
    }
    // 若这个容器已经被标记为根结点
    if (isContainerMarkedAsRoot(container)) {
      // '不能混合使用 ReactDOM.render 和 createRoot'
      if (container._reactRootContainer) {
        console.error(
          'You are calling ReactDOMClient.createRoot() on a container that was previously ' +
            'passed to ReactDOM.render(). This is not supported.',
        );
        // 不能重复调用 createRoot
      } else {
        console.error(
          'You are calling ReactDOMClient.createRoot() on a container that ' +
            'has already been passed to createRoot() before. Instead, call ' +
            'root.render() on the existing root instead if you want to update it.',
        );
      }
    }
  }
}
// 伪代码实现（React内部简化版）
function isContainerMarkedAsRoot(container: Element): boolean {
  // 检查容器是否被添加了 React 的私有标记，若添加了表示已经被创建为了根结点
  return '__reactContainere$$' in container;
}
```

```js [markContainerAsRoot]
// 这个函数的作用在于为作为根结点的容器结点打上标记，表示已经作为根结点了
// 在warnIfReactDOMContainerInDEV函数中就会进行校验
const randomKey = Math.random().toString(36).slice(2);
const internalContainerInstanceKey = '__reactContainer$' + randomKey;

export function markContainerAsRoot(hostRoot: Fiber, node: Container): void {
  node[internalContainerInstanceKey] = hostRoot;
}
```

:::
在这个函数中：

1.  我们首先要判断传入的容器元素是否合法的 DOM 元素
2.  校验是否传入的 body 元素或已经被 createRoot 使用过的元素（若使用过的 DOM 元素会有\_\_reactContainer$属性）
3.  设置 options
4.  之后我们创建一个 FiberRootNode 节点，它指向我们的 Fiber 树，传入我们的 DOM 元素、设定指向的 Fiber 树，上一篇提过，React 采用双缓冲树的结构，系统中会有 current ( 当前正在展示 ) 和 workInProgress ( 将要更新的 ) 两个 fiber 树，在初始化的时候，指向 current 树，这里用一个 tag 来表述指向的树， ConcurrentRoot 代表指向 current 树
5.  之后将我们创建的 root 节点挂载到 DOM 上
6.  获取并监听该 DOM 的所有事件
7.  最后返回一个 ReactDOMRoot 对象

我们应该可以理解，createRoot 函数获取了一个 DOM 元素，创建了一个 FiberRootNode 节点挂载到这这个 DOM 上，然后绑定了所有的事件，最后返回一个 ReactDOMRoot 对象。这个过程有两个不明确的点，FiberRootNode 节点是什么，以及 ReactDOMRoot 对象是什么，那么我们一一来看这两个结构：

## createFiberRoot 创建 FiberRootNode

上文中，我们使用 createContainer 来创建了一个 FiberRootNode 对象，它的运行过程如下，首先是 createContainer 函数，它在接收参数后，添加了 hydrate 和 initialChildren 两个属性，之后调用了 createFiberRoot

```js {11-12}
export function createContainer(
  containerInfo,
  tag,
  hydrationCallbacks,
  isStrictMode,
  concurrentUpdatesByDefaultOverride,
  identifierPrefix,
  onRecoverableError,
  transitionCallbacks,
) {
  const hydrate = false; // 服务端渲染相关
  const initialChildren = null; // 初始子节点

  return createFiberRoot(
    containerInfo,
    tag,
    hydrate,
    initialChildren,
    hydrationCallbacks,
    isStrictMode,
    concurrentUpdatesByDefaultOverride,
    identifierPrefix,
    onRecoverableError,
    transitionCallbacks,
  );
}
```

createFiberRoot 中则创建了 FiberRootNode 和 HostRootFiber

- HostRootFiber 就是一个上一篇提到过的 Fiber 元素，它是我们整个 Fiber 树的根
- FiberRootNode 的 current 属性指向我们的 HostRootFiber ，也就是说通过返回的 FiberRootNode 就可以得到我们的整个 Fiber 树而 HostRootFiber 的 stateNode 指向 FiberRootNode ，实现了对 DOM 的追踪

createFiberRoot 代码如下：

```js {14,27-31,34,37}
export function createFiberRoot(
  containerInfo,
  tag,
  hydrate,
  initialChildren,
  hydrationCallbacks,
  isStrictMode,
  concurrentUpdatesByDefaultOverride,
  identifierPrefix,
  onRecoverableError,
  transitionCallbacks,
) {
  // 创建 FiberRoot
  const root = new FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onRecoverableError);

  // 设置服务端渲染回调
  if (enableSuspenseCallback) {
    root.hydrationCallbacks = hydrationCallbacks;
  }

  // 设置过渡回调
  if (enableTransitionTracing) {
    root.transitionCallbacks = transitionCallbacks;
  }

  // 创建 HostRootFiber
  const uninitializedFiber = createHostRootFiber(
    tag,
    isStrictMode,
    concurrentUpdatesByDefaultOverride,
  );

  // 将 HostRootFiber 挂载到 FiberRoot 的 current 属性上
  root.current = uninitializedFiber;

  // 将 HostRootFiber 的 stateNode 设置为 FiberRoot
  uninitializedFiber.stateNode = root;

  // 设置 HostRootFiber 的 memoizedState
  if (enableCache) {
    const initialCache = createCache();
    retainCache(initialCache);

    root.pooledCache = initialCache;
    retainCache(initialCache);
    const initialState = {
      element: initialChildren,
      isDehydrated: hydrate,
      cache: initialCache,
    };

    uninitializedFiber.memoizedState = initialState;
  } else {
    const initialState: RootState = {
      element: initialChildren,
      isDehydrated: hydrate,
      cache: (null: any),
    };
    uninitializedFiber.memoizedState = initialsTate;
  }

  // 初始化 HostRootFiber 的更修队列
  initializeUpdateQueue(unitializedFiber);

  return root;
}
```

整个架构类似这样的结构：
![fiber 架构](https://s3.bmp.ovh/imgs/2025/05/08/3a1bd8d3c97bd621.png)

## createHostRootFiber 创建 HostRootFiber

createHostRootFiber 函数设置了 React Fiber 架构的工作模式 （Concurrent 模式、严格模式、ConcurrentUpdatesByDefaultMode 模式）和设置性能分析的模式，这些如下所示，然后通过 createFiber 函数创建了一个 Fiber ，关于 Fiber 的结构在上一篇教程中以及提到了，但是在上文我们没有说明 mod 这个属性的作用，这里我们看到，这个属性是从用户的配置中传入的，随着函数调用一步一步来到我们的 Fiber 中：
:::code-group

```js [createHostRootFiber]
export function createHostRootFiber(tag, isStrictMode, concurrentUpdatesByDefaultOverride) {
  let mode;

  //设置模式
  if (tag === ConcurrentRoot) {
    mode = ConcurrentMode;
    if (isStrictMode === true || createRootStrictEffectsByDefault) {
      mode |= StrictLegacyMode | StrictEffectsMode;
    }

    if (
      !enableSyncDefaultUpdates ||
      (allowConcurrentByDefault && concurrentUpdatesByDefaultOverride)
    ) {
      mode |= ConcurrentUpdatesByDefaultMode;
    }
  } else {
    mode = NoMode;
  }
  if (enableProfilerTimer && isDevToolsPresent) {
    mode |= ProfileMode;
  }

  return createFiber(HostRoot, null, null, mode);
}
```

```js [createFiber]
const createFiber = function (
  tag: WorkTag,
  pendingProps: mixed,
  key: null | string,
  mode: TypeOfMode,
): Fiber {
  // $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
  return new FiberNode(tag, pendingProps, key, mode);
};
```

:::

## FiberRootNode

FiberRootNode 中则包含了一些 Fiber 在后续执行的时候会用到的关于调度相关的内容，我们会在后续提到：

```js
function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onRecoverableError) {
  this.tag = tag;
  this.containerInfo = containerInfo; // DOM 容器节点
  this.pendingChildren = null;
  this.current = null; // Fiber 树
  this.pingCache = null;
  this.finishedWork = null;
  this.timeoutHandle = noTimeout;
  this.context = null;
  this.pendingContext = null;
  this.callbackNode = null;
  this.callbackPriority = NoLane;
  this.eventTimes = createLaneMap(NoLanes);
  this.pendingLanes = NoLanes;
  this.suspencedLanes = NoLanes;
  this.pingedLanes = NoLanes;
  this.expiredLanes = NoLanes;
  this.mutableReadLanes = NoLanes;
  this.entangledLanes = NoLanes;
  this.hiddenUpdates = createLaneMap(null);
  this.identifierPrefix = identifierPrefix;
  this.onRecoverableError = onRecoverableError;
  if (enableCache) {
    this.pooledCache = null;
    this.pooledCacheLanes = NoLanes;
  }
  if (supportsHydration) {
    this.mutableSourceEagerHydrationData = null;
  }
  if (enableSuspenseCallback) {
    this.hydrationCallbacks = null;
  }
  this.incompleteTransitions = new Map();
  if (enableTransitionTracking) {
    this.transitionCallbacks = null;
    const transitionLanesMap = (this.transitionLanes = []);
    for (let i = 0; i < TotalLanes; i++) {
      pendingUpdatersLaneMap.push(new Set());
    }
  }
}
```

## ReactDOMRoot

之后我们来看看返回值的 ReactDOMRoot ，它的创建仅仅是将 \_internalRoot 属性指向我们传入的 FiberRootNode ，但在这个 ReactDOMRoot 的原型链上，我们添加了两个函数， render 和 unmount

- render 方法校验了传入的树是不是已经卸载，如果可用则调用 updateContainer 进行渲染操作，这个函数会将 element 结构转为 fiber 树，生成 html 节点渲染到指定的 dom 元素中，并且帮助我们操作 Hooks ，这些都会在后续讲到
- unmount 方法主要是用来清除数据、卸载 fiber 树

```js
function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}

// 渲染
ReactDOMRoot.prototype.render = function (children) {
  const root = this._internalRoot;
  if (root === null) {
    throw new Error('Cannot update an unmounted root.');
  }
  // 渲染
  updateContainer(children, root, null, null);
};

// 卸载
ReactDOMRoot.prototype.unmount = function (): void {
  const root = this._internalRoot;
  if (root !== null) {
    this._internalRoot = null;
    const container = root.containerInfo;
    // 清空 Fiber 树
    flushSync(() => {
      updateContainer(null, root, null, null);
    });
    // 将 FiberRoot 从 DOM 容器元素上卸载
    unmarkContainerAsRoot(container);
  }
};
```

## 总结

createRoot 就是把一个 DOM 元素转变为 Fiber 树的根结点
createRoot 的流程

1. 校验容器是否为合法的 DOM 元素，所谓合法的 DOM 元素要求
   a. 是 ELEMENT_NODE、DOCUMENT_NODE、DOCUMENT_FRAGMENT_NODE 或允许注释结点作为容器时的 COMMENT_NODE 结点
   b. 不是 Body 元素，因为很多第三方库会使用 Body 元素这回造成冲突
   c. 没有被标记未根结点（没有混合使用 ReactDOM.render 和 createRoot'或重复调用 createRoot），其判断依据是该 DOM 元素有没有\_\_reactContainer$开头的属性，有表示已经被创建为根节点
2. 设置启动项比如是否采用严格模式，并发模式等
3. 调用 createContainer->createFiberRoot 创建 FiberRootNode 和 HostRootFiber，并且 FiberRootNode.current 指向 HostRootFiber，HostRootFiberstateNode 指向 FiberRootNode，并最后返回 FiberRootNode
4. 调用 markContainerAsRoot 标记该该元素已经作为 root，也就是 1.c 中提到的
5. 获取传入元素的的真实 DOM，假如使用注释结点的话
6. 绑定所有支持的事件
7. 调用 ReactDOMRoot 将 FiberRootNode 封装为 ReactDOMRoot 类型，这个类型添加了 render 和 unmount 功能

## 额外知识

### 什么是 SSR 和水合

SSR（Server-Side Rendering）是指由服务器生成完整的 HTML 内容并返回给浏览器，用户首次访问页面时即可看到完整内容（无需等待客户端 JavaScript 加载）。这样做的好处包括：

- 更快的首屏渲染 ​：用户直接看到内容，无需等待客户端脚本执行。
- ​SEO 友好 ​：搜索引擎可以直接抓取服务器返回的 HTML 内容。

但 SSR 生成的 HTML 是静态的，无法直接响应用户交互（如点击事件），因此需要客户端 JavaScript 对静态内容进行“激活”，这一过程称为 ​ 水合（Hydration）​。
比如下面的代码：
::: code-group

```js [服务端静态代码]
<!-- 服务端生成的HTML -->
<div id="root">
  <!-- react-mount-point-unstable -->
  <!-- 标签纸1 -->
  <header>
    <!-- react-mount-point-unstable -->
    <!-- 标签纸2 -->
    <h1>欢迎来到我的网站</h1>
  </header>
  <main>
    <!-- react-mount-point-unstable -->
    <!-- 标签纸3 -->
    <div>Loading...</div>
  </main>
</div>
```

```js [客户端水合]
// 客户端React组件
function App() {
  return (
    <div id="root">
      <Header />  {/* 对应标签纸1 */}
      <MainContent />  {/* 对应标签纸3 */}
    </div>
  );
}

// 水合时React的查找过程
1. 找到id="root"的div（整个应用的根）
2. 查找第一个<!-- react-mount-point-unstable -->（标签纸1）
   → 在此位置挂载<Header>组件
3. 跳过<header>内的标签纸2（因为客户端组件树没有对应层级）
4. 找到main内的标签纸3
   → 在此位置挂载<MainContent>组件
```

:::
