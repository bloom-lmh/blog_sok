import path from 'path';
import { defineConfig } from 'vitepress';
import { buildSideBar } from './utils/sideBarGenerator';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'BLOOM',
  description: 'My personal little website',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },

      {
        text: '前端知识',
        items: [
          {
            text: 'CSS',
            link: '/learn_frontend/css/css基础/盒模型',
          },
          {
            text: 'Javascript',
            link: '/learn_frontend/js/js基础/JS-数据类型',
          },
          {
            text: 'React',
            link: '/learn_frontend/react/react基础/jsx',
          },

          {
            text: '浏览器',
            link: '/learn_frontend/browser/browser基础/浏览器渲染流程',
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
      '/learn_frontend/css/': [
        {
          text: 'css基础',
          items: [
            { text: '盒模型', link: '/learn_frontend/css/css基础/盒模型' },
            { text: '关于浮动', link: '/learn_frontend/css/css基础/关于浮动' },
            { text: 'BFC机制', link: '/learn_frontend/css/css基础/BFC机制' },
            { text: '元素居中方法', link: '/learn_frontend/css/css基础/元素居中的方法' },
            { text: 'Gird', link: '/learn_frontend/css/css基础/Grid' },
            { text: '布局', link: '/learn_frontend/css/css基础/布局' },
            { text: '响应式设计', link: '/learn_frontend/css/css基础/响应式设计' },
          ],
        },
        {
          text: 'css项目',
          items: [],
        },
      ],
      '/learn_frontend/js/': [
        {
          text: 'js基础',
          items: [
            { text: 'JS-数据类型', link: '/learn_frontend/js/js基础/JS-数据类型' },
            { text: 'JS-类型转换', link: '/learn_frontend/js/js基础/JS-类型转换' },
            { text: 'JS-表达式与操作符', link: '/learn_frontend/js/js基础/JS-表达式与操作符' },

            {
              text: 'JS-作用域问题',
              link: '/learn_frontend/js/js基础/JS-作用域问题',
            },
            {
              text: 'JS-对象',
              link: '/learn_frontend/js/js基础/JS-对象',
            },
            {
              text: 'JS-数组基础',
              link: '/learn_frontend/js/js基础/JS-数组基础',
            },
            {
              text: 'JS-数组进阶',
              link: '/learn_frontend/js/js基础/JS-数组进阶',
            },
            {
              text: 'JS-函数基础',
              link: '/learn_frontend/js/js基础/JS-函数基础',
            },
            {
              text: 'JS-函数进阶',
              link: '/learn_frontend/js/js基础/JS-函数进阶',
            },
            {
              text: 'JS-类',
              link: '/learn_frontend/js/js基础/JS-类',
            },
            {
              text: 'JS-基于原型链的继承',
              link: '/learn_frontend/js/js基础/JS-基于原型链的继承',
            },
            {
              text: 'JS-标准库',
              link: '/learn_frontend/js/js基础/JS-标准库',
            },
            {
              text: 'JS-正则表达式',
              link: '/learn_frontend/js/js基础/JS-正则表达式',
            },
            {
              text: 'JS-模块化',
              link: '/learn_frontend/js/js基础/JS-模块化',
            },
            { text: 'JS-事件基础', link: '/learn_frontend/js/js基础/JS-事件基础' },
            { text: 'JS-事件循环', link: '/learn_frontend/js/js基础/JS-事件循环' },
            {
              text: 'JS-执行上下文this',
              link: '/learn_frontend/js/js基础/JS-执行上下文this',
            },
            {
              text: 'JS-元编程',
              link: '/learn_frontend/js/js基础/JS-元编程',
            },

            {
              text: 'JS-防抖节流',
              link: '/learn_frontend/js/js基础/JS-防抖节流',
            },
            { text: 'DOM节点的基本操作', link: '/learn_frontend/js/js基础/DOM节点的基本操作' },
            {
              text: 'DOM节点属性的基本操作',
              link: '/learn_frontend/js/js基础/DOM节点属性的基本操作',
            },
            {
              text: 'DOM元素内容的基本操作',
              link: '/learn_frontend/js/js基础/DOM元素内容的基本操作',
            },
            {
              text: 'DOM节点样式的基本操作',
              link: '/learn_frontend/js/js基础/DOM节点样式的基本操作',
            },
            { text: 'DOM进阶知识', link: '/learn_frontend/js/js基础/DOM进阶知识' },
            { text: 'BOM-window', link: '/learn_frontend/js/js基础/BOM-window' },
            { text: 'BOM-location', link: '/learn_frontend/js/js基础/BOM-location' },
            { text: 'BOM-history', link: '/learn_frontend/js/js基础/BOM-history' },
            {
              text: 'BOM-location与history的相互作用',
              link: '/learn_frontend/js/js基础/BOM-location与history的相互作用',
            },
            {
              text: 'ES6-ES13新特性',
              link: '/learn_frontend/js/js基础/ES6-ES13新特性',
            },
            {
              text: 'Promise',
              link: '/learn_frontend/js/js基础/Promise',
            },
          ],
        },
        {
          text: 'js项目',
          items: [
            {
              text: '实现轮播图的两种方式',
              link: '/learn_frontend/js/js项目/实现轮播图',
            },
            {
              text: '实现SPA路由',
              link: '/learn_frontend/js/js项目/实现SPA路由',
            },
          ],
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
