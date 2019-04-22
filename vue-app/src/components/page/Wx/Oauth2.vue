<template>
  <div class="wx-oauth2">
    <div v-if="!verifyPhone.visible" class="get-userinfo" style="padding: 50px 0;">
      <h3>{{ getUserInfo.msg }}</h3>
    </div>

    <div v-if="verifyPhone.visible" class="vphone-form">
      <h3 class="text-center">验证手机号</h3>
        <h5 class="text-center">(即将微信手机号绑定云机械帐号)</h5>
      <br>
      <p class="b_btm_1px">
        <span>手机号</span>
        <input type="tel" v-model="vform0.mobile"
        placeholder="请输入手机号码" maxlength="11"
        @focus="vMobileStatus=true" @blur="vMobileStatus=false" :disabled="seconds<60">
      </p>
      <p class="b_btm_1px">
        <span>验证码</span>
        <input type="tel" v-model="vform0.code"
        placeholder="请输入验证码" maxlength="4" style="width:35%;">
        <span class="g-code" :class="{active:getCodeStatus}"
        @click="member_checkNum">获取验证码<span v-show="seconds<60">({{seconds}}s)</span></span>
      </p>
      <!-- <p class="b_btm_1px" v-show="vform0.type==1">
        <span>邀请码</span>
        <input type="text" v-model="vform0.invateCode" placeholder="如有邀请码，请输入">
      </p> -->
      <p class="b_btm_1px" v-show="vform0.type==1">
        <span>密码</span>
        <input type="password" v-model="vform0.pwd_ori" placeholder="请输入密码">
      </p>
      <br>
      <div class="v-submit-div">
        <button class="v-submit" @click="member_wxBind">提交</button>
      </div>
    </div>

    <!-- 微信提示弹框 -->
    <div id="loadingToast" style="display:none;">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-loading weui-icon_toast"></i>
            <p class="weui-toast__content">页面跳转中...</p>
        </div>
    </div>

    <!-- 微信alert提示 -->
    <div id="wxAlert" style="display: none;">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <div class="weui-dialog__hd">
              <strong class="weui-dialog__title" id="wxAlert1">微信提示</strong>
            </div>
            <div class="weui-dialog__bd" id="wxAlert2"></div>
            <div class="weui-dialog__ft">
                <a href="javascript:;"
                class="weui-dialog__btn weui-dialog__btn_primary wx-ok"
                onclick="closeWxAlert()">确定</a>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
import { fetchWxUserInfoByCode, fetchYjxUserInfoByWxInfo, fetchYjxMemberCheckNum, fetchYjxMemberGetCode, fetchYjxMemberWxBind } from '@/api/wx';

