import { ActionIcon, Icon } from '@lobehub/ui';
import { App, Dropdown } from 'antd';
import { createStyles } from 'antd-style';
import { ItemType } from 'antd/es/menu/interface';
import { MoreVertical, Trash } from 'lucide-react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { useCustomAgentStore } from '@/store/customAgent';
import { useSessionStore } from '@/store/session';
import { sessionHelpers } from '@/store/session/helpers';
import { sessionSelectors } from '@/store/session/selectors';

const useStyles = createStyles(({ css }) => ({
  modalRoot: css`
    z-index: 2000;
  `,
}));

interface ActionProps {
  group: string | undefined;
  id: string;
  openCreateGroupModal: () => void;
  setOpen: (open: boolean) => void;
}

const Actions = memo<ActionProps>(({ id, setOpen }) => {
  const { styles } = useStyles();
  const { t } = useTranslation('chat');
  const { removeLatestUsedAgentList } = useCustomAgentStore((s) => {
    return {
      removeLatestUsedAgentList: s.removeLatestUsedAgentList,
      setRununingAgent: s.setRununingAgent,
    };
  });
  const [pin] = useSessionStore((s) => {
    const session = sessionSelectors.getSessionById(id)(s);
    return [
      sessionHelpers.getSessionPinned(session),
      s.removeSession,
      s.pinSession,
      s.duplicateSession,
      s.updateSessionGroupId,
    ];
  });
  const { modal, message } = App.useApp();

  const items = useMemo(
    () =>
      (
        [
          // {
          //   icon: <Icon icon={pin ? PinOff : Pin} />,
          //   key: 'pin',
          //   label: t(pin ? 'pinOff' : 'pin'),
          //   onClick: () => {
          //     pinSession(id, !pin);
          //   },
          // },
          {
            danger: true,
            icon: <Icon icon={Trash} />,
            key: 'delete',
            label: t('delete', { ns: 'common' }),
            onClick: ({ domEvent }) => {
              domEvent.stopPropagation();
              modal.confirm({
                centered: true,
                okButtonProps: { danger: true },
                onOk: async () => {
                  removeLatestUsedAgentList({ url: id });
                  message.success('移除成功');
                },
                rootClassName: styles.modalRoot,
                title: '确认移除？',
              });
            },
          },
        ] as ItemType[]
      ).filter(Boolean),
    [id, pin],
  );

  return (
    <Dropdown
      arrow={false}
      menu={{
        items,
        onClick: ({ domEvent }) => {
          domEvent.stopPropagation();
        },
      }}
      onOpenChange={setOpen}
      trigger={['click']}
    >
      <ActionIcon
        icon={MoreVertical}
        size={{
          blockSize: 28,
          fontSize: 16,
        }}
      />
    </Dropdown>
  );
});

export default Actions;
