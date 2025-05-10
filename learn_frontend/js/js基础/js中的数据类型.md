# js 中的数据类型

[[toc]]

## 基本数据类型

原始类型：number 、string、boolean、null、undefined、symbol

### Number

#### 整形字面量

```js
let a = 255;
let b = 0xff; // =>255 十六进制
let c = 0o377; // =>255 八进制
let d = 0b11111111; // =>255 二进制
```

#### 浮点型字面量

基本语法：`[digits][.digits][(E|e)[(+|-)]digits]` e 表示 10 为底

:::tip 下划线的技巧
可以用下划线将数值字面量分隔为容易看清的数字段:
数值字面量中像这样添加下划线还没有成为正式的 JavaScript 标准。但这个特性已经进入标准化流程的后期，而且已经被所有主流浏览器以及 Node 实现了。

```js
let billion = 1_000_000_000; //以下划线作为千分位分隔符
let bytes = 0x89_ab_cd_ef; //作为字节分隔符
let bits = 0b0001_1101_0111; // 作为半字节分隔符
let fraction = 0.123_456_789; // 也可以用在小数部分
```

:::

#### 二进制浮点数舍入错误

0.1 在二进制中是无限循环小数（类似 1/3 在十进制中的表现），存储时会被舍入，导致精度丢失。二进制浮点数舍入错误是由于 ​IEEE 754 双精度浮点数标准的固有特性导致的

```js
console.log(0.2 - 0.1); // 0.1
console.log(0.3 - 0.2); // 0.09999999999999998
```

::: tip 二进制浮点数舍入错误的解决方案

1. 使用 toFixed() 将数字四舍五入到指定的小数位，返回字符串：

```js
const sum = 0.1 + 0.2;
console.log(sum.toFixed(2)); // "0.30"
console.log(parseFloat(sum.toFixed(2))); // 0.3（转换为数字）
```

2. ​ 转换为整数运算

```js
// 计算 0.1 + 0.2
const result = (0.1 * 10 + 0.2 * 10) / 10;
console.log(result); // 0.3
```

3. ​ 使用高精度计算库

:::

#### BigInt

BigInt 表示 64 位的整数，`123n`

### :star: String

#### 常用的一些函数

::: code-group

```js [取得字符串的一部分]
let s1 = 'what is javascript';
// 取得字符串的一部分
console.log(s1.substring(1, 3)); // =>ha:截取是从第一位开始到第三位结束
console.log(s1.slice(1, 3)); // =>ha:截取是从第一位开始到第三位结束
console.log(s1.slice(-3)); // =>ipt:截取从倒数第三位开始到最后一位结束
console.log(s1.slice(1)); // =>hat is javascript:截取是从第一位开始到第最后一位结束
let s2 = 'hello,world';
console.log(s2.split(',')); // =>["hello","world"] 以,为分界将字符串拆为数组
```

```js [搜索字符串函数]
let s1 = 'what is javascript';
console.log(s1.indexOf('i')); // =>5:i在what is javascript中第一次出现的位置
console.log(s1.indexOf('i', 6)); // =>15:从第6个位置以后开始寻找i第一次出现的位置
console.log(s1.indexOf('ha')); // =>1:子串ha在主串中第一次出现的位置
console.log(s1.lastIndexOf('i')); // =>15:i字符在主串中最后一次出现的位置
```

```js [ES6及之后版本中的布尔值搜索函数]
let s1 = 'what is javascript';
// ES6之后提供了一些字符串搜索函数，这些函数返回的不是下标而是boolean值
console.log(s1.startsWith('wha')); // =>true:判断字符串是否以wha开头
console.log(s1.endsWith('!')); // =>false:判断字符串是否以!结尾
console.log(s1.includes('ja')); // =>true：判断字符串是否包含ja子串
```

```js [字符串修改]
let s1 = 'what is javascript';
let s3 = s1.replace('javascript', 'java');
console.log(s3); // =>what is java 将javascript替换为java
let s4 = s1.toUpperCase();
console.log(s4); // =>WHAT IS JAVA 将字符串字符全转换为大写
let s5 = s4.toLowerCase();
console.log(s5); // =>what is java 将字符串字符全转换为小写
let s6 = s1.normalize(); // Unicode NFC归一化：ES6新增
console.log(s6);
let s7 = s1.normalize('NFD'); // Unicode NFD归一化：还有NFKC 和 NFKD
```

