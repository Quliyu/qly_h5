<template>
  <div style="background-color: #84ce87;">
    <div class="banner-top">
      <div class="logo">
        <span>金屋优优</span>
      </div>
      <img style="width:100%;" src="http://img.6h5.cn/static/qly/jwjy/hd1/banner-top-13.png">
      <div class="t-1">
        <img src="http://img.6h5.cn/static/qly/jwjy/hd1/banner-top-22.png">
      </div>
    </div>
    <div class="jwjy-main">

      <div class="main-desc">

        <div class="course-hd">
          <div>
            <p>① 暑期班火热招生中，0元试上一天。 <br> ② 五月份报名享受8.8折优惠，六月份报名享受9折优惠。 <br> ③ 团报3人起每人送200现金抵用券。</p>
          </div>
        </div>

        <div class="before-add">
          <img src="http://img.6h5.cn/static/qly/jwjy/hd1/p-top.png">
          <div>
            <span>课程简介</span>
          </div>
        </div>
        <div class="one-desc" style="">
          <div class="course-list">
            <div v-for="(el,index) in courseList" :key="index" :data-name="el.name" :class="postForm.content.course==el.name?'selected':''" @click="selectOneCourse(el)">
              <img :src="el.img">
            </div>
          </div>
          <p class="bm-p">
            <button class="bm-btn" @click="postForm.visible=true;">我要报名</button>
          </p>
        </div>
        <div class="after-add"></div>

        <div class="course-detail-bg" v-if="courseDetail.visible" @click="courseDetail.visible=false"></div>
        <div class="course-detail" v-if="courseDetail.visible">
          <div v-html="courseDetail.content"></div>
          <div class="close-1" @click="courseDetail.visible=false">
            <img src="http://img.6h5.cn/static/qly/jwjy/hd1/icon-close.png?t=1">
          </div>
        </div>


        <div class="before-add">
          <img src="http://img.6h5.cn/static/qly/jwjy/hd1/p-top.png">
          <div>
            <span>活动奖品</span>
          </div>
        </div>
        <div class="one-desc">
          <div class="li-pin">
            <p>暑假班报名即送小学生 <br> <span>电动文具套装礼盒</span>一套，<br> 或 <span>儿童画笔礼盒</span>一套，<br> 或 <span>电话手表</span>一套。（限前10名）</p>
            <div class="img-list">
              <img src="http://img.6h5.cn/static/qly/jwjy/hd1/lipin1.jpg">
              <img src="http://img.6h5.cn/static/qly/jwjy/hd1/lipin2.jpg">
            </div>
          </div>
        </div>
        <div class="after-add"></div>


        <div class="before-add">
          <img src="http://img.6h5.cn/static/qly/jwjy/hd1/p-top.png">
          <div>
            <span>活动地址</span>
          </div>
        </div>
        <div class="one-desc">
          <p> <img style="height:20px;" src="http://img.6h5.cn/static/qly/jwjy/hd1/address-2.png"> 郭新东路57号金屋优优（尹山湖医院向西300米）</p>
          <p v-if="browserName!='wx'" style="text-align: center;">
            <span style="padding: 5px 10px;background-color: #4692e0;color: #fff;border-radius: 50px;" @click="addressNav()">地址导航</span>
          </p>
        </div>
        <div class="after-add"></div>


      </div>

      <div class="main-post-bg" v-if="postForm.visible" @click="postForm.visible=false"></div>
      <div class="main-post" v-if="postForm.visible">
        <div class="close-1" @click="postForm.visible=false">
          <img src="http://img.6h5.cn/static/qly/jwjy/hd1/icon-close.png?t=1">
        </div>
        <div>
          <p>
            <input type="text" name="name" v-model="postForm.content.name" maxlength="10" placeholder="请填写您孩子的姓名">
          </p>
        </div>
        <div>
          <p>
            <input type="tel" name="mobile" v-model="postForm.content.mobile" maxlength="11" placeholder="请填写家长联系手机号码">
          </p>
        </div>
        <div>
          <p>
            <select v-model="postForm.content.school">
              <option value="">请选择学校</option>
              <option v-for="(el,index) in schoolList" :key="index" :value="el">{{el}}</option>
            </select>
          </p>
        </div>
        <div>
          <p>
            <select v-model="postForm.content.grade">
              <option value="">请选择年级</option>
              <option v-for="(el,index) in gradeList" :key="index" :value="el">{{el}}</option>
            </select>
          </p>
        </div>
        <div style="margin-top: 10px;">
          <p :style="postForm.submiting?'opacity:.5;':'opacity:1;'">
            <button @click="postOk">立即报名</button>
          </p>
        </div>
      </div>


    </div>


    <div class="banner-bottom">
      <img style="width:100%;" src="http://img.6h5.cn/static/qly/jwjy/hd1/bg-bottom-12.png">

      <div class="copy-right" style="padding:20px 0px 5px;">
        <span style="font-size: 13px;color: #000;opacity: .1">由 <img src="http://img.6h5.cn/static/cdn/nran/nran-logo.svg" style="zoom: .2;"/> 提供技术支持</span>
      </div>

    </div>



  </div>

