# Js 中的函数

[[toc]]

## 定义函数的三种方式

### 函数声明

和使用 let + 标识符声明一个变量类似，使用 function 关键字+命名函数的标识符可以声明一个函数。

- 此时函数的名字变成了一个变量，这个变量的值就是函数本身。
- 函数声明语句会被"提升"到**包含脚本、函数或代码块**即所在作用域的顶部，因此调用以这种方式定义的函数时，调用代码可以出现在函数定义代码之前。

```js
{
  // 在代码块中也可以提前调用
  sayHi(); // 输出: "Hi there!"

  function sayHi() {
    console.log('Hi there!');
  }
}

// 代码块外部无法访问
// sayHi(); // ReferenceError: sayHi is not defined
```

### 函数表达式

函数表达式会产生一个函数然后赋值给变量，它与函数声明的区别就在于记录函数的变量不会提升，也就是在函数定义之前不能调用

```js
// 函数表达式不会被提升
// hello(); // TypeError: hello is not a function

// 函数表达式会产生一个函数赋给hello变量
let hello = function () {
  console.log('Hello from expression!');
};

hello(); // 可以正常调用
```

如果需要引用自身，函数表达式也可以带函数名，比如下面的阶乘函数。如果函数表达式包含名字，**函数名就变成了函数体内的一个局部变量**。

```js
const factorial = function fac(n) {
  return n <= 1 ? 1 : n * fac(n - 1); // 在函数内部使用fac引用自身
};

console.log(factorial(5)); // 输出: 120

// 函数名fac只在函数体内可见
// console.log(fac); // ReferenceError: fac is not defined
```

### 箭头函数表达式

箭头函数的定义规则如下：

```js
// 1. 单参数，隐式返回
const double = x => x * 2;
console.log(double(5)); // 10

// 2. 多参数，隐式返回
const add = (a, b) => a + b;
console.log(add(3, 7)); // 10

// 3. 无参数，需要括号
const randomNum = () => Math.random();
console.log(randomNum()); // 0.123... (随机数)

// 4. 多行语句，需要大括号和return
const factorial = n => {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};
console.log(factorial(5)); // 120

// 5. 返回对象字面量，需要用括号包裹
const createUser = (name, age) => ({ name, age });
console.log(createUser('Alice', 25)); // {name: "Alice", age: 25}
```

箭头函数和其它函数的区别

- 没有自己的 this​：继承自外围作用域
- 没有 prototype 属性所以不能用作构造函数 ​：不能使用 new 调用。因为使用构造函数创建的对象需要继承自构造函数的原型，即构造函数.prototype
- 没有 arguments 对象 ​：可以使用剩余参数...args

## 函数实参和形参

JavaScript 函数定义不会指定函数形参的类型，函数调用也不对传入的实参进行任何类型检查。事实上，JavaScript 函数调用连传入实参的个数都不检查。

### 定义形参默认值

当调用函数时传入的实参少于声明的形参时，额外的形参会获得默认值，通常是 undefined 有时候，函数定义也需要声明一些可选参数

```js
// p3 = [] 是ES6之后指定默认值的方式
function demo(p1, p2, p3 = []) {
  // ES6之前指定默认值的方式
  p2 = p2 || 'default';
}
```

当然也可以使用函数或前面的参数来计算形参的默认值

```js
// 案例1：使用变量作为形参默认值
const defaultGreeting = 'Hello';

function greet(name, message = defaultGreeting) {
  console.log(`${message}, ${name}!`);
}

greet('张三'); // 输出: Hello, 张三!
greet('李四', 'Hi'); // 输出: Hi, 李四!

// 案例2：使用函数调用计算形参默认值
function getCurrentYear() {
  return new Date().getFullYear();
}

function registerUser(name, birthYear, currentYear = getCurrentYear()) {
  const age = currentYear - birthYear;
  console.log(`${name}，您今年${age}岁`);
}

registerUser('王五', 1990); // 输出会根据当前年份变化
registerUser('赵六', 1985, 2023); // 输出: 赵六，您今年38岁

// 案例3：使用前一个参数的值作为默认值
function createElement(type, height = 100, width = height * 2) {
  console.log(`创建${type}元素，高度: ${height}，宽度: ${width}`);
}

createElement('div'); // 输出: 创建div元素，高度: 100，宽度: 200
createElement('img', 50); // 输出: 创建img元素，高度: 50，宽度: 100
```

### 剩余形参与可变长度实参列表

剩余形参前面有 3 个点，而且必须是函数声明中最后一个参数,在调用有剩余形参的函数时，传入的实参首先会赋值到非剩余形参，然后所有剩余的实参(也是剩余参数)会保存在一个数组中赋值给剩余形参。如果没有多余参数传给剩余形参则剩余形参是一个空数组

```js
function max(first = -Infinity, ...rest) {
  let maxValue = first; // 假设第一个参数是最大的

  // 遍历其他参数，寻找更大的数值
  for (let n of rest) {
    if (n > maxValue) {
      maxValue = n;
    }
  }

  // 返回最大的数值
  return maxValue;
}

// 测试用例
console.log(max(1, 10, 100, 2, 3, 1000, 4, 5, 6)); // 输出: 1000
console.log(max(5, 3, 8)); // 输出: 8
console.log(max(-10, -3, -8)); // 输出: -3
console.log(max()); // 输出: -Infinity (没有参数时的默认行为)
```

