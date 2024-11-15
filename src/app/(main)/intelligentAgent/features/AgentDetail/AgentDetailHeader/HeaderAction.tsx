'use client';

import { ActionIcon } from '@lobehub/ui';
import { LogOut } from 'lucide-react';
import { memo } from 'react';

import { DESKTOP_HEADER_ICON_SIZE } from '@/const/layoutTokens';
import { useCustomAgentStore } from '@/store/customAgent';

const HeaderAction = memo(() => {
  const { setRununingAgent } = useCustomAgentStore((s) => {
    return {
      setRununingAgent: s.setRununingAgent,
    };
  });

  return (
    <ActionIcon
      icon={LogOut}
      onClick={() => setRununingAgent(null)}
      size={DESKTOP_HEADER_ICON_SIZE}
      title={'返回'}
    />
  );
});

export default HeaderAction;
