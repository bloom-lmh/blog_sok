# Js-this

[[toc]]

## 函数/方法中的 this

### 函数独立调用时

函数独立调用时的 this

- 在严格模式下指向 undefined
- 在非严格模式下指向 this 指向全局对象（浏览器中为 window，Node.js 中为 global）

```js
function foo() {
  console.log(this);
}
foo(); // 浏览器中: Window {...} (非严格模式) / undefined (严格模式)
```

### 函数作为对象方法调用时

函数作为对象方法调用时，this 指向调用它的对象。

```js
const obj = {
  name: 'Alice',
  greet() {
    console.log(`Hello, ${this.name}!`);
  },
};
obj.greet(); // "Hello, Alice!"（this = obj）
```

### 构造函数

使用 new 调用构造函数时，this 指向新创建的实例。

```js
function Person(name) {
  this.name = name;
}
const bob = new Person('Bob');
console.log(bob.name); // "Bob"（this = bob）
```

### 箭头函数

箭头函数无自己的 this，继承外层作用域的 this（词法作用域）

### 立即执行函数

### ​Function 构造函数

## 异步回调中的 this

### setTimeout/setInterval

### Promise 处理器

### ​DOM 事件处理器

### ​React 事件处理器

## 类中的 this

## 对象中的 this

## Worker 环境中的 this

## 改变 this 指向

### call() 调用

### apply() 调用

### ​bind() 绑定

### API 绑定上下文 ​

## this 绑定优先级
