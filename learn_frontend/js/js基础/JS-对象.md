# Js 中的对象

[[toc]]

## 对象创建的三种方式

### 对象字面量表达式

**对象字面量是一个表达式，每次求值都会创建一个新的不一样的对象。字面量被求值的时候每个属性也会被求值。也就是说如果对象字面量出现在循环体中或出现在被重复调用的函数体内，可以创建很多新对象**。

- 对象的属性是字符串、标识符或者符号,ES6 后支持表达式
- 对象的属性值是表达式

```js
let student = {
  name: '小明',
  age: 19,
};
```

### 使用 new+构造函数创建对象

使用 new 操作符后跟着构造函数可以创建对象

```js
const arr = new Array();
```

### :star:Object.create

`Object.create()` 用于创建一个新对象

- 第一个参数作为新对象的原型
- 第二个参数用于描述新对象的属性

```js
o = Object.create(Object.prototype, {
  // foo 是一个常规数据属性
  foo: {
    writable: true,
    configurable: true,
    value: 'hello',
  },
  // bar 是一个访问器属性
  bar: {
    configurable: false,
    get() {
      return 10;
    },
    set(value) {
      console.log('Setting `o.bar` to', value);
    },
  },
});
```

## 查询和设置属性

### 作为关联数组的对象的属性查询和设置

对象可以通过`.`操作符来访问属性
同时 Js 对象也是关联数组（散列、映射、字典），意味着可以类似于数组访问的`[]`操作符来访问属性

```js
let student = {
  name: '小明',
  age: 19,
};
student.name;
student[`name`];
```

:::tip 小技巧
使用`.`操作符访问对象属性是以标识符的形式，必须写死，而以`[]`操作符访问则是以字符串的形式，灵活性高于`.`操作符访问
:::

### :star: 基于原型链的查询和设置规则

1. 查询属性时若没有该自有属性则会查询原型链
2. 设置属性时
   a. 若有该自有属性且不是只读属性则覆盖
   b. 若没有该自有属性但原型链上有且原型链上的该属性不是只读属性则添加为自有属性，若原型上该属性是只读的则不允许设置该属性
   c. 若该对象是不可扩展的即 extensible 为 false 则不可设置该属性

```js
// 1. 创建原型对象
const proto = {
  inheritedProp: '来自原型的属性',
  readOnlyProp: '只读属性',
};

// 设置原型上的属性为只读
Object.defineProperty(proto, 'readOnlyProp', {
  writable: false,
});

// 2. 创建对象并设置原型
const obj = Object.create(proto);

// 3. 演示属性查询行为
console.log('1. 属性查询行为:');
console.log(obj.inheritedProp); // 输出: "来自原型的属性" (查询原型链)
console.log(obj.hasOwnProperty('inheritedProp')); // 输出: false (不是自有属性)

// 4. 演示属性设置行为
console.log('\n2. 属性设置行为:');

// 情况a: 设置自有属性
obj.ownProp = '自有属性';
console.log(obj.ownProp); // 输出: "自有属性"
console.log(obj.hasOwnProperty('ownProp')); // 输出: true

// 情况b1: 设置继承属性(非只读)
obj.inheritedProp = '修改后的继承属性';
console.log(obj.inheritedProp); // 输出: "修改后的继承属性"
console.log(obj.hasOwnProperty('inheritedProp')); // 输出: true (现在成为自有属性)
console.log(proto.inheritedProp); // 输出: "来自原型的属性" (原型上的属性未被修改)

// 情况b2: 尝试修改只读的继承属性
try {
  obj.readOnlyProp = '尝试修改只读属性';
} catch (e) {
  console.log('修改只读属性时出错:', e.message); // 会抛出错误
}
console.log(obj.readOnlyProp); // 输出: "只读属性" (未被修改)
console.log(obj.hasOwnProperty('readOnlyProp')); // 输出: false (没有创建自有属性)

// 5. 特殊情况: 直接在对象上定义只读属性
Object.defineProperty(obj, 'localReadOnly', {
  value: '本地只读属性',
  writable: false,
});

try {
  obj.localReadOnly = '尝试修改本地只读属性';
} catch (e) {
  console.log('\n修改本地只读属性时出错:', e.message);
}
console.log(obj.localReadOnly); // 输出: "本地只读属性" (未被修改)
```

