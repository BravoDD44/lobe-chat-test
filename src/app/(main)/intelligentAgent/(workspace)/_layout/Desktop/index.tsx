'use client';

import { SpotlightCard, SpotlightCardProps } from '@lobehub/ui';
import { FC } from 'react';

import { useCustomAgentStore } from '@/store/customAgent';

import AgentCard from '../../../features/AgentCard';
import AgentDetail from '../../../features/AgentDetail';
import AgentSearchBar from '../../../features/AgentSearchBar';
import TagList from '../../../features/TagList';

const Desktop = () => {
  const { runningAgent } = useCustomAgentStore((s) => {
    return {
      runningAgent: s.runningAgent,
    };
  });

  if (runningAgent) {
    return <AgentDetail />;
  }
  return (
    <>
      <h2 style={{ padding: '10px 10%', width: '100%' }}>企业智能体</h2>
      <div style={{ padding: '10px 10%', width: '100%' }}>
        <AgentSearchBar />
      </div>
      <div style={{ padding: '10px 10%', width: '100%' }}>
        <TagList></TagList>
      </div>
      <AgentCard
        CardRender={SpotlightCard as FC<SpotlightCardProps>}
        mobile={false}
      />
    </>
  );
};

export default Desktop;
