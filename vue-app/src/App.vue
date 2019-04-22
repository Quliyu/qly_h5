<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
    <qly-msg ref="QlyMsg"/>
  </div>
</template>

<script>
import QlyMsg from '@/components/common/QlyMsg.vue';

export default {
  name: 'app',
  components: { QlyMsg },
  data() {
    return {

    };
  },
  methods: {
    miniTips(text) {
      this.$refs.QlyMsg.miniTips(text);
    },
  },
};
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
p {
  margin: 0;
  padding: 0;
}
</style>