::: tip 总结设置属性失败的场景

1. 原型链上的只读属性
2. 不可扩展对象的新增属性
3. 访问器属性没有 setter
4. 自有属性为只读属性

:::

### :star:属性访问错误的解决方案

如果对象的属性为 undefined 那么访问时会出现错误

```js
book.subtitle; // => undefined 属性不存在
book.subtitle.lenggt; // typeError：undefined没有length属性
```

这时可以使用`&&` 或 `?.` 来访问属性避免报错

```js
surname = book && book.author && book.author.surname;
surname = book?.author?.surname;
```

## :star:删除属性

- 使用 delete 操作符只能删除 configurable 特性为 true 的自有属性（不会删除原型上的对应属性）
- 使用 delete 删除成功会返回 true ，删除失败严格模式下报 TypeError， 非严格模式下返回 false
- 使用 delete 删除全局属性时
  - 如是非主动定义的全局属性 (var 变量或全局函数)，使用 delete 删除会失败
  - 若是直接赋值创建的全局属性 ​，使用 delete 会删除成功（但需要写完整）

```js
// 删除configurable: false的属性会失败
Object.defineProperty(window, 'customGlobal', {
  value: 'can be deleted',
  configurable: false,
});
console.log(delete customGlobal); // 在非严格模式下返回 false,严格模式会报错

// 非主动定义的全局属性删除时会报错
var globalVar = 'value';
function f() {}
console.log(delete globalVar); // 在非严格模式下返回 false,严格模式
console.log(delete f); // 在非严格模式下返回 false,严格模式

// 主动定义的全局属性删除时要书写完整
globalThis.x = 1
delete x  // 没有写完整删除失败
delete globalThis.x 删除成功返回true
```

## :star:测试属性是否存在

- `in` 操作符:使用 in 操作符可以判断某对象是否含某属性（包括继承的属性，且无论是否可以枚举）
- `hasOwnProperty` 方法:检测是否含有自有属性（且无论是否可枚举）
- `propertyIsEnumerable` 方法:检测是否含有可枚举（`enumerable:true`）的自有属性,是对`hasOwnProperty `方法的细化
- 使用属性访问检测:与 in 类似，但是不具有

```js
let obj = {
  name: undefined,
  age: 19,
};
let o = Object.create(obj, {
  foo: {
    writable: true,
    configurable: true,
    enumerable: false,
    value: 'hello',
  },
});
console.log('name' in o); // true 继承属性
console.log('foo' in o); // true 自有属性

console.log(o.hasOwnProperty('name')); // false 非自有属性
console.log(o.hasOwnProperty('foo')); // true 是自有属性

console.log(o.propertyIsEnumerable('name')); // false 非自有属性
console.log(o.propertyIsEnumerable('foo')); // false  是自有属性但是该属性不可枚举

console.log(o['name'] === undefined); // true   实际有name属性但是检测错误
console.log(o['age'] === undefined); // false 表示有该属性
```

## :star:枚举属性

### 使用 for/in 循环

使用 for/in 循环对指定对象的每个可枚举（自有或继承）属性都会运行一次循环体，将属性的名字赋给循环体变量。对于对象继承的内置方法是不可枚举的，但你的代码添加给对象的属性默认是可枚举的。例如

```js
let o = { x: 1, y: 2, z: 3 };
o.propertyIsEnumerable('toString'); // 不可枚举也不是自有属性
for (let p in o) {
  console.log(p); // x,y,z
}
```

### 使用 for/of 循环

有时候可以先获得对象的所有属性名的数组，然后再通过 for/of 循环遍历该数组

- `Object.keys()`:返回对象可枚举自有属性名的数组。不包含不可枚举属性、继承属性或是名字是符号的属性
- `Object.getOwnPropertyNames()`: 与`Object.keys()`类似，但也会返回不可枚举自有属性名的数组，只要它们的名字是字符串。
- `Object.getOwnPropertySymbols()`: 返回名字是符号的自有属性，无论是否可枚举
- `Reflect.ownkeys()` : 返回所有属性名，包括可枚举和不可枚举的属性，以及字符串属性和符号属性

::: tip 总结

