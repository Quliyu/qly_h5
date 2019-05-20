<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view/>
    </transition>
    <heng-shu-ping></heng-shu-ping>
    <div v-if="deviceName=='pc'">
      <qly-qrcode></qly-qrcode>
    </div>
    <!-- 提示组件 开始 -->
    <qly-msg ref="QlyMsg"/>
    <!-- 提示组件 结束 -->
  </div>
</template>

<script>

import wx from 'weixin-js-sdk';
import dayjs from 'dayjs';
import dingtalk from 'dingtalk-jsapi';
// import dingtalk from 'dingtalk-javascript-sdk';
import { fetchWxConfig } from '@/api/wx';
import { fetchQnUptoken } from '@/api/qn';

// 常量 设备浏览器
import { deviceName, browserName } from '@/const';

// 自定义组件
import HengShuPing from '@/components/common/HengShuPing';
import QlyQrcode from '@/components/common/QlyQrcode';
import QlyMsg from '@/components/common/QlyMsg';

console.log('deviceName=>', deviceName, 'browserName=>', browserName);
export default {
  name: 'AppPage',
  components: { HengShuPing, QlyQrcode, QlyMsg },
  data() {
    return {
      transitionName: 'fade',
      w_width: window.innerWidth,
      w_height: window.innerHeight,
      deviceName,
      browserName,
      wx,
      wxReady: false,
      wxConfig: null,
      dingtalk,
      dingtalkReady: false,
    };
  },
  created() {
    if (browserName === 'wx') {
      this.get_wx_config();
      setTimeout(() => {
        this.wxReady = true;
      }, 10000);
    } else {
      // this.get_qn_uptoken();
    }
    if (browserName === 'dd') {
      this.get_dingtalk_config();
      setTimeout(() => {
        this.dingtalkReady = true;
      }, 10000);
    }
    /**
     * 为nodelist添加forEach函数
     */
    this.addForEachToNodeList();
  },
  mounted() {
    // this.popstate();
    if (browserName === 'wx') {
      // this.wx_get_location();
    }
  },
  methods: {
    miniTips(options) {
      this.$refs.QlyMsg.miniTips(options);
    },
    successTips(options){
      this.$refs.QlyMsg.successTips(options)
    },
    infoTips(options){
      this.$refs.QlyMsg.infoTips(options)
    },
    // // 监听微信返回按钮 开始
    // popstate() {
    //   this.pushHistory();
    //   let bool = false;
    //   setTimeout(() => {
    //     bool = true;
    //   }, 1500);
    //   window.addEventListener('popstate', () => {
    //     if (bool) {
    //       // alert("请使用页面内部的操作按钮");//根据自己的需求实现自己的功能
    //       this.$refs.CmMessage.errorTips('请使用页面内部的操作按钮');
    //       this.$router.go(1);
    //     }
    //   }, false);
    // },
    // pushHistory() {
    //   const state = {
    //     title: '',
    //     url: '',
    //   };
    //   window.history.pushState(state, state.title, state.url);
    // },
    // 监听微信返回按钮 结束
    goGoodsPaySuccessPage() {
      if (window.callbackDSFPayResultSuccess) {
        window.callbackDSFPayResultSuccess();
      }
    },
    goGoodsPayErrorPage() {
      if (window.callbackDSFPayResultCancelOrError) {
        window.callbackDSFPayResultCancelOrError();
      }
    },
    /**
     * 为nodelist添加forEach函数
     */
    addForEachToNodeList() {
      if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = (callback, thisArg) => {
          const thisArg2 = thisArg || window;
          for (let i = 0; i < this.length; i += 1) {
            callback.call(thisArg2, this[i], i, this);
          }
        };
      }
    },
    // 获取微信配置
    get_wx_config() {
      const query = {
        wxFwhType: 'nran',
        href: encodeURIComponent(window.location.href),
      };
      fetchWxConfig(query).then((res) => {
        // console.log(res);
        this.wxConfig = res.data.wxConfig;
        let pageDebug = false;
        if (window.location.href.indexOf('pageDebug') !== -1) {
          pageDebug = true;
        }
        this.wx.config({
          debug: pageDebug,
          appId: this.wxConfig.appid,
          timestamp: this.wxConfig.timestamp,
          nonceStr: this.wxConfig.noncestr,
          signature: this.wxConfig.signature,
          jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline', 'hideAllNonBaseMenuItem',
      'showMenuItems', 'openAddress', 'chooseWXPay', 'getLocation', 'openLocation', 'scanQRCode',
      'chooseImage', 'previewImage', 'uploadImage'],
        });

        // 微信配置ready
        this.wx.ready(() => {
          console.log('微信配置ready');
          this.wxReady = true;
        });
        this.wx.error((res1) => {
          console.error('wx config error(抱歉，微信配置错误，可能是当前环境不正确)', res1);
          this.infoTips({text:res1.errMsg})
        });
      }).catch((err) => {
        const tips = `${err.name}:${err.message}`;
        this.infoTips({text:tips});
      });
    },
    // 获取地理位置
    wx_get_location() {
      if (!this.wxReady) {
        setTimeout(() => {
          console.log('wx_get_location 查询wxReady一次');
          this.wx_get_location();
        }, 1000);
        return;
      }
      this.wx.getLocation({
        type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success(res1) {
          console.log(res1);
          if (res1.errMsg === 'getLocation:ok') {
            window.localStorage.setItem('App_wxGetLocation', JSON.stringify(res1));
          }
        },
      });
    },
    // 使用微信内置地图查看位置接口
    wx_open_location(obj){
      wx.openLocation({
        latitude: obj.latitude, // 纬度，浮点数，范围为90 ~ -90
        longitude: obj.longitude, // 经度，浮点数，范围为180 ~ -180。
        name: obj.name, // 位置名
        address: obj.address, // 地址详情说明
        scale: obj.scale, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: obj.infoUrl // 在查看位置界面底部显示的超链接,可点击跳转
      });
    },
    // 微信分享设置
    wx_share_set(share, callback) {
      if (!this.wxReady) {
        setTimeout(() => {
          console.log('wx_share_set 查询wxReady一次');
          if (callback) {
            this.wx_share_set(share, callback);
          } else {
            this.wx_share_set(share);
          }
        }, 1000);
        return;
      }
      if (this.wxReady) {
        console.log('wx分享配置');
        // 获取“分享给朋友”按钮点击状态及自定义分享内容接口
        this.wx.onMenuShareAppMessage({
          title: share.title, // 分享标题
          desc: share.desc, // 分享描述
          link: share.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: share.imgUrl, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: () => {
            if (callback) {
              callback();
            }
            // alert('wx share success')
            // 用户确认分享后执行的回调函数
          },
          cancel: () => {
            if (callback) {
              callback();
            }
            // alert('wx share cancel')
            // 用户取消分享后执行的回调函数
          },
        });
        // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
        this.wx.onMenuShareTimeline({
          title: share.title, // 分享标题
          link: share.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: share.imgUrl, // 分享图标
          success: () => {
            if (callback) {
              callback();
            }
            // 用户确认分享后执行的回调函数
          },
          cancel: () => {
            if (callback) {
              callback();
            }
            // 用户取消分享后执行的回调函数
          },
        });
        // 获取“分享到QQ”按钮点击状态及自定义分享内容接口
        this.wx.onMenuShareQQ({
          title: share.title, // 分享标题
          desc: share.desc, // 分享描述
          link: share.link, // 分享链接
          imgUrl: share.imgUrl, // 分享图标
          success: () => {
            if (callback) {
              callback();
            }
            // 用户确认分享后执行的回调函数
          },
          cancel: () => {
            if (callback) {
              callback();
            }
            // 用户取消分享后执行的回调函数
          },
        });
        // 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
        this.wx.onMenuShareQZone({
          title: share.title, // 分享标题
          desc: share.desc, // 分享描述
          link: share.link, // 分享链接
          imgUrl: share.imgUrl, // 分享图标
          success: () => {
            if (callback) {
              callback();
            }
            // 用户确认分享后执行的回调函数
          },
          cancel: () => {
            if (callback) {
              callback();
            }
            // 用户取消分享后执行的回调函数
          },
        });
        // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
        this.wx.onMenuShareWeibo({
          title: share.title, // 分享标题
          desc: share.desc, // 分享描述
          link: share.link, // 分享链接
          imgUrl: share.imgUrl, // 分享图标
          success: () => {
            if (callback) {
              callback();
            }
            // 用户确认分享后执行的回调函数
          },
          cancel: () => {
            if (callback) {
              callback();
            }
            // 用户取消分享后执行的回调函数
          },
        });
      }
    },
    // 获取dingtalk配置
    get_dingtalk_config() {
      // dingtalk ready
      this.dingtalk.ready(() => {
        console.log('dingtalk ready');
        this.dingtalkReady = true;
      });
      this.dingtalk.error((err) => {
        console.error('dingtalk error=>', err);
      });
    },
    // dingtalk分享
    dingtalk_share_set(share) {
      if (!this.dingtalkReady) {
        setTimeout(() => {
          console.log('查询dingtalkReady一次');
          this.dingtalk_share_set(share);
        }, 1000);
        return;
      }
      if (this.dingtalkReady) {
        this.dingtalk.biz.navigation.setRight({
          show: true, // 控制按钮显示， true 显示， false 隐藏， 默认true
          control: true, // 是否控制点击事件，true 控制，false 不控制， 默认false
          // text: '分享', // 控制显示文本，空字符串表示显示默认文本
          onSuccess: () => {
            // 如果control为true，则onSuccess将在发生按钮点击事件被回调
            console.log('dingtalk分享配置');
            this.dingtalk.biz.util.share({
              type: 0, // 分享类型，0:全部组件 默认； 1:只能分享到钉钉；2:不能分享，只有刷新按钮
              url: share.link,
              content: share.desc,
              title: share.title,
              image: share.imgUrl,
              onSuccess: () => {
                // onSuccess将在分享完成之后回调
              },
              onFail: () => {
                // onFail分享失败
              },
            });
          },
          onFail: () => {
            // onFail
          },
        });
      }
    },
    // 设置页面标题
    setTitle(title = '') {
      if (title && title.replace(/undefined/ig, '')) {
        document.title = title;
        const i = document.createElement('iframe');
        i.src = 'http://img.6h5.cn/static/cdn/nran/favicon.ico';
        i.style.display = 'none';
        i.onload = () => {
          setTimeout(() => {
            i.remove();
          }, 1);
        };
        document.body.appendChild(i);
      } else {
        setTimeout(() => {
          if (document.title === '加载中...' || document.title === '') {
            this.setTitle('暂无标题');
          }
        }, 5000);
      }
    },
    // 获取七牛上传token
    get_qn_uptoken() {
      const date1 = dayjs().format('YYYY-MM-DD');
      const QNUPTOKEN = JSON.parse(window.localStorage.getItem('QNUPTOKEN') || '{}');
      const date2 = QNUPTOKEN.expires;
      const uptoken = QNUPTOKEN.uptoken;
      if (uptoken && date2 && date1 < date2) {
        console.log('本地缓存已存在uptoken且有效');
      } else {
        fetchQnUptoken().then((res) => {
          console.log(res);
          if (res.data && res.data.code === 800 && res.data.result) {
            window.localStorage.setItem('QNUPTOKEN', JSON.stringify(res.data.result));
          }
        });
      }
    },
  },
};
</script>

<style>
html {
  background-color: #f3f4f5;
}
html,body {
  margin: 0;
  padding: 0;
}
s {
  text-decoration: line-through;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
input,button,select,textarea{
  outline:none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color:transparent;
}

/* 伪类清除浮动 开始 */
.clearfix::after {
  content: ".";
  clear: both;
  display: block;
  overflow: hidden;
  font-size: 0;
  height: 0;
}
.clearfix {
  zoom: 1;
}
/* 伪类清除浮动 结束 */
</style>
