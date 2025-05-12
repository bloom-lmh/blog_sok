import path from 'path';
import { defineConfig } from 'vitepress';
import { buildSideBar, buildSideBarItem } from './utils/sideBarGenerator';
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
            text: 'HTML',
            link: '/learn_frontend/html/重要知识点',
          },

          {
            text: 'CSS',
            link: '/learn_frontend/css/css基础/盒模型',
          },
          {
            text: 'Javascript',
            link: '/learn_frontend/js/js基础/js中的数据类型',
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
            text: '双指针问题',
            link: '/learn_algorithms/双指针的运用/双指针的运用',
          },
          {
            text: '数据结构问题',
            link: '/learn_algorithms/数据结构/队列',
          },
        ],
      },
    ],

    sidebar: buildSideBar([
      '/learn_frontend/css/',
      '/learn_frontend/react',
      '/learn_frontend/js/',
      '/learn_sofrwareArchitecture/designPattern/',
      '/learn_algorithms/双指针的运用/',
    ]),
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
  markdown: {
    lineNumbers: true,
    breaks: true,
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
