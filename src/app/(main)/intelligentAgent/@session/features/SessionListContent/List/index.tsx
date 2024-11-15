import { Empty } from 'antd';
import { createStyles } from 'antd-style';
import Link from 'next/link';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Center } from 'react-layout-kit';
import LazyLoad from 'react-lazy-load';

import { SESSION_CHAT_URL } from '@/const/url';
import { useCustomAgentStore } from '@/store/customAgent';
import {
  featureFlagsSelectors,
  useServerConfigStore,
} from '@/store/serverConfig';
import { useSessionStore } from '@/store/session';
import { sessionSelectors } from '@/store/session/selectors';
// import { LobeAgentSession } from '@/types/session';

import SkeletonList from '../../SkeletonList';
import SessionItem from './Item';

const useStyles = createStyles(
  ({ css }) => css`
    min-height: 70px;
  `,
);
interface SessionListProps {
  dataSource?: any[];
  groupId?: string;
  showAddButton?: boolean;
}
const SessionList = memo<SessionListProps>(({ dataSource }) => {
  const { t } = useTranslation('chat');
  const { styles } = useStyles();
  const { setRununingAgent } = useCustomAgentStore((s) => {
    return {
      setRununingAgent: s.setRununingAgent,
    };
  });
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const genAgent = (meta: any) => {
    return {
      author: '酷爱',
      createAt: '2024-04-11',
      homepage: 'https://chat.codejoy.ai',
      identifier: 'false',
      meta: meta,
      url: meta.url,
    };
  };
  const isInit = useSessionStore(sessionSelectors.isSessionListInit);
  const { showCreateSession } = useServerConfigStore(featureFlagsSelectors);
  const mobile = useServerConfigStore((s) => s.isMobile);
  const isEmpty = !dataSource || dataSource.length === 0;
  return !isInit ? (
    <SkeletonList />
  ) : !isEmpty ? (
    dataSource.map(({ id, meta }) => {
      return (
        <LazyLoad className={styles} key={id}>
          <Link
            aria-label={id}
            href={SESSION_CHAT_URL(id, mobile)}
            onClick={(e) => {
              console.log('sa');
              setRununingAgent(genAgent(meta));
              e.preventDefault();
              //   switchSession(id);
            }}
          >
            <SessionItem id={id} meta={meta} />
          </Link>
        </LazyLoad>
      );
    })
  ) : showCreateSession ? null : (
    <Center>
      <Empty
        description={t('emptyAgent')}
        image={Empty.PRESENTED_IMAGE_SIMPLE}
      />
    </Center>
  );
});

export default SessionList;
