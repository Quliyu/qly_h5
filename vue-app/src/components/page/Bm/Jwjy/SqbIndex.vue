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
            <p>① 暑期班火热招生中，0元试上； <br> ② 五月份报名享受8.8折优惠； <br> ③ 团报3人起每人再送166现金抵用券。 </p>
          </div>
        </div>

        <div v-if="dateCountdown" class="date-countdown">
          <span class="s-1">活动<span>结束</span>还剩</span>
          <span class="s-2">
            <span class="s-2-1">{{dateCountdown.days}}</span>
            <span>天</span>
            <span class="s-2-1">{{dateCountdown.hours}}</span>
            <span>时</span>
            <span class="s-2-1">{{dateCountdown.minutes}}</span>
            <span>分</span>
            <span class="s-2-1">{{dateCountdown.seconds}}</span>
            <span>秒</span>
          </span>
        </div>

        <div class="repeat-text">
          <p>转发朋友圈集满<span style="font-size: 22px;color: #9932cc;">48赞</span>即送精美小学生全自动多功能削笔器！！！</p>
          <p style="text-align: center;">
            <img style="width: 50px;" src="http://img.6h5.cn/static/qly/jwjy/hd1/hdlp-1.png" @click="wxPreviewImage1('http://img.6h5.cn/static/qly/jwjy/hd1/hdlp-1.png')">
          </p>
          <p style="text-align: center;" v-if="browserName=='wx'">
            <span style="text-align: center;font-size: 10px;color: #4692e0;">点击图片大图预览</span>
          </p>
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
              <img v-for="(em,index1) in el.img" :src="em">
            </div>
          </div>
          <p class="bm-p">
            <button class="bm-btn" @click="postForm.visible=true;">我要报名</button>
          </p>
          <p class="add-wx">
            <span>或直接添加微信咨询</span><br>
            <img src="http://img.6h5.cn/static/qly/jwjy/hd1/jwjy-wx.png?t=2">
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
              <img src="http://img.6h5.cn/static/qly/jwjy/hd1/lipin1.jpg" @click="wxPreviewImage1('http://img.6h5.cn/static/qly/jwjy/hd1/lipin1.jpg')">
              <img src="http://img.6h5.cn/static/qly/jwjy/hd1/lipin2.jpg" @click="wxPreviewImage1('http://img.6h5.cn/static/qly/jwjy/hd1/lipin2.jpg')">
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
          <p> <img style="height:20px;" src="http://img.6h5.cn/static/qly/jwjy/hd1/address-2.png"> {{navAddress.name}}{{navAddress.address}}</p>
          <p v-if="browserName=='wx'" style="text-align: center;">
            <span style="padding: 5px 10px;background-color: #4692e0;color: #fff;border-radius: 50px;" @click="addressNav()">地址导航</span>
          </p>
        </div>
        <div class="after-add"></div>


        <div class="before-add">
          <img src="http://img.6h5.cn/static/qly/jwjy/hd1/p-top.png">
          <div>
            <span>联系电话</span>
          </div>
        </div>
        <div class="one-desc">
          <p class="p-m-p-0">谢老师：<a href="tel:15150157762" style="text-decoration: none;color: #F44336;font-weight: 600;">15150157762</a>（微信同号）</p>
          <p class="p-m-p-0">赵老师：<a href="tel:15950068718" style="text-decoration: none;color: #F44336;font-weight: 600;">15950068718</a>（微信同号）</p>
          <p class="p-m-p-0" style="text-align: center;font-size: 10px;color: #4692e0;">轻点拨打电话，长按可复制</p>
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

import { qlyNew, burialPointLogsCreate } from '@/api/sun';
import { browserName } from '@/const';
import fun from '@/utils/fun';

