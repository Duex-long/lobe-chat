'use client';

import { usePathname } from 'next/navigation';
import { memo } from 'react';



import { useLogin } from '@/utils/login/token';



import { LayoutProps } from './type';


const MOBILE_IGNORE_NAV_ROUTES = ['/settings/', '/chat/'];

// const Layout = memo(({ children, nav }: LayoutProps) => {
const Layout = memo(({ children }: LayoutProps) => {
  const pathname = usePathname();
  // const hideNav = MOBILE_IGNORE_NAV_ROUTES.some((path) => pathname.startsWith(path));
  useLogin();
  return (
    <>
      {children}
      {/* {!hideNav && nav} */}
    </>
  );
});

Layout.displayName = 'MobileMainLayout';

export default Layout;