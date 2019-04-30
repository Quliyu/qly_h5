<template>
  <div class="qr-code">
    <img :src="imgUrl" alt="" style="width:100%;">
    <span style="font-size: 14px;">扫码体验更佳</span>
  </div>
</template>

<script>
const QRCode = require('qrcode');

const url = window.location.href;

export default {
  data() {
    return {
      imgUrl: '',
    };
  },
  created() {
    QRCode.toDataURL(url).then((res) => {
      this.imgUrl = res;
    });
  },
};
</script>

<style scoped>
.qr-code {
  position: fixed;
  top: 15px;
  margin-left: -165px;
  width: 150px;
  font-size: 0;
}
</style>
