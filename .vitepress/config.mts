import path from 'path';
import { defineConfig } from 'vitepress';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'BLOOM',
  description: 'My personal little website',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: '前端知识',
        items: [
          {
            text: 'React',
            link: '/learn_frontend/react/jsx',
          },
        ],
      },
    ],

    sidebar: {
      // 当用户位于指定目录时，会显示此侧边栏
      '/learn_frontend/react': [
        {
          text: 'React',
          items: [
            { text: 'Jsx语法基础', link: '/learn_frontend/react/Jsx' },
            { text: '组件通信', link: '/learn_frontend/react/组件通信' },
            { text: 'Hook', link: '/learn_frontend/react/Hook' },
            { text: 'Redux', link: '/learn_frontend/react/Redux' },
            { text: 'Router', link: '/learn_frontend/react/Router' },
            {
              text: '极客园小项目',
              link: '/learn_frontend/react/极客园小项目',
            },
            {
              text: '优化方案',
              link: '/learn_frontend/react/优化方案',
            },
            {
              text: '组件生命周期',
              link: '/learn_frontend/react/组件生命周期',
            },
            {
              text: '类组件',
              link: '/learn_frontend/react/类组件',
            },
            {
              text: 'zustand',
              link: '/learn_frontend/react/zustand',
            },
            {
              text: '使用vite和ts',
              link: '/learn_frontend/react/使用vite和ts',
            },
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
  markdown: {
    lineNumbers: true,
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
