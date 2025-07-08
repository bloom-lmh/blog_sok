# Cookie

[[toc]]

## 基本概念

### 什么是 Cookie？

- Cookie 是浏览器为特定网页或网站保存的少量命名数据。
- Cookie 是为服务端编程而设计的，在最低的层级上作为 HTTP 协议的扩展实现。
- Cookie 数据会**自动**在浏览器与 Web 服务器之间传输，因此服务器端脚本可以读写存储在客户端的 `Cookie` 值。

一个 Cookie 字符串是由多个名/值对组成，每个名/值对之间用分号和空格分隔。如下所示：
`username=John%20Doe; expires=Wed, 01 Jan 2025 00:00:00 GMT; path=/; domain=example.com; Secure; HttpOnly; SameSite=Lax`

### 浏览器对 Cookie 的限制

- 单个 Cookie 最大 4KB
- 每个域名下的 Cookie 数量有限 ​（通常 20~50 个，不同浏览器不同）

### Cookie 的安全性

`JavaScript`中的`Cookie`并不以任何形式进行加密， 无论怎么说都是不安全的（尽管通过 HTTPS 连接发送 Cookie 会安全一些）。

### Cookie 的生命周期

Cookie 默认的生命期很短，它们存储的值只在浏览器会话期间存在，用户退出浏览器后就会丢失这里和 `sessionStorage` 一样。

### Cookie 的作用域

与 `localstorage` 和 `sessionstorage` 类似，Cookie 的可见性由文档来源决定，但也由文档路径决定。默认情况下，Cookie 关联着创建它的网页，以及**与该网页位于相同目录和子目录下**的其他网页，这些网页都可以访问它。
比如，如果网页`example.com/catalog/index.html`创建了一个 Cookie,则:

- 该 Cookie 对 `example.com/catalog/order.html` 和 `example.com/catalog/widgets/index.html`同样可见
- 但对 `example.com/about.html` 不可见。

::: tip 总结
**可以这么理解，它的作用域是同源的当前目录和子目录的网页。**
:::

## 设置 Cookie

### 通用设置方法

设置 Cookie 其实就是将键值对转换为字符串存入 Cookie 字符串当中，

```js
function setCookie(name, value, daysToLive = null) {
  let cookie = `${name}=${encodeURIComponent(value)}`;
  if (daysToLive !== null) {
    cookie += `; max-age=${daysToLive * 60 * 60 * 24}`;
  }
  // 直接赋值会覆盖同名Cookie,并向cookie中追加
  document.cookie = cookie;
}
```

::: warning Cookie 值的编码解码
但是注意 Cookie 值不能包含分号、逗号或空格，所以要用 `encodeURIComponent` 编码。读取是要用 `decodeURIComponent` 解码。
:::

### 设置 Cookie 作用域

Cookie 的默认作用域可以进行扩展。可以通过下面的属性设置 Cookie 的作用域，如：

- `path`：指定 Cookie 适用的 URL 路径。
- `domain`：指定 Cookie 适用的域名。

::: tip path
只要其 URL 以你指定的路径前缀开头， 就可以共享该 Cookie。例如，如果 `example.com/catalog/widgets/index.html` 设置的 Cookie 将路径设置为 `**/catalog`,则该 Cookie 也对 `example.com/catalog/order.html` 可见。或者， 如果将路径设置为`*/`,那么该 Cookie 将对 `example.com` 域中的任何页面都可见，此时这个 Cookie 的作用域就跟 localStorage 一样。
:::

::: tip domain
默认情况下，Cookie 的作用域按照文档来源区分。不过大网站可能需要跨子域名共享 Cookie.例如，`order.example.com`对应的服务器可能需要读取`catalog.example.com`设置的 Cookie 值。这时候就要用到 domain 属性了。如果 Cookie 是由`catalog.example.com`的页面设置的，且 path 属性被设置为`/`, domain 属性被设置为`.example.com`,则 Cookie 将对 `catalog.example.com`,`order.example.com`, 以及任何 `example.com` 名下的服务器有效。注意，不能将 Cookie 的域设置为服务器父域名之外的其他域名
:::

### 设置 Cookie 生命周期

Cookie 默认的生命期很短，它们存储的值只在浏览器会话期间存在，用户退出浏览器后就会丢失。但是可以通过指定 Cookie 的 `max-age` 属性来设置 Cookie 的生命收起。如果指定了这样一个生命期，浏览器将把 Cookie 存储在一个文件中，等时间到了再把它们删除。

### 设置 Cookie 安全性

默认情况下，Cookie 是不安全的。换句话说，它们会在普通的不安全的 HTTP 连接上传输。如果把 Cookie 设置为安全的，那么就只能在浏览器与服务器通过 HTTPS 或其他安全协议连接时传输 Cookie

## 获取 Cookie

`document.Cookie` 属性返回一个包含与当前文档有关的所有 Cookie 的字符串。这个字符串是一个分号和空格分隔的名/值对所以要获取 Cookie 需要使用 split 来分割字符串，然后再通过键值对的方式获取。

```js
function getCookies() {
  const list = document.Cookie.split(';');
  const CookiesMap = new Map();
  for (let item of list) {
    if (!item.includes('=')) continue;
    const [key, value] = item.split('=');
    CookiesMap.set(key.trim(), decodeURIComponent(value.trim()));
  }
  return CookiesMap;
}
```

## :star:Cookie 和 Storage 的区别

| 对比维度     | Cookie                                                                 | localStorage                   | sessionStorage                 |
| ------------ | ---------------------------------------------------------------------- | ------------------------------ | ------------------------------ |
| **作用域**   | 可设置 `domain` 和 `path`（默认当前页+子页）                           | 同源（协议+域名+端口）         | 同源+同标签页                  |
| **生命周期** | 默认会话级，可通过 `expires/max-age` 设置过期时间                      | 永久存储（需手动清除）         | 会话级（标签页关闭即清除）     |
| **存储大小** | 单个 ≤4KB，每域名 ≤20~50 个                                            | 同源 5MB~10MB                  | 同源 5MB~10MB                  |
| **自动携带** | 每次 HTTP 请求自动携带（若匹配 `domain/path`）                         | 不自动携带                     | 不自动携带                     |
| **安全性**   | 可设 `Secure`（仅 HTTPS）、`HttpOnly`（防 XSS）、`SameSite`（防 CSRF） | 仅同源隔离，无加密             | 仅同源隔离，无加密             |
| **访问方式** | 通过 `document.cookie` 或 HTTP 头                                      | `localStorage.setItem()` API   | `sessionStorage.setItem()` API |
| **适用场景** | 身份验证（Token）、服务器需访问的数据                                  | 长期存储用户偏好、静态数据缓存 | 临时表单数据、单页应用状态管理 |
