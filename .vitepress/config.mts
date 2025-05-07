import path from 'path';
import { defineConfig } from 'vitepress';
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
            text: 'React',
            link: '/learn_frontend/react/react基础/jsx',
          },
        ],
      },
    ],

    sidebar: {
      // 当用户位于指定目录时，会显示此侧边栏
      '/learn_frontend/react': [
        {
          text: 'React基础',
          items: [
            { text: 'Jsx语法基础', link: '/learn_frontend/react/react基础/Jsx' },
            { text: '组件通信', link: '/learn_frontend/react/react基础/组件通信' },
            { text: 'Hook', link: '/learn_frontend/react/react基础/Hook' },
            { text: 'Redux', link: '/learn_frontend/react/react基础/Redux' },
            { text: 'Router', link: '/learn_frontend/react/react基础/Router' },
            {
              text: '极客园小项目',
              link: '/learn_frontend/react/react基础/极客园小项目',
            },
            {
              text: '优化方案',
              link: '/learn_frontend/react/react基础/优化方案',
            },
            {
              text: '组件生命周期',
              link: '/learn_frontend/react/react基础/组件生命周期',
            },
            {
              text: '类组件',
              link: '/learn_frontend/react/react基础/类组件',
            },
            {
              text: 'zustand',
              link: '/learn_frontend/react/react基础/zustand',
            },
            {
              text: '使用vite和ts',
              link: '/learn_frontend/react/react基础/使用vite和Ts',
            },
          ],
        },
        {
          text: 'React源码-18.1.0',
          items: [
            {
              text: '01从创建React元素出发',
              link: '/learn_frontend/react/react源码-18.1.0/创建ReactElement',
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
