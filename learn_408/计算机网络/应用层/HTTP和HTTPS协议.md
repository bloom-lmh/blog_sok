# HTTP 和 HTTPS

[[toc]]

## HTTP

### HTTP 请求头

HTTP 头字段(`HTTP header fields`),是指在超文本传输协议(HTTP)的请求和响应消息中的消息头部分，如下所示：

```bash
GET /home.html HTTP/1.1  # 请求行：方法 + 路径 + 协议版本
Host: developer.mozilla.org  # 目标域名（HTTP/1.1必需字段）
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0  # 客户端标识
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8  # 可接受的响应类型（带优先级）
Accept-Language: en-US,en;q=0.5  # 优先语言（美式英语 > 英语）
Accept-Encoding: gzip, deflate, br  # 支持的压缩算法
Referer: https://developer.mozilla.org/testpage.html  # 来源页面URL
Connection: keep-alive  # 保持TCP连接复用
Upgrade-Insecure-Requests: 1  # 自动升级HTTPS（浏览器安全策略）

# 缓存控制相关
If-Modified-Since: Mon, 18 Jul 2016 02:36:04 GMT  # 最后修改时间校验（配合304 Not Modified）
If-None-Match: "c561c68d0ba92bbeb8b0fff2a9199f722e3a621a"  # 实体标签校验（强校验器）
Cache-Control: max-age=0  # 强制向服务器验证缓存新鲜度
```

### HTTP 响应头

HTTP 响应头是响应消息的头部分，如下所示：

```bash
HTTP/1.1 200 OK
Date: Sun, 21 Jul 2025 10:34:04 GMT
Server: Apache/2.4.41 (Ubuntu)  # 服务器类型和版本
Content-Type: text/html; charset=UTF-8  # 响应体类型和编码
Content-Length: 15324  # 响应体大小（字节）
Connection: keep-alive  # 保持TCP连接
Cache-Control: max-age=3600, public  # 缓存1小时，允许代理缓存
ETag: "5f3d8e5a-3bdc"  # 资源版本标识符
Last-Modified: Wed, 12 Aug 2020 14:25:30 GMT  # 最后修改时间

# 安全相关头部
X-Frame-Options: SAMEORIGIN  # 禁止被非同源页面iframe嵌入
X-Content-Type-Options: nosniff  # 禁止MIME类型嗅探
X-XSS-Protection: 1; mode=block  # 启用XSS保护
Strict-Transport-Security: max-age=31536000; includeSubDomains  # 强制HTTPS（1年）
Content-Security-Policy: default-src 'self'  # 只允许加载同源资源

# 会话控制
Set-Cookie: sessionId=abc123; Path=/; Secure; HttpOnly; SameSite=Lax  # 安全Cookie设置
# Secure - 仅HTTPS传输
# HttpOnly - 禁止JavaScript访问
# SameSite=Lax - 限制跨站发送

# 代理/CDN相关
Vary: Accept-Encoding  # 根据Accept-Encoding头区分缓存
Via: 1.1 google  # 经过Google代理
```

### HTTP 状态码

HTTP 状态码(HTTP status code)是指在 HTTP 协议中，服务器向客户端返回的响应状态码，用来表示请求的处理结果。常见的状态码如下：

::: code-group

```bash [1xx]
// 信息性状态码
1. 100(客户端继续发送请求，这是临时响应)：这个临时响应是用来通知客户端它的部分请求已经被
服务器接收，且仍未被拒绝。客户端应当继续发送请求的剩余部分，或者如果请求已经完成，忽略
这个响应。服务器必须在请求完成后向客户端发送一个最终响应
2. 101:服务器根据客户端的请求切换协议，主要用于websocket或http2升级
```

```bash [2xx]
// 成功状态码
1. 200(成功)：请求已成功，请求所希望的响应头或数据体将随此响应返回
2. 201(已创建)：请求成功并且服务器创建了新的资源,与请求体希望的资源类型不同
3. 202(已创建)：服务器已经接收请求，但尚未处理
4. 203(非授权信息)：服务器已成功处理请求，但返回的信息可能来自另一来源
5. 204(无内容)：服务器成功处理请求，但没有返回任何内容
6. 205(重置内容)：服务器成功处理请求，但没有返回任何内容
7. 206(部分内容)：服务器成功处理了部分请求
```

```bash [3xx]
// 重定向状态码，表示要完成请求，需要进一步操作。通常，这些状态代码用来重定向
1. 300(多种选择)：针对请求，服务器可执行多种操作。服务器可根据请求者(user agent)选择一项操作，或提供操作列表供请求者选择
2. 301(永久移动)：请求的网页已永久移动到新位置。服务器返回此响应（对GET或HEAD请求的响应)时，会自动将请求者转到新位置
3. 302(临时移动)：服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求
4. 303(查看其他位置)：请求者应当对不同的位置使用单独的GET请求来检索响应时，服务器返回此代码
5. 305(使用代理)：请求者只能使用代理访问请求的网页。如果服务器返回此响应，还表示请求者应使用代理
6. 307(临时重定向)：服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求
```

```bash [4xx]
// 客户端错误状态码，代表了客户端看起来可能发生了错误，妨碍了服务器的处理
1. 400(错误请求)：服务器不理解请求的语法
2. 401(未授权)：请求要求身份验证。对于需要登录的网页，服务器可能返回此响应。
3. 403(禁止)：服务器拒绝请求
4. 404(未找到)：服务器找不到请求的网页
5. 405(方法禁用)：禁用请求中指定的方法
6. 406(不接受)：无法使用请求的内容特性响应请求的网页
7. 407(需要代理授权)：此状态代码与401（未授权）类似，但指定请求者应当授权使用代理
8. 408(请求超时)：服务器等候请求时发生超时
```

```bash [5xx]
// 服务器错误状态码，表示服务器无法完成明显有效的请求。这类状态码代表了服务器在处理请求的过程中有错误或者异常状态发生
1. 500(服务器内部错误)：服务器遇到错误，无法完成请求
2. 501(尚未实施)：服务器不具备完成请求的功能。例如，服务器无法识别请求方法时可能会返回此代码
3. 502(错误网关)：服务器作为网关或代理，从上游服务器收到无效响应
4. 503(服务不可用)：服务器目前无法使用（由于超载或停机维护）
5. 504(网关超时)：服务器作为网关或代理，但是没有及时从上游服务器收到请求
6. 505(HTTP版本不受支持)：服务器不支持请求中所用的HTTP协议版本
```

:::

## HTTPS