:::tip 提示
接收任意数量实参的函数称为可变参数函数(variadicfunction),可变参数数量函数(variable arity function)或变长函数(vararg function) „
:::

### Arguments 对象

在 ES6 之前实现可变参数函数是通过 arguments 实现的

```js
function max() {
  let maxValue = -Infinity;

  // 遍历arguments，查找并记住最大的数值
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] > maxValue) maxValue = arguments[i];
  }

  // 返回最大的数值
  return maxValue;
}

// 示例调用
console.log(max(1, 10, 100, 2, 3, 1000, 4, 5, 6)); // 输出: 1000
```

### 解构实参为形参

```js
// === 1. 对象解构参数 ===
function greetUser({ name, age }) {
  console.log(`[对象解构] Hello, ${name}! You are ${age} years old.`);
}
// 1. 对象解构
greetUser({ name: 'Alice', age: 25, occupation: 'Engineer' });

// === 2. 默认值 + 解构 ===
function greetWithDefaults({ name = 'Anonymous', age = 18 } = {}) {
  console.log(`[默认值解构] Hello, ${name}! You are ${age} years old.`);
}
// 2. 默认值解构
greetWithDefaults(); // 不传参
greetWithDefaults({ name: 'Bob' }); // 部分参数

// === 3. 数组解构参数 ===
function sumFirstTwo([a, b]) {
  console.log(`[数组解构] Sum of first two elements: ${a + b}`);
}
// 3. 数组解构
sumFirstTwo([10, 20, 30]);

// === 4. 数组剩余参数解构 ===
function logArrayElements([first, second, ...rest]) {
  console.log(`[数组剩余解构] First: ${first}, Second: ${second}, Rest: [${rest}]`);
}
// 4. 数组剩余参数
logArrayElements(['A', 'B', 'C', 'D']);

// === 5. 嵌套对象解构 ===
function printUserProfile({
  username,
  settings: { theme, notifications },
  scores: [math, science],
}) {
  console.log(`
  [嵌套解构] User Profile:
    Name: ${username}
    Theme: ${theme}
    Scores: Math(${math}), Science(${science})
    Notifications: ${notifications ? 'ON' : 'OFF'}
  `);
}
// 5. 嵌套解构
printUserProfile({
  username: 'Charlie',
  settings: {
    theme: 'dark',
    notifications: true,
  },
  scores: [95, 88],
});

// === 6. 带默认值的复杂解构 ===
function drawChart({
  size = { width: 100, height: 100 },
  position = { x: 0, y: 0 },
  radius = 10,
} = {}) {
  console.log(`
  [复杂默认值] Chart Config:
    Size: ${size.width}x${size.height}
    Position: (${position.x}, ${position.y})
    Radius: ${radius}
  `);
}
// 6. 复杂默认值
drawChart(); // 全部使用默认值
drawChart({
  position: { x: 10, y: 20 },
  radius: 15,
});
```

## 函数作为对象

函数本质上也是对象

- 可以作为值传入另一函数
- 可以设置属性

### 函数作为值传递

```js
function fn(operation, operand1, operand2) {}
function add(a, b) {
  return a + b;
}
fn(add, 1, 2);
```

### 函数属性设置

函数也是对象，可以为函数定义属性，利用这个特性可以缓存或初始化一些值，下面的 factorial()函数使用了自身的属性来缓存之前计算的结果（函数将自身作为一个数组）

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

::: warning 注意
函数的属性是可以被修改的，因此不要依赖于函数的属性来缓存结果，而是应该使用闭包来缓存结果
:::

## 函数的属性、方法

### 函数的一些属性

1. name 属性：表示定义函数时使用的名字或第一此创建这个函数时赋给该函数的变量名或属性名
   - ​ 函数声明 ​​：直接返回函数名。
   - ​ 函数表达式 ​​：
     - 如果有显式名称（如 `const foo = function bar() {}`），返回变量名 foo（非严格模式下）或绑定名称 bar（严格模式下）。
     - 如果是匿名函数（如 `const foo = function() {}`），返回变量名 foo。
   - ​ 箭头函数 ​​：返回变量名（无自己的 name 属性，继承自外层作用域）。
   - ​ 内置函数 ​​：返回函数名（如 'setTimeout'）。
   - bind 的函数返回 bind+name
2. length 属性：返回形参个数，如果有剩余参数不记录在 length 中
3. prototype 属性
   - 普通函数 ​​：指向该函数的 ​​ 原型对象 ​​，用于实现基于原型的继承（如构造函数模式）。
   - ​ 箭头函数/内置函数 ​​：prototype 为 undefined（因为它们不能作为构造函数）。

### 函数的一些方法

bind/call/apply 请看 this 部分

## Function 构造函数

Function 构造函数能够实现动态的创建函数，这也是函数也是对象的原因，因为函数也可以通过构造函数来创建

### 基本语法

前面是形参列表后面是函数体

```js
const add = new Function('a', 'b', 'return a + b');
console.log(add(2, 3)); // 5
```

### Function 构造函数创建函数的特点

Function 创建的函数不使用词法作用域，而是始终编译为如同顶级函数一样

```js
let scope = 'global';
function constructFunction() {
  let scope = 'local';
  return new Function('return scope');
}
console.log(constructFunction()()); // 输出: "global"
```
