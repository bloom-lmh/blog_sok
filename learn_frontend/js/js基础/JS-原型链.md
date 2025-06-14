# JS-原型链

[[toc]]

## 设置原型对象

### 通过改变构造函数的 prototype 属性

只有构造函数才有 prototype 属性,使用构造函数创建对象时对象会继承 prototype 属性所指对象，而这个对象就是所创建对象的原型。JS 是就是通过这种方法来实现继承的。

同时要注意构造函数仅仅只是类的展现形式，如果两个构造函数的 prototype 属性指向同一个对象，那么这两个构造函数创建的对象就继承同一原型，这两个对象属于同一类。共享这个原型对象的属性和方法。

:::tip instanceof
使用 instanceOf 可以判断某个对象是否为某个构造函数的实例同时会向原型链查找
:::

```js
function Person() {}

function Student() {}
function User() {}
// Student 和 User 继承 Person 的实例属性和方法
Student.prototype = new Person();
User.prototype = new Person();

let s = new Student(); // 实例化 Student
let u = new User(); // 实例化 User

console.log(s instanceof Person); // true
// 使用instanceof会向原型链查找
console.log(u instanceof User); // true
console.log(u instanceof Person); // true
```

### 通过 Object.create() 方法

使用 Object.create()方法可以创建一个新对象，并设置它的原型对象。

```js
function Person() {}
function Student() {}
Student.prototype = new Person();
let s1 = new Student();
let s2 = Object.create(new Person());
// s1 和 s2 都是 Person 的实例
console.log(s1 instanceof Person); // true
console.log(s2 instanceof Person); // true
```

### 通过 Object.setPrototypeOf() 方法

```js
function Person() {}
function Student() {}
Object.setPrototypeOf(Student.prototype, new Person());
let s1 = new Student();
console.log(s1 instanceof Student); // true
console.log(s1 instanceof Person); // true
```

:::warning
`Object.setPrototypeOf(obj, newParentProto);` // 性能差很差，不推荐使用
替代方案：初始化时用 `Object.create()`

:::

### 通过 `__proto__` 属性

所有对象都有 `[[Prototype]]` 内部属性,`__proto__ `是旧的非标准实现,指向原型对象，如果改变**proto**属性，会影响实例的原型。

```js
function Person() {}
function Student() {}
Object.setPrototypeOf(Student.prototype, new Person());
let s1 = new Student();
console.log(s1 instanceof Student); // true
console.log(s1 instanceof Person); // true
s1.__proto__ = {};
console.log(s1 instanceof Student); // false
console.log(s1 instanceof Person); // false
```

## 获取构造函数

### 通过对象的 constructor 属性获取

