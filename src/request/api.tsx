import req from '.';

type ResponseType = Promise<{
  code: number;
  data: any;
  message: string;
}>;
export type loginParamsType = {
  bcompaniesCode: string;
  jobId: string;
  password: string;
};

// 登录
export const loginApi = async (params: loginParamsType): ResponseType => {
  return req.post(`/admin/login`, params);
};

interface tokenTypeDeductParams {
  tokenUsage: number;
}
interface pointTypeDeductParams {
  content: string;
  model: string;
}
interface pointTypeCheckParams {
  model: string;
}
// 扣除点数
export const tokenTypeDeduct = async (params: tokenTypeDeductParams) => {
  return req.post(`/rechargePoints/tokenTypeDeduct`, params);
};

// 获取用户当前点数
export const getPoints = async () => {
  return req.get('/rechargePoints/getDeduct');
};

// 获取智能体
export const getAgents = (): Promise<{ agents: any[]; tags: string[] }> => {
  const userInfo = JSON.parse(window.localStorage.getItem('userInfo') || `{}`);
  const bcompaniesId = userInfo.bcompaniesId ? userInfo.bcompaniesId : 47;
  return req.get(
    `/agent/bcompanies/index.zh-CN.json?bcompaniesId=${bcompaniesId}`,
  );
};

// 扣除点数
export const pointTypeDeduct = async (params: pointTypeDeductParams) => {
  return req.post(`/rechargePoints/pointTypeDeduct`, params);
};

// 检查点数
export const checkpoint = async (params: pointTypeCheckParams) => {
  return req.post(`/rechargePoints/checkpoint`, params);
};
