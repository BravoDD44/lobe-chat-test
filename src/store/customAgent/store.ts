import { StoreApi, UseBoundStore, create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface agentType {
  author: string;
  createAt: string;
  homepage: string;
  identifier: string;
  meta: {
    avatar: string;
    description: string;
    tags: string[];
    title: string;
    url: string;
  };
  url: string;
}
interface CustomAgentStoreType {
  addLatestUsedAgentList: (agent: agentType) => void;
  agentList: agentType[];
  isSearchLoading: boolean;
  isSearching: boolean;
  latestUsedAgentList: agentType[];
  latestUsedKeywords: string;
  latestUsedKeywordsSearchList: agentType[];
  removeLatestUsedAgentList: (agent: agentType) => void;
  runningAgent: agentType | null;
  searchKeywords: string;
  searchedAgentList: agentType[];
  setAgentList: (agent: agentType[]) => void;
  setIsSearchLoading: (v: boolean) => void;
  setIsSearching: (v: boolean) => void;
  setLatestUsedKeywords: (v: string) => void;
  setLatestUsedKeywordsSearchList: (list: agentType[]) => void;
  setRununingAgent: (agent: agentType | null) => void;
  setSearchKeywords: (v: string) => void;
  setSearchedAgentList: (list: agentType[]) => void;
  setTag: (tag: string) => void;
  setTagSearchedAgentList: (list: agentType[]) => void;
  tag: string;
  tagSearchedAgentList: agentType[];
}

export const useCustomAgentStore: UseBoundStore<
  StoreApi<CustomAgentStoreType>
> = create(
  persist(
    (set) => {
      return {
        addLatestUsedAgentList: (agent: agentType) => {
          set((s) => {
            const hasAgent = s.latestUsedAgentList.some((item) => {
              return agent.url === item.url;
            });
            if (hasAgent) {
              return {};
            }
            const list = [...s.latestUsedAgentList];
            list.unshift(agent);
            return {
              latestUsedAgentList: list,
            };
          });
        },
        agentList: [],
        isSearchLoading: false,
        isSearching: false,

        latestUsedAgentList: [],
        // removeAgent: (agent: agentType) => {
        //   set((state: CustomAgentStoreType) => {
        //     return { agentList: state.agentList };
        //   });
        // },
        latestUsedKeywords: '',

        latestUsedKeywordsSearchList: [],

        removeLatestUsedAgentList: (agent: agentType) => {
          set((s) => {
            const list = s.latestUsedAgentList.filter(
              (item) => item.url !== agent.url,
            );
            return {
              latestUsedAgentList: list,
            };
          });
        },
        runningAgent: null,
        searchKeywords: '',
        searchedAgentList: [],

        setAgentList: (list: agentType[]) => {
          set(() => {
            return { agentList: list };
          });
        },

        setIsSearchLoading: (v: boolean) => {
          set(() => {
            return { isSearchLoading: v };
          });
        },

        setIsSearching: (v: boolean) => {
          set(() => {
            return {
              isSearching: v,
            };
          });
        },
        setLatestUsedKeywords: (v: string) => {
          set(() => {
            return { latestUsedKeywords: v };
          });
        },
        setLatestUsedKeywordsSearchList: (list: agentType[]) => {
          set(() => {
            return { latestUsedKeywordsSearchList: list };
          });
        },
        setRununingAgent: (agent: agentType | null) => {
          set(() => {
            return {
              runningAgent: agent,
            };
          });
        },
        setSearchKeywords: (v) => {
          set(() => {
            return {
              searchKeywords: v,
            };
          });
        },

        setSearchedAgentList: (list: agentType[]) => {
          set(() => {
            return { searchedAgentList: list };
          });
        },
        setTag: (tag: string) => {
          set(() => {
            return { tag };
          });
        },
        setTagSearchedAgentList: (list: agentType[]) => {
          set(() => {
            return { tagSearchedAgentList: list };
          });
        },
        tag: '',
        tagSearchedAgentList: [],
      };
    },
    {
      name: 'customAgent-storage', // 存储中的项目名称，必须是唯一的
      storage: createJSONStorage(() => localStorage), // 使用sessionStorage作为存储
    },
  ),
);
