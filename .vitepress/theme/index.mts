import DefaultTheme from 'vitepress/theme';
import './style/custom.scss';
import Layout from './components/Layout.vue';
import Life from './pages/Life.vue';
// 导出主题对象Theme ，VitePress 总会使用自定义主题对象
export default {
  ...DefaultTheme,
  NotFound: () => '404', // <- this is a Vue 3 functional component
  Layout: Layout,

  enhanceApp({ app, router, siteData }) {
    app.component('Life', Life);
    // app is the Vue 3 app instance from createApp()
    // router is VitePress' custom router (see `lib/app/router.js`)
    // siteData is a ref of current site-level metadata.
  },
};
