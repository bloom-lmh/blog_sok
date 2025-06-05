# Js 基于原型的继承

## 原型

每一个 Js 对象都有一个与之关联的对象，这个对象就叫做对象的原型对象。
使用 new 关键字和构造函数创建的对象，都会以构造函数 prototype 属性的值作为它们的原型
也就是说 new Object()创建的对象以 Object.prototype 为原型
{} 对象字面量也以 Object.prototype 为原型

几乎所有对象都有原型，但只有少数对象有 prototype 属性。
Object.prototype 没有原型，多数原型对象都是常规对象都有自己的原型。大多数内置构造函数都是继承自 Object.prototype

## 基于原型链的查询和设置规则
