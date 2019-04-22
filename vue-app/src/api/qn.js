// 项目名
import { ProSun } from '@/const';
// 请求方式
import request from '@/utils/request';

// 上传图片
// 获取七牛上传token
export function fetchQnUptoken(query) {
  return request({
    url: `${ProSun}/api_qn/uptoken`,
    method: 'get',
    params: query,
  });
}

export function test(query) {
  return request({
    url: `${ProSun}/test`,
    method: 'get',
    params: query,
  });
}
