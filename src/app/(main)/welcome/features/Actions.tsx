'use client';

import { Icon } from '@lobehub/ui';
import { Button } from 'antd';
import { SendHorizonal } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import LoginPage from '@/components/login';
import { checkLogin } from '@/utils/login/token';

const Actions = memo<{ mobile?: boolean }>(({ mobile }) => {
  const { t } = useTranslation('welcome');
  const router = useRouter();

  const [loginState, setLoginState] = useState(false);
  const [showLoginState, setShowLoginState] = useState(false);
  const toChatPage = () => {
    if (loginState) {
      router.push('/chat');
    } else {
      setShowLoginState(true);
    }
  };
  useEffect(() => {
    checkLogin().then(setLoginState, () => setLoginState(false));
  }, []);

  return (
    <Flexbox gap={16} horizontal={!mobile} justify={'center'} width={'100%'} wrap={'wrap'}>
      <Link href={'/market'}>
        <Button block={mobile} size={'large'} style={{ minWidth: 160 }} type={'default'}>
          {t('button.market')}
        </Button>
      </Link>
      <Button
        block={mobile}
        onClick={toChatPage}
        size={'large'}
        style={{ minWidth: 160 }}
        type={'primary'}
      >
        <Flexbox align={'center'} gap={4} horizontal justify={'center'}>
          {t('button.start')}
          <Icon icon={SendHorizonal} />
        </Flexbox>
      </Button>

      {showLoginState ? (
        <LoginPage showLoginModal={showLoginState} close={() => setShowLoginState(false)} />
      ) : undefined}
    </Flexbox>
  );
});

export default Actions;