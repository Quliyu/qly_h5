<template>
  <div class="jwjy-main">
    <h1>{{a}}</h1>
    <h1>{{a}}</h1>
    <div class="main-post">
      <div>
        <label for="name">学生姓名</label>
        <p>
          <input type="text" name="name" v-model="postForm.name" placeholder="请填写您孩子的姓名">
        </p>
      </div>
      <div>
        <label for="mobile">手机号</label>
        <p>
          <input type="text" name="mobile" v-model="postForm.mobile" placeholder="请填写家长联系手机号码">
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
      <div>
        <p :style="postForm.submiting?'opacity:.5;':'opacity:1;'">
          <button @click="postOk">立即报名</button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>

import { qlyNew } from '@/api/sun';

export default {
  name: '',
  data() {
    return {
      a: '图片区域',
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
    // document.title = '金屋教育';
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
.main-post {
  padding: 15px;
  text-align: left;
  background-color: #fffaf0;
}
.main-post > div {
  padding-top: 10px;
}
.main-post > div > label {
  padding-left: 5px;
  border-left: solid 5px;
}
</style>
