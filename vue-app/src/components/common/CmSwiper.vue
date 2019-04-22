<template>
  <div class="cm-swiper-main" :style="'height:'+w_width+'px;max-height:600px;'">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(el,index) in mySwiperList" :key="index">
          <template v-if="el.video">
            <video v-show="!el.playBtnVisible" :ref="'yunboxVideo_'+index"
            :src="el.video"
            :style="'height:'+w_width+'px;max-width: 100%;'"
            :webkit-playsinline="true"
            :playsinline="true"
            x5-video-player-type="h5"
            x5-video-player-fullscreen="true"
            @click="pauseVideo(el,index)"></video>
            <img v-show="el.playBtnVisible" :src="el.img+el.imgSrcPostfix"
            style="width: 100%;" @load.once="imgLoad(el)">
            <img v-show="el.playBtnVisible"
            src="//medias.cloudm.com/static/audio/youyue/icon-play.png?imageView2/0/w/100"
            style="position: absolute;width:50px;left:50%;top:50%;
            margin-left:-25px;margin-top:-25px;"
            @click="playVideo(el,index)">
          </template>
          <img v-if="!el.video" :src="el.img+el.imgSrcPostfix" alt=""
          style="width:100%;" @load.once="imgLoad(el)">
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>

import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

export default {
  name: 'CmSwiper',
  props: ['list'],
  components: { Swiper },
  data() {
    return {
      w_height: window.innerHeight,
      w_width: window.innerWidth,
      mySwiper: null,
      mySwiperList: [],
      imgSrcPostfix: '?imageView2/1/w/100/h/100/q/50',
    };
  },
  watch: {
    list: {
      handler(curVal) {
        // console.log('watch list=>', curVal);
        if (curVal instanceof Array && curVal.length > 0) {
          // 监听dom渲染结束之后
          // this.$nextTick(() => {
          //   this.mySwiper.init();
          // });

          this.list.forEach((one) => {
            const n = one;
            if (n.video) {
              n.playBtnVisible = true;
            } else {
              n.playBtnVisible = false;
            }
            n.imgSrcPostfix = this.imgSrcPostfix;
          });
          this.mySwiperList = JSON.parse(JSON.stringify(this.list));
          // console.log('mySwiperList=>', this.mySwiperList);
        }
      },
      deep: true,
    },
  },
  created() {

  },
  mounted() {
    this.mySwiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      observer: true, // 修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, // 修改swiper的父元素时，自动初始化swiper
      onSlideChangeEnd: (swiper) => {
        // console.log('activeIndex=>', swiper.activeIndex);
        // console.log('swipeDirection=>', swiper.swipeDirection);
        let beforeIndex = swiper.activeIndex - 1;
        if (swiper.swipeDirection === 'prev') {
          beforeIndex = swiper.activeIndex + 1;
        }
        // console.log('beforeIndex=>', beforeIndex);
        if (beforeIndex < 0) {
          beforeIndex = 0;
        }
        // console.log(this.$refs[`yunboxVideo_${beforeIndex}`]);
        if (this.$refs[`yunboxVideo_${beforeIndex}`]) {
          const video = this.$refs[`yunboxVideo_${beforeIndex}`][0];
          if (video) {
            video.pause();
          }
        }
      },
    });
  },
  methods: {
    // 模糊图片加载完成
    imgLoad(el) {
      const oneImg = el;
      // console.log('oneImg=>', oneImg);
      if (oneImg.imgSrcPostfix === this.imgSrcPostfix) {
        setTimeout(() => {
          oneImg.imgSrcPostfix = '?imageView2/1/w/600/h/600/q/100';
        }, 100);
      }
    },
    // 播放视频
    playVideo(el, index) {
      // console.log(el, index);
      const one = el;
      console.log('play');
      one.playBtnVisible = false;
      // console.log(this.$refs[`yunboxVideo_${index}`]);

      if (this.$refs[`yunboxVideo_${index}`]) {
        const video = this.$refs[`yunboxVideo_${index}`][0];

        if (video) {
          video.play();

          video.addEventListener('ended', () => {
            console.log('ended');
            one.playBtnVisible = true;
          });
          video.addEventListener('pause', () => {
            console.log('pause');
            one.playBtnVisible = true;
          });
        }
      }
    },
    // 暂停视频
    pauseVideo(el, index) {
      // console.log(this.$refs[`yunboxVideo_${index}`]);
      if (this.$refs[`yunboxVideo_${index}`]) {
        const video = this.$refs[`yunboxVideo_${index}`][0];
        if (video) {
          video.pause();
        }
      }
    },
  },
};
</script>

<style scoped>
.cm-swiper-main {
  width: 100%;
  font-size: 0;
}
</style>
<style>
.swiper-pagination-bullet-active {
  background: #ff8901!important;
}
</style>
