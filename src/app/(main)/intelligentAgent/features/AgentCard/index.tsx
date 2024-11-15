'use client';

import { SpotlightCardProps } from '@lobehub/ui';
import { FC, memo, useCallback } from 'react';
import { Flexbox } from 'react-layout-kit';
import LazyLoad from 'react-lazy-load';

import { useCustomAgentStore } from '@/store/customAgent';

import AgentCardItem from './AgentCardItem';
import { useStyles } from './style';

export interface AgentCardProps {
  CardRender: FC<SpotlightCardProps>;
  mobile?: boolean;
}

const AgentCard = memo<AgentCardProps>(({ CardRender, mobile = false }) => {
  const { agentList, searchedAgentList, searchKeywords } = useCustomAgentStore((s) => {
    return s;
  });

  const { styles } = useStyles();

  const GridRender: SpotlightCardProps['renderItem'] = useCallback(
    (props: any) => (
      <LazyLoad className={styles.lazy}>
        <AgentCardItem {...props} />
      </LazyLoad>
    ),
    [styles.lazy],
  );

  // if (isLoading) return <Loading />;

  return (
    <Flexbox
      gap={mobile ? 16 : 24}
      horizontal={false}
      style={{
        margin: '0 auto',
        overflow: 'scroll',
        padding: '0 10% ',
        width: '100%',
      }}
      width={'100%'}
    >
      <CardRender
        // className={styles.list}
        items={searchKeywords ? searchedAgentList : agentList}
        renderItem={GridRender}
        spotlight={mobile ? undefined : false}
      />
    </Flexbox>
  );
});

export default AgentCard;
