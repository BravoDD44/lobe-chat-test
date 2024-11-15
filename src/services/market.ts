import { LobeChatAgentsMarketIndex } from '@/types/market';

class MarketService {
  getAgentList = async (): Promise<LobeChatAgentsMarketIndex> => {
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo') || `{}`);
    const bcompaniesId = userInfo.bcompaniesId;
    const res = await fetch(`${process.env.NEXT_PUBLIC_AGENTS_INDEX_URL}/index.zh-CN.json?bcompaniesId=${bcompaniesId}`);
    return res.json();
  };

  /**
   * 请求助手 manifest
   */
  getAgentManifest = async (identifier: string) => {
    if (!identifier) return;
    const res = await fetch(`${process.env.NEXT_PUBLIC_AGENTS_INDEX_URL}?identifier=${identifier}`);

    return res.json();
  };
}
export const marketService = new MarketService();