```js [访问字符串的个别字符]
let s1 = 'what is javascript';
console.log(s1.charAt(0)); // =>w 获取字符串第一个字符
console.log(s1.charAt(s1.length - 1)); // =>t 获取字符串最后一个字符
console.log(s1.charCodeAt(0)); // =>119 获取指定位置的16位数值
console.log(s1.codePointAt(0)); // =>119 获取指定位置的16位数值
console.log(s1[0]); // =>w js的字符串可以被当作只读数组通过[]来进行访问
```

```js [ES2017新增的字符串填充函数]
console.log('x'.padStart(3)); // =>"  x" 这个字符串包含三位，不够的用空格填充在字符串开头
console.log('x'.padEnd(3)); // =>"x  " 这个字符串包含三位，不够的用空格填充在字符串结尾
console.log('x'.padStart(3, '*')); // =>"**x" 这个字符串包含三位，不够的用*填充在字符串开头
console.log('x'.padEnd(3, '-')); // =>"x**" 这个字符串包含三位，不够的用-填充在字符串结尾
```

```js [删除空格字符]
let s8 = s1.concat('!');
console.log(s8); // =>what is javascript!  将!拼接在字符串后
console.log('x'.repeat(2)); // =>"xx" x字符重复2次生成的字符串
let s9 = (s1 += '?');
console.log(s9); // =>what is javascript?  将?拼接在字符串后
```

```js [字符串拼接]
let s8 = s1.concat('!');
console.log(s8); // =>what is javascript!  将!拼接在字符串后
console.log('x'.repeat(2)); // =>"xx" x字符重复2次生成的字符串
let s9 = (s1 += '?');
console.log(s9); // =>what is javascript?  将?拼接在字符串后
```

:::

#### 标签化模板字面量

模板字面量有一个强大但不太常用的特性：**如果在开头的反引号前面有一个函数名(标签)，那么模板字面量中的文本和表达式的值将作为参数传给这个函数**。“标签化模板字面量”(tagged template literal)的值就是这个函数的返回值。这个特性可以用于先对某些值进行 HTML 或 SQL 转义，然后再把它们插入文本。

```js
function log(strings, ...values) {
  console.log('Static parts:', strings);
  console.log('Dynamic values:', values);
}

const name = 'Alice';
const age = 30;
log`Name: ${name}, Age: ${age}`;
// 输出:
// Static parts: ["Name: ", ", Age: ", ""]
// Dynamic values: ["Alice", 30]
```

### null

**对 null 使用 typeof 操作符返回字符串"object"**,表明可以将 null 看成一种特殊对象，表示“没有（空）对象”但在实践中，null 通常被当作它自己类型的唯一成员，可以用来表示数值、字符串以及对象“没有值”。

### undefined

undefined 表示—种更深层次的不存在。

- 变量的值未初始化时就是 undefined
- 在查询不存在的对象属性或数组元素时也会得到 undefined
- 没有明确返回值的函数返回的值是 undefined
- 没有传值的函数参数的值也是 undefined

**undefined 是一个预定义的全局常量**（而非像 null 那样的语言关键字，不过在实践中这个区别并不重要），**这个常量的初始化值就是 undefined**。
**对 undefined 应用 typeof 操作符会返回"undefined"**，表示这个值是该特殊类型的唯一成员

### :star: Boolean

JavaScript 的任何值都可以转换为布尔值。

#### 假性值

下面的这些值都会转换为（因而可以被用作）布尔值 false：

```js
undefined;
null;
0 - 0;
NaN;
(''); //空字符串
```

#### 真性值

所有其他值，包括所有对象（和数组）都转换为（可以被用作）布尔值 true。false 和可以转换为它的 6 个值有时候也被称为假性值（falsy）,而所有其他值则被称为真性值（truthy）。在任何 JavaScript 期待布尔值的时候，假性值都可以当作 false,而真性值都可以当作 true。

#### 唯一 API

布尔值有一个 `toString()`方法，可用于将自己转换为字符串"true"或"false”。除此之外，布尔值再没有其他有用的方法了

### Symbol

Symbol 主要用于作为对象的属性名，来防止变量污染

#### `Symbol()`函数

永远不会返回同样的值

