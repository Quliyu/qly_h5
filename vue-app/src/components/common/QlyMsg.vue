<template>
  <div class="qly-msg">
    <div v-if="mTips.visible" class="m-tips">
      <p>{{mTips.text}}</p>
    </div>
    <div v-if="cTips.visible" class="c-tips" @click="cTipsClose">
      <div @click.stop>
        <p class="icon">
          <img :src="cTips.icon[cTips.type]">
        </p>
        <p class="text">{{cTips.text}}</p>
        <p class="btns">
          <span v-for="(el,index) in cTips.btns" @click="cTipsEvent(el)" :style="'width:'+(100/cTips.btns.length)+'%;'">{{el.text}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'qlyMsg',
  data() {
    return {
      cTips: {
        visible: false,
        bgClickClose: true,
        type: 1, // 0info 1success 2error
        icon: ['http://img.6h5.cn/static/qly/jwjy/hd1/c-tips-info.png','http://img.6h5.cn/static/qly/jwjy/hd1/c-tips-success.png'],
        text: 'text',
        btns: [{
          text: '知道了',
          event: null,
        }]
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
      this.cTips.type = 1;
      this.cTips.text = options.text || 'text';
      this.cTips.visible = true;
    },
    infoTips(options) {
      this.cTips.type = 0;
      this.cTips.text = options.text || 'text';
      this.cTips.visible = true;
    },
    cTipsEvent(el) {
      this.cTips.visible = false
      if(el.event){

      }
    },
    cTipsClose() {
      if(this.cTips.bgClickClose){
        this.cTips.visible = false
      }
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
  z-index: 100;
  margin: auto;
  color: #fff;
  text-align: center;
  display: inline-block;
  background-color: #666;
  padding: 5px 10px;
  border-radius: 3px;
  height: fit-content;
  width: fit-content;
  max-width: 75%;
  font-size: 15px;
}
.m-tips p {
  margin: 0;padding: 0;
}

.c-tips {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  z-index: 11;
}
.c-tips > div {
  position: absolute;
  width: 60%;
  max-width: 480px;
  height: fit-content;
  background-color: #fff;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  border-radius: 10px;
}
.c-tips p {
  margin: 0;
  padding: 0;
}
.c-tips > div > .icon > img {
  width: 30px;
  height: 30px;
}
.c-tips p.icon {
  padding-top: 15px;
}
.c-tips p.text {
  padding: 15px 0;
}
.c-tips p.btns {
  padding: 0!important;
  height: 44px;
  line-height: 44px;
  border-top: solid 1px #ccc;
}
.c-tips p.btns > span {
  display: inline-block;
}
</style>
