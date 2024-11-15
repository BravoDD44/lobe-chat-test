'use client';

import { Avatar, Tag } from '@lobehub/ui';
import { useHover } from 'ahooks';
import { Typography } from 'antd';
import { useThemeMode } from 'antd-style';
import { startCase } from 'lodash-es';
import { memo, useRef } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useCustomAgentStore } from '@/store/customAgent';
import { AgentsMarketIndexItem } from '@/types/market';

import AgentCardBanner from './AgentCardBanner';
import { useStyles } from './style';

const { Paragraph } = Typography;
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
const AgentCardItem = memo<AgentsMarketIndexItem>(({ meta }) => {
  const ref = useRef(null);
  const isHovering = useHover(ref);
  const { setRununingAgent, addLatestUsedAgentList } = useCustomAgentStore((s) => {
    return {
      addLatestUsedAgentList: s.addLatestUsedAgentList,
      setRununingAgent: s.setRununingAgent,
    };
  });

  const onAgentCardClick = (meta: any) => {
    console.log('meta----', meta);
    addLatestUsedAgentList(genAgent(meta));
    setRununingAgent(genAgent(meta));
  };
  const { styles, theme } = useStyles();
  const { isDarkMode } = useThemeMode();

  const { avatar, title, description, tags, backgroundColor } = meta;

  return (
    <Flexbox className={styles.container} onClick={() => onAgentCardClick(meta)}>
      <AgentCardBanner meta={meta} style={{ opacity: isDarkMode ? 0.9 : 0.4 }} />
      <Flexbox className={styles.inner} gap={8} ref={ref}>
        <Avatar
          animation={isHovering}
          avatar={avatar}
          background={backgroundColor || theme.colorFillTertiary}
          size={56}
        />
        <Paragraph className={styles.title} ellipsis={{ rows: 1, tooltip: title }}>
          {title}
        </Paragraph>
        <Paragraph className={styles.desc} ellipsis={{ rows: 2, tooltip: description }}>
          {description}
        </Paragraph>
        <Flexbox gap={6} horizontal style={{ flexWrap: 'wrap' }}>
          {(tags as string[]).filter(Boolean).map((tag: string, index) => (
            <Tag key={index} style={{ margin: 0 }}>
              {startCase(tag).trim()}
            </Tag>
          ))}
        </Flexbox>
      </Flexbox>
    </Flexbox>
  );
});

export default AgentCardItem;
