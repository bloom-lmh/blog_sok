import path from 'path';
import { defineConfig } from 'vitepress';
import { buildSideBar } from './utils/sideBarGenerator';
import { text } from 'stream/consumers';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'SOK',
  description: 'Seasons on the Keyboard',

  themeConfig: {
    search: { provider: 'local' },
    outline: {
      level: 'deep', // 只显示 H2 和 H3
      label: '目录',
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      {
        text: '前端知识',
        items: [
          {
            text: 'CSS',
            link: '/learn_frontend/css/盒模型及其样式设置/盒模型',
          },
          {
            text: 'Javascript',
            link: '/learn_frontend/javascript/语法基础/数据类型',
          },
          {
            text: 'Typescript',
            link: '/learn_frontend/typescript/起步/基本介绍',
          },

          {
            text: 'Axios',
            link: '/learn_frontend/axios/起步/基本介绍',
          },
          {
            text: 'Vue3',
            link: '/learn_frontend/vue3/vue3基础/起步/简介',
          },
          {
            text: 'React',
            link: '/learn_frontend/react/react基础/jsx',
          },
          {
            text: 'Tools',
            link: '/learn_frontend/tools/jest/起步/基本介绍',
          },

          {
            text: 'Browser',
            link: '/learn_frontend/browser/browser基础/浏览器渲染原理',
          },
        ],
      },
      {
        text: '软件架构',
        items: [
          {
            text: 'DesignPattern',
            link: '/learn_sofrwareArchitecture/designPattern/designPattern基础/设计模式七大原则',
          },
        ],
      },
      {
        text: '408',
        items: [
          {
            text: '数据结构',
            link: '/learn_408/数据结构/线性结构/顺序表',
          },
          {
            text: '计算机网络',
            link: '/learn_408/计算机网络/面试题/XSS跨站脚本攻击',
          },
        ],
      },
      { text: '学习计划', link: '/learn_plan/2025年学习计划' },
    ],

    sidebar: {
      '/learn_frontend/css/': [
        {
          text: '盒模型及其样式设置',
          collapsed: true,
          items: [
            {
              text: '盒模型',
              link: '/learn_frontend/css/盒模型及其样式设置/盒模型',
            },
            {
              text: '包含块',
              link: '/learn_frontend/css/盒模型及其样式设置/包含块',
            },
            {
              text: '边框和轮廓',
              link: '/learn_frontend/css/盒模型及其样式设置/边框和轮廓',
            },
            {
              text: '溢出效果',
              link: '/learn_frontend/css/盒模型及其样式设置/溢出效果',
            },
            {
              text: '元素隐藏的几种方式',
              link: '/learn_frontend/css/盒模型及其样式设置/元素隐藏的几种方式',
            },
          ],
        },
        {
          text: '文本字体',
          collapsed: true,
          items: [
            { text: '文本字体', link: '/learn_frontend/css/文本字体/文本字体' },
            {
              text: '字体图标引入方式',
              link: '/learn_frontend/css/文本字体/字体图标引入方式',
            },
          ],
        },
        {
          text: '背景和图片',
          collapsed: true,
          items: [
            { text: '背景', link: '/learn_frontend/css/背景和图片/背景' },
            {
              text: 'CSS3-图片',
              link: '/learn_frontend/css/背景和图片/CSS3-图片',
            },
            {
              text: 'CSS3-渐变',
              link: '/learn_frontend/css/背景和图片/CSS3-渐变',
            },
          ],
        },
        {
          text: '变换和动画',
          collapsed: true,
          items: [
            {
              text: 'CSS3-变换',
              link: '/learn_frontend/css/变换和动画/CSS3-变换',
            },
            {
              text: 'CSS3-过渡和动画',
              link: '/learn_frontend/css/变换和动画/CSS3-过渡和动画',
            },
          ],
        },
        {
          text: '定位和布局',
          collapsed: true,
          items: [
            {
              text: '关于浮动',
              link: '/learn_frontend/css/定位和布局/关于浮动',
            },
            { text: '定位', link: '/learn_frontend/css/定位和布局/定位' },
            { text: 'BFC机制', link: '/learn_frontend/css/定位和布局/BFC机制' },

            {
              text: '元素居中方法',
              link: '/learn_frontend/css/定位和布局/元素居中的方法',
            },

            {
              text: 'CSS3-弹性布局Flex',
              link: '/learn_frontend/css/定位和布局/CSS3-弹性布局Flex',
            },
            {
              text: 'CSS3-网格布局Gird',
              link: '/learn_frontend/css/定位和布局/CSS3-网格布局Grid',
            },
            {
              text: '常见布局方案',
              link: '/learn_frontend/css/定位和布局/常见布局方案',
            },
          ],
        },
        {
          text: '响应式',
          collapsed: true,
          items: [
            {
              text: '响应式设计',
              link: '/learn_frontend/css/响应式/响应式设计',
            },
            {
              text: 'CSS3-媒体查询',
              link: '/learn_frontend/css/响应式/CSS3-媒体查询',
            },
          ],
        },
        {
          text: '元素选择',
          collapsed: true,
          items: [{ text: '选择器', link: '/learn_frontend/css/元素选择/选择器' }],
        },
        {
          text: '变量',
          collapsed: true,
          items: [{ text: '变量', link: '/learn_frontend/css/变量/变量' }],
        },
        {
          text: '面试题',
          collapsed: true,
          items: [
            { text: '设备像素', link: '/learn_frontend/css/面试题/设备像素' },
            {
              text: 'em和rem等的区别',
              link: '/learn_frontend/css/面试题/em和rem等的区别',
            },
            {
              text: 'chrome中设置小于12px字体',
              link: '/learn_frontend/css/面试题/chrome小于12px字体的方式有哪些',
            },
            {
              text: 'css性能优化',
              link: '/learn_frontend/css/面试题/css性能优化',
            },
          ],
        },
        {
          text: '小案例',
          collapsed: true,
          items: [
            { text: '视差滚动', link: '/learn_frontend/css/面试题/视差滚动' },
            {
              text: '画一个三角形',
              link: '/learn_frontend/css/面试题/画一个三角形',
            },
          ],
        },
      ],
      '/learn_frontend/javascript/': [
        {
          text: '语法基础',
          collapsed: true,
          items: [
            {
              text: '数据类型',
              link: '/learn_frontend/javascript/语法基础/数据类型',
            },
            {
              text: '类型转换',
              link: '/learn_frontend/javascript/语法基础/类型转换',
            },
            {
              text: '表达式与操作符',
              link: '/learn_frontend/javascript/语法基础/表达式与操作符',
            },
          ],
        },
        {
          text: '面向对象',
          collapsed: true,
          items: [
            {
              text: '对象',
              link: '/learn_frontend/javascript/面向对象/对象',
            },
            {
              text: '数组基础',
              link: '/learn_frontend/javascript/面向对象/数组基础',
            },
            {
              text: '数组进阶',
              link: '/learn_frontend/javascript/面向对象/数组进阶',
            },
            {
              text: '函数基础',
              link: '/learn_frontend/javascript/面向对象/函数基础',
            },
            {
              text: '函数进阶',
              link: '/learn_frontend/javascript/面向对象/函数进阶',
            },
            {
              text: '原型链',
              link: '/learn_frontend/javascript/面向对象/原型链',
            },
            {
              text: '多种继承方式',
              link: '/learn_frontend/javascript/面向对象/多种继承方式',
            },
            {
              text: '类的本质',
              link: '/learn_frontend/javascript/面向对象/类的本质',
            },
          ],
        },

        {
          text: '标准库',
          collapsed: true,
          items: [
            {
              text: '映射与集合',
              link: '/learn_frontend/javascript/标准库/映射与集合',
            },
            {
              text: '定型数组',
              link: '/learn_frontend/javascript/标准库/定型数组',
            },
            {
              text: '正则表达式',
              link: '/learn_frontend/javascript/标准库/正则表达式',
            },
            {
              text: '日期与时间',
              link: '/learn_frontend/javascript/标准库/日期与时间',
            },
            {
              text: 'Error类',
              link: '/learn_frontend/javascript/标准库/Error类',
            },
            {
              text: 'JSON 序列化与解析',
              link: '/learn_frontend/javascript/标准库/JSON 序列化与解析',
            },
            {
              text: '字符串相关操作',
              link: '/learn_frontend/javascript/标准库/字符串相关操作',
            },
            {
              text: 'Math API',
              link: '/learn_frontend/javascript/标准库/Math API',
            },
            {
              text: 'URL API',
              link: '/learn_frontend/javascript/标准库/URL API',
            },
            {
              text: '定时器',
              link: '/learn_frontend/javascript/标准库/定时器',
            },
          ],
        },
        {
          text: '元编程',
          collapsed: true,
          items: [
            {
              text: '元编程',
              link: '/learn_frontend/javascript/元编程/元编程',
            },
          ],
        },
        {
          text: '事件',
          collapsed: true,
          items: [
            {
              text: '事件基础',
              link: '/learn_frontend/javascript/事件/事件基础',
            },
            {
              text: '事件循环',
              link: '/learn_frontend/javascript/事件/事件循环',
            },
            {
              text: '新事件循环',
              link: '/learn_frontend/javascript/事件/新事件循环',
            },
          ],
        },
        {
          text: '网络与异步编程',
          collapsed: true,
          items: [
            {
              text: '基于回调的异步编程技术',
              link: '/learn_frontend/javascript/网络与异步编程/基于回调的异步编程技术',
            },
            {
              text: '基于期约链的异步编程技术',
              link: '/learn_frontend/javascript/网络与异步编程/基于期约链的异步编程技术',
            },
            {
              text: '手写Promise',
              link: '/learn_frontend/javascript/网络与异步编程/手写Promise',
            },
            {
              text: '使用fetch发送网络请求',
              link: '/learn_frontend/javascript/网络与异步编程/使用fetch发送网络请求',
            },
          ],
        },
        {
          text: '迭代器和生成器',
          collapsed: true,
          items: [
            {
              text: '迭代器和生成器',
              link: '/learn_frontend/javascript/迭代器生成器/迭代器和生成器',
            },
            {
              text: '异步迭代器和生成器',
              link: '/learn_frontend/javascript/迭代器生成器/异步迭代器和生成器',
            },
          ],
        },
        {
          text: '存储',
          collapsed: true,
          items: [
            {
              text: 'localStorage和sessionStorage',
              link: '/learn_frontend/javascript/存储/localStorage和sessionStorage',
            },
            {
              text: 'cookie',
              link: '/learn_frontend/javascript/存储/cookie',
            },
            {
              text: 'IndexedDB',
              link: '/learn_frontend/javascript/存储/IndexedDB',
            },
          ],
        },
        {
          text: '模块化',
          collapsed: true,
          items: [
            {
              text: '模块化',
              link: '/learn_frontend/javascript/模块化/模块化',
            },
          ],
        },
        {
          text: 'DOM',
          collapsed: true,
          items: [
            {
              text: '节点的基本操作',
              link: '/learn_frontend/javascript/DOM/节点的基本操作',
            },
            {
              text: '节点属性的基本操作',
              link: '/learn_frontend/javascript/DOM/节点属性的基本操作',
            },
            {
              text: '元素内容的基本操作',
              link: '/learn_frontend/javascript/DOM/元素内容的基本操作',
            },
            {
              text: '节点样式的基本操作',
              link: '/learn_frontend/javascript/DOM/节点样式的基本操作',
            },
            {
              text: '进阶知识',
              link: '/learn_frontend/javascript/DOM/进阶知识',
            },
            {
              text: 'DOM补充',
              link: '/learn_frontend/javascript/DOM/补充知识',
            },
          ],
        },
        {
          text: 'BOM',
          collapsed: true,
          items: [
            { text: 'window', link: '/learn_frontend/javascript/BOM/window' },
            {
              text: 'location',
              link: '/learn_frontend/javascript/BOM/location',
            },
            { text: 'history', link: '/learn_frontend/javascript/BOM/history' },
            {
              text: 'location与history的相互作用',
              link: '/learn_frontend/javascript/BOM/location与history的相互作用',
            },
            { text: 'screen', link: '/learn_frontend/javascript/BOM/screen' },
            {
              text: 'navigator',
              link: '/learn_frontend/javascript/BOM/navigator',
            },

            {
              text: 'BOM补充',
              link: '/learn_frontend/javascript/BOM/补充知识',
            },
          ],
        },
        {
          text: 'ES6-ES13',
          collapsed: true,
          items: [
            {
              text: 'ES6新特性',
              link: '/learn_frontend/javascript/ES6-ES13新特性/ES6新特性',
            },
          ],
        },
        {
          text: '内存管理',
          collapsed: true,
          items: [
            {
              text: '垃圾回收机制',
              link: '/learn_frontend/javascript/内存管理/垃圾回收机制',
            },
          ],
        },
        {
          text: '多线程',
          collapsed: true,
          items: [
            {
              text: 'Web Worker',
              link: '/learn_frontend/javascript/多线程/Web Worker',
            },
          ],
        },
        {
          text: '执行上下文',
          collapsed: true,
          items: [
            {
              text: 'ES3执行上下文',
              link: '/learn_frontend/javascript/执行上下文/ES3执行上下文',
            },
            {
              text: 'ES5执行上下文',
              link: '/learn_frontend/javascript/执行上下文/ES5执行上下文',
            },
            {
              text: '作用域问题',
              link: '/learn_frontend/javascript/执行上下文/作用域问题',
            },
            {
              text: 'ThisBinding',
              link: '/learn_frontend/javascript/执行上下文/ThisBinding',
            },
          ],
        },
        {
          text: '未来阅读建议',
          collapsed: true, // 默认折叠
          items: [
            {
              text: '二进制API',
              link: '/learn_frontend/javascript/未来阅读建议/二进制API',
            },
            {
              text: '移动设备API',
              link: '/learn_frontend/javascript/未来阅读建议/移动设备API',
            },
            {
              text: '媒体API',
              link: '/learn_frontend/javascript/未来阅读建议/媒体API',
            },
            {
              text: 'performance',
              link: '/learn_frontend/javascript/未来阅读建议/performance',
            },
            {
              text: 'ServiceWorker',
              link: '/learn_frontend/javascript/未来阅读建议/ServiceWorker',
            },
            {
              text: '加密及相关API',
              link: '/learn_frontend/javascript/未来阅读建议/加密及相关API',
            },
            {
              text: 'webAssembly',
              link: '/learn_frontend/javascript/未来阅读建议/webAssembly',
            },
          ],
        },
        {
          text: '面试题',
          collapsed: true,
          items: [
            {
              text: '编程风格',
              link: '/learn_frontend/javascript/面试题/编程风格',
            },

            {
              text: '防抖节流',
              link: '/learn_frontend/javascript/面试题/防抖节流',
            },
            {
              text: 'new操作符',
              link: '/learn_frontend/javascript/面试题/new操作符',
            },
            {
              text: '深拷贝和浅拷贝',
              link: '/learn_frontend/javascript/面试题/深拷贝和浅拷贝',
            },
            {
              text: '类型检测',
              link: '/learn_frontend/javascript/面试题/类型检测',
            },

            {
              text: 'ThisBinding的一些场景',
              link: '/learn_frontend/javascript/面试题/ThisBinding的一些场景',
            },
          ],
        },

        {
          text: '小案例',
          collapsed: true,
          items: [
            {
              text: '实现轮播图的两种方式',
              link: '/learn_frontend/javascript/小案例/实现轮播图',
            },
            {
              text: '实现SPA路由',
              link: '/learn_frontend/javascript/小案例/实现SPA路由',
            },
            {
              text: '实现拖拽',
              link: '/learn_frontend/javascript/小案例/实现拖拽',
            },
            {
              text: '懒加载的实现方案',
              link: '/learn_frontend/javascript/小案例/懒加载的实现方案',
            },
          ],
        },
      ],
      '/learn_frontend/typescript/': [
        {
          text: '起步',
          collapsed: true,
          items: [
            {
              text: '环境搭建',
              link: '/learn_frontend/typescript/起步/环境搭建',
            },
            {
              text: '基本介绍',
              link: '/learn_frontend/typescript/起步/基本介绍',
            },
          ],
        },
        {
          text: '常用类型',
          collapsed: true,
          items: [
            {
              text: '原始类型',
              link: '/learn_frontend/typescript/常用类型/原始类型',
            },
            {
              text: '特殊类型',
              link: '/learn_frontend/typescript/常用类型/特殊类型',
            },
            {
              text: '字面量类型',
              link: '/learn_frontend/typescript/常用类型/字面量类型',
            },
            {
              text: '对象类型',
              link: '/learn_frontend/typescript/常用类型/对象类型',
            },
            {
              text: '枚举类型',
              link: '/learn_frontend/typescript/常用类型/枚举类型',
            },
            {
              text: '元组类型',
              link: '/learn_frontend/typescript/常用类型/元组类型',
            },
            {
              text: '接口类型',
              link: '/learn_frontend/typescript/常用类型/接口类型',
            },
            {
              text: 'Class类型',
              link: '/learn_frontend/typescript/常用类型/Class类型',
            },
            {
              text: '泛型类型',
              link: '/learn_frontend/typescript/常用类型/泛型类型',
            },
            {
              text: '索引类型',
              link: '/learn_frontend/typescript/常用类型/索引类型',
            },
            {
              text: '映射类型',
              link: '/learn_frontend/typescript/常用类型/映射类型',
            },
            {
              text: '类型别名',
              link: '/learn_frontend/typescript/常用类型/类型别名',
            },
            {
              text: '联合类型',
              link: '/learn_frontend/typescript/常用类型/联合类型',
            },
            {
              text: '交叉类型',
              link: '/learn_frontend/typescript/常用类型/交叉类型',
            },
          ],
        },
        {
          text: '类型机制',
          collapsed: true,
          items: [
            {
              text: '类型兼容性机制',
              link: '/learn_frontend/typescript/类型机制/类型兼容性机制',
            },
            {
              text: '类型断言机制',
              link: '/learn_frontend/typescript/类型机制/类型断言机制',
            },
            {
              text: '类型推断机制',
              link: '/learn_frontend/typescript/类型机制/类型推断机制',
            },
          ],
        },
        {
          text: '工具类型',
          collapsed: true,
          items: [
            {
              text: '类型操作符',
              link: '/learn_frontend/typescript/工具类型/类型操作符',
            },
            {
              text: '常用的工具类型',
              link: '/learn_frontend/typescript/工具类型/常用的工具类型',
            },
            {
              text: '工具类型的底层实现',
              link: '/learn_frontend/typescript/工具类型/工具类型的底层实现',
            },
          ],
        },
        {
          text: '高级类型',
          collapsed: true,
          items: [
            {
              text: '条件类型',
              link: '/learn_frontend/typescript/高级类型/条件类型',
            },
            {
              text: '推断类型',
              link: '/learn_frontend/typescript/高级类型/推断类型',
            },
          ],
        },
        {
          text: '装饰器',
          collapsed: true,
          items: [
            {
              text: '元数据',
              link: '/learn_frontend/typescript/装饰器/元数据',
            },
            {
              text: '装饰器',
              link: '/learn_frontend/typescript/装饰器/装饰器',
            },
          ],
        },
        {
          text: '工程化',
          collapsed: true,
          items: [
            {
              text: '类型声明文件定义',
              link: '/learn_frontend/typescript/工程化/类型声明文件定义',
            },
            {
              text: 'tsconfig详解',
              link: '/learn_frontend/typescript/工程化/tsconfig',
            },
          ],
        },
      ],
      'learn_frontend/tools/': [
        {
          text: 'jest测试工具',
          collapsed: true,
          items: [
            {
              text: '起步',
              collapsed: true,
              items: [
                {
                  text: '基本介绍',
                  link: '/learn_frontend/tools/jest/起步/基本介绍',
                },
                {
                  text: '命令参数',
                  link: '/learn_frontend/tools/jest/起步/命令参数',
                },
                { text: '配置', link: '/learn_frontend/tools/jest/起步/配置' },
              ],
            },
            {
              text: '核心概念',
              collapsed: true,
              items: [
                {
                  text: '常用匹配器',
                  link: '/learn_frontend/tools/jest/核心概念/常用匹配器',
                },
                {
                  text: '匹配器概览',
                  link: '/learn_frontend/tools/jest/核心概念/匹配器概览',
                },
                {
                  text: '异步代码测试',
                  link: '/learn_frontend/tools/jest/核心概念/异步代码测试',
                },
                {
                  text: '钩子函数',
                  link: '/learn_frontend/tools/jest/核心概念/钩子函数',
                },
                {
                  text: 'Mock函数',
                  link: '/learn_frontend/tools/jest/核心概念/mock函数',
                },
              ],
            },
            {
              text: '实践案例',
              collapsed: true,
              items: [
                {
                  text: '最佳实践',
                  link: '/learn_frontend/tools/jest/实践案例/最佳实践',
                },
              ],
            },
          ],
        },
        {
          text: 'joi测试工具',
          collapsed: true,
          items: [
            {
              text: '基本使用',
              link: '/learn_frontend/tools/joi/joi的基本使用',
            },
          ],
        },
        {
          text: 'msw模拟请求工具',
          collapsed: true,
          items: [
            {
              text: 'HTTP模拟',
              items: [
                {
                  text: '起步',
                  link: '/learn_frontend/tools/msw/模拟HTTP/起步',
                },
                {
                  text: '断言谓词',
                  link: '/learn_frontend/tools/msw/模拟HTTP/断言谓词',
                },
                {
                  text: '响应解析器',
                  link: '/learn_frontend/tools/msw/模拟HTTP/响应解析器',
                },
              ],
            },
            {
              text: 'WS模拟',
              collapsed: true,
              items: [],
            },
          ],
        },
        {
          text: 'faker请求数据模拟工具',
          collapsed: true,
          items: [
            {
              text: '起步',
              collapsed: true,
              items: [
                {
                  text: '基本介绍',
                  link: '/learn_frontend/tools/faker/起步/基本介绍',
                },
                {
                  text: '使用方法',
                  link: '/learn_frontend/tools/faker/起步/使用方法',
                },
              ],
            },
            {
              text: '核心概念',
              collapsed: true,
              items: [
                {
                  text: '本地化',
                  link: '/learn_frontend/tools/faker/核心概念/本地化',
                },
                {
                  text: '随机值',
                  link: '/learn_frontend/tools/faker/核心概念/随机值',
                },
                {
                  text: '唯一值',
                  link: '/learn_frontend/tools/faker/核心概念/唯一值',
                },
              ],
            },
            {
              text: '常用API',
              collapsed: true,
              items: [
                {
                  text: '常用API',
                  link: '/learn_frontend/tools/faker/常用API/常用API',
                },
              ],
            },
          ],
        },
      ],
      '/learn_frontend/axios/': [
        {
          text: '起步',
          collapsed: true,
          items: [
            { text: '基本介绍', link: '/learn_frontend/axios/起步/基本介绍' },
            {
              text: '发送请求的几种方式',
              link: '/learn_frontend/axios/起步/发送请求的几种方式',
            },
          ],
        },

        {
          text: '配置',
          collapsed: true,
          items: [
            {
              text: '配置方式及其优先级',
              link: '/learn_frontend/axios/配置/配置方式及其优先级',
            },
            { text: '基础配置', link: '/learn_frontend/axios/配置/基础配置' },
            { text: '数据处理', link: '/learn_frontend/axios/配置/数据处理' },
            { text: '请求处理', link: '/learn_frontend/axios/配置/请求处理' },
            { text: '响应处理', link: '/learn_frontend/axios/配置/响应处理' },
            { text: '进度监控', link: '/learn_frontend/axios/配置/进度监控' },
            { text: '安全相关', link: '/learn_frontend/axios/配置/安全相关' },
            {
              text: '高级网络配置',
              link: '/learn_frontend/axios/配置/高级网络配置',
            },
            { text: '自定义', link: '/learn_frontend/axios/配置/自定义' },
            {
              text: '全部配置概览',
              link: '/learn_frontend/axios/配置/全部配置概览',
            },
          ],
        },
        {
          text: '拦截器',
          collapsed: true,
          items: [{ text: '拦截器', link: '/learn_frontend/axios/拦截器/拦截器' }],
        },
        {
          text: '序列化',
          collapsed: true,
          items: [
            {
              text: '发送不同MIME类型的数据',
              link: '/learn_frontend/axios/序列化/发送不同MIME类型的数据',
            },
            {
              text: '自动序列化机制',
              link: '/learn_frontend/axios/序列化/自动序列化机制',
            },
          ],
        },
      ],
      '/learn_frontend/vue3/': [
        {
          text: '起步',
          collapsed: true,
          items: [
            { text: '简介', link: '/learn_frontend/vue3/vue3基础/起步/简介' },
            {
              text: '选项式和组合式',
              link: '/learn_frontend/vue3/vue3基础/起步/选项式和组合式',
            },
            {
              text: '应用实例',
              link: '/learn_frontend/vue3/vue3基础/起步/应用实例',
            },
          ],
        },
        {
          text: '模板语法',
          collapsed: true,
          items: [],
        },
        {
          text: '指令',
          collapsed: true,
          items: [
            {
              text: '指令基本概念',
              link: '/learn_frontend/vue3/vue3基础/指令/指令基本概念',
            },
            {
              text: '内置指令',
              link: '/learn_frontend/vue3/vue3基础/指令/内置指令',
            },
          ],
        },
        {
          text: '控制样式',
          collapsed: true,
          items: [],
        },
        {
          text: '组件',
          collapsed: true,
          items: [],
        },
        {
          text: '生命周期',
          collapsed: true,
          items: [],
        },
        {
          text: '响应式',
          collapsed: true,
          items: [
            {
              text: 'ref和reactive',
              link: '/learn_frontend/vue3/vue3基础/响应式/ref和reactive',
            },
            {
              text: '计算属性',
              link: '/learn_frontend/vue3/vue3基础/响应式/计算属性',
            },
            {
              text: '监听器',
              link: '/learn_frontend/vue3/vue3基础/响应式/监听器',
            },
          ],
        },
        {
          text: '路由',
          collapsed: true,
          items: [],
        },
        {
          text: '插件',
          collapsed: true,
          items: [],
        },
        {
          text: '状态管理Pinia',
          collapsed: true,
          items: [
            {
              text: '基本概念',
              link: '/learn_frontend/vue3/vue3基础/状态管理/基本概念',
            },
            {
              text: '定义和使用store',
              link: '/learn_frontend/vue3/vue3基础/状态管理/定义和使用store',
            },
            {
              text: 'store三要素',
              link: '/learn_frontend/vue3/vue3基础/状态管理/store三要素',
            },
          ],
        },
      ],
      '/learn_frontend/react/': [
        {
          text: 'react基础',
          collapsed: true,
          items: [
            { text: 'Jsx', link: '/learn_frontend/react/react基础/Jsx' },
            {
              text: '组件通信',
              link: '/learn_frontend/react/react基础/组件通信',
            },
            {
              text: '组件生命周期',
              link: '/learn_frontend/react/react基础/组件生命周期',
            },
            {
              text: '类组件',
              link: '/learn_frontend/react/react基础/优化方案',
            },
            { text: 'Router', link: '/learn_frontend/react/react基础/Router' },
            { text: 'Redux', link: '/learn_frontend/react/react基础/Redux' },
            {
              text: 'zustand',
              link: '/learn_frontend/react/react基础/zustand',
            },
            { text: 'Hook', link: '/learn_frontend/react/react基础/Hook' },
            {
              text: '优化方案',
              link: '/learn_frontend/react/react基础/优化方案',
            },
            {
              text: '使用vite和Ts',
              link: '/learn_frontend/react/react基础/使用vite和Ts',
            },
            {
              text: '极客园小项目',
              link: '/learn_frontend/react/react基础/极客园小项目',
            },
          ],
        },
        {
          text: 'react源码',
          collapsed: true,
          items: [
            {
              text: '创建ReactElement',
              link: '/learn_frontend/react/react源码-18.1.0/创建ReactElement',
            },
            {
              text: 'Fiber与Fiber链表树',
              link: '/learn_frontend/react/react源码-18.1.0/Fiber与Fiber链表树',
            },
            {
              text: 'Fiber中的模式',
              link: '/learn_frontend/react/react源码-18.1.0/Fiber中的模式',
            },
            {
              text: 'Fiber中的Lane',
              link: '/learn_frontend/react/react源码-18.1.0/Fiber中的Lane',
            },
            {
              text: 'Render函数与元素的挂载和解析',
              link: '/learn_frontend/react/react源码-18.1.0/Render函数与元素的挂载和解析',
            },
            {
              text: 'updateContainer深度优先搜索构建Fiber树',
              link: '/learn_frontend/react/react源码-18.1.0/updateContainer深度优先搜索构建Fiber树',
            },
          ],
        },
      ],
      '/learn_frontend/browser/': [
        {
          text: '浏览器基础',
          collapsed: true,
          items: [
            {
              text: '浏览器渲染原理',
              link: '/learn_frontend/browser/browser基础/浏览器渲染原理',
            },
            {
              text: '重排和重绘',
              link: '/learn_frontend/browser/browser基础/重排和重绘',
            },
          ],
        },
      ],
      '/learn_sofrwareArchitecture/designPattern/': [
        {
          text: '设计模式基础',
          collapsed: true,
          items: [
            {
              text: '设计模式工具UML',
              link: '/learn_sofrwareArchitecture/designPattern/designPattern基础/设计模式工具UML',
            },
            {
              text: '设计模式七大原则',
              link: '/learn_sofrwareArchitecture/designPattern/designPattern基础/设计模式七大原则',
            },
            {
              text: '23种设计模式概述',
              link: '/learn_sofrwareArchitecture/designPattern/designPattern基础/23种设计模式概述',
            },
          ],
        },
        {
          text: '23种设计模式-创建型',
          collapsed: true,
          items: [
            {
              text: '总结创建型模式',
              link: '/learn_sofrwareArchitecture/designPattern/23种设计模式-创建型/总结创建型模式',
            },
            {
              text: '简单工厂模式',
              link: '/learn_sofrwareArchitecture/designPattern/23种设计模式-创建型/简单工厂模式',
            },
            {
              text: '单例模式',
              link: '/learn_sofrwareArchitecture/designPattern/23种设计模式-创建型/单例模式',
            },
            {
              text: '工厂方法模式',
              link: '/learn_sofrwareArchitecture/designPattern/23种设计模式-创建型/工厂方法模式',
            },
            {
              text: '抽象工厂方法模式',
              link: '/learn_sofrwareArchitecture/designPattern/23种设计模式-创建型/抽象工厂方法模式',
            },
          ],
        },
        {
          text: '23种设计模式-结构型',
          collapsed: true,
          items: [
            {
              text: '代理模式',
              link: '/learn_sofrwareArchitecture/designPattern/23种设计模式-结构型/代理模式',
            },
            {
              text: '桥接模式',
              link: '/learn_sofrwareArchitecture/designPattern/23种设计模式-结构型/桥接模式',
            },
            {
              text: '适配器模式',
              link: '/learn_sofrwareArchitecture/designPattern/23种设计模式-结构型/适配器模式',
            },
            {
              text: '装饰器模式',
              link: '/learn_sofrwareArchitecture/designPattern/23种设计模式-结构型/装饰器模式',
            },
          ],
        },
        {
          text: '23种设计模式-行为型',
          collapsed: true,
          items: [
            {
              text: '命令模式',
              link: '/learn_sofrwareArchitecture/designPattern/23种设计模式-行为型/命令模式',
            },
            {
              text: '观察者模式',
              link: '/learn_sofrwareArchitecture/designPattern/23种设计模式-行为型/观察者模式',
            },
            {
              text: '发布订阅模式',
              link: '/learn_sofrwareArchitecture/designPattern/23种设计模式-行为型/发布订阅模式',
            },
            {
              text: '迭代器模式',
              link: '/learn_sofrwareArchitecture/designPattern/23种设计模式-行为型/迭代器模式',
            },
            {
              text: '职责链模式',
              link: '/learn_sofrwareArchitecture/designPattern/23种设计模式-行为型/职责链模式',
            },
            {
              text: '策略模式',
              link: '/learn_sofrwareArchitecture/designPattern/23种设计模式-行为型/策略模式',
            },
            {
              text: '模板方法模式',
              link: '/learn_sofrwareArchitecture/designPattern/23种设计模式-行为型/模板方法模式',
            },
          ],
        },
      ],
      '/learn_408/数据结构/': [
        {
          text: '线性结构',
          collapsed: true,
          items: [
            {
              text: '线性表',
              link: '/learn_408/数据结构/线性结构/线性表',
            },
            {
              text: '顺序表',
              link: '/learn_408/数据结构/线性结构/顺序表',
            },
            {
              text: '链表',
              link: '/learn_408/数据结构/线性结构/链表',
            },
          ],
        },
      ],
      '/learn_408/计算机网络/': [
        {
          text: '面试题',
          collapsed: true,
          items: [
            {
              text: 'XSS跨站脚本攻击',
              link: '/learn_408/计算机网络/面试题/XSS跨站脚本攻击',
            },
            {
              text: 'CSRF跨站请求伪造',
              link: '/learn_408/计算机网络/面试题/CSRF跨站请求伪造',
            },
            {
              text: 'SQL注入攻击',
              link: '/learn_408/计算机网络/面试题/SQL注入攻击',
            },
          ],
        },
        {
          text: '物理层',
          collapsed: true,
          items: [
            {
              text: '基本概念',
              link: '/learn_408/计算机网络/物理层/基本概念',
            },
            {
              text: '传输介质',
              link: '/learn_408/计算机网络/物理层/传输介质',
            },
            {
              text: '核心设备',
              link: '/learn_408/计算机网络/物理层/核心设备',
            },
            {
              text: '核心协议',
              link: '/learn_408/计算机网络/物理层/核心协议',
            },

            {
              text: '协议数据单元',
              link: '/learn_408/计算机网络/物理层/协议数据单元',
            },
          ],
        },
        {
          text: '数据链路层',
          collapsed: true,
          items: [
            {
              text: '基本概念',
              link: '/learn_408/计算机网络/数据链路层/基本概念',
            },
            {
              text: '传输介质',
              link: '/learn_408/计算机网络/数据链路层/传输介质',
            },
            {
              text: '核心设备',
              link: '/learn_408/计算机网络/数据链路层/核心设备',
            },
            {
              text: '核心协议',
              link: '/learn_408/计算机网络/数据链路层/核心协议',
            },

            {
              text: '协议数据单元',
              link: '/learn_408/计算机网络/数据链路层/协议数据单元',
            },
          ],
        },
        {
          text: '网络层',
          collapsed: true,
          items: [
            {
              text: '基本概念',
              link: '/learn_408/计算机网络/网络层/基本概念',
            },

            {
              text: '核心设备',
              link: '/learn_408/计算机网络/网络层/核心设备',
            },
            {
              text: '核心协议',
              link: '/learn_408/计算机网络/网络层/核心协议',
            },

            {
              text: '协议数据单元',
              link: '/learn_408/计算机网络/网络层/协议数据单元',
            },
          ],
        },
        {
          text: '传输层',
          collapsed: true,
          items: [
            {
              text: '基本概念',
              link: '/learn_408/计算机网络/传输层/基本概念',
            },
            {
              text: 'TCP和UDP协议',
              link: '/learn_408/计算机网络/传输层/TCP和UDP协议',
            },
            {
              text: 'TCP三次握手和四次挥手',
              link: '/learn_408/计算机网络/传输层/TCP三次握手和四次挥手',
            },

            {
              text: '协议数据单元',
              link: '/learn_408/计算机网络/传输层/协议数据单元',
            },
          ],
        },
        {
          text: '会话层',
          collapsed: true,
          items: [
            {
              text: '基本概念',
              link: '/learn_408/计算机网络/会话层/基本概念',
            },
            {
              text: '核心协议',
              link: '/learn_408/计算机网络/会话层/核心协议',
            },

            {
              text: '协议数据单元',
              link: '/learn_408/计算机网络/会话层/协议数据单元',
            },
          ],
        },
        {
          text: '表示层',
          collapsed: true,
          items: [
            {
              text: '基本概念',
              link: '/learn_408/计算机网络/表示层/基本概念',
            },
            {
              text: '核心协议',
              link: '/learn_408/计算机网络/表示层/核心协议',
            },

            {
              text: '协议数据单元',
              link: '/learn_408/计算机网络/表示层/协议数据单元',
            },
          ],
        },
        {
          text: '应用层',
          collapsed: true,
          items: [
            {
              text: '基本概念',
              link: '/learn_408/计算机网络/应用层/基本概念',
            },
            {
              text: 'DNS解析与优化',
              link: '/learn_408/计算机网络/应用层/DNS解析与优化',
            },
            {
              text: 'HTTP和HTTPS协议',
              link: '/learn_408/计算机网络/应用层/HTTP和HTTPS协议',
            },
            {
              text: 'RESTful API',
              link: '/learn_408/计算机网络/应用层/RESTful API',
            },
            {
              text: 'HTTP不同请求方式',
              link: '/learn_408/计算机网络/应用层/HTTP不同请求方式',
            },
            {
              text: 'HTTP请求体与MIME类型',
              link: '/learn_408/计算机网络/应用层/HTTP请求体与MIME类型',
            },
            {
              text: 'HTTP协议的应用',
              link: '/learn_408/计算机网络/应用层/HTTP协议的应用',
            },
            {
              text: '跨域的解决方案',
              link: '/learn_408/计算机网络/应用层/跨域的解决方案',
            },
            {
              text: 'GET和POST请求的区别',
              link: '/learn_408/计算机网络/面试题/GET和POST请求的区别',
            },
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
  markdown: {
    lineNumbers: true,
    breaks: true,
    math: true,
  },
  vite: {
    resolve: {
      alias: {
        // 配置路径别名
        '@': path.resolve(__dirname, '../'),
      },
    },
  },
});
