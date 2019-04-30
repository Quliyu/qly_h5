<template>
  <div class="jwjy-main">

    <div class="main-desc">

      <div class="title">
        <h2>{{share.title}}</h2>
        <h4>
          <span class="title-666">金屋教育</span>
          <span class="title-2">2019/4/29</span>
        </h4>
      </div>

      <div class="course">
        <p>
          <strong>作业班：</strong>
          <span>A.晚托班，去学校接回孩子，督导学生完成学校布置的作业。检查孩子的作业完成情况，并对完成的作业进行批改，对当天学习遇到的问题进行辅导，解答疑问，培养孩子的良好习惯</span>
        </p>
        <p>
          <strong>课时班：</strong>
          <span>每周135根据学校课时进度，给孩子加强课堂学的知识。（一节课为40分钟）</span>
        </p>
        <p>
          <strong>周末提优班：</strong>
          <span>成绩比较稳定，需要提升，成绩需要上一个台阶的。（每周六小班归纳，总结，提升。）</span>
        </p>
        <p>
          <strong>精品一对一：</strong>
          <span></span>
        </p>
        <p>
          <strong>书班班：</strong>
          <span>硬笔书法，书法考级</span>
        </p>
        <p>
          <strong>绘画班：</strong>
          <span>儿童画，素描，水彩</span>
        </p>

      </div>


      <div class="address">
        <h3>地址：郭新东路57号金屋优优（尹山湖医院向西300米）</h3>
      </div>


      <div class="li-pin">
        <h3>暑假班报名即送小学生<span>电动文具套装礼盒</span>一套。或<span>儿童画笔礼盒</span>一套或<span>电话手表</span>一套。（限前10名）</h3>
        <div class="img-list">
          <img src="http://img.6h5.cn/static/qly/jwjy/hd1/lipin1.jpg">
          <img src="http://img.6h5.cn/static/qly/jwjy/hd1/lipin2.jpg">
        </div>
      </div>

    </div>


    <div class="main-post">
      <div>
        <label for="name">学生姓名</label>
        <p>
          <input type="text" name="name" v-model="postForm.name" maxlength="10" placeholder="请填写您孩子的姓名">
        </p>
      </div>
      <div>
        <label for="mobile">手机号</label>
        <p>
          <input type="tel" name="mobile" v-model="postForm.mobile" maxlength="11" placeholder="请填写家长联系手机号码">
        </p>
      </div>
      <div>
        <label for="">所在学校</label>
        <p>
          <select v-model="postForm.remark1">
            <option value="">请选择学校</option>
            <option v-for="(el,index) in schoolList" :key="index" :value="el">{{el}}</option>
          </select>
        </p>
      </div>
      <div>
        <label for="">所在年级</label>
        <p>
          <select v-model="postForm.remark2">
            <option value="">请选择年级</option>
            <option v-for="(el,index) in gradeList" :key="index" :value="el">{{el}}</option>
          </select>
        </p>
      </div>
      <div style="margin-top: 20px;">
        <p style="font-size: 12px;">请认真填写报名信息然后点击下面按钮提交</p>
        <p :style="postForm.submiting?'opacity:.5;':'opacity:1;'">
          <button @click="postOk">立即报名</button>
        </p>
      </div>
    </div>

    <div class="copy-right" style="padding:20px 0px 5px;">
      <span style="font-size: 13px;color: #000;opacity: .1">由 <img src="http://img.6h5.cn/static/cdn/nran/nran-logo.svg" style="zoom: .2;"/> 提供技术支持</span>
    </div>

  </div>

</template>

<script>

import { qlyNew } from '@/api/sun';

export default {
  name: '',
  data() {
    return {
      share: {
        title: '假班火热招生中，0元试上一天。努力在暑假，赢在新学期。五月份报名享受8.8折优惠，六月份报名享受9折优惠。团报3人起每人送200现金抵用券。'
      },
      schoolList: ['小学1', '小学2', '小学3', '小学4'],
      gradeList: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'],
      postForm: {
        name: '',
        mobile: '',
        remark1: '',
        remark2: '',
        category: 'jwjy',
        submiting: false,
      },
    };
  },
  created() {
    this.$parent.setTitle(this.share.title)
  },
  methods: {
    postOk() {
      if(this.postForm.submiting){
        return
      }
      this.postForm.submiting = true
      setTimeout(()=>{
        this.postForm.submiting = false
      },1500)
      // console.log(this.postForm);
      if (!this.postForm.name) {
        this.$parent.miniTips({text:'请填写您孩子的姓名'});
        return;
      }
      if (!this.postForm.mobile) {
        this.$parent.miniTips({text:'请填写家长联系手机号码'});
        return;
      }
      if (!(/^0?(13|14|15|17|18)[0-9]{9}$/.test(this.postForm.mobile))) {
        this.$parent.miniTips({text:'手机号格式不正确'});
        return;
      }
      if (!this.postForm.remark1) {
        this.$parent.miniTips({text:'请选择学校'});
        return;
      }
      if (!this.postForm.remark2) {
        this.$parent.miniTips({text:'请选择年级'});
        return;
      }
      if (!this.postForm.category) {
        this.$parent.miniTips({text:'请选择机构'});
        return;
      }
      qlyNew(this.postForm).then((res) => {
        // console.log(res.data);
        if (res.data.code === 200) {
          this.$parent.miniTips({text:'提交成功'});
          this.postForm = {
            name: '',
            mobile: '',
            remark1: '',
            remark2: '',
            category: 'jwjy',
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
.jwjy-main {
  background-color: #fff;
  padding: 15px;
}
.main-desc {
  text-align: left;
}

.title-1 {
  color: #8a2be2;
}
.title-2 {
  color: rgba(0,0,0,0.3);
  margin-left: 10px;
}
.title-666 {
  color: #666;
}

.course {
  font-size: 16px;
  padding: 5px 15px;
  border: solid 15px #8BC34A;
}

.address {
  padding: 15px 15px;
  color: #8a2be2;
}

.li-pin {
  padding: 15px 30px;
  border: dashed 1px;
  margin-bottom: 30px;
  color: #8a2be2;
  padding-bottom: 30px;
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
.li-pin .img-list img+img {
  /*padding-left: 20px;*/
}
.li-pin > h3 > span {
  background-color: #8a2be2;
  color: #fff;
  padding: 0 5px;
  margin: 0 5px;
  border-radius: 50px;
}

.main-post {
  padding: 15px;
  text-align: left;
  background-color: #8a2be2;
  color: #fff;
  padding-bottom: 30px;
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
.main-post p {
  margin: 0;
  padding: 0;
}
.main-post > div {
  padding-top: 10px;
}
.main-post > div > label {
  padding-left: 5px;
  border-left: solid 5px;
}

</style>
