import { Button } from 'antd';
import { startCase } from 'lodash-es';
import { memo, useEffect, useState } from 'react';

import { useCustomAgentStore } from '@/store/customAgent';

const Inner = memo(() => {
  const {
    agentList,

    setTagSearchedAgentList,
    searchKeywords,
    setSearchKeywords,
  } = useCustomAgentStore((s) => s);
  const [agentTagList, setAgentTagList] = useState<string[]>([]);

  useEffect(() => {
    let tagList: string[] = agentList.reduce((acc, item) => {
      return acc.concat(item.meta.tags);
    }, []);
    setAgentTagList(Array.from(new Set(tagList)));
  }, [agentList]);
  const handleClick = (tag: string) => {
    setSearchKeywords(tag);
    const list = agentList.filter((item) => {
      return item.meta.tags.includes(tag);
    });
    setTagSearchedAgentList(list);
  };
  return agentTagList.map((item) => (
    <Button
      key={item}
      onClick={() => handleClick(item)}
      shape={'round'}
      size={'small'}
      type={searchKeywords === item ? 'primary' : 'default'}
    >
      {startCase(item)}
    </Button>
  ));
});

export default Inner;
