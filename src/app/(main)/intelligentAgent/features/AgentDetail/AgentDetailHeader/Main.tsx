'use client';

import { ActionIcon, Avatar, ChatHeaderTitle } from '@lobehub/ui';
import { Skeleton } from 'antd';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { Suspense, memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { DESKTOP_HEADER_ICON_SIZE } from '@/const/layoutTokens';
import { useCustomAgentStore } from '@/store/customAgent';
import { useGlobalStore } from '@/store/global';
import { systemStatusSelectors } from '@/store/global/selectors';
import { useSessionStore } from '@/store/session';
import {
  sessionMetaSelectors,
  sessionSelectors,
} from '@/store/session/selectors';

const Main = memo(() => {
  const { runningAgent } = useCustomAgentStore((s) => {
    return {
      runningAgent: s.runningAgent,
    };
  });
  const [backgroundColor] = useSessionStore((s) => [
    sessionSelectors.isSomeSessionActive(s),
    sessionSelectors.isInboxSession(s),
    sessionMetaSelectors.currentAgentTitle(s),
    sessionMetaSelectors.currentAgentDescription(s),
    sessionMetaSelectors.currentAgentAvatar(s),
    sessionMetaSelectors.currentAgentBackgroundColor(s),
  ]);

  const displayTitle = `${runningAgent?.meta.title}`;
  const displayDesc = runningAgent?.meta.description;
  const showSessionPanel = useGlobalStore(
    systemStatusSelectors.showSessionPanel,
  );
  const updateSystemStatus = useGlobalStore((s) => s.updateSystemStatus);

  return (
    <Flexbox align={'center'} gap={4} horizontal>
      {
        <ActionIcon
          aria-label={runningAgent?.meta.description}
          icon={showSessionPanel ? PanelLeftClose : PanelLeftOpen}
          onClick={() => {
            updateSystemStatus({
              sessionsWidth: showSessionPanel ? 0 : 320,
              showSessionPanel: !showSessionPanel,
            });
          }}
          size={DESKTOP_HEADER_ICON_SIZE}
        />
      }
      <Avatar
        avatar={runningAgent?.meta.avatar}
        background={backgroundColor}
        size={40}
        title={displayTitle}
      />
      <ChatHeaderTitle desc={displayDesc} tag={null} title={displayTitle} />
    </Flexbox>
  );
});

export default () => (
  <Suspense
    fallback={
      <Skeleton
        active
        avatar={{ shape: 'circle', size: 'default' }}
        paragraph={false}
        title={{ style: { margin: 0, marginTop: 8 }, width: 200 }}
      />
    }
  >
    <Main />
  </Suspense>
);
