'use client';

import { useEffect } from 'react';
import { Flexbox } from 'react-layout-kit';

import { getAgents } from '@/request/api';
import { useCustomAgentStore } from '@/store/customAgent';

import { LayoutProps } from '../type';
import SessionPanel from './SessionPanel';

const Layout = ({ session, children }: LayoutProps) => {
  // const mobile = isMobileDevice();

  const { setAgentList } = useCustomAgentStore((s) => s);
  useEffect(() => {
    getAgents().then((res) => {
      // console.log('res', res);
      setAgentList(res.agents);
    });
  }, []);
  return (
    <Flexbox
      height={'100%'}
      horizontal
      style={{
        maxWidth: 'calc(100vw - 64px)',
        overflow: 'hidden',
        position: 'relative',
      }}
      width={'100%'}
    >
      <SessionPanel>{session}</SessionPanel>
      <Flexbox
        flex={1}
        style={{
          height: '100%',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
        }}
      >
        {children}
      </Flexbox>
    </Flexbox>
  );
};

Layout.displayName = 'DesktopAgentLayout';

export default Layout;