export default {
  name: '',
  data() {
    return {
      browserName,
      shareObj: {
        title: '金屋优优暑假班火热报名中……',
        desc: '①暑期班火热招生中，0元试上； ②五月份报名享受8.8折优惠；③团报3人起每人送166现金抵用券。',
        link: window.location.href,
        imgUrl: 'http://img.6h5.cn/static/qly/jwjy/hd1/share-img-1.png'
      },
      navAddress: {
        name: '郭新东路57号金屋优优',
        address: '（尹山湖医院向西300米）'
      },
      dateCountdown: null,
      courseList: [{
        name: '幼小衔接班',
        img: ['http://img.6h5.cn/static/qly/jwjy/hd1/b-yxxj.png?t=2'],
        content: '<div><p>招生对象：大班</p><p>课程：拼音 算数 识字</p></div>'
      },{
        name: '暑假全托班',
        img: ['http://img.6h5.cn/static/qly/jwjy/hd1/b-sjqt.png?t=2'],
        content: '<div><p>招生对象：中班、大班、一年级、二年级</p><p>全天托管</p></div>'
      },{
        name: '中小学提优班',
        img: ['http://img.6h5.cn/static/qly/jwjy/hd1/b-zxxty.png?t=2'],
        content: '<div><p>语数英课时，精品一对一</p><p>巩固旧知识，预习下学期课程</p><p>赢在起跑线</p></div>'
      },{
        name: '精品一对一',
        img: ['http://img.6h5.cn/static/qly/jwjy/hd1/b-jpydy.png'],
        content: '<div><p>优质师资经验丰富，1对1定制学习方案</p></div>'
      },{
        name: '书法班 绘画班',
        img: ['http://img.6h5.cn/static/qly/jwjy/hd1/b-sf.png?t=2','http://img.6h5.cn/static/qly/jwjy/hd1/b-hh.png?t=2'],
        content: '<div><p>专业考级、硬笔书法、儿童画、素描、水墨</p></div>'
      }],
      courseDetail: {
        visible: false,
        content: ''
      },
      schoolList: ['郭巷实验小学', '尹山湖实验小学', '金港学校', '东方学校', '尹山湖中学', '其他'],
      gradeList: ['幼小衔接', '一升二', '二升三', '三升四', '四升五', '五升六','小升初','七升八','八升九'],
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
    this.$parent.setTitle(this.shareObj.title)
    this.showDateCountdown()
    this.createLog1()
    // 维信分享设置
    if (browserName === 'wx') {
      this.$parent.wx_share_set(this.shareObj,(res)=>{
        // console.log('share res=>',res)
        if(res && res.share==='success'){
          this.createLog2(res)
        }
      });
    }
  },
  mounted(){

  },
  methods: {
    showDateCountdown(){
      this.dateCountdown = fun.diffTime('2019/06/01 00:00:00')
      setInterval(()=>{
        this.dateCountdown = fun.diffTime('2019/06/01 00:00:00')
      },1000)
    },
    selectOneCourse(el){
      this.postForm.content.course = el.name
      this.courseDetail.content = el.content
      this.courseDetail.visible = true
    },
    // 位置导航
    addressNav(){
      // 腾讯坐标拾取器 https://lbs.qq.com/tool/getpoint/
      this.$parent.wx_open_location({
        latitude: 31.248920, // 纬度，浮点数，范围为90 ~ -90
        longitude: 120.676735, // 经度，浮点数，范围为180 ~ -180 
        name: this.navAddress.name, // 位置名
        address: this.navAddress.address, // 地址详情说明
        scale: 16, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      })
    },
    // 预览图片
    wxPreviewImage1(img){
      if(browserName==='wx'){
        this.$parent.wx_previewImage({
          img: img,
          imgs: [img]
        })
      }
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
      // this.$parent.successTips({text:'开发中...'});
      // return
      qlyNew(this.postForm).then((res) => {
        // console.log(res.data);
        if (res.data.code === 200) {
          this.$parent.successTips({text:'恭喜您，报名成功！感谢您的信任，我们会尽快联系您。'});
          this.postForm.content = {
            name: '',
            mobile: '',
            school: '',
            grade: '',
          };
        } else {
          this.$parent.infoTips({text:'非常抱歉，报名失败。可能是网络问题，请稍后重试'});
        }
        this.postForm.submiting = false
      }, (err) => {
        console.info('调用失败', err);
      });
    },
    // 埋点日志-访问
    createLog1(){
      const logForm = {
        title: '金屋-暑期班',
        user: '0',
        content: JSON.stringify({
          url: window.location.href,
          UA: window.navigator.userAgent,
        }),
        category: 'JwjySqb',
      };
      burialPointLogsCreate(logForm).then(res=>{
        // 
      })
    },
    // 埋点日志-分享
    createLog2(share){
      const logForm = {
        title: '金屋-暑期班-分享',
        user: '0',
        content: JSON.stringify({
          share: share,
          url: window.location.href,
          UA: window.navigator.userAgent,
        }),
        category: 'JwjySqbShare',
      };
      burialPointLogsCreate(logForm).then(res=>{
        // 
      })
    }
  },
};
</script>

<style scoped>
.p-m-p-0 {
  margin: 0;
  padding: 0;
}

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

.date-countdown {
  text-align: center;
  padding-top: 15px;
  font-size: 16px;
  font-weight: 600;
}

.repeat-text {
  font-size: 17px;
  color: #E91E63;
  font-weight: 600;
  background-color: #fff;
  padding: 20px;
  border-radius: 50px;
  margin-top: 15px;
}
.repeat-text p {
  margin: 0;
  padding: 0;
}

.date-countdown > .s-1 > span {
  color: #E91E63;
}
.date-countdown > .s-2 > .s-2-1 {
  color: #41845c;
  background-color: #fff;
  padding: 1px 3px;
  font-size: 18px;
  border-radius: 3px;
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
.course-list > div > img+img{
  margin-left: 15px;
}
.course-list > div:nth-child(1) > img,
.course-list > div:nth-child(2) > img,
.course-list > div:nth-child(4) > img {
  height: 75%;
}
.course-list > div:nth-child(3) > img {
  height: 80%;
}


.add-wx {
  text-align: center;
  font-size: 14px;
}
.add-wx img {
  width: 80%;
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
  max-width: 480px;
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
  font-size: 18px;
  min-height: 150px;
  border-radius: 10px;
  color: #F44336;
  font-weight: 600;
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
