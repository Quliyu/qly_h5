<template>
  <div v-if="hengshuping=='heng'" class="heng-ping">
    <div>
      <p>竖屏体验更佳</p>
      <p>请旋转屏幕观看</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hengshuping: 'shu',
    };
  },
  created() {
    // 判断手机横竖屏状态：
    window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', () => {
      if (window.orientation === 180 || window.orientation === 0) {
        this.hengshuping = 'shu';
      }
      if (window.orientation === 90 || window.orientation === -90) {
        this.hengshuping = 'heng';
      }
    }, false);
  },
};
</script>

<style scoped>
.heng-ping{
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 10000;
  text-align: center;
  display: table;
}
.heng-ping > div {
  display: table-cell;
  vertical-align: middle;
  font-size: 16px;
}
</style>

