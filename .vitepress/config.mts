import { defineConfig } from "vitepress";
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "BLOOM",
  description: "My personal little website",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      {
        text: "前端知识",
        items: [
          {
            text: "react",
            link: "/learn_frontend/react/jsx",
          },
        ],
      },
    ],

    sidebar: {
      // 当用户位于 `guide` 目录时，会显示此侧边栏
      "/learn_frontend/react": [
        {
          text: "react",
          items: [{ text: "jsx语法", link: "/learn_frontend/react/jsx" }],
        },
      ],
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  markdown: {
    lineNumbers: true,
  },
});
