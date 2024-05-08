'use client';

import { useTheme } from 'antd-style';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';



import { useIsPWA } from '@/hooks/useIsPWA';
import { useLogin } from '@/utils/login/token';



import { LayoutProps } from './type';


const Layout = memo<LayoutProps>(({ children }) => {
  const isPWA = useIsPWA();
  const theme = useTheme();

  // useLogin();
  return (
    <Flexbox
      height={'100%'}
      horizontal
      style={{
        borderTop: isPWA ? `1px solid ${theme.colorBorder}` : undefined,
        position: 'relative',
      }}
      width={'100%'}
    >
      {/* {nav} */}
      {children}
    </Flexbox>
  );
});

Layout.displayName = 'DesktopMainLayout';

export default Layout;