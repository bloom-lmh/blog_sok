<script setup>
import DefaultTheme from 'vitepress/theme';
const { Layout } = DefaultTheme;
import { Avatar } from './index';
</script>

<template>
  <!-- 此处将渲染 markdown 内容 -->
  <Layout>
    <template #home-hero-image>
      <Avatar />
    </template>
  </Layout>
</template>

<style lang="scss" scoped>
.hero-image-wapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .hero-image {
    border-radius: 50%;
    box-shadow: #f5f5f5 0px 0px 80px 0px;
    background: url('@/logo.png') center/contain no-repeat;
  }
  @media (min-width: 960px) {
    .hero-image {
      width: 320px;
      height: 320px;
    }
  }
  @media (min-width: 640px) and (max-width: 959px) {
    .hero-image {
      width: 256px;
      height: 256px;
    }
  }
  @media (max-width: 639px) {
    .hero-image {
      width: 192px;
      height: 192px;
    }
  }
}
</style>
