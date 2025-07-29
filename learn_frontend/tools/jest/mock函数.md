# Mock 函数

[[toc]]

## 基本概念

模拟函数允许你通过删除函数的实际实现来测试代码之间的连接，捕获对该函数的调用（以及传递的参数），在实例化构造函数时捕获实例，以及允许在测试时配置返回值。

## 基础 Mock 函数

```js
test('测试 mock 函数', () => {
  const mockFn = jest.fn();

  // 调用 mock 函数
  mockFn('hello', 42);

  // 验证调用情况
  expect(mockFn).toHaveBeenCalled();
  expect(mockFn).toHaveBeenCalledWith('hello', 42);
  expect(mockFn).toHaveBeenCalledTimes(1);
});
```

## Mock 返回值

### 固定返回值

```js
const mockFn = jest.fn().mockReturnValue('default');

test('测试返回值', () => {
  expect(mockFn()).toBe('default');
});
```

### 链式返回值

```js
const mockFn = jest
  .fn()
  .mockReturnValueOnce('first')
  .mockReturnValueOnce('second')
  .mockReturnValue('default');

test('测试链式返回值', () => {
  expect(mockFn()).toBe('first');
  expect(mockFn()).toBe('second');
  expect(mockFn()).toBe('default');
  expect(mockFn()).toBe('default'); // 继续返回默认值
});
```

### Mock 实现

### 自定义实现

```js
const mockFn = jest.fn().mockImplementation((a, b) => a + b);

test('测试自定义实现', () => {
  expect(mockFn(1, 2)).toBe(3);
});
```

### 异步实现

```js
const asyncMock = jest.fn().mockResolvedValue('data');

test('测试异步实现', async () => {
  const result = await asyncMock();
  expect(result).toBe('data');
});
```

## Mock 模块

### 自动 mock

```js
jest.mock('axios'); // 自动 mock axios 模块

test('mock 模块', async () => {
  const axios = require('axios');
  axios.get.mockResolvedValue({ data: 'mock data' });

  const result = await axios.get('/api');
  expect(result.data).toBe('mock data');
});
```

### 手动 mock

```js
// __mocks__/user.js
module.exports = {
  getUser: jest.fn().mockReturnValue({ id: 1, name: 'Mock User' }),
};

// 测试文件
jest.mock('./user');

test('手动 mock', () => {
  const user = require('./user');
  expect(user.getUser()).toEqual({ id: 1, name: 'Mock User' });
});
```

## Spy 函数

### 监视现有函数

```js
const obj = {
  method: () => 'original',
};

test('使用 spy', () => {
  const spy = jest.spyOn(obj, 'method');

  obj.method.mockReturnValueOnce('mocked');
  expect(obj.method()).toBe('mocked');

  spy.mockRestore(); // 恢复原始实现
  expect(obj.method()).toBe('original');
});
```

## Mock 清除和重置

```js
const mockFn = jest.fn();

// 每次测试后清除 mock 状态
afterEach(() => {
  mockFn.mockClear();
});

// 或完全重置 mock
mockFn.mockReset();
```

## 高级用法

### Mock 函数名称

```js
const mockFn = jest.fn().mockName('myMockFunction');
```

### Mock 函数实现细节

```js
const mockFn = jest.fn((a, b) => a * b);

test('测试实现细节', () => {
  mockFn(2, 3);
  expect(mockFn.mock.results[0].value).toBe(6);
});
```

关于.mock 属性

```js
// 该函数被精确调用了一次
expect(someMockFunction.mock.calls).toHaveLength(1);

// 函数第一次调用的第一个参数是 'first arg'
expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

// 函数第一次调用的第二个参数是 'second arg'
expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

// 函数第一次调用的返回值是 'return value'
expect(someMockFunction.mock.results[0].value).toBe('return value');

// 函数被调用时的 this 上下文是 element 对象
expect(someMockFunction.mock.contexts[0]).toBe(element);

// 该函数被实例化了恰好两次
expect(someMockFunction.mock.instances.length).toBe(2);

// 该函数第一次实例化返回的对象
// 具有一个值为 'test' 的 name 属性
expect(someMockFunction.mock.instances[0].name).toBe('test');

// 函数最后一次调用的第一个参数是 'test'
expect(someMockFunction.mock.lastCall[0]).toBe('test');
```
