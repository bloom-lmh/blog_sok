# CSRF 跨站请求伪造

[[toc]]

## 基本概念

CSRF（Cross-Site Request Forgery，跨站请求伪造）是一种利用 Web 应用身份验证机制的漏洞进行攻击的方式。以下是关于 CSRF 的详细介绍：

## 执行原理

1. 用户登录信任网站 A，获取用户凭证
2. 在保持会话的同时，用户访问危险网站 B
3. 网站 B 强制浏览器向网站 A 发起请求
4. 网站 A 认为这是用户合法请求 → 执行恶意操作

::: tip 关键
浏览器会自动携带目标站点的 Cookie，而不管当前显示的是哪个网站的页面。比如：

1. 我在 `www.ex1.com` 访问 `www.baidu.com` ，那么浏览器就会携带 `www.baidu.com` 的 Cookie
2. 我在 `www.ex2.com` 访问 `www.baidu.com`，浏览器也会携带 `www.baidu.com` 的 Cookie

:::

![执行原理](https://image-bucket-1307756649.cos.ap-chengdu.myqcloud.com/image/a.png)

## :star:防御措施

CSRF 本质利用的是浏览器携带 Cookie 的机制：对目标网站的访问会携带目标网站的 Cookie 而与源站点是哪一个没有关系
所以防御措施很简单

### 防止不明外域访问

#### 同源检测

后端会对发送请求的源地址（`Origin/Referer`）进行检测，必须是合法源地址才会采纳请求

- 可作为辅助防御手段
- Referer 可能被篡改或缺失
- 需要维护白名单

服务端验证

```js
// 中间件实现
const allowedOrigins = ['https://yourdomain.com', 'https://api.yourdomain.com'];

app.use((req, res, next) => {
  const origin = req.get('Origin');
  const referer = req.get('Referer');

  if (req.method !== 'GET') {
    const requestSource = origin || referer;
    if (!requestSource || !allowedOrigins.some(domain => requestSource.startsWith(domain))) {
      return res.status(403).send('非法请求来源');
    }
  }
  next();
});
```

#### 设置 SameSite Cookie 属性 ​

设置 Cookie 的安全性属性

```js
// 服务器设置Cookie时（以Node.js为例）
res.cookie('sessionid', 'xxxxxx', {
  httpOnly: true,
  secure: true,
  sameSite: 'Strict', // 或 'Lax'
});
```

- Strict：完全禁止跨站携带 Cookie（即使是 www.a.com → www.b.com 的合法链接也不允许）
- Lax：宽松模式（默认值），允许安全的跨站 GET 请求携带 Cookie（如普通链接跳转），但是不允许 POST 请求携带 Cookie（防止 CSRF 攻击）。
- None：允许跨站请求携带 Cookie，但是不设置 SameSite 属性。

### 提交时附加文本域信息

#### CSRF Token

服务器生成一个随机令牌（Token），要求客户端在每个表单提交或状态变更请求中携带该令牌。

- 最常用的防御方式
- 需要确保 Token 的随机性和保密性
- 攻击者无法获取或预测 Token 值

前端代码

```html
<!-- 前端表单 -->
<form action="/transfer" method="POST">
  <input type="hidden" name="_csrf" value="随机生成的Token" />
  <!-- 其他表单字段 -->
</form>
```

服务端验证

```js
// 生成Token
const tokens = new Map();

function generateCSRFToken(userId) {
  const token = crypto.randomBytes(32).toString('hex');
  tokens.set(userId, token);
  return token;
}

// 验证Token
function verifyCSRFToken(userId, token) {
  return tokens.get(userId) === token;
}
```

#### 双重 Cookie 验证

利用浏览器同源策略，通过前端 JavaScript 读取 Cookie 作为请求参数。

- 适用于前后端分离架构
- 需要确保 Cookie 的 HttpOnly 属性为 false
- 比单纯 Token 更安全

前端代码

```js
// 前端代码
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'X-CSRF-TOKEN': getCookie('csrf_token')
  },
  body: JSON.stringify({...})
});
```

服务端验证

```js
app.post('/api/transfer', (req, res) => {
  const cookieToken = req.cookies.csrf_token;
  const headerToken = req.get('X-CSRF-TOKEN');

  if (!cookieToken || cookieToken !== headerToken) {
    return res.status(403).send('CSRF验证失败');
  }
  // 处理正常请求
});
```

::: tip 理解为什么需要 httpOnly
上面的代码的意思是源站发起的 post 请求会在 header 中携带 csrf_token，而这个 csrf_token 是在 cookie 中设置和读取的。
第三方网站如果能够读取源站的 cookie 那么他也可以伪造相同的在 header 中携带 csrf_token 的 post 请求。所以要把 cookie 的 httpOnly 属性设置为 true，这样第三方网站就无法读取到 cookie 中的 csrf_token。就无法伪造请求了
:::
