// 项目名
import { ProSun } from '@/const';
// 请求方式
import request from '@/utils/request';

// 微信
// 获取维信配置信息
export function fetchWxConfig(query) {
  return request({
    url: `${ProSun}/wx/wxConfig`,
    method: 'get',
    params: query,
  });
}
// 通过微信授权获取的code获取微信用户信息
export function fetchWxUserInfoByCode(query) {
  return request({
    url: `${ProSun}/wx/get_user_info`,
    method: 'get',
    params: query,
  });
}

// 地址 address
// 根据关键词调取高德api获取地址
export function fetchAddressByKeyWord(query) {
  return request({
    url: `${ProSun}/wx/geocode/geo`,
    method: 'get',
    params: {
      address: query.keyWord || '',
    },
  });
}
// 根据定位经纬度调取高德api获取地址
export function fetchAddressByLocation(query) {
  return request({
    url: `${ProSun}/wx/geocode/regeo`,
    method: 'get',
    params: {
      location: query.location || '',
    },
  });
}

// 微信图片
// 使用七牛的 fetch 接口向微信服务器请求文件并存入自己的七牛仓库
export function fetchWxImgToQn(query) {
  return request({
    url: `${ProSun}/uploadByWx`,
    method: 'get',
    params: query,
  });
}

// 微信登录云机械
// 通过微信授权获取的code获取微信用户信息
export function fetchYjxUserInfoByWxInfo(query) {
  return request({
    url: `${ProSun}/member/wxLogin`,
    method: 'get',
    params: query,
  });
}
// 根据手机号判断用户是否已注册
export function fetchYjxMemberCheckNum(query) {
  return request({
    url: `${ProSun}/member/checkNum`,
    method: 'get',
    params: query,
  });
}
// 根据手机号获取验证码
export function fetchYjxMemberGetCode(query) {
  return request({
    url: `${ProSun}/member/getCode`,
    method: 'get',
    params: query,
  });
}
// 绑定账号
export function fetchYjxMemberWxBind(query) {
  return request({
    url: `${ProSun}/member/bindWeichatForLogin`,
    method: 'get',
    params: query,
  });
}
// 查询用户信息
export function fetchMemberInfoByToken(query) {
  return request({
    url: `${ProSun}/member/getMemberInfoById`,
    method: 'get',
    params: query,
  });
}
