import { post } from '@/utils/request';
import { normalizeResult } from '@/utils/tool';

export interface UserInfoResponse {
  attributes?: null;
  authStr?: string;
  avatarUrl?: string;
  dingtalkUserId?: string;
  email?: string;
  id?: string;
  trueName?: string;
  type?: number;
  userName?: string;
}

export interface TimeDataResponse {
  freezed?: string | boolean;
  id?: string;
  month?: string;
}

// 获取用户信息
export async function getUserInfo() {
  const res = await post('/api/user/currentUserInfo');
  return normalizeResult<UserInfoResponse>(res);
}

// 获取月份及id
export async function getTime() {
  const res = await post('/api/project/manhour/schedule/info');
  return normalizeResult<TimeDataResponse>(res);
}

// 获取用户选择的项目，类型没来的及定义
export async function getProjectList() {
  const res = await post('/api/project/manhour/my');
  return res;
}
