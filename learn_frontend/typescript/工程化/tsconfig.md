# tsconfig 配置讲解

[[toc]]

## 严格控制类型导入语法-verbatimModuleSyntax

### 基本概念

`verbatimModuleSyntax` 是 TypeScript 5.0+ 引入的一个新的编译器选项，它用于更严格地控制 ES 模块的导入/导出语法，确保 TypeScript 发出的 JavaScript 代码与源码中的模块语法完全一致。其功能如下：

- 禁止 TypeScript 在编译时自动转换模块语法 ​（如 `import type → `import`）。
- 确保编译后的 JS 代码和 TS 源码的模块语法完全一致，避免潜在的运行时问题。
- 与 `isolatedModules: true` 一起使用，适合严格的 ESM 环境（如浏览器原生 ESM、Bun、Deno）

### 类型导入存在的问题

在旧版 TypeScript 中，以下代码会被转换：

```ts
import type { User } from './types'; // TS 源码
```

编译后可能变成：

```js
import { User } from './types'; // 尝试加载不存在的 `User` 值，导致运行时错误
```

这可能导致：

1. 运行时错误 ​：如果 `User` 是纯类型，但被错误地保留在 JS 中。
2. ​Tree-shaking 失效 ​：打包工具可能无法正确识别类型导入。

### 启用效果

在 tsconfig.json 中配置：

```json
{
  "compilerOptions": {
    "verbatimModuleSyntax": true,
    "isolatedModules": true, // 推荐同时启用
    "module": "ESNext", // 必须使用 ESM
    "target": "ESNext"
  }
}
```

启用后，TypeScript 会严格区分以下语法：

1. 类型导入/导出必须显式使用 type 关键字

```ts
import type { User } from './types'; // ✅ 正确
import { User } from './types'; // ❌ 错误（如果 User 是类型）
```

2. 非类型的导入/导出保持不变

```ts
import { getUser } from './api'; // ✅ 正确（getUser 是函数）
```

3. 混合导入/导出

```ts
import { getUser, type User } from './api'; // ✅ 正确
```
