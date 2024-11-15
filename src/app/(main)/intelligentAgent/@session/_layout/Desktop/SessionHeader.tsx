/* eslint-disable @next/next/no-img-element */
'use client';

import { createStyles } from 'antd-style';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useUserStore } from '@/store/user';
import { userGeneralSettingsSelectors } from '@/store/user/selectors';

import SessionSearchBar from '../../features/SessionSearchBar';

/* eslint-disable @next/next/no-img-element */

/* eslint-disable @next/next/no-img-element */

export const useStyles = createStyles(({ css, token }) => ({
  logo: css`
    fill: ${token.colorText};
  `,
  top: css`
    position: sticky;
    inset-block-start: 0;
  `,
}));

const Header = memo(() => {
  const { styles } = useStyles();
  const [themeMode] = useUserStore((s) => [userGeneralSettingsSelectors.currentThemeMode(s)]);

  /* const logourl = `/icons/logo-codejoy-${themeMode}.png`; */
  const logourl = `/icons/${process.env.NEXT_PUBLIC_LOGO_PATH}-${themeMode}.png`;

  return (
    <Flexbox className={styles.top} gap={16} padding={16}>
      <Flexbox distribution={'space-between'} horizontal>
        <Flexbox align={'center'} gap={4} horizontal>
          <img alt="AI HUB" height="36" src={logourl} />
        </Flexbox>
      </Flexbox>
      <SessionSearchBar />
    </Flexbox>
  );
});

export default Header;