```js
let strname = 'string name';
let symname = Symbol('propname');
console.log(typeof strname); // => "string"： strname 是字符串
console.log(typeof symname); // => "synbol": synnane 是符号
let o = {}; // 创建一个新对象
o[strname] = 1; // 使用字符串名定义一个属性
o[symname] = 2; // 使用符号名定义一个属性
console.log(o[strname]); // => 1：访问字符串名字的属性
console.log(o[symname]); // => 2：访问符号名字的属性
```

#### `Symbol.for()`函数

返回相同的值，Symbol.keyFor()

```js
let s1 = Symbol.for('name');
let s2 = Symbol.for('name');
console.log(Symbol.keyFor(s1)); // name
console.log(Symbol.keyFor(s2)); // name
console.log(s1.toString()); // Symbol(name)
cons2ole.log(s2.toString()); // Symbol(name)
console.log(s1 === s2); // =>ture 使用Symbol.for()函数若传入字符串相同则返回相同的符号
let s3 = Symbol('name');
let s4 = Symbol('name');
console.log(s3 === s4); // =>false 使用Symbol()函数返回的一定是不同的符号，哪怕传入字符串相同
```

## 引用数据类型

所谓的引用数据类型就是除了基本数据类型外的其它所有数据类型，统称为对象类型

- 对象类型：除了原始类型其它类型都叫对象类型，包括函数、类、Set、Array 等
  - 普通对象：命名值的无序集合
  - 特殊对象：例如数组这样的数字值的有序集合
  - 全局对象：globalThis

### 全局对象 globalThis

#### 全局对象介绍

这里要介绍一下全局对象 globalThis，全局对象的属性是全局性定义的标识符，可以在 JavaScript 程序的任何地方使用。**JavaScript 解释器启动后（或每次浏览器加载新页面时），都会创建一个新的全局对象并为其添加一组初始的属性**，定义了:

- undefined、 Infinity 和 NaN 这样的全局常量；
- isNaN(), parselnt()和 eval()这样的全局函数;
- Date()、RegExp()、String()、Object()和 Array()这样的构造函数;
- Math 和 JSON ,这样的全局对象。

```js
// 全局对象上的全局常量
console.log(globalThis.Infinity);
// 全局对象的构造函数,创建数组
let arr = new globalThis.Array(1, 2);
console.log(arr);
// 全局对象上的全局对象
let obj = {
  name: '小明',
  age: 19,
};
let jsonStr1 = globalThis.JSON.stringify(obj);
// 当然也可以省略全局对象globalThis,因为默认会调用全局对象globalThis中的JSON对象的stringify方法
let jsonStr2 = JSON.stringify(obj);
console.log(jsonStr1);
console.log(jsonStr2);
```

#### 获取全局对象

1. 在 Node 中，全局对象有一个名为 global 的属性，其值为全局对象本身，因此在 Node 程序中始终可以通过 global 来引用全局对象。
2. 在浏览器中，Window 对象对浏览器窗口中的所有 JavaScript 代码而言，充当了全局对象的角色。这个全局的 Window 对象有一个自引用的 window 属性，可以引用全局对象。
3. 工作线程有自己不同的全局对象（不是 Window）,工作线程中的代码可以通过 self 来引用它们的全局对象。
4. ES2020 最终定义了 globalThis 作为在任何上下文中引用全局对象的标准方式。2020 年初，所有现代浏览器和 Node 都实现了这个特性。

### 其它引用数据类型

包括 `Object,Array,Function` 后续有更为详细的介绍

## 基本数据类型和引用数据类型的存储区别

### 基本数据类型

存储在栈中

```js
let a = 10;
let b = a;
b = 20;
console.log(a); //10
```

a 的值为一个基本类型，是存储在栈中，将 a 的值赋给 b，虽然两个变量的值相等，但是两个变量保存了两个不同的内存地址
![基本数据类型](https://s3.bmp.ovh/imgs/2025/05/10/b84922e17021c32c.png)

### 引用数据类型存储在堆中

引用类型数据存放在堆中，每个堆内存对象都有对应的引用地址指向它，引用地址存放在栈中。

```js
let obj1 = {};
let obj2 = obj1;
obj2.name = 'xx';
console.log(obj1.name); // xx
```

obj1 是一个引用类型，在赋值操作过程汇总，实际是将堆内存对象在栈内存的引用地址复制了一份给
了 obj2,实际上他们共同指向了同一个堆内存对象，所以更改 obj2 会对 0bj1 产生影响
下图演示这个引用类型赋值过程
![引用数据类型](https://s3.bmp.ovh/imgs/2025/05/10/64c76744282b877d.png)
