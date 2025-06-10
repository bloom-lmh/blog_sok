# JS-函数进阶

[[toc]]

## 立即执行函数

立即执行函数能够像普通函数那样隔离作用域同时又立即执行
其定义方式有两种
::: code-group

```js [函数表达式方式]
// 库A
(function () {
  var utils = {
    /* ... */
  }; // 不会与其他库的 utils 冲突
})();
```

```js [函数声明方式]
(function () {
  var utils = {
    /* ... */
  }; // 独立的 utils
}(). );
```

:::

## 高阶函数

高阶函数 ​​ 是指满足以下 ​​ 至少一个条件 ​​ 的函数：

- 接收一个或多个函数作为参数 ​​（如 map、filter、setTimeout）。
- 返回一个新的函数 ​​（如工厂函数、闭包生成器）。

换句话说，高阶函数就是操作函数的函数 ​​——它可以像普通数据一样传递函数或返回函数。

```js
function createAdder(x) {
  // 返回一个新函数，该函数记住了 x 的值（闭包）
  return function (y) {
    return x + y;
  };
}
const add5 = createAdder(5); // 返回一个函数
console.log(add5(3)); // 8
```

## 闭包

闭包是 JavaScript 中的一个核心概念，指的是一个函数能够**记住并访问它的词法作用域（lexical scope）**，即使这个函数在其词法作用域之外执行 ​​。换句话说，闭包函数执行时使用的时定义函数时生效的变量作用域

```js
function createCounter() {
  var count = 0; // 私有变量
  return {
    increment: function () {
      count++;
    },
    getCount: function () {
      return count;
    },
  };
}
var counter = createCounter();
counter.increment();
console.log(counter.getCount()); // 1
console.log(counter.count); // undefined（无法直接访问）
```

## 函数柯里化

函数柯里化是将一个多参数函数转换为一系列单参数函数的过程，使得函数可以分步接收参数 ​​，直到所有参数齐备才执行。

### 使用闭包实现函数柯里化

闭包可以 ​​ 记住并访问函数定义时的作用域 ​​，因此可以通过闭包保存已传入的参数，并在后续调用中逐步收集剩余参数，直到所有参数齐备才执行原函数。

```js
function curry(fn) {
  return function curried(...args) {
    // 如果已传入的参数足够，直接执行原函数
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    // 否则返回一个新函数，继续接收剩余参数（闭包保存已传入的 args）
    else {
      return function (...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

// 使用示例
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
```

### 使用 bind 实现函数柯里化

bind 方法可以 ​​ 预先绑定部分参数 ​​（创建一个新的部分应用函数），并返回一个新函数，后续调用时只需传入剩余参数。

```js
function curryWithBind(fn) {
  return function curried(...args) {
    // 如果已传入的参数足够，直接执行原函数
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    // 否则用 bind 预先绑定已传入的参数，返回一个新函数
    else {
      return fn.bind(this, ...args);
    }
  };
}

// 使用示例
function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curryWithBind(multiply);
const step1 = curriedMultiply(2); // 绑定第一个参数 2
const step2 = step1(3); // 绑定第二个参数 3
console.log(step2(4)); // 24 (2 * 3 * 4)
```

## 函数记忆

所谓的函数记忆就是缓存函数每次计算的结果，以提升性能

### 利用属性来实现函数记忆

```js
// 计算阶乘并把结果缓存到函数本身的属性中
function factorial(n) {
  if (Number.isInteger(n) && n > 0) {
    // 仅限于正整数
    if (!(n in factorial)) {
      // 如果没有缓存的结果
      factorial[n] = n * factorial(n - 1); // 计算并缓存这个结果
    }
    return factorial[n]; // 返回缓存的结果
  } else {
    // 如果输入有问题
    return NaN; // 返回NaN
  }
}

factorial[1] = 1; // 初始化缓存，保存最基础的值

// 示例调用
console.log(factorial(6)); // => 720
console.log(factorial[5]); // => 120。上面的调用缓存了这个值
console.log(factorial(0)); // => NaN
console.log(factorial(3.5)); // => NaN
```

:::tip 属性来缓存结果的不可靠性
可以利用属性来实现函数记忆，但是这并不可靠，因为属性可以随时修改。
:::

### 利用闭包实现函数记忆

```js
function memoizeByClosure(fn) {
  // 使用闭包保存缓存
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache[key] !== undefined) {
      return cache[key];
    }
    // 若是在方法中this为方法所属对象，若作为函数调用则this为undefined或window
    const result = fn.apply(this, args);
    cache[key] = result;
    return result;
  };
}

// 使用示例
function fibonacci(n) {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFib = memoizeByClosure(fibonacci);

console.log(memoizedFib(10)); // 计算并返回55
console.log(memoizedFib(10)); // 直接从缓存返回55
```

## 闭包解决 for 循环的问题
