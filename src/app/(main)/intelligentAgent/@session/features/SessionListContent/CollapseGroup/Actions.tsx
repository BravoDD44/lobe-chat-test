import { ActionIcon, Icon } from '@lobehub/ui';
import { App, Dropdown, DropdownProps, MenuProps } from 'antd';
import { MoreVertical, Plus, Settings2 } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useIsMobile } from '@/hooks/useIsMobile';
import {
  featureFlagsSelectors,
  useServerConfigStore,
} from '@/store/serverConfig';
import { useSessionStore } from '@/store/session';

interface ActionsProps extends Pick<DropdownProps, 'onOpenChange'> {
  id?: string;
  isCustomGroup?: boolean;
  isPinned?: boolean;
  openConfigModal: () => void;
  openRenameModal?: () => void;
}

type ItemOfType<T> = T extends (infer Item)[] ? Item : never;
type MenuItemType = ItemOfType<MenuProps['items']>;

const Actions = memo<ActionsProps>(
  ({ id, openConfigModal, onOpenChange, isCustomGroup, isPinned }) => {
    const { t } = useTranslation('chat');
    const { message } = App.useApp();

    const isMobile = useIsMobile();

    const [createSession] = useSessionStore((s) => [
      s.createSession,
      s.removeSessionGroup,
    ]);

    const { showCreateSession } = useServerConfigStore(featureFlagsSelectors);

    const sessionGroupConfigPublicItem: MenuItemType = {
      icon: <Icon icon={Settings2} />,
      key: 'config',
      label: t('sessionGroup.config'),
      onClick: ({ domEvent }) => {
        domEvent.stopPropagation();
        openConfigModal();
      },
    };

    const newAgentPublicItem: MenuItemType = {
      icon: <Icon icon={Plus} />,
      key: 'newAgent',
      label: t('newAgent'),
      onClick: async ({ domEvent }) => {
        domEvent.stopPropagation();
        const key = 'createNewAgentInGroup';
        message.loading({
          content: t('sessionGroup.creatingAgent'),
          duration: 0,
          key,
        });

        await createSession({ group: id, pinned: isPinned });

        message.destroy(key);
        message.success({ content: t('sessionGroup.createAgentSuccess') });
      },
    };

    const customGroupItems: MenuProps['items'] = useMemo(
      () => [
        sessionGroupConfigPublicItem,
        {
          type: 'divider',
        },
      ],
      [],
    );

    const defaultItems: MenuProps['items'] = useMemo(
      () => [sessionGroupConfigPublicItem],
      [],
    );

    const tailItems = useMemo(
      () => (isCustomGroup ? customGroupItems : defaultItems),
      [isCustomGroup, customGroupItems, defaultItems],
    );

    return (
      <Dropdown
        arrow={false}
        menu={{
          items: showCreateSession
            ? [newAgentPublicItem, { type: 'divider' }, ...tailItems]
            : tailItems,
          onClick: ({ domEvent }) => {
            domEvent.stopPropagation();
          },
        }}
        onOpenChange={onOpenChange}
        trigger={['click']}
      >
        <ActionIcon
          active={isMobile ? true : false}
          icon={MoreVertical}
          onClick={(e) => {
            e.stopPropagation();
          }}
          size={{ blockSize: 22, fontSize: 16 }}
          style={{ background: isMobile ? 'transparent' : '', marginRight: -8 }}
        />
      </Dropdown>
    );
  },
);

export default Actions;
