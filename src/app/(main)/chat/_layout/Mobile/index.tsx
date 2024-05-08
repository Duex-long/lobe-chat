import { useLogin } from '@/utils/login/token';

import { LayoutProps } from '../type';

const Layout = ({ children }: LayoutProps) => {
  return children;
};

Layout.displayName = 'MobileChatLayout';

export default Layout;
