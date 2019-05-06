// 项目名
import { ProSun } from '@/const';
// 请求方式
import request from '@/utils/request';

// qly_post 列表
export function qlyNewList(query) {
  return request({
    url: `${ProSun}/qly/list`,
    method: 'get',
    params: query,
  });
}

// qly_post 提交
export function qlyNew(data) {
  return request({
    url: `${ProSun}/qly/new`,
    method: 'post',
    data,
  });
}


// burial_point_logs 埋点日志提交
export function burialPointLogsCreate(data) {
  return request({
    url: `${ProSun}/logs/create`,
    method: 'post',
    data,
  });
}
