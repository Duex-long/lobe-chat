import { Button, Input, Modal, message } from 'antd';
import { createStyles } from 'antd-style';
import useMessage from 'antd/es/message/useMessage';
import { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';



import { setToken, setUserId, userLogin } from '@/utils/login/token';

// const useStyles = createStyles(() => {});

const baseInputWidth = { maxWidth: '320px' };

const LoginPage = memo<{ close: () => void; showLoginModal: boolean }>(
  ({ showLoginModal = false, close }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoadingState] = useState(false);

    const checkFormIsEmpty = () => {
      let check = false;
      !username
        ? message.error('请输入用户名')
        : !password
          ? message.error('请输入密码')
          : (check = true);
      return check;
    };
    const confirm = async () => {
      const allowNext = checkFormIsEmpty();
      if (!allowNext) return;
      setLoadingState(true);
      try {
        const data = await userLogin(username, password);
        setToken(data.token);
        setUserId(username);
        // changeStateFunc(true);
        // navigate('/', {
        //   replace: true,
        // })
        // changeStateFunc
        message.success('success');
      } catch (e) {
        message.error('登陆失败');
      } finally {
        setPassword('');
        setLoadingState(false);
        close();
      }
    };
    return (
      <Modal
        open={showLoginModal}
        title="Login"
        onCancel={close}
        onOk={confirm}
        width={320}
        confirmLoading={loading}
      >
        <Flexbox gap={16}>
          <Input
            style={baseInputWidth}
            placeholder="user"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input.Password
            style={baseInputWidth}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Flexbox>
      </Modal>
    );
  },
);

export default LoginPage;