- 除了`Reflect.ownkeys()`都仅仅获取自有属性
- 除了`Object.keys()`都可获取不可枚举属性
- 仅仅`Object.getOwnPropertySymbols()`获取符号属性

:::

### 属性枚举顺序

ES6 正式定义了枚举对象自有属性的顺序。`Object.keys()`、`Object.getOwnPropertyNames()`、
`Object.getOwnPropertySymbols()`、`Reflect.onwKeys()`及 `JS0N.stringify()`等相关
方法都按照下面的顺序列出属性，另外也受限于它们要列出不可枚举属性还是列出字符串属性或符号属性。

- 先列出名字为非负整数的字符串属性，按照数值顺序从最小到最大。这条规则意味着数组和类数组对象的属性会按照顺序被枚举。
- 在列出类数组索引的所有属性之后，再列出所有剩下的字符串名字（包括看起来像负数或浮点数的名字）的属性。这些属性按照它们添加到对象的先后顺序列出。对于在对象字面量中定义的属性，按照它们在字面量中出现的顺序列出。
- 最后，名字为符号对象的属性按照它们添加到对象的先后顺序列出。

`for/in` 循环的枚举顺序并不像上述枚举函数那么严格，但实现通常会按照上面描述的顺序枚举自有属性，然后再沿原型链上溯，以同样的顺序枚举每个原型对象的属性。不过
要注意，如果已经有同名属性被枚举过了，甚至如果有一个同名属性是不可枚举的，那这个属性就不会枚举了。

::: tip 总结

- 先数组属性（整数）
- 再字符串属性（按添加顺序）
- 再符号属性
- 原型上上溯

:::

## 扩展对象

### Object.assign

Object.assign 方法可以将对象的可枚举自有属性复制到目标对象，并且后一个对象会覆盖前面对象的同名属性

```js
let o1 = { x: 1, y: 2 };
let o2 = { x: 3 };
let o = Object.assign({}, o1, o2);
o.x; // => 3 后面对象属性会覆盖前面同名属性
```

### 扩展操作符...

当然也可以使用扩展操作符,后面的对象属性也会覆盖前面同名属性

```js
let o1 = { x: 1, y: 2 };
let o2 = { x: 3 };
let o = { ...o1, ...o2 };
o.x; // => 3 后面对象属性会覆盖前面同名属性
```

## 对象序列化

### :star:可以序列化哪些值

对象序列化就是把对象的状态转换为字符串的过程，之后可以从中恢复对象的状态
函数`JSON.stringify()`和`JSON.parse()`。用于序列化和恢复 JavaScript 对象。
**JSON 语法是 JavaScript 语法的子集，不能表示所有 JavaScript 的值**。

- 可以序列化和恢复的值包括对象，数组、字符串、有限数值,true, false 和 null。
- `NaN`, `Infinity`和`-Infinity`会被序列化为 null。
- 日期对象会被序列化为 ISO 格式的日期字符串，但`JSON.parse()`会保持其字符串形式，不会恢复原始的日期对象。
- 函数、`RegExp`、`Symbol`和`Error`对象以及`undefined` 值不能被序列化或恢复。
- `JSON.stringify()`只序列化对象的可枚举自有可枚举属性。如果属性值无法序列化，则该属性会从输出的字符串中删除。

### 序列化和解析函数的第二个参数

`JSON.Stringify()` 和 `JSON.parse()`都接收可选的第二个参数， 用于自定义序列化及恢复操作。例如，可以通过这个参数指定要序列化哪些属性，或者在序列化或字符串化过程中如何转换某些值

```js
// 处理后还是不能序列化Symbol类型
JSON.stringify({ [Symbol.for('foo')]: 'foo' }, function (k, v) {
  if (typeof k === 'symbol') {
    return 'a symbol';
  }
});
```

## 对象方法

### toString 方法

返回调用它的对象的值的字符串。由于这个方法不会返回太多详细，所以很多类都会重新定义自己的 toString()方法

```js
{}.toString() // => [object object]
let point = {
  x:1,
  y:2,
  // 覆盖
  toString(){return `${this.x} ${this.y}`}
}
```

### toLocaleString() 方法

这个方法返回对象的本地化字符串表示，比如 Date 和 Number 类定义了自己的 toLocaleString()方法，尝试根据本地惯例格式化数值，日期和时间。

