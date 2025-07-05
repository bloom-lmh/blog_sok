import path from 'path';
import { defineConfig } from 'vitepress';
import { buildSideBar } from './utils/sideBarGenerator';
import { text } from 'stream/consumers';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'SOK',
  description: 'Seasons on the Keyboard',

  themeConfig: {
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
            link: '/learn_frontend/css/css基础/盒模型及其样式设置/盒模型',
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
            link: '/learn_408/计算机网络/计算机网络知识',
          },
        ],
      },
      {
        text: '算法',
        items: [
          {
            text: '经验技巧',
            link: '/learn_algorithms/经验技巧/经验技巧',
          },
          {
            text: '数据结构问题',
            link: '/learn_algorithms/数据结构',
          },
        ],
      },
    ],

    sidebar: {
      '/learn_frontend/css/css基础/': [
        {
          text: '盒模型及其样式设置',
          items: [
            { text: '盒模型', link: '/learn_frontend/css/css基础/盒模型及其样式设置/盒模型' },
            {
              text: '边框和轮廓',
              link: '/learn_frontend/css/css基础/盒模型及其样式设置/边框和轮廓',
            },
            {
              text: '溢出效果',
              link: '/learn_frontend/css/css基础/盒模型及其样式设置/溢出效果',
            },
          ],
        },
        {
          text: '文本字体',
          items: [
            { text: '文本字体', link: '/learn_frontend/css/css基础/文本字体/文本字体' },
            {
              text: '字体图标引入方式',
              link: '/learn_frontend/css/css基础/文本字体/字体图标引入方式',
            },
          ],
        },
        {
          text: '背景和图片',
          items: [
            { text: '背景', link: '/learn_frontend/css/css基础/背景和图片/背景' },
            { text: 'CSS3-图片', link: '/learn_frontend/css/css基础/背景和图片/CSS3-图片' },
            { text: 'CSS3-渐变', link: '/learn_frontend/css/css基础/背景和图片/CSS3-渐变' },
          ],
        },
        {
          text: '变换和动画',
          items: [
            { text: 'CSS3-变换', link: '/learn_frontend/css/css基础/变换和动画/CSS3-变换' },
            {
              text: 'CSS3-过渡和动画',
              link: '/learn_frontend/css/css基础/变换和动画/CSS3-过渡和动画',
            },
          ],
        },
        {
          text: '定位和布局',
          items: [
            { text: '关于浮动', link: '/learn_frontend/css/css基础/定位和布局/关于浮动' },
            { text: 'BFC机制', link: '/learn_frontend/css/css基础/定位和布局/BFC机制' },

            { text: '元素居中方法', link: '/learn_frontend/css/css基础/定位和布局/元素居中的方法' },

            {
              text: 'CSS3-弹性布局Flex',
              link: '/learn_frontend/css/css基础/定位和布局/CSS3-弹性布局Flex',
            },
            {
              text: 'CSS3-网格布局Gird',
              link: '/learn_frontend/css/css基础/定位和布局/CSS3-网格布局Grid',
            },
            { text: '常见布局方案', link: '/learn_frontend/css/css基础/定位和布局/常见布局方案' },
          ],
        },
        {
          text: '响应式',
          items: [
            { text: '响应式设计', link: '/learn_frontend/css/css基础/响应式/响应式设计' },
            { text: 'CSS3-媒体查询', link: '/learn_frontend/css/css基础/响应式/CSS3-媒体查询' },
          ],
        },
        {
          text: '元素选择',
          items: [{ text: '选择器', link: '/learn_frontend/css/css基础/元素选择/选择器' }],
        },
        {
          text: '变量',
          items: [],
        },
        {
          text: 'css项目',
          items: [],
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
            {
              text: '作用域问题',
              link: '/learn_frontend/javascript/语法基础/作用域问题',
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
          text: '迭代器生成器',
          items: [
            {
              text: '迭代器生成器',
              link: '/learn_frontend/javascript/迭代器生成器/',
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
              text: 'JSON序列化与解析',
              link: '/learn_frontend/javascript/标准库/JSON序列化与解析',
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
          text: '异步编程',
          items: [
            {
              text: '基于回调的异步编程技术',
              link: '/learn_frontend/javascript/异步编程/基于回调的异步编程技术',
            },
            {
              text: '基于期约链的异步编程技术',
              link: '/learn_frontend/javascript/异步编程/基于期约链的异步编程技术',
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
          text: '面试题',
          items: [
            {
              text: '几种编程方式',
              link: '/learn_frontend/javascript/面试题/几种编程方式',
            },
            {
              text: '执行上下文this',
              link: '/learn_frontend/javascript/面试题/执行上下文this',
            },
            {
              text: '防抖节流',
              link: '/learn_frontend/javascript/面试题/防抖节流',
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
          items: [],
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
          text: '23种设计模式-行为型',
          items: [
            {
              text: '命令模式',
              link: '/learn_sofrwareArchitecture/designPattern/23种设计模式-行为型/命令模式',
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
          ],
        },
      ],
    } /* buildSideBar([
      '/learn_frontend/css/',
      '/learn_frontend/react',
      '/learn_frontend/js/',
      '/learn_sofrwareArchitecture/designPattern/',
      '/learn_algorithms/',
    ]), */,
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
