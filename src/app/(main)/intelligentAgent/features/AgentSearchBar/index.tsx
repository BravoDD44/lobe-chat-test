import { SearchBar } from '@lobehub/ui';
import { useResponsive } from 'antd-style';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { useCustomAgentStore } from '@/store/customAgent';

const AgentSearchBar = memo(() => {
  const { t } = useTranslation('market');
  const { setSearchKeywords, searchKeywords, setSearchedAgentList, agentList } =
    useCustomAgentStore((s) => {
      return {
        agentList: s.agentList,
        searchKeywords: s.searchKeywords,
        setIsSearchLoading: s.setIsSearchLoading,
        setSearchKeywords: s.setSearchKeywords,
        setSearchedAgentList: s.setSearchedAgentList,
      };
    });
  const { mobile } = useResponsive();
  const filterAgents = (v: string) => {
    console.log('value---', v);

    return new Promise((resolve, reject) => {
      try {
        resolve(
          agentList.filter((agent) => {
            return (
              agent.meta.title.includes(v) ||
              agent.meta.description.includes(v) ||
              agent.meta.tags.includes(v)
            );
          }),
        );
      } catch {
        reject([]);
      }
    });
  };
  const handleSearch = (value: string) => {
    if (!value) {
      setSearchedAgentList([]);
      return;
    }
    filterAgents(value).then((list) => {
      console.log('list', list);
      setSearchedAgentList(list);
    });
  };
  useEffect(() => {
    handleSearch(searchKeywords);
  }, [searchKeywords]);
  return (
    <SearchBar
      allowClear
      enableShortKey={!mobile}
      onChange={(e) => {
        const v: string = e.target.value;
        console.log('ket words', v);
        handleSearch(v);
        setSearchKeywords(v);
      }}
      onPressEnter={() => handleSearch(searchKeywords)}
      onSubmit={() => handleSearch(searchKeywords)}
      placeholder={t('search.placeholder')}
      shortKey={'k'}
      spotlight={!mobile}
      type={mobile ? 'block' : 'ghost'}
      value={searchKeywords}
    />
  );
});

export default AgentSearchBar;