</template>

<script>

import { qlyNew } from '@/api/sun';
import { browserName } from '@/const';

export default {
  name: '',
  data() {
    return {
      browserName,
      share: {
        title: '暑假班火热招生中，0元试上一天。努力在暑假，赢在新学期。五月份报名享受8.8折优惠，六月份报名享受9折优惠。团报3人起每人送200现金抵用券。'
      },
      courseList: [{
        name: '幼小衔接班',
        img: 'http://img.6h5.cn/static/qly/jwjy/hd1/b-yxxj.png?t=1',
        content: '拼音 算数 识字'
      },{
        name: '中小学提优班',
        img: 'http://img.6h5.cn/static/qly/jwjy/hd1/b-zxxty.png?t=1',
        content: '语文 数学 英语'
      },{
        name: '书法班',
        img: 'http://img.6h5.cn/static/qly/jwjy/hd1/b-sf.png?t=1',
        content: '硬笔书法 专业考级'
      },{
        name: '绘画班',
        img: 'http://img.6h5.cn/static/qly/jwjy/hd1/b-hh.png?t=1',
        content: '儿童画 水墨 素描'
      }],
      courseDetail: {
        visible: false,
        content: ''
      },
      schoolList: ['小学1', '小学2', '小学3', '小学4'],
      gradeList: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
      postForm: {
        visible: false,
        submiting: false,
        category: 'jwjy',
        content: {
          name: '',
          mobile: '',
          school: '',
          grade: '',
          course: ''
        }
      },
    };
  },
  created() {
    this.$parent.setTitle(this.share.title)
  },
  methods: {
    selectOneCourse(el){
      this.postForm.content.course = el.name
      this.courseDetail.content = el.content
      this.courseDetail.visible = true
    },
    addressNav(){
      this.$parent.miniTips({text:'地址导航'})
    },
    postOk() {
      if(this.postForm.submiting){
        return
      }
      this.postForm.submiting = true
      setTimeout(()=>{
        this.postForm.submiting = false
      },1500)
      // console.log(this.postForm);
      if (!this.postForm.content.name) {
        this.$parent.miniTips({text:'请填写您孩子的姓名'});
        return;
      }
      if (!this.postForm.content.mobile) {
        this.$parent.miniTips({text:'请填写家长联系手机号码'});
        return;
      }
      if (!(/^0?(13|14|15|17|18)[0-9]{9}$/.test(this.postForm.content.mobile))) {
        this.$parent.miniTips({text:'手机号格式不正确'});
        return;
      }
      if (!this.postForm.content.school) {
        this.$parent.miniTips({text:'请选择学校'});
        return;
      }
      if (!this.postForm.content.grade) {
        this.$parent.miniTips({text:'请选择年级'});
        return;
      }
      if (!this.postForm.category) {
        this.$parent.miniTips({text:'请选择机构'});
        return;
      }
      this.$parent.successTips({text:'开发中...'});
      return
      qlyNew(this.postForm).then((res) => {
        // console.log(res.data);
        if (res.data.code === 200) {
          this.$parent.miniTips({text:'提交成功'});
          this.postForm.content = {
            name: '',
            mobile: '',
            school: '',
            grade: '',
          };
        } else {
          this.$parent.miniTips({text:'提交失败'});
        }
        this.postForm.submiting = false
      }, (err) => {
        console.info('调用失败', err);
      });
    },
  },
};
</script>

<style scoped>

.banner-top {
  position: relative;
  font-size: 0;
}
.banner-top .logo {
  height: 30px;
  position: absolute;
  top: 5%;
  left: 0;
  width: 22%;
  background-color: #ddeed1;
  border-radius: 0 50px 50px 0;
  font-size: 16px;
  line-height: 30px;
  text-align: center;
  letter-spacing: 0px;
  color: #4d9367;
  font-weight: 600;
}
.banner-top .t-1 {
  font-size: 14px;
  position: absolute;
  top: 80%;
  left: 0;
  right: 0;
  font-weight: 600;
}
.banner-top .t-1 > img {
  width: 50%;
  margin-left: 2%;
}

.jwjy-main {
  padding: 15px;
}
.main-desc {
  text-align: left;
}

