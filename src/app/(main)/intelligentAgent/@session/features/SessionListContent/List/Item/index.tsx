import { memo, useMemo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';
import { shallow } from 'zustand/shallow';

import ModelTag from '@/components/ModelTag';
import { useAgentStore } from '@/store/agent';
import { agentSelectors } from '@/store/agent/selectors';
import { useChatStore } from '@/store/chat';
import { chatSelectors } from '@/store/chat/selectors';
import { useCustomAgentStore } from '@/store/customAgent';
import { useSessionStore } from '@/store/session';
import { sessionHelpers } from '@/store/session/helpers';
import {
  sessionMetaSelectors,
  sessionSelectors,
} from '@/store/session/selectors';

import ListItem from '../../ListItem';
import CreateGroupModal from '../../Modals/CreateGroupModal';
import Actions from './Actions';

interface SessionItemProps {
  id: string;
}

const SessionItem = memo<SessionItemProps>(({ id, meta }) => {
  const [open, setOpen] = useState(false);
  const [createGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const [defaultModel] = useAgentStore((s) => [
    agentSelectors.inboxAgentModel(s),
  ]);
  const { runningAgent } = useCustomAgentStore((s) => {
    return {
      runningAgent: s.runningAgent,
    };
  });
  const [loading] = useChatStore((s) => [
    chatSelectors.isAIGenerating(s) && id === s.activeId,
  ]);

  const [pin, description, avatarBackground, updateAt, model, group] =
    useSessionStore((s) => {
      const session = sessionSelectors.getSessionById(id)(s);
      const meta = session.meta;

      return [
        sessionHelpers.getSessionPinned(session),
        sessionMetaSelectors.getTitle(meta),
        sessionMetaSelectors.getDescription(meta),
        sessionMetaSelectors.getAvatar(meta),
        meta.backgroundColor,
        session?.updatedAt,
        session.model,
        session?.group,
      ];
    });

  const showModel = model !== defaultModel;

  const actions = useMemo(
    () => (
      <Actions
        group={group}
        id={meta.url}
        openCreateGroupModal={() => setCreateGroupModalOpen(true)}
        setOpen={setOpen}
      />
    ),
    [group, id],
  );

  const addon = useMemo(
    () =>
      !showModel ? undefined : (
        <Flexbox gap={4} horizontal style={{ flexWrap: 'wrap' }}>
          <ModelTag model={model} />
        </Flexbox>
      ),
    [showModel, model],
  );

  return (
    <>
      <ListItem
        actions={actions}
        active={meta.url === runningAgent?.meta.url}
        addon={addon}
        avatar={meta.avatar}
        avatarBackground={avatarBackground}
        date={updateAt?.valueOf()}
        description={description}
        loading={loading}
        pin={pin}
        showAction={open}
        title={meta.title}
      />
      <CreateGroupModal
        id={id}
        onCancel={() => setCreateGroupModalOpen(false)}
        open={createGroupModalOpen}
      />
    </>
  );
}, shallow);

export default SessionItem;
