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
        ],
      },
    ],

    sidebar: buildSideBar(['/learn_frontend/css/', '/learn_frontend/react']),
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
