import StructuredData from '@/components/StructuredData';
// import { getAgents } from '@/request/api';
import { ldModule } from '@/server/ld';
import { metadataModule } from '@/server/metadata';
import { translation } from '@/server/translation';
// import { useCustomAgentStore } from '@/store/customAgent';

export const generateMetadata = async () => {
  const { t } = await translation('metadata');
  return metadataModule.generate({
    description: t('chat.description'),
    title: t('chat.title'),
    url: '/intelligentAgent',
  });
};

const Page = async () => {
  const { t } = await translation('metadata');
  const ld = ldModule.generate({
    description: t('chat.description'),
    title: t('chat.title'),
    url: '/intelligentAgent',
  });

  return <StructuredData ld={ld} />;
};

Page.displayName = 'intelligentAgent';

export default Page;
