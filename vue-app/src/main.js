import Vue from 'vue';
import VConsole from 'vconsole';

import App from './App';
import router from './router';
import store from './store/index';

if ((window.location.href.indexOf('/Azb') >= 0 && window.location.href.indexOf('/AzbLogin') === -1) || window.location.href.indexOf('pageDebug') !== -1) {
  const azbToken = window.localStorage.getItem('azbToken') || '';
  console.log('check azbToken=>', azbToken);
  if (azbToken === '') {
    router.push({
      path: 'AzbLogin',
      query: {},
    });
  }
}

if (window.location.href.indexOf('h5.cloudm.com') === -1 || window.location.href.indexOf('pageDebug') !== -1) {
  const vConsole = new VConsole();
  console.log('vConsole start version=>', vConsole.version);
  window.onerror = (message) => {
    // alert(message)
    console.log('window onerror=>', message);
  };
}
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
});

window.eventBus = new Vue();

