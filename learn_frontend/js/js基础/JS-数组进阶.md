# JS-数组进阶

[[toc]]

## 数组和对象

数组本质上是一个对象，其索引是属性名

- 索引是属性
- 属性不一定是索引，小于 2^32-1 的非负整数作为属性名才是索引
- JS 会将数值索引转换为字符串

```js
let o = {}; // 创建一个普通对象
o[1] = 'one'; // 通过整数索引一个值
o['1']; // => "one"，数值和字符串属性名是同一个

// 数组/对象属性赋值示例
let a = [];

a[-1.23] = true; // 这样会创建一个属性名为 "-1.23" 的属性
a['1000'] = 0; // 这是数组中第1001个元素（索引从0开始）
a[1.0] = 1; // 数组索引1，相当于 a[1] = 1

// 验证赋值结果
console.log(a[-1.23]); // true
console.log(a[1000]); // 0
console.log(a[1]); // 1
```

## 稀疏数组

稀疏数组是指 ​**length 属性大于实际元素个数**​ 的数组，其中某些索引位置未被赋值（即"空洞"）。这些空缺的索引不会占用内存空间，访问它们会返回 undefined。

```js
let a = new Array(5); // 没有元素，但a.length是5
a = []; // 创建一个空数组，此时length = 0
a[1000] = 0; // 赋值增加了一个元素，但length变成了1001

let a1 = [,]; // 这个数组没有元素，但length是1
let a2 = [undefined]; // 这个数组有一个undefined元素
0 in a1; // => false: a1在索引0没有元素
0 in a2; // => true: a2在索引0有undefined值
```

以下方法**不会忽略稀疏数组的空洞**（即会保留或处理空洞）：

| 方法               | 行为说明                                               |
| ------------------ | ------------------------------------------------------ |
| **`for...of`**     | 遍历时会将空洞视为 `undefined`（但实际索引不存在）。   |
| **`slice()`**      | 返回的新数组会保留原始空洞。                           |
| **`concat()`**     | 合并后的数组会保留原始空洞。                           |
| **`Array.from()`** | 默认保留空洞（可通过映射函数处理）。                   |
| **`[...spread]`**  | 扩展运算符会保留空洞。                                 |
| **`join()`**       | 将空洞视为空字符串（如 `[1, ,3].join()` → `"1,,3"`）。 |
| **`toString()`**   | 同 `join()`，空洞变为空字符串（`"1,,3"`）。            |
| **`fill()`**       | 可以填充空洞（如 `[1, ,3].fill(0)` → `[1, 0, 3]`）。   |
| **`copyWithin()`** | 复制时会保留空洞。                                     |

## 数组长度

每个数组都有长度属性,这让数组有别于常规 JavaScript 对象

- 如果如果给一个索引为 i 的数组元素赋值，而 i 大于或等于数组当前的 length，则数组的 length 属性会被设置为 1+1。
- 如果将 length 属性缩小为小于当前值的非负整数 n，则任何索引大于等于 n 的数组元素都会从数组中删除
- 以把数组的 length 属性设置为一个大于其当前值的值。这样做并不会向数组中添加新元素，只会在数组末尾创建一个稀疏的区域

```js
let a = [1, 2, 3, 4, 5]; // 先定义一个包含5个元素的数组

a.length = 3; // a变成[1, 2, 3]
a.length = 0; // 删除所有元素。a是[]
a.length = 5; // 长度是5，但没有元素，类似new Array(5)
```

## 类数组

类数组（Array-like）​​ 是指具有数字索引和 length 属性，但不具备数组方法（如 push、pop、forEach 等）的对象。它们看起来像数组，但不能直接使用数组的方法。也就是说不继承于 Array.prototype

- 有数字索引（0, 1, 2...）​​
- ​ 有 length 属性 ​
- ​ 没有数组的方法 ​（如 push、slice、map 等）

一句话总结类数组就是有 lenght 属性但是没有数组方法的对象。

::: code-group

```js [函数的 arguments 对象]
function example(a, b) {
  console.log(arguments); // 类数组：{ 0: a, 1: b, length: 2 }
  console.log(Array.isArray(arguments)); // false
}
example(1, 2);
```

```js [DOM 元素集合]
const divs = document.querySelectorAll('div'); // NodeList（类数组）
console.log(divs.length); // 可访问 length
console.log(divs.forEach); // undefined（没有数组方法）
```

```js [字符串（String）​]
const str = 'hello';
console.log(str[0]); // "h"（数字索引）
console.log(str.length); // 5
console.log(str.map); // undefined（不是真正的数组）
```

:::
