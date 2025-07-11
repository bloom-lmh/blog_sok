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
            text: 'Vue3',
            link: '/learn_frontend/vue3/vue3基础/起步/简介',
          },
          {
            text: 'React',
            link: '/learn_frontend/react/react基础/jsx',
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
          items: [
            { text: '盒模型', link: '/learn_frontend/css/盒模型及其样式设置/盒模型' },
            { text: '包含块', link: '/learn_frontend/css/盒模型及其样式设置/包含块' },
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
          items: [
            { text: '背景', link: '/learn_frontend/css/背景和图片/背景' },
            { text: 'CSS3-图片', link: '/learn_frontend/css/背景和图片/CSS3-图片' },
            { text: 'CSS3-渐变', link: '/learn_frontend/css/背景和图片/CSS3-渐变' },
          ],
        },
        {
          text: '变换和动画',
          items: [
            { text: 'CSS3-变换', link: '/learn_frontend/css/变换和动画/CSS3-变换' },
            {
              text: 'CSS3-过渡和动画',
              link: '/learn_frontend/css/变换和动画/CSS3-过渡和动画',
            },
          ],
        },
        {
          text: '定位和布局',
          items: [
            { text: '关于浮动', link: '/learn_frontend/css/定位和布局/关于浮动' },
            { text: '定位', link: '/learn_frontend/css/定位和布局/定位' },
            { text: 'BFC机制', link: '/learn_frontend/css/定位和布局/BFC机制' },

            { text: '元素居中方法', link: '/learn_frontend/css/定位和布局/元素居中的方法' },

            {
              text: 'CSS3-弹性布局Flex',
              link: '/learn_frontend/css/定位和布局/CSS3-弹性布局Flex',
            },
            {
              text: 'CSS3-网格布局Gird',
              link: '/learn_frontend/css/定位和布局/CSS3-网格布局Grid',
            },
            { text: '常见布局方案', link: '/learn_frontend/css/定位和布局/常见布局方案' },
          ],
        },
        {
          text: '响应式',
          items: [
            { text: '响应式设计', link: '/learn_frontend/css/响应式/响应式设计' },
            { text: 'CSS3-媒体查询', link: '/learn_frontend/css/响应式/CSS3-媒体查询' },
          ],
        },
        {
          text: '元素选择',
          items: [{ text: '选择器', link: '/learn_frontend/css/元素选择/选择器' }],
        },
        {
          text: '变量',
          items: [{ text: '变量', link: '/learn_frontend/css/变量/变量' }],
        },
        {
          text: '面试题',
          items: [
            { text: '设备像素', link: '/learn_frontend/css/面试题/设备像素' },
            { text: 'em和rem等的区别', link: '/learn_frontend/css/面试题/em和rem等的区别' },
          ],
        },
        {
          text: '小案例',
          items: [
            { text: '视差滚动', link: '/learn_frontend/css/面试题/视差滚动' },
            { text: '画一个三角形', link: '/learn_frontend/css/面试题/画一个三角形' },
          ],
        },
      ],
      '/learn_frontend/javascript/': [
        {
          text: '语法基础',
          items: [
            { text: '数据类型', link: '/learn_frontend/javascript/语法基础/数据类型' },
            { text: '类型转换', link: '/learn_frontend/javascript/语法基础/类型转换' },
            {
              text: '表达式与操作符',
              link: '/learn_frontend/javascript/语法基础/表达式与操作符',
            },
          ],
        },
        {
          text: '面向对象',
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
              text: '元编程',
              link: '/learn_frontend/javascript/面向对象/元编程',
            },
          ],
        },

        {
          text: '标准库',
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
          text: '事件',
          items: [
            { text: '事件基础', link: '/learn_frontend/javascript/事件/事件基础' },
            { text: '事件循环', link: '/learn_frontend/javascript/事件/事件循环' },
            { text: '新事件循环', link: '/learn_frontend/javascript/事件/新事件循环' },
          ],
        },
        {
          text: '网络与异步编程',
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
              text: 'fetch',
              link: '/learn_frontend/javascript/网络与异步编程/fetch',
            },
          ],
        },
        {
          text: '迭代器生成器',
          items: [
            {
              text: '迭代器生成器',
              link: '/learn_frontend/javascript/迭代器生成器/迭代器生成器',
            },
          ],
        },
        {
          text: '存储',
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
          items: [
            {
              text: '模块化',
              link: '/learn_frontend/javascript/模块化/模块化',
            },
          ],
        },
        {
          text: 'DOM',
          items: [
            { text: '节点的基本操作', link: '/learn_frontend/javascript/DOM/节点的基本操作' },
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
            { text: '进阶知识', link: '/learn_frontend/javascript/DOM/进阶知识' },
          ],
        },
        {
          text: 'BOM',
          items: [
            { text: 'window', link: '/learn_frontend/javascript/BOM/window' },
            { text: 'location', link: '/learn_frontend/javascript/BOM/location' },
            { text: 'history', link: '/learn_frontend/javascript/BOM/history' },
            {
              text: 'location与history的相互作用',
              link: '/learn_frontend/javascript/BOM/location与history的相互作用',
            },
            { text: 'screen', link: '/learn_frontend/javascript/BOM/screen' },
            { text: 'navigator', link: '/learn_frontend/javascript/BOM/navigator' },
          ],
        },
        {
          text: 'ES6-ES13',
          items: [
            {
              text: 'ES6新特性',
              link: '/learn_frontend/javascript/ES6-ES13新特性/ES6新特性',
            },
          ],
        },
        {
          text: '内存管理',
          items: [
            {
              text: '垃圾回收机制',
              link: '/learn_frontend/javascript/内存管理/垃圾回收机制',
            },
          ],
        },
        {
          text: '多线程',
          items: [
            {
              text: 'Web Worker',
              link: '/learn_frontend/javascript/多线程/Web Worker',
            },
          ],
        },
        {
          text: '执行上下文',
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
          text: '面试题',
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
              text: '多种继承方式',
              link: '/learn_frontend/javascript/面试题/多种继承方式',
            },
            {
              text: 'ThisBinding的一些场景',
              link: '/learn_frontend/javascript/面试题/ThisBinding的一些场景',
            },
          ],
        },

        {
          text: '小案例',
          items: [
            {
              text: '实现轮播图的两种方式',
              link: '/learn_frontend/js/小案例/实现轮播图',
            },
            {
              text: '实现SPA路由',
              link: '/learn_frontend/js/小案例/实现SPA路由',
            },
          ],
        },
      ],
      '/learn_frontend/vue3/': [
        {
          text: '起步',
          items: [
            { text: '简介', link: '/learn_frontend/vue3/vue3基础/起步/简介' },
            { text: '选项式和组合式', link: '/learn_frontend/vue3/vue3基础/起步/选项式和组合式' },
            { text: '应用实例', link: '/learn_frontend/vue3/vue3基础/起步/应用实例' },
          ],
        },
        {
          text: '模板语法',
          items: [],
        },
        {
          text: '指令',
          items: [
            { text: '指令基本概念', link: '/learn_frontend/vue3/vue3基础/指令/指令基本概念' },
            { text: '内置指令', link: '/learn_frontend/vue3/vue3基础/指令/内置指令' },
          ],
        },
        {
          text: '控制样式',
          items: [],
        },
        {
          text: '组件',
          items: [],
        },
        {
          text: '生命周期',
          items: [],
        },
        {
          text: '响应式',
          items: [
            { text: 'ref和reactive', link: '/learn_frontend/vue3/vue3基础/响应式/ref和reactive' },
            { text: '计算属性', link: '/learn_frontend/vue3/vue3基础/响应式/计算属性' },
            { text: '监听器', link: '/learn_frontend/vue3/vue3基础/响应式/监听器' },
          ],
        },
        {
          text: '路由',
          items: [],
        },
        {
          text: '插件',
          items: [],
        },
      ],
      '/learn_frontend/react/': [
        {
          text: 'react基础',
          items: [
            { text: 'Jsx', link: '/learn_frontend/react/react基础/Jsx' },
            { text: '组件通信', link: '/learn_frontend/react/react基础/组件通信' },
            { text: '组件生命周期', link: '/learn_frontend/react/react基础/组件生命周期' },
            { text: '类组件', link: '/learn_frontend/react/react基础/优化方案' },
            { text: 'Router', link: '/learn_frontend/react/react基础/Router' },
            { text: 'Redux', link: '/learn_frontend/react/react基础/Redux' },
            { text: 'zustand', link: '/learn_frontend/react/react基础/zustand' },
            { text: 'Hook', link: '/learn_frontend/react/react基础/Hook' },
            { text: '优化方案', link: '/learn_frontend/react/react基础/优化方案' },
            { text: '使用vite和Ts', link: '/learn_frontend/react/react基础/使用vite和Ts' },
            { text: '极客园小项目', link: '/learn_frontend/react/react基础/极客园小项目' },
          ],
        },
        {
          text: 'react源码',
          items: [
            {
              text: '创建ReactElement',
              link: '/learn_frontend/react/react源码-18.1.0/创建ReactElement',
            },
            {
              text: 'Fiber与Fiber链表树',
              link: '/learn_frontend/react/react源码-18.1.0/Fiber与Fiber链表树',
            },
            { text: 'Fiber中的模式', link: '/learn_frontend/react/react源码-18.1.0/Fiber中的模式' },
            { text: 'Fiber中的Lane', link: '/learn_frontend/react/react源码-18.1.0/Fiber中的Lane' },
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
          items: [
            {
              text: '代理模式',
              link: '/learn_sofrwareArchitecture/designPattern/23种设计模式-结构型/代理模式',
            },
            {
              text: '装饰器模式',
              link: '/learn_sofrwareArchitecture/designPattern/23种设计模式-结构型/装饰器模式',
            },
          ],
        },
        {
          text: '23种设计模式-行为型',
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
          ],
        },
      ],
      '/learn_408/数据结构/': [
        {
          text: '线性结构',
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
          items: [
            { text: 'HTTP和HTTPS', link: '/learn_408/计算机网络/面试题/HTTP和HTTPS' },
            { text: 'DNS解析与优化', link: '/learn_408/计算机网络/面试题/DNS解析与优化' },
            { text: 'RESTful API', link: '/learn_408/计算机网络/面试题/RESTful API' },
            { text: '跨域的解决方案', link: '/learn_408/计算机网络/面试题/跨域的解决方案' },
            {
              text: 'GET和POST请求的区别',
              link: '/learn_408/计算机网络/面试题/GET和POST请求的区别',
            },
            { text: 'XSS跨站脚本攻击', link: '/learn_408/计算机网络/面试题/XSS跨站脚本攻击' },
            { text: 'CSRF跨站请求伪造', link: '/learn_408/计算机网络/面试题/CSRF跨站请求伪造' },
            { text: 'SQL注入攻击', link: '/learn_408/计算机网络/面试题/SQL注入攻击' },
            { text: '防盗链机制', link: '/learn_408/计算机网络/面试题/防盗链机制' },
          ],
        },
        {
          text: '物理层',
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
          items: [
            {
              text: '基本概念',
              link: '/learn_408/计算机网络/网络层/基本概念',
            },
            {
              text: '传输介质',
              link: '/learn_408/计算机网络/网络层/传输介质',
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
          items: [
            {
              text: '基本概念',
              link: '/learn_408/计算机网络/传输层/基本概念',
            },
            {
              text: '传输介质',
              link: '/learn_408/计算机网络/传输层/传输介质',
            },
            {
              text: '核心设备',
              link: '/learn_408/计算机网络/传输层/核心设备',
            },
            {
              text: '核心协议',
              link: '/learn_408/计算机网络/传输层/核心协议',
            },

            {
              text: '协议数据单元',
              link: '/learn_408/计算机网络/传输层/协议数据单元',
            },
          ],
        },
        {
          text: '会话层',
          items: [
            {
              text: '基本概念',
              link: '/learn_408/计算机网络/会话层/基本概念',
            },
            {
              text: '传输介质',
              link: '/learn_408/计算机网络/会话层/传输介质',
            },
            {
              text: '核心设备',
              link: '/learn_408/计算机网络/会话层/核心设备',
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
          items: [
            {
              text: '基本概念',
              link: '/learn_408/计算机网络/表示层/基本概念',
            },
            {
              text: '传输介质',
              link: '/learn_408/计算机网络/表示层/传输介质',
            },
            {
              text: '核心设备',
              link: '/learn_408/计算机网络/表示层/核心设备',
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
          items: [
            {
              text: '基本概念',
              link: '/learn_408/计算机网络/应用层/基本概念',
            },
            {
              text: '传输介质',
              link: '/learn_408/计算机网络/应用层/传输介质',
            },
            {
              text: '核心设备',
              link: '/learn_408/计算机网络/应用层/核心设备',
            },
            {
              text: '核心协议',
              link: '/learn_408/计算机网络/应用层/核心协议',
            },

            {
              text: '协议数据单元',
              link: '/learn_408/计算机网络/应用层/协议数据单元',
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
