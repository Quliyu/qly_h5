<template>
  <div class="jwjy-main">
    <h1>{{a}}</h1>
    <div class="main-post">
      <input type="text" placeholder="姓名">
      <input type="text" placeholder="手机号">
      <select v-model="postForm.remark1" placeholder="请选择学校">
        <option v-for="(el,index) in schoolList" :key="index" :value="el">{{el}}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      a: '1111',
      schoolList: ['小学1', '小学2', '小学3', '小学4'],
      postForm: {
        remark1: '',
      },
    };
  },
  created() {
    // document.title = '金屋教育';
    this.$parent.miniTips('hhh');
  },
  methods: {

  },
};
</script>

<style scoped>
select{
  background-color: #bda8a8;
}
</style>
