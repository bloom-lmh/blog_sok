<script setup>
import DefaultTheme from 'vitepress/theme';

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <!-- 控制目录上面样式 -->
    <!-- <template #aside-outline-before></template> -->
    <!-- 控制首页信息 包括name text tagline -->
    <!-- <template #home-hero-info></template> -->
    <!-- 控制hero图片样式 -->
    <template #home-hero-image><img class="hero-image" src="@/logo.png" alt="" /></template>
  </Layout>
</template>

<style lang="scss" scoped>
.hero-image {
  width: 100%;
  height: 100%;

  border-radius: 50%;
}
</style>
