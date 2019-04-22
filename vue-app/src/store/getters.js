// getters.js示例（ 我们一般使用getters来获取state的状态， 而不是直接使用state）

export const returnUrl = state => state.returnUrl || window.localStorage.getItem('returnUrl') || '';
export const stk = state => state.stk || window.localStorage.getItem('stk') || '';
export const token = state => state.token || window.localStorage.getItem('token') || '';
export const memberId = state => state.memberId || window.localStorage.getItem('memberId') || '';
export const appVersion = state => state.appVersion || window.localStorage.getItem('appVersion') || '';
export const goods = state => state.goods || JSON.parse(window.localStorage.getItem('goods') || '{}');
export const snId = state => state.snId || window.localStorage.getItem('snId') || '';
// azb
export const azbToken = state => state.azbToken || window.localStorage.getItem('azbToken') || '';
export const azbDeviceId = state => state.azbDeviceId || window.localStorage.getItem('azbDeviceId') || '';
export const azbSnId = state => state.azbSnId || window.localStorage.getItem('azbSnId') || '';
export const azbOperateWay = state => state.azbOperateWay || window.localStorage.getItem('azbOperateWay') || '';
export const azbBackPage = state => state.azbBackPage || window.localStorage.getItem('azbBackPage') || '';
