# ReactRouter

## 什么是路由

一个路径 path 对应一个组件 component 当我们在浏览器中访问一个 path 的时候，path 对应的组件会在页面中进行渲染

## 创建路由

目录结构如下

```bash
react-router
 ├── index.js
 ├── page
 │   ├── Article
 │   │   └── index.js
 │   └── Login
 │       └── index.js
 └── router
     └── index.js
```

具体实现如下
::: code-group

```js [Login/index.js]
const Login = () => {
  return <div>我是登录页面</div>;
};
export default Login;
```

```js [Article/index.js]
const Article = () => {
  return <div>我是文章页面</div>;
};
export default Article;
```

```js [router/index.js]
import { createBrowserRouter } from "react-router-dom";
import Login from "../page/Login";
import Article from "../page/Article";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/article",
    element: <Article />,
  },
]);
export default router;
```

```js [index.js]
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./react-router/router";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router}></RouterProvider>);
```

:::

## 路由导航

### 声明式导航

声明式导航是指通过在模版中通过 `<Link/> ` 组件描述出要跳转到哪里去，比如后台管理系统的左侧菜单通常使用这种方式进行

语法说明：通过给组件的 to 属性指定要跳转到路由 path，组件会被渲染为浏览器支持的 a 链接，如果需要传参直接通过
字符串拼接的方式拼接参数即可

```js {7}
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      我是登录页面
      <Link to="/article">跳转到文章页</Link>
    </div>
  );
};
export default Login;
```

### 编程式导航

编程式导航是指通过 `useNavigate` 钩子得到导航方法，然后通过调用方法以命令式的形式进行路由跳转，比如想在
登录请求完毕之后跳转就可以选择这种方式，更加灵活

语法说明：通过调用 navigate 方法传入地址 path 实现跳转

```js {4,8}
import { useNavigate } from "react-router-dom";

const Article = () => {
  const navigate = useNavigate();
  return (
    <div>
      我是文章页面
      <button onClick={() => navigate("/login")}>返回登陆</button>
    </div>
  );
};
export default Article;
```

## 导航传参

### searchParams 传参

查询字符串后面拼接参数
::: code-group

```js [传递参数] {7}
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      我是登录页面
      <Link to="/article?id=1001&name=bloom">跳转到文章页</Link>
    </div>
  );
};
export default Login;
```

```js [接受参数] {4-6}
import { useNavigate, useSearchParams } from "react-router-dom";

const Article = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get("id");
  const name = params.get("name");
  return (
    <div>
      我是文章页面 用户id：{id}
      用户名：{name}
      <button onClick={() => navigate("/login")}>返回登陆</button>
    </div>
  );
};
export default Article;
```

:::

### params 传参

::: code-group

```js [router中配置占位符] {10}
import { createBrowserRouter } from "react-router-dom";
import Login from "../page/Login";
import Article from "../page/Article";
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/article/:id/:name",
    element: <Article />,
  },
]);
export default router;
```

```js [传递参数] {7}
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      我是登录页面
      <Link to="/article/1001/bloom">跳转到文章页</Link>
    </div>
  );
};
export default Login;
```

```js [接受参数]{5-7}
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const Article = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const name = params.name;
  return (
    <div>
      我是文章页面 用户id：{id}
      用户名：{name}
      <button onClick={() => navigate("/login")}>返回登陆</button>
    </div>
  );
};
export default Article;
```

:::

## 嵌套路由

在一级路由中又内嵌了其他路由，这种关系就叫做嵌套路由，嵌套至一级路由内的路由又称作二级路由，例如：
实现步骤：

1. 使用 children 属性配置路由嵌套关系
2. 使用 `<Outlet/>` 组件配置二级路由渲染位置

::: code-group

```js [路由配置] {6-19}
import { createBrowserRouter } from "react-router-dom";
import Layout from "../page/Layout";
import Board from "../page/Board";
import About from "../page/About";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/board",
        element: <Board />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);
export default router;
```

```js [一级路由组件Layout] {7-8,11-12}
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      我是一级路由layout组件
      <Link to="/board">面板</Link>
      <Link to="/about">关于</Link>
      <br />
      下面是子路由
      {/* 二级路由的组件会插入Outlet处 */}
      <Outlet />
    </div>
  );
};
export default Layout;
```

```js [二级路由组件About]
const About = () => {
  return <div>我是二级路由about组件</div>;
};
export default About;
```

```js [二级路由组件Board]
const Board = () => {
  return <div>我是二级路由board组件</div>;
};
export default Board;
```

:::
当访问的是一级路由时，默认的二级路由组件可以得到渲染，只需要在二级路由的位置去掉 path，设置 index 属性为 true,并且`<Link to="/">`即可
::: code-group

```js {11}[路由配置改写]
import { createBrowserRouter } from "react-router-dom";
import Layout from "../page/Layout";
import Board from "../page/Board";
import About from "../page/About";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Board />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);
export default router;
```

```js {7}[link改写]
import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      我是一级路由layout组件
      <Link to="/">面板</Link>
      <Link to="/about">关于</Link>
      <br />
      下面是子路由
      <Outlet />
    </div>
  );
};
export default Layout;
```

:::

## 404 路由配置

当浏览器输入 url 的路径在整个路由配置中都找不到对应的 path，为了用户体验，可以使用 404 兜底组件进行渲染
实现步骤：

1. 准备一个 NotFound 组件
2. 在路由表数组的末尾，以\*号作为路由 path 配置路由

::: code-group

```js [404页面]
export const NotFound = () => {
  return <div>页面跑到月球了</div>;
};

export default NotFound;
```

```js [路由配置] {5-6}
import { createBrowserRouter } from "react-router-dom";
import NotFound from "../page/NotFound";
const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
```

:::

## 两种路由模式

各个主流框架的路由常用的路由模式有俩种，history 模式和 hash 模式, ReactRouter 分别由 createBrowerRouter 和
createHashRouter 函数负责创建
| 路由模式 | url 表现 | 底层原理 | 是否需要后端支持 |
|-----------|----------------|---------------------------|------------------|
| history | `url/login` | history 对象 + pushState 事件 | 需要 |
| hash | `url/#/login` | 监听 hashChange 事件 | 不需要 |
