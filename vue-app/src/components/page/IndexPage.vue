<template>
  <div class="index-page">
    <section>{{ msg }}</section>
  </div>
</template>

<script>

export default {
  name: 'IndexPage',
  data() {
    return {
      msg: '2SU欢迎您',
      listQuery: {},
      list: [],
    };
  },
  created() {
    window.VueComponent = this;
    document.title = '2SU欢迎您';
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index-page {
  padding-top: 50px;
}
</style>