.course-hd {
  width: 100%;
  padding: 5px;
  border: dashed 2px #fff;
  box-sizing: border-box;
  border-radius: 30px;
}
.course-hd > div {
  background-color: #42845c;
  padding: 5px 30px;
  border-radius: 30px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
}

.course-list {
  font-size: 0;
  margin-top: 20px;
}
.course-list > div {
  box-sizing: border-box;
  border: dashed 2px rgba(0, 0, 0, 0.6);
  text-align: center;
  margin-bottom: 15px;
  padding: 10px 0;
  background-color: #84ce87;
  height: 60px;
}
.course-list > div.selected {
  background-color: #ff8901;
  border: dashed 2px #ff8901;
}
/*.course-list > div:nth-child(odd){
  text-align: right;
  padding-right: 10px;
}
.course-list > div:nth-child(even){
  text-align: left;
  padding-left: 10px;
}*/

.course-list > div > img {
  height: 65%;
  margin-top: 5px;
}
.course-list > div:nth-child(1) > img {
  height: 75%;
}
.course-list > div:nth-child(2) > img {
  height: 80%;
}

.course-detail-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, .5);
  z-index: 11;
}
.course-detail {
  position: fixed;
  width: 80%;
  background-color: #fff;
  z-index: 12;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 0;
  height: fit-content;
  padding: 20px;
  box-sizing: border-box;
  font-size: 15px;
  min-height: 150px;
  border-radius: 10px;
}
.close-1 {
  position: absolute;
  height: 30px;
  width: 30px;
  background-color: #000;
  border-radius: 100%;
  right: -15px;
  top: -15px;
  border: none;
}
.close-1 img {
  width: 100%;
  height: 100%;
}


.bm-p {
  text-align: center;
  margin-top: 30px;
  height: 50px;
  position: relative;
}
button.bm-btn {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  color: #fff;
  background-color: #ff8901;
  width: 100px;
  margin: auto;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  height: 40px;
  -webkit-animation-name:ripple;
  -webkit-animation-duration: 1s;
  -webkit-animation-timing-function: ease;
  -webkit-animation-delay: 0s;
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-direction: alternate;
}
@keyframes ripple {
  0% {
    width: 160px;
    height: 40px;
    font-size: 16px;
  }
  100% {
    width: 200px;
    height: 50px;
    font-size: 18px;
  }
}


.before-add {
  width: 80%;
  height: 80px;
  margin: auto;
  margin-bottom: -40px;
  text-align: center;
  margin-top: 40px;
  position: relative;
}
.before-add > img {
  height: 100%;
  width: 100%;
}
.before-add > div {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 5px;
  font-size: 24px;
  color: #fff;
  font-weight: 600;
  letter-spacing: 5px;
}
.one-desc {
  font-size: 16px;
  padding: 40px;
  background-color: #fff;
  border-radius: 35px;
  padding-bottom: 20px;
}
.after-add {
  width: 90%;
  height: 44px;
  margin: auto;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 0 0 35px 35px;
  margin-top: -25px;
  margin-bottom: 40px;
}

.li-pin {
  padding-bottom: 20px;
}
.li-pin .img-list {
  font-size: 0;
}
.li-pin .img-list img {
  width: 50%;
  display: inline-block;
  box-sizing: border-box;
  padding: 0 5px;
}
.li-pin > p > span {
  background-color: #8a2be2;
  color: #fff;
  padding: 0 5px;
  margin: 0 5px;
  border-radius: 50px;
}

.main-post-bg {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  top: 0;
  left: 0;
  position: fixed;
  z-index: 10;
}
.main-post {
  padding: 30px;
  text-align: left;
  background-color: #ffffff;
  border-radius: 0;
  position: fixed;
  z-index: 11;
  top: 0;
  width: 80%;
  max-width: 480px;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 0;
  height: fit-content;
  box-sizing: border-box;
  border-radius: 10px;
}
.main-post select,input,button{
  font-size: 16px;
  width: 100%;
  background-color: #fff;
  height: 44px;
  padding: 0 10px;
  box-sizing: border-box;
  border-radius: 5px;
  border: solid 1px #ccc;
  margin-top: 5px;
}
.main-post button{
  background-color: #4692e0;
  color: #fff;
  letter-spacing: 3px;
  border: solid 1px #4692e0;
}
.main-post p {
  margin: 0;
  padding: 0;
}
.main-post > div {
  /*padding-top: 10px;*/
}
.main-post > div > label {
  padding-left: 5px;
  border-left: solid 5px;
}

.banner-bottom {
  position: relative;
  font-size: 0;
}
.banner-bottom .copy-right {
  position: absolute;
  margin-top: -44px;
  width: 100%;
}

</style>
