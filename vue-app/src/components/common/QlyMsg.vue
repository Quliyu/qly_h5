<template>
  <div class="qly-msg">
    <div v-if="mTips.visible" class="m-tips">
      <p>{{mTips.text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'qlyMsg',
  data() {
    return {
      sTips: {
        visible: false,
        title: '',
        text: '',
        cancel: {
          text: '取消',
          event: null,
        },
        confirm: {
          text: '确定',
          event: null,
        },
      },
      mTips: {
        visible: false,
        text: '',
      },
    };
  },
  methods: {
    miniTips(options) {
      this.mTips.text = options.text || 'text';
      this.mTips.visible = true;
      setTimeout(() => {
        this.mTips.visible = false;
      }, options.milliseconds || 1500);
    },
    successTips(options) {

    }
  },
};
</script>

<style scoped>
.m-tips {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 10;
  display: inline-block;
  background-color: #666;
  color: #fff;
  height: 35px;
  line-height: 35px;
  text-align: center;
  padding: 0 15px;
  box-sizing: border-box;
  width: fit-content;
  border-radius: 3px;
}
</style>
