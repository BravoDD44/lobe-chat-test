'use client';

import { memo } from 'react';

import { useCustomAgentStore } from '@/store/customAgent';

import DefaultMode from './DefaultMode';
import SearchMode from './SearchMode';

const SessionListContent = memo(() => {
  const { isSearching } = useCustomAgentStore((s) => {
    return {
      isSearching: s.isSearching,
    };
  });

  return isSearching ? <SearchMode /> : <DefaultMode />;
});

SessionListContent.displayName = 'SessionListContent';

export default SessionListContent;
