import { CollapseProps } from 'antd';
import { memo, useMemo, useState } from 'react';

import { useCustomAgentStore } from '@/store/customAgent';
import { useGlobalStore } from '@/store/global';
import { systemStatusSelectors } from '@/store/global/selectors';
import { useSessionStore } from '@/store/session';
import { useUserStore } from '@/store/user';
import { authSelectors } from '@/store/user/selectors';
import { SessionDefaultGroup } from '@/types/session';

import CollapseGroup from './CollapseGroup';
import SessionList from './List';
import ConfigGroupModal from './Modals/ConfigGroupModal';
import RenameGroupModal from './Modals/RenameGroupModal';

const DefaultMode = memo(() => {
  const [activeGroupId] = useState<string>();
  const [renameGroupModalOpen, setRenameGroupModalOpen] = useState(false);
  const [configGroupModalOpen, setConfigGroupModalOpen] = useState(false);

  const isLogin = useUserStore(authSelectors.isLogin);
  const [useFetchSessions] = useSessionStore((s) => [s.useFetchSessions]);
  useFetchSessions(isLogin);

  // const customSessionGroups = useSessionStore(sessionSelectors.customSessionGroups, isEqual);

  const [sessionGroupKeys, updateSystemStatus] = useGlobalStore((s) => [
    systemStatusSelectors.sessionGroupKeys(s),
    s.updateSystemStatus,
  ]);

  const { latestUsedAgentList } = useCustomAgentStore((s) => {
    return {
      agentList: s.agentList,
      latestUsedAgentList: s.latestUsedAgentList,
      runningAgent: s.runningAgent,
    };
  });

  const items = useMemo(
    () =>
      [
        {
          children: <SessionList dataSource={latestUsedAgentList || []} />,
          extra: null,
          key: SessionDefaultGroup.Default,
          label: '最近使用',
        },
      ].filter(Boolean) as CollapseProps['items'],
    [latestUsedAgentList],
  );

  return (
    <>
      <CollapseGroup
        activeKey={sessionGroupKeys}
        items={items}
        onChange={(keys) => {
          const expandSessionGroupKeys =
            typeof keys === 'string' ? [keys] : keys;
          updateSystemStatus({ expandSessionGroupKeys });
        }}
      />
      {activeGroupId && (
        <RenameGroupModal
          id={activeGroupId}
          onCancel={() => setRenameGroupModalOpen(false)}
          open={renameGroupModalOpen}
        />
      )}
      <ConfigGroupModal
        onCancel={() => setConfigGroupModalOpen(false)}
        open={configGroupModalOpen}
      />
    </>
  );
});

DefaultMode.displayName = 'SessionDefaultMode';

export default DefaultMode;