export default {
  name: 'wx-oauth2',
  components: {},
  data() {
    return {
      returnUrl: '',
      memberId: '',
      token: '',
      getUserInfo: {
        msg: '',
      },
      verifyPhone: {
        visible: false,
      },
      getCodeStatus: false,
      vMobileStatus: false,
      seconds: 60,
      vform0: {
        openId: '',
        unionId: '',
        nickName: '',
        headLogo: '',
        mobile: '',
        code: '',
        invateCode: '',
        pwd_ori: '',
        type: '',
      },
      vform1: {},
    };
  },
  watch: {
    vform0: {
      handler(curVal) {
        this.vform1 = {
          openId: curVal.openId,
          unionId: curVal.unionId,
          account: curVal.mobile,
          code: curVal.code,
          invateCode: curVal.invateCode,
          pwd: curVal.pwd_ori,
          nickName: curVal.nickName,
          headLogo: curVal.headLogo,
          type: curVal.type,
        };
        console.log('vMobileStatus=>', this.vMobileStatus);
        if (this.vMobileStatus) {
          // console.log(curVal.mobile)
          if (!(/^0?(13|14|15|17|18)[0-9]{9}$/.test(curVal.mobile))) {
            this.getCodeStatus = false;
            if (curVal.mobile.length === 11) {
              this.$refs.CmMessage.miniTips('手机号格式不正确');
            }
          } else {
            // console.log('手机号码ok')
            this.getCodeStatus = true;
          }
        }
      },
      deep: true,
    },
  },
  created() {
    console.log('params=>', this.$route.query);
    this.getWxUserInfoByCode();
  },
  mounted() {

  },
  methods: {
    // 登录成功 去回调地址页面
    goReturnUrlPage(code) {
      if (this.token === '') {
        this.$refs.CmMessage.errorTips('token不能为空');
        return;
      }
      if (this.memberId === '') {
        this.$refs.CmMessage.errorTips('memberId不能为空');
        return;
      }
      this.returnUrl = this.$route.query.returnUrl || '';
      if (this.returnUrl !== '') {
        let paramsAfter = '';
        if (code === 'wxLoginSuccess') {
          window.localStorage.setItem('memberId', this.memberId);
          window.localStorage.setItem('token', this.token);
          paramsAfter = this.returnUrl.indexOf('?') >= 0
            ? `&memberId=${this.memberId}&token=${this.token}&code=${code}`
            : `?memberId=${this.memberId}&token=${this.token}&code=${code}`;
        }
        // alert(this.returnUrl + paramsAfter);
        window.location.href = this.returnUrl + paramsAfter;
      }
    },
    // 微信手机号绑定云机械帐号成功
    wxPhoneBindYjxSuccess() {
      this.goReturnUrlPage('wxLoginSuccess');
      // this.$route.query.code = 'wxLoginSuccess';
      // this.$route.query.memberId = this.memberId;
      // this.$route.query.token = this.token;
      // this.$router.push({
      //   path: 'GoodsDetail',
      //   query: this.$route.query,
      // });
      // const paramsAfter = window.location.href.indexOf('?') >= 0
      //   ? `&memberId=${this.memberId}&token=${this.token}`
      //   : `?memberId=${this.memberId}&token=${this.token}`;
      // window.location.href = window.location.href
      //   .replace('WxOauth2', 'GoodsDetail')
      //   .replace(this.$route.query.code, 'wxLoginSuccess') + paramsAfter;
    },
    getWxUserInfoByCode() {
      const query = {
        code: this.$route.query.code,
      };
      fetchWxUserInfoByCode(query).then((res) => {
        // console.log(res);
        if (res.status === 200) {
          if (res.data && res.data.errcode > 0) {
            console.error('errmsg=>', res.data.errmsg);
            this.verifyPhone.visible = false;
            this.getUserInfo.msg = '登录失效，请重新操作';
            setTimeout(() => {
              this.goReturnUrlPage('wxLoginFail');
            }, 1000);
          } else {
            this.verifyPhone.visible = false;
            this.getUserInfo.msg = '登录成功';

            const wxUserInfo = res.data || {};
            console.log('wxUserInfo=>', wxUserInfo);
            window.localStorage.setItem('wxUserInfo', JSON.stringify(wxUserInfo));

            this.vform0.openId = wxUserInfo.openid || '';
            this.vform0.unionId = wxUserInfo.unionid || '';
            this.vform0.nickName = wxUserInfo.nickname || '';
            this.vform0.headLogo = wxUserInfo.headimgurl || '';

            this.getYjxUserInfoByWxInfo(wxUserInfo);
          }
        } else {
          this.verifyPhone.visible = false;
          this.getUserInfo.msg = '登录失效，请重新操作';
          setTimeout(() => {
            this.goReturnUrlPage('wxLoginFail');
          }, 1000);
        }
      }).catch((err) => {
        const tips = `${err.name}:${err.message}`;
        this.$refs.CmMessage.errorTips(tips);
      });
    },
    getYjxUserInfoByWxInfo(obj) {
      const wxLoginForm = {
        openId: obj.openid || '',
        unionId: obj.unionid || '',
      };
      window.localStorage.setItem('wxLoginForm', JSON.stringify(wxLoginForm));
      fetchYjxUserInfoByWxInfo(wxLoginForm).then((res) => {
        if (res.status === 200) {
          if (res.data.code === 800) {
            this.memberId = res.data.result.id || '';
            this.token = res.data.result.token || '';
            // console.log('memberId=>'+this.memberId)
            // console.log('token=>'+this.token)
            if (this.memberId > 0 && this.token) {
              this.goReturnUrlPage('wxLoginSuccess');
            } else {
              this.$parent.setTitle('绑定云机械账号');
              this.verifyPhone.visible = true;
            }
          } else {
            console.log(res.data.message || 'openId或unionId有误');
            this.$parent.setTitle('绑定云机械账号');
            this.verifyPhone.visible = true;
          }
        } else {
          console.log('请求错误');
          this.$parent.setTitle('绑定云机械账号');
          this.verifyPhone.visible = true;
        }
      }).catch((err) => {
        const tips = `${err.name}:${err.message}`;
        this.$refs.CmMessage.errorTips(tips);
      });
    },

    // 检验手机号返回type值
    member_checkNum() {
      if (!this.getCodeStatus) {
        return;
      }
      // 1:未注册的帐号，需要展示邀请码、密码输入框
      // 2:已注册的帐号，但是尚未绑定，直接通过短信验证码绑定
      // 3:已注册的帐号，已绑定，直接通过短信验证码解绑再绑定
      const mobile = this.vform0.mobile;
      if (mobile === '') {
        this.$refs.CmMessage.miniTips('请填写手机号');

        return;
      }
      if (!(/^0?(13|14|15|17|18)[0-9]{9}$/.test(mobile))) {
        this.$refs.CmMessage.miniTips('手机号格式不正确');
        return;
      }

      const timer = setInterval(() => {
        if (this.seconds > 1) {
          this.getCodeStatus = false;
          this.seconds -= 1;
        } else {
          clearInterval(timer);
          this.getCodeStatus = true;
          this.seconds = 60;
        }
      }, 1000);
      // return

      const query = {
        mobile,
      };
      fetchYjxMemberCheckNum(query).then((res) => {
        // alert(JSON.stringify(res))
        if (res.status === 200) {
          if (res.data.code === 800) {
            const type = res.data.result;
            if (type >= 0) {
              if (type === 1) {
                console.log('未注册的帐号，需要展示邀请码、密码输入框');
              } else if (type === 2) {
                console.log('已注册的帐号，但是尚未绑定，直接通过短信验证码绑定');
              } else if (type === 3) {
                console.log('已注册的帐号，已绑定，直接通过短信验证码解绑再绑定');
              }
              this.vform0.type = type;
              this.member_getCode(mobile, type);
            } else {
              this.$refs.CmMessage.errorTips(res.data.message || '验证手机号失败');
            }
          } else {
            this.$refs.CmMessage.errorTips(res.data.message || '验证手机号失败');
          }
        } else {
          console.error('验证手机号发生错误');
          this.$refs.CmMessage.errorTips('验证手机号发生错误');
        }
      }).catch((err) => {
        const tips = `${err.name}:${err.message}`;
        this.$refs.CmMessage.errorTips(tips);
      });
    },
    // 获取验证码
    member_getCode(mobile, type) {
      const query = {
        mobile,
        type,
      };
      fetchYjxMemberGetCode(query).then((res) => {
        // alert(JSON.stringify(res))
        if (res.status === 200) {
          if (res.data.code === 800) {
            console.log(res.data.result);
            this.$refs.CmMessage.miniTips(res.data.message);
          } else {
            this.$refs.CmMessage.errorTips(res.data.message || '获取验证码失败');
          }
        } else {
          this.$refs.CmMessage.errorTips('获取验证码发生错误');
        }
      }).catch((err) => {
        const tips = `${err.name}:${err.message}`;
        this.$refs.CmMessage.errorTips(tips);
      });
    },
    // 微信绑定云机械帐号
    member_wxBind() {
      console.log(this.vform1);
      if (this.vform0.mobile === '') {
        this.$refs.CmMessage.miniTips('请填写手机号');
        return;
      }
      if (this.vform1.account === '') {
        this.$refs.CmMessage.miniTips('请填写手机号');
        return;
      }
      if (!(/^0?(13|14|15|17|18)[0-9]{9}$/.test(this.vform1.account))) {
        this.$refs.CmMessage.miniTips('手机号格式不正确');
        return;
      }
      if (this.vform1.code === '') {
        this.$refs.CmMessage.miniTips('请填写验证码');

        return;
      }
      if (this.vform1.type === 1) {
        if (this.vform1.pwd === '') {
          this.$refs.CmMessage.miniTips('请填写密码');
          return;
        }
      }
      // this.$refs.CmMessage.miniTips(JSON.stringify(this.vform1))
      if (this.vform1.openId === '' || this.vform1.unionId === '') {
        this.$refs.CmMessage.miniTips('微信授权获取的openId和unionId不能为空');
        return;
      }
      // this.$refs.CmMessage.miniTips(JSON.stringify(this.vform1))
      const vform1 = this.vform1;

      fetchYjxMemberWxBind(vform1).then((res) => {
        // this.$refs.CmMessage.miniTips(JSON.stringify(res))
        if (res.status === 200) {
          if (res.data.code === 800) {
          // this.$refs.CmMessage.miniTips(JSON.stringify(res.result))
            this.memberId = res.data.result.id || '';
            this.token = res.data.result.token || '';
            if (this.memberId > 0 || this.token) {
              this.$refs.CmMessage.successTips('微信手机号绑定云机械帐号成功', '继续下一步', 'wxPhoneBindYjxSuccess');
            } else {
              this.$refs.CmMessage.errorTips('微信绑定获取帐号id/token失败');
            }
          } else {
            this.$refs.CmMessage.errorTips(res.data.message || res.data.devMsg || '微信绑定获取帐号id/token失败');
          }
        } else {
          this.$refs.CmMessage.errorTips('微信绑定发生错误');
        }
      }).catch((err) => {
        const tips = `${err.name}:${err.message}`;
        this.$refs.CmMessage.errorTips(tips);
      });
      // return
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,h2,h3,h4,h5{
  padding: 0;
  margin: 0;
}

input[disabled] {
  cursor: default;
  background-color: white;
  color: #c7c7c7;
  -webkit-text-fill-color: #c7c7c7;
  opacity: 1;
}

/*input textarea placeholder color*/
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: #c7c7c7;
}
input:-moz-placeholder, textarea:-moz-placeholder {
  color: #c7c7c7;
}
input::-moz-placeholder, textarea::-moz-placeholder {
  color: #c7c7c7;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  color: #c7c7c7;
}
/**/
input,button,select,textarea{outline:none;-webkit-tap-highlight-color:transparent;}

html, body, #vue_all {
  height: 100%;
}
.vphone-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 15px 0;
  height: 100%;
}
.vphone-form p {
  margin: 0;
  margin-left: 15px;
  height: 50px;
  line-height: 50px;
  color: #666;
  text-align: left;
}
.vphone-form p input{
  height: 30px;
  line-height: 30px;
  border: none;
  margin-left: 10px;
  width: 45%;
  font-size: 14px;
}
.vphone-form span.g-code{
  width: 35%;
  height: 50px;
  display: inline-block;
  border-left: solid 1px #f4f4f4;
  padding-left: 20px;
  color: #c7c7c7;
}
.vphone-form span.g-code.active {
  color: #666;
}
.vphone-form .v-submit-div {
  width: 100%;
  padding: 0 15px;
  margin-top: 15px;
  box-sizing: border-box;
}
.vphone-form button.v-submit{
  height: 50px;
  /* line-height: 50px; */
  background-color: #4a4c5b;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  font-size: 16px;
  border-radius: 2px;
  width: 100%;
  border: none;
}

/*实现1px*/
.b_btm_1px {
  position: relative;
}
.b_btm_1px:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1px;
  background-color: #e5e5e5;
  -webkit-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  transform-origin: 0 0;
}
.b_1px {
    position: relative;
}
.b_1px:after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  border: 1px solid #e5e5e5;
  -webkit-transform-origin: 0 0;
  -ms-transform-origin: 0 0;
  transform-origin: 0 0;
}

/**/
</style>
