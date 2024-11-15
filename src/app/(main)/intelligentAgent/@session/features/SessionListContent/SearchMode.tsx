import { memo } from 'react';

import { useCustomAgentStore } from '@/store/customAgent';

import SkeletonList from '../SkeletonList';
import SessionList from './List';

const SearchMode = memo(() => {
  const { isSearchLoading, latestUsedKeywordsSearchList } = useCustomAgentStore((s) => {
    return s;
  });

  return isSearchLoading ? (
    <SkeletonList />
  ) : (
    <SessionList dataSource={latestUsedKeywordsSearchList} showAddButton={false} />
  );
});

SearchMode.displayName = 'SessionSearchMode';

export default SearchMode;
