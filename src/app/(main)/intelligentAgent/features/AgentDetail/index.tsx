'use client';


import { useCustomAgentStore } from '@/store/customAgent';

import DetailHeader from './AgentDetailHeader';
import styles from './index.module.css';

const Detail = () => {
  const { runningAgent } = useCustomAgentStore((s) => {
    return {
      runningAgent: s.runningAgent,
    };
  });
  return (
    <div className={styles.container}>
      <DetailHeader></DetailHeader>
      <iframe className={styles.iframeBox} src={runningAgent?.url}></iframe>
    </div>
  );
};
export default Detail;
