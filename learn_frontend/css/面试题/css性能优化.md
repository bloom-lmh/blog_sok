# CSS 性能优化

[[toc]]

## 优化 CSS 加载方式

### 内联首屏关键 CSS

页面重要内容的渲染实现影响着用户体验。所以为了加快首屏渲染实现，对于一些样式采用内联
关于为什么内联 CSS 能够提高首屏的渲染效率，原因如下：

1. 浏览器接受到 HTML 文件
2. 预解析线程开始快速扫描 HTML，异步下载资源
3. 主渲染线程开始解析 HTML 文件为 DOM 树
   - 遇到内联 CSS 直接开始解析 CSS 为 CSSOM 树（CSSOM 构建会抢占优先级）
   - 遇到 link 外联的 CSS 文件
     - 若下载完毕，则继续解析 CSSOM 树
     - 若没有下载完成，会暂停解析 CSSOM 树继续解析 HTML 为 DOM 树
4. 最终构建出 DOM 树和 CSSOM 树
5. 合并 DOM 树和 CSSOM 树为渲染树

所以如果 link 对应的 css 文件没有下载下来不会阻塞 DOM 树的构建但是会阻塞 CSSOM 树的构建，进而影响渲染树的构建，从而影响首屏渲染。为了提高首屏渲染效率，我们可以将关键样式内联，从而减少在网络的时间损耗

### 异步加载非关键 CSS

#### `<link rel="preload">`（资源预加载）

作用 ​：强制浏览器提前加载高优先级资源（如首屏 CSS/JS/字体），​ 不阻塞渲染但提前获取内容。
适用场景 ​：

```html
<!-- 预加载关键CSS -->
<link rel="preload" href="critical.css" as="style" onload="this.rel='stylesheet'" />

<!-- 预加载JS（异步执行） -->
<link rel="preload" href="main.js" as="script" onload="this.onload=null;this.rel='preload'" />
```

::: tip 关于预加载资源为什么比预加载扫描器更快
预解析线程虽然快，但有扫描延迟，对于`<head>`中靠前的`<link rel="preload">`，主线程解析到它时，预解析线程可能还未扫描到该位置

1. 主线程解析到<link rel="preload" href="a.css">
   → 立即中断预解析线程
   → 网络线程最高优先级下载 a.css
2. 预解析线程发现<link rel="stylesheet" href="b.css">
   → 网络线程默认优先级下载 b.css

3. a.css 和 b.css 下载完成后
   → 主线程依次构建 CSSOM（仍受下载顺序影响）

![](https://image-bucket-1307756649.cos.ap-chengdu.myqcloud.com/image/20250713173151244.png)
:::

#### dns-prefetch（DNS 预解析）

作用 ​：提前解析第三方资源的域名 DNS，消除 DNS 查询延迟。

```html
<!-- 预解析CDN域名 -->
<link rel="dns-prefetch" href="https://cdn.example.com" />
```

::: warning 注意
对同域资源无效（浏览器已缓存 DNS），适合谷歌字体、统计分析等第三方域名
:::

#### preconnect（预连接）

作用 ​：提前完成 DNS 解析 + TCP 握手 + TLS 协商（全链路优化），比 dns-prefetch 更彻底。
适用场景 ​：

```html
<!-- 预连接API服务器 -->
<link rel="preconnect" href="https://api.example.com" crossorigin />
```

#### 三者组合最佳实践

```html
<head>
  <!-- 1. 内联关键CSS（首屏优化） -->
  <style>
    /* critical.css内容 */
  </style>

  <!-- 2. 预加载非关键CSS -->
  <link rel="preload" href="non-critical.css" as="style" onload="this.rel='stylesheet'" />

  <!-- 3. 预连接CDN -->
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <!-- 4. DNS预解析第三方域名 -->
  <link rel="dns-prefetch" href="https://analytics.example.com" />
</head>
```

### 减少@import 使用

### 分块加载 CSS

## 减少 CSS 文件大小

利用 `webpack、vite、rollup` 等模块化工具，将 css 代码进行压缩，使文件变小，大大降低了浏览器的加载时间

## 减少重排和重绘

## 优化 CSS 选择器
