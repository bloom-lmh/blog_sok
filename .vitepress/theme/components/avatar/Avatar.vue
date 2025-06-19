<template>
  <!-- 此处将渲染 markdown 内容 -->
  <div class="hero-image-wapper">
    <div class="hero-image">
      <img src="@/logo.png" alt="" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hero-image-wapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    .hero-image > img {
      transition: transform 1s linear;
      transform: scale(1.2);
    }
  }
  .hero-image {
    border-radius: 50%;
    overflow: hidden;
    box-shadow: #f5f5f5 0px 0px 80px 0px;
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
