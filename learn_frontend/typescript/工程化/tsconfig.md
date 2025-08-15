# tsconfig 配置讲解

[[toc]]

## useDefineForClassFields

### 属性遮蔽

在介绍这个字段时，要先讲一下属性遮蔽，所谓属性遮蔽就是：先查找实例自身再查原型链，如果一个属性在实例自身和原型链中都有，那么优先查找实例自身的属性而不会查找原型链的属性。比如下面的代码：

```ts
class Animal {
  o = 'animal';
  age = 1;
}
class Person extends Animal {
  o = null;
}
console.log(new Person().o); // null 属性遮蔽,因为person实例有o属性
console.log(new Person().age); // 1 向上查找原型链
console.log(new Animal().o); // animal
```

### 属性赋值

1. 属性赋值时若原型有对应的访问器属性实际上是会调用原型的访问器属性，实例本身没有值，比如如下的代码：

```ts
class Person {
  age!: number; // 类型声明，并不是真正的实例属性，编译后会消除
  constructor(age: number) {
    this.age = age;
  }
}
let a = 1;
Object.defineProperty(Person.prototype, 'age', {
  get() {
    return a;
  },
  set(val) {
    a = val;
  },
});

const p1 = new Person(20);
console.log(a); // 20 调用了set方法，修改了原型上的age属性
console.log(p1.age); // 20  p1没有age属性，age属性是属于原型的，初始化的时候会调用的原型的setter方法，修改了原型上的age属性
console.log(Person.prototype.age); // 20
```

解释：当使用构造器创建实例时，实例还不具有`age`属性,所以`this.age = age`会向上查找原型链,结果发现原型链上有`setter`方法，就调用原型链的`setter`方法,导致`a`的值变为了 20，当 p1 调用`age`时也会触发原型的`getter`返回`a`

2. 如果原型没有访问器属性，则会为实例添加数据属性，比如如下的代码：

```js
class Person {
  age!: number; // 类型声明，并不是真正的实例属性，编译后会消除
  constructor(age: number) {
    this.age = age;
  }
}
Object.defineProperty(Person.prototype, 'age', {
  value: 20,
  writable: true,
});

const p1 = new Person(10);
console.log(p1.age); // 10 实际上为p1实例添加了一个age属性，值为10，不会修改原型
console.log(Person.prototype.age); // 20
```

::: tip 总结
赋值操作 this.age = x 的处理流程：

1. 如果实例自身有 age 属性 → 直接修改
2. 如果实例没有，但原型有：

   - 如果原型属性是访问器 → 调用 setter
   - 如果原型属性是数据属性且 writable: true → 在实例上创建新属性
   - 如果原型属性是数据属性且 writable: false → 静默失败/报错

3. 如果整个原型链都没有 → 在实例上创建新属性

:::

### defineProperty 绕过 setter

使用`Object.defineProperty`方法不会触发`setter`，而是会为实例添加数据属性

```ts
class Person {
  age!: number;
}
let a = 1;
Object.defineProperty(Person.prototype, 'age', {
  get() {
    return a;
  },
  set(val) {
    a = val;
  },
});

const p1 = new Person();
// 定义p1上的数据属性age
Object.defineProperty(p1, 'age', {
  value: 20,
  writable: true,
  enumerable: true,
  configurable: true,
});

console.log(p1.age); // 20 因为p1上有age数据属性，所以不会访问原型链上的get方法
console.log(Person.prototype.age); // 1
```

### useDefineForClassFields 的影响

当 useDefineForClassFields 设置为 true 时，TypeScript 会使用`defineProperty`在构造函数中定义类字段。比如你编写这样的 ts 代码：

```typescript
class TestService {
  tc2!: TestComponent;
}
```

编译后

```js
// 编译后 JS
class TestService {
  constructor() {
    Object.defineProperty(this, 'tc2', {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0, // 即 undefined
    });
  }
}
```

如果你设置为`false`,那么编译后的代码为：

```js
// 编译后 JS
class TestService {
  constructor() {
    this.tc2 = undefined;
  }
}
```

也就是说在开启 `useDefineForClassFields` 的情况下，通过类创建出来的实例真正的具有了`tc2`属性，这会遮蔽原型的同名属性，不会触发原型的`get`和`set`方法。
而不开启 `useDefineForClassFields` 的情况下，`this.tc2 = undefined;`实际上会触发原型对象上的`tc2`属性的修改

### 实际运用

当我们实现`ioc`依赖注入的时候，就需要考虑这个属性了，因为使用装饰器进行依赖注入时是发生在构造函数被调用之前的，并且一般来说是在原型上定义了属性，所以如果`useDefineForClassFields`设置为`true`，那么被注入的依赖值将会被实例上定义的同名属性给屏蔽，导致值仅仅注入到原型属性上
