import { z } from 'zod';
import { notifications } from '@mantine/notifications';
import { removeClientAccessToken, setClientAccessToken } from '@/api/axios';

import { createPostMutationHook } from '@/api/helpers';

export const useLogin = createPostMutationHook({
  endpoint: 'auth/login',
  rMutationParams: {
    onSuccess: (data) => {
      setClientAccessToken(data.accessToken);
      notifications.show({ title: 'Welcome back!', message: 'You have successfully logged in' });
      return data;
    },
    onError: (error) => {
      notifications.show({ message: error.messages[0], color: 'red' });
    },
  },
});

export const useLogout = createPostMutationHook({
  endpoint: 'auth/logout',
  rMutationParams: {
    onSuccess: () => {
      removeClientAccessToken();
      notifications.show({ title: 'Goodbye!', message: 'You have successfully logged out' });
    },
    onError: (error) => {
      notifications.show({ message: error.message, color: 'red' });
    },
  },
});
