import { post } from '@/utils/request';
import { normalizeResult } from '@/utils/tool';

export interface ProjectResponse {

}

export interface ProjectParams {
  currentPage?: number;
  pageSize?: number;
  projectShowType?: number;
  scheduleId: string;
}

interface addProjectParams {
  scheduleId: string;
  projectIds: string[];
}

export async function getProjectList(params: ProjectParams) {
  const res = await post('/api/project/manhour/my/project', params, true);
  return normalizeResult<unknown>(res);
}

export async function addProjects(params: addProjectParams) {
  const res = await post('/api/project/manhour/my/addProject', params, true);
  return normalizeResult<unknown>(res);
}
