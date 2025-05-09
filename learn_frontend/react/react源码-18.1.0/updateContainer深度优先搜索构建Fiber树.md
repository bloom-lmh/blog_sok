# React 的源码与原理解读（四）：updateContainer 内如何通过深度优先搜索构造 Fiber 树

[[toc]]

本节的我们将从 上一节留下的问题出发，谈谈 render() 中的 updateContainer 做了什么工作，他怎么样把 传入进去的 DOM 元素变成我们的 Fiber 元素。因为这部分涉及到大量进程调度的问题，我们暂时不谈论这些问题，只是简单谈谈从 updateContainer 开始到最后变成 Fiber 经历的一系列的函数链，以及他们分别做了什么工作，进程调度的全部内容我们会在之后详细谈谈

## render 函数

```js
ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function (
  children: ReactNodeList,
): void {
  // 获取Fiber根结点
  const root = this._internalRoot;
  if (root === null) {
    throw new Error('Cannot update an unmounted root.');
  }
  // 调用updateContainer创建Fiber树
  updateContainer(children, root, null, null);
};
```

## updateContainer 的调用

上一节中，我们对 render 的流程讲解停在这里，我们讲到我们把挂载的节点和 FiberRootNode 放到了 updateContainer 中，这个函数负责生成 Fiber 的逻辑
::: code-group

```js [updateContainer]
// updateContainer 的源码位置：`react-reconciler/src/ReactFiberReconciler.new.js`
export function updateContainer(
  element: ReactNodeList,
  container: OpaqueRoot,
  parentComponent: ?React$Component<any, any>,
  callback: ?Function,
): Lane {
  // 获取 FiberRootNode 的根节点
  const current = container.current;

  // 记录触发更新的时间戳（如用户点击、网络请求完成的时间）。会根据当前时间和 React 内部的时间精度（如是否启用时间切片）生成一个时间值。计算当前更新的“事件时间”，用于优先级调度。
  const eventTime = requestEventTime();
  // 确定当前更新应该分配到哪个“车道（Lane）”
  // React 17+ 引入的调度机制，用不同的“车道”（二进制位掩码）表示不同优先级的更新。
    // 同步车道（SyncLane）​​：紧急更新（如用户输入）。
    // ​默认车道（DefaultLane）​​：普通更新。
    ​// 过渡车道（TransitionLane）​​：可中断的非紧急更新。
  const lane = requestUpdateLane(current);
  const update = createUpdate(eventTime, lane);
  update.payload = { element };

  // 处理 callback，不过从React18开始，render不再传入callback了，即这里的if就不会再执行了
  callback = callback === undefined ? null : callback;
  if (callback !== null) {
    update.callback = callback;
  }

  //把创建的添加到 current 的更新链表中
  enqueueUpdate(current, update, lane);

  //根据优先级和创建一个更新任务，取出 element 构造下一个 Fiber
  const root = scheduleUpdateOnFiber(current, lane, eventTime);
  if (root !== null) {
    entangleTransitions(root, current, lane);
  }
  return lane;
}
```

```js [requestEventTime]
// 记录触发更新的时间戳（如用户点击、网络请求完成的时间）。会根当前时间和 React 内部的时间精度（如是否启用时间切片）生成一个间值。计算当前更新的“事件时间”，用于优先级调度。
export function requestEventTime() {
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext) {
    // We're inside React, so it's fine to read the actual time.
    return now();
  }
  // We're not inside React, so we may be in the middle of a browser event.
  if (currentEventTime !== NoTimestamp) {
    // Use the same start time for all updates until we enter React again.
    return currentEventTime;
  }
  // This is the first update since React yielded. Compute a new start time.
  currentEventTime = now();
  return currentEventTime;
}
```

```js [requestUpdateLane]
// 确定当前更新应该分配到哪个“车道（Lane）”
// React 17+ 引入的调度机制，用不同的“车道”（二进制位掩码）表不同优先级的更新。
  // 同步车道（SyncLane）​​：紧急更新（如用户输入）。
  // ​默认车道（DefaultLane）​​：普通更新。
  ​// 过渡车道（TransitionLane）​​：可中断的非紧急更新。
export function requestUpdateLane(fiber: Fiber): Lane {
  // 获取fiber的模式
  const mode = fiber.mode;
  // 判断是否有并发模式，没有表示同步模式
  if ((mode & ConcurrentMode) === NoMode) {
    return (SyncLane: Lane);
    // 否则采用的并发模式
  } else if (
    !deferRenderPhaseUpdateToNextBatch &&
    (executionContext & RenderContext) !== NoContext &&
    workInProgressRootRenderLanes !== NoLanes
  ) {
    return pickArbitraryLane(workInProgressRootRenderLanes);
  }
  const isTransition = requestCurrentTransition() !== NoTransition;
  if (isTransition) {
    if (currentEventTransitionLane === NoLane) {
      currentEventTransitionLane = claimNextTransitionLane();
    }
    return currentEventTransitionLane;
  }
  const updateLane: Lane = (getCurrentUpdatePriority(): any);
  if (updateLane !== NoLane) {
    return updateLane;
  }
  const eventLane: Lane = (getCurrentEventPriority(): any);
  return eventLane;
}
```

```js [创建更新]
// 创建一个更新对象，这个对象包含触发更新事件的事件以及车道等信息
export function createUpdate(eventTime: number, lane: Lane): Update<*> {
  const update: Update<*> = {
    eventTime,
    lane,
    tag: UpdateState,
    payload: null,
    callback: null,
    next: null,
  };
  return update;
}
```

:::
