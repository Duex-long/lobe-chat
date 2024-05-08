'use client';

import { useRouter } from 'next/navigation';
import { memo, useEffect } from 'react';



import { messageService } from '@/services/message';
import { sessionService } from '@/services/session';
import { checkLogin, useLogin } from '@/utils/login/token';


const checkHasConversation = async () => {
  const hasMessages = await messageService.hasMessages();
  const hasAgents = await sessionService.hasSessions();
  return hasMessages || hasAgents;
};

// const mockDelay = (time = 1000) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, time);
//   });
// };

const Redirect = memo(() => {
  const router = useRouter();
  // useLogin();

  useEffect(() => {
    checkHasConversation()
      .then(() => checkLogin())
      .then((hasData) => {
        console.log(hasData, 'hasdata');
        if (hasData) {
          router.replace('/chat');
        } else {
          router.replace('/welcome');
        }
      });
  }, []);

  return null;
});

export default Redirect;