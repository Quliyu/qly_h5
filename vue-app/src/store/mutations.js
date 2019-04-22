import * as types from './mutation-type';

export default {
  // 返回页面链接
  [types.SET_RETURNURL](state, returnUrl) {
    state.returnUrl = returnUrl;
    window.localStorage.setItem('returnUrl', returnUrl);
  },
  // 分享者token shareToken缩写
  [types.SET_STK](state, stk) {
    state.stk = stk;
    window.localStorage.setItem('stk', stk);
  },
  // 当前登录用户token
  [types.SET_TOKEN](state, token) {
    state.token = token;
    window.localStorage.setItem('token', token);
  },
  // 当前登录用户id
  [types.SET_MEMBERID](state, memberId) {
    state.memberId = memberId;
    window.localStorage.setItem('memberId', memberId);
  },
  // app版本号
  [types.SET_APPVERSION](state, appVersion) {
    state.appVersion = appVersion;
    window.localStorage.setItem('appVersion', appVersion);
  },
  // 商品信息
  [types.SET_GOODS](state, goods) {
    if (goods.id > 0) {
      state.goods = goods;
      window.localStorage.setItem('goods', JSON.stringify(goods));
    }
  },
  // 设备snid
  [types.SET_SNID](state, snId) {
    state.snId = snId;
    window.localStorage.setItem('snId', snId);
  },
  // 安装宝-当前登录用户token
  [types.SET_AZBTOKEN](state, azbToken) {
    state.azbToken = azbToken;
    window.localStorage.setItem('azbToken', azbToken);
  },
  // 安装宝-设备Id
  [types.SET_AZBDEVICEID](state, azbDeviceId) {
    state.azbDeviceId = azbDeviceId;
    window.localStorage.setItem('azbDeviceId', azbDeviceId);
  },
  // 安装宝-SnId
  [types.SET_AZBSNID](state, azbSnId) {
    state.azbSnId = azbSnId;
    window.localStorage.setItem('azbSnId', azbSnId);
  },
  // 安装宝-操作方向
  [types.SET_AZBOPERATEWAY](state, azbOperateWay) {
    state.azbOperateWay = azbOperateWay;
    window.localStorage.setItem('azbOperateWay', azbOperateWay);
  },
  // 安装宝-返回页面
  [types.SET_AZBBACKPAGE](state, azbBackPage) {
    state.azbBackPage = azbBackPage;
    window.localStorage.setItem('azbBackPage', azbBackPage);
  },
};