```js
let point = {
  x: 1000,
  y: 2000,
  toString: function () {
    return `(${this.x}, ${this.y})`;
  },
  toLocaleString: function () {
    return `(${this.x.toLocaleString()}, ${this.y.toLocaleString()})`;
  },
};

// 测试输出
point.toString(); // => "(1000, 2000)"
```

### :star:valueOf 方法

valueOf 方法会在会在 JavaScript 需要把对象转换为某些非字符串原始值(通常是数值)时被调用
比如 Date 类定义的 value0f()方法可以将日期转换为数值，这样就让日期对象可以通过＜和＞操作符来进行比较

```js
let point = {
  x: 3,
  y: 4,
  valueOf: function () {
    return Math.hypot(this.x, this.y);
  },
};

Number(point); // => 5: valueOf() 用于转换为数值
point > 4; // => true
point > 5; // => false
point < 6; // => true
```

## 对象属性扩展语法

### 简写属性

```js
let x = 1;
let o = {
  x,
};
```

### :star:计算属性名

ES6 之后接受表达式作为属性名

```js
// 定义常量
const PROPERTY_NAME = 'p1';

// 定义计算属性名的函数
function computePropertyName() {
  return 'p' + 2;
}

// 创建对象并使用计算属性名
let p = {
  [PROPERTY_NAME]: 1, // 属性名为"p1"，值为1
  [computePropertyName()]: 2, // 属性名为"p2"，值为2
};

// 计算结果
p.p1 + p.p2; // => 3
```

### :star:符号作为属性名

使用符号不是为了安全，而是为 JavaScript 对象定义安全的扩展机制。如果你从不受控的第三方代码得到一个对象，然后需要为该对象添加一些自己的属性，但又不希望你的属性与该对象原有的任何属性冲突，那就可以放心地使用符号作为属性名。而且，这样一来，你也不必担心第三方代码会意外修改你以符号命名的属性（当然，第三方代码可以使用`Object.getOwnPropertySymbol()`找到你使用的符号，然后修改或删除你的属性。这也是符号不是一种安全机制的原因）。

```js
// 定义一个Symbol类型的常量作为属性名
const extension = Symbol('my extension symbol');

// 创建一个对象，使用Symbol作为属性名
let o = {
  [extension]: {
    /* 这个对象中存储扩展数据 */
  },
};

// 为Symbol属性对应的对象添加属性
o[extension].x = 0; // 这个属性不会与o的其他属性冲突
```

### 简写方法

把函数定义为对象属性的时候函数称为方法

```js
// 定义常量
const METHOD_NAME = 'm';
const symbol = Symbol();

// 定义包含特殊方法的对象
let weirdMethods = {
  // 未简写的
  sum: function () {},
  // 简写的
  sum1() {},
  // 字符串，计算属性符号作为方法名
  'method With Spaces'(x) {
    return x + 1;
  }, // 带空格的方法名
  [METHOD_NAME](x) {
    return x + 2;
  }, // 使用常量作为方法名
  [symbol](x) {
    return x + 3;
  }, // 使用Symbol作为方法名
};

// 调用并测试这些方法
weirdMethods['method With Spaces'](1); // => 2
weirdMethods[METHOD_NAME](1); // => 3
weirdMethods[symbol](1); // => 4
```

:::tip 实现可迭代
使用符号作为方法名并没有看起来那么稀罕。为了让对象可迭代（以便在 for/of 循环中使用），必须以符号名 Symbol.iterator 为它定义一个方法
:::

### :star:访问器属性

当程序查询一个访问器属性的值时,JavaScript 会调用获取方法（不传参数）。这个方法的返回值就是属性访问表达式的值。当程序设置一个访问器属性的值时，JavaScript 会调用设置方法，传入赋值语句右边的值
如果一个属性既有获取方法也有设置方法，则该属性是一个可读写属性。如果只有一个获取方法，那它就是只读属性。如果只有一个设置方法，那它就是只写属性（这种属性通过数据属性是无法实现的），读取这种属性始终会得到 undefined。

```js
let o = {
  // 一个普通的数据属性
  dataProp: value,

  // 通过一对函数定义的一个访问器属性
  get accessorProp() {
    return this.dataProp;
  },
  set accessorProp(value) {
    this.dataProp = value;
  },
};
```