![constructor 属性](https://image-bucket-1307756649.cos.ap-chengdu.myqcloud.com/image/JS-%E5%8E%9F%E5%9E%8Bfg1.png)
构造函数 prototype 指向的原型对象都有一个 constructor 属性，指向它的构造函数。当使用构造函数创建对象时，该属性也会继承给创建的对象。

```js {4,6}
function Person() {}
let p = new Person();
// Person.prototype.constructor 指向构造函数
console.log(Person.prototype.constructor === Person); // true
// 同样这个属性也会继承给实例对象
console.log(p.constructor === Person); // true
```

当然强制更改 prototype 需要自定义 constructor 属性

```js {4}
function Person() {}
Person.prototype = {
  // 自定义constructor属性
  constructor: Person,
};
let p = new Person();
// Person.prototype.constructor 指向构造函数
console.log(Person.prototype.constructor === Person); // true
console.log(p.constructor === Person); // true
```

### 通过 new.target 属性获取

new.target 是 JavaScript 中的一个元属性（meta property），用于检测函数或构造方法是否是通过 new 运算符被调用的,当构造函数是通过 new 调用的会返回该构造函数的引用，否则返回 undefined。
运用场景如下:
::: code-group

```js [检测构造函数是否被 new 调用]
function Person(name) {
  if (!new.target) {
    throw new Error('必须使用 new 调用构造函数');
  }
  this.name = name;
}

// 正确用法
const p1 = new Person('Alice');

// 错误用法（会抛出错误）
const p2 = Person('Bob'); // Error: 必须使用 new 调用构造函数
```

```js [实现构造函数和工厂函数]
function Circle(radius) {
  if (!new.target) {
    return new Circle(radius);
  }
  this.radius = radius;
}

// 两种调用方式都有效
const c1 = new Circle(5);
const c2 = Circle(10);
```

```js [在类继承中识别基类]
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('Shape 是抽象类，不能直接实例化');
    }
  }
}
class Circle extends Shape {}
// 正确
const circle = new Circle();
// 错误（会抛出错误）
const shape = new Shape(); // Error: Shape 是抽象类...
```

:::
当子类构造函数被调用并使用 super()调用父类构造函数时，该父类构造函数通过 new.target 可以获取子类构造函数。

```js
class Parent {
  constructor() {
    console.log('Parent new.target:', new.target.name);
  }
}

class Child extends Parent {
  constructor() {
    super();
    console.log('Child new.target:', new.target.name);
  }
}

const c = new Child();
// 输出:
// Parent new.target: Child
// Child new.target: Child
```

## 获取原型对象

### 通过\_\_proto\_\_属性

所有对象都有 [[Prototype]] 内部属性，指向它的原型对象。可以通过\_\_proto\_\_属性获取原型对象。

```js {7}
function Person() {}
function Student() {}
// 设置 Student 的原型为 Person 的实例
Student.prototype = new Person();
let s = new Student();
// 所有对象都有 [[Prototype]] 内部属性，指向它的原型对象。
console.log(s.__proto__ === Student.prototype); // true
```

### 通过 Object.getPrototypeOf() 方法

`__proto__`属性是旧特性，Object.getPrototypeOf() 方法可以获取对象的原型对象。

```js {5}
function Person() {}
function Student() {}
Object.setPrototypeOf(Student.prototype, new Person());
let s1 = new Student();
console.log(Object.getPrototypeOf(s1)); // Person {}
```

### 通过 constructor.prototype 属性

```js {5}
function Person() {}
function Student() {}
Object.setPrototypeOf(Student.prototype, new Person());
let s1 = new Student();
console.log(Student.prototype); // Person {}
```

## 对象原型判断

### instanceof 操作符

instanceof 操作符可以用来检查对象是否为原型链上某个原型的实例

```js
function Person() {}
const p = new Person();

console.log(p instanceof Person); // true
console.log(p instanceof Object); // true
```

:::tip 构造函数的本质
构造函数本质上不是类的基本标识，原型才是类的基本标识，构造函数只是类的外在表现
:::

### isPrototypeOf() 方法

isPrototypeOf 方法可以直接测试某个原型对象是否出现在某个对象的原型链上。

```js
function Person() {}
const p = new Person();

console.log(Person.prototype.isPrototypeOf(p)); // true
console.log(Object.prototype.isPrototypeOf(p)); // true
```

## 对象的原型链

### 基于原型链的属性查询和设置

1. 查询属性时若没有该自有属性则会查询原型链
2. 设置属性时若没有该自有属性但原型链上有且原型链上的该属性不是只读属性则添加为自有属性，若原型上该属性是只读的则不允许设置该属性

```js
// 1. 创建一个手机原型
const phonePrototype = {
  brand: '默认品牌',
  price: 1000,
};

// 把price变成只读的
Object.defineProperty(phonePrototype, 'price', {
  writable: false, // 设置price为只读
});

// 2. 创建一个新手机
const myPhone = Object.create(phonePrototype);

// 3. 查看属性（会查原型链）
console.log(myPhone.brand); // "默认品牌"（来自原型）
console.log(myPhone.price); // 1000（来自原型）

// 4. 修改普通属性（brand）
myPhone.brand = '苹果'; // 原型属性可写，直接添加为自有属性
console.log(myPhone.brand); // "苹果"（现在是自有属性）
console.log(phonePrototype.brand); // "默认品牌"（原型没变）

// 5. 尝试修改只读属性（price）
myPhone.price = 2000; // 报错！因为原型上的price是只读的
console.log(myPhone.price); // 还是1000（没改成功）

// 6. 添加新属性
myPhone.color = '黑色'; // 直接添加为自有属性
console.log(myPhone.color); // "黑色"
```

### 原型链的终点

原型链的终点为 null

```js
function FnPerson() {
  console.log(new.target);
  console.log(new.target.name);
}
class ClPerson {
  constructor() {
    console.log(new.target);
    console.log(new.target.name);
  }
}
let p1 = new FnPerson();
let p2 = new ClPerson();
console.log(p1); // FnPerson {}
console.log(FnPerson.prototype); // {} => Object构造函数的实例
console.log(ClPerson.prototype); // {} => Object构造函数的实例
// {}是Object构造函数的实例也就是说{}是以Object.prototype为原型的实例
console.log(Object.prototype); //  [Object: null prototype] {} 是一个没有原型链的对象
// 其原型链的终点是null
console.log(Object.prototype.__proto__); // null

let o = {};
console.log(o.__proto__ === Object.prototype); // true
```

![原型链的终点](https://image-bucket-1307756649.cos.ap-chengdu.myqcloud.com/image/20250614201925855.png)

## 类及其本质

### 类声明和定义

类声明也有语句和表达式 class 声明体中的代码默认处于严格模式，**类声明不会提升**
::: code-group

```js [类声明]
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

```js [类定义]
const Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
```

:::

### 子类创建与 super 关键字

- 如果使用 extends 关键字定义了一个类，那么这个类的构造函数必须使用 super()调用父类构造函数。
- 如果没有在子类中定义构造函数，解释器会自动为你创建一个。这个隐式定义的构造函数会取得传给它的值，然后把这些值再传给 super()
- 在通过 super()调用父类构造函数之前，不能在构造函数中使用 this 关键字。这条强制规则是为了确保父类先于子类得到初始化。

### 类的私有字段设置

可以为类设置私有字段，私有字段以#开头，只能在类的内部访问，外部不能直接访问。

```js
class Person {
  // 私有字段（以#开头）
  #age = 0;

  constructor(name, age) {
    this.name = name; // 普通公共字段
    this.#age = age; // 设置私有字段
  }

  // 访问私有字段的方法
  getAge() {
    return this.#age;
  }

  // 修改私有字段的方法
  setAge(newAge) {
    if (newAge > 0) {
      this.#age = newAge;
    }
  }
}

const john = new Person('John', 30);

console.log(john.name); // "John"（公共字段可访问）
console.log(john.#age); // 报错！私有字段外部不能直接访问
console.log(john.getAge()); // 30（通过方法访问）
john.setAge(31); // 通过方法修改
```

### 类的静态代码块

ES2022+ 新特性加入了静态代码块，在类初始化的时候执行静态代码块

```js
class Person {
  static {
    console.log('类初始化');
  }
}
```

## 类和构造函数

### 类的本质是构造函数的语法糖

```js
function FnPerson() {}
class ClPerson {}
// 类本质上是构造函数的语法糖
console.log(FnPerson.prototype); //{}
console.log(ClPerson.prototype); // {}

console.log(typeof FnPerson); // function
console.log(typeof ClPerson); // function
```

### 类和构造函数的原型

所有类和构造函数的原型是 Function.prototype

```js
class Person {
  static {
    console.log('类初始化');
  }
}
function Student() {}
console.log(Person.__proto__ === Function.prototype); // true
console.log(Student.__proto__ === Function.prototype); // true
```

### :star:类和和构造函数的区别

1. 类字段会遮蔽原型链上的同名属性(除非使用 delete 删除类字段)，而构造函数通过 .prototype 设置的属性会被所有实例共享。

```js
class Animal {
  sound = '实例字段值'; // 类字段（优先级高）
}
Animal.prototype.sound = '原型属性值'; // 原型属性

const a = new Animal();
console.log(a.sound); // "实例字段值"（类字段优先）

// 对比构造函数
function Plant() {
  this.type = '实例属性';
}
Plant.prototype.type = '原型属性';

const p = new Plant();
console.log(p.type); // "实例属性"（构造函数实例属性优先）
```

2. 类每个实例都有自己的属性副本，而构造函数实例共享通过通过 .prototype 添加的属性。所以构造函数所占内存小

```js
// 类（每个实例有独立副本）
class Car {
  version = 'v1.0'; // 类字段
}
const c1 = new Car();
const c2 = new Car();
c1.version = 'v2.0';
console.log(c2.version); // "v1.0"（互不影响）

// 构造函数（原型属性共享）
function Phone() {}
Phone.prototype.os = 'Android';
const p1 = new Phone();
const p2 = new Phone();
p1.__proto__.os = 'iOS'; // 修改原型
console.log(p2.os); // "iOS"（所有实例受影响）
```

3. 添加属性和方法类在其内部而构造函数需要通过 prototype

```js
// 类（一体化定义）
class Person {
  name = '匿名'; // 类字段
  sayHi() {
    console.log('Hi');
  } // 类方法
}

// 构造函数（分散定义）
function Animal() {
  this.name = '匿名'; // 实例属性
}
Animal.prototype.sayHi = function () {
  // 原型方法
  console.log('Hi');
};
```

4. 类中通过 super 来引用父类，而构造函数需要通过 constructor.call(this)来调用父类构造函数

```js
// 类继承
class Parent {
  constructor(name) {
    this.name = name;
  }
}
class Child extends Parent {
  constructor(name, age) {
    super(name); // 调用父类构造
    this.age = age;
  }
}

// 构造函数继承
function Parent(name) {
  this.name = name;
}
function Child(name, age) {
  Parent.call(this, name); // 手动调用父构造
  this.age = age;
}
Child.prototype = Object.create(Parent.prototype);
```
