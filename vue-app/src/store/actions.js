// actions.js示例（异步操作、多个commit时）：

import * as types from './mutation-type';

export default {
  nameAsyn({
    commit,
  }, {
    returnUrl,
    stk,
    token,
    memberId,
    appVersion,
    azbToken,
    azbDeviceId,
    azbSnId,
    azbOperateWay,
    azbBackPage,
  }) {
    commit(types.SET_RETURNURL, returnUrl);
    commit(types.SET_STK, stk);
    commit(types.SET_TOKEN, token);
    commit(types.SET_MEMBERID, memberId);
    commit(types.SET_APPVERSION, appVersion);
    commit(types.SET_AZBTOKEN, azbToken);
    commit(types.SET_AZBDEVICEID, azbDeviceId);
    commit(types.SET_AZBSNID, azbSnId);
    commit(types.SET_AZBOPERATEWAY, azbOperateWay);
    commit(types.SET_AZBBACKPAGE, azbBackPage);
  },
};
