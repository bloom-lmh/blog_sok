# HTTP 和 HTTPS

[[toc]]

## MIME 类型

请求头

```bash
POST /t2/upload.do HTTP/1.1
User-Agent: TechlogWapRebot
Accept-Language: zh-cn,zh;q=0.5
Accept-Charset: GBK,utf-8;q=0.7,*;q=0.7
Connection: keep-alive
Content-Length: 60408
Content-Type:multipart/form-data; boundary=ZnGpDtePMx0KrHh_G0X99Yef9r8JZsRJSXC
Host: test.techlog.cn
```

请求体

```bash
--ZnGpDtePMx0KrHh_G0X99Yef9r8JZsRJSXC
Content-Disposition: form-data;name="desc"
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 8bit

--ZnGpDtePMx0KrHh_G0X99Yef9r8JZsRJSXC
Content-Disposition: form-data;name="pic"; filename="photo.jpg"
Content-Type: application/octet-stream
Content-Transfer-Encoding: binary

[图片二进制数据]
--ZnGpDtePMx0KrHh_G0X99Yef9r8JZsRJSXC--
```

## HTTP 缓存
