'use client';

import { SearchBar } from '@lobehub/ui';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useCustomAgentStore } from '@/store/customAgent';

const SessionSearchBar = memo<{ mobile?: boolean }>(({ mobile }) => {
  const { t } = useTranslation('chat');
  const {
    // searchKeywords,
    // setSearchedAgentList,
    setIsSearchLoading,
    isSearchLoading,
    setIsSearching,
    latestUsedKeywords,
    setLatestUsedKeywords,
    latestUsedAgentList,
    setLatestUsedKeywordsSearchList,
  } = useCustomAgentStore((s) => {
    return s;
  });

  const [value, setValue] = useState(latestUsedKeywords);

  const filterAgents = (v: string) => {
    setIsSearchLoading(true);
    return new Promise((resolve, reject) => {
      try {
        resolve(
          latestUsedAgentList.filter((agent) => {
            return (
              agent.meta.title.includes(v) ||
              agent.meta.description.includes(v) ||
              agent.meta.tags.includes(v)
            );
          }),
        );
        setIsSearchLoading(false);
      } catch {
        reject([]);
        setIsSearchLoading(false);
      }
    });
  };
  const handleSearch = (value: string) => {
    filterAgents(value).then((list) => {
      setLatestUsedKeywordsSearchList(list);
    });
    setLatestUsedKeywords(value);
  };

  return (
    <SearchBar
      allowClear
      enableShortKey={!mobile}
      loading={isSearchLoading}
      onChange={(e) => {
        const v = e.target.value;
        if (!v) {
          setIsSearching(false);
          setIsSearchLoading(false);
        } else {
          setIsSearching(true);
        }
        handleSearch(v);
        setValue(v);
      }}
      onPressEnter={() => {
        handleSearch(value);
      }}
      placeholder={t('searchAgentPlaceholder')}
      shortKey={'k'}
      spotlight={!mobile}
      type={mobile ? 'block' : 'ghost'}
      value={value}
    />
  );
});

export default SessionSearchBar;
