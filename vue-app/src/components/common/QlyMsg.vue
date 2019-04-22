<template>
  <div class="qly-msg">
    <div v-if="mTips.visible" class="m-tips">
      <div class="m-tips-main">
        <p>{{mTips.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'qlyMsg',
  data() {
    return {
      mTips: {
        visible: false,
        text: '',
      },
    };
  },
  methods: {
    miniTips(text) {
      this.mTips.text = text;
      this.mTips.visible = true;
      setTimeout(() => {
        this.mTips.visible = false;
      }, 1500);
    },
  },
};
</script>

<style scoped>
.m-tips {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
}
.m-tips-main {
  display: inline-block;
  background-color: #666;
  color: #fff;
  height: 35px;
  line-height: 35px;
  border-radius: 3px;
  text-align: center;
  padding: 0 15px;
}
</style>